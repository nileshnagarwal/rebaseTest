import { EnquiriesService } from './../../../common/services/enquiries-quotes/enquiries.service';
import { VehicleType } from './../../../common/interfaces/vehicle-type';
import { VehicleTypeService } from './../../../common/services/masters/vehicle-type.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { enquiryStatusOpt } from '../../../common/misc/api-constants';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ngx-enquiries-search',
  templateUrl: './enquiries-search.component.html',
  styleUrls: ['./enquiries-search.component.scss'],
})
export class EnquiriesSearchComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private vehicleTypeService: VehicleTypeService,
    private service: EnquiriesService,
    ) {
    this.enquiriesSearchForm = this.fb.group({
      from_date: [],
      to_date: [],
      source_lat: [],
      source_lng: [],
      source_rad: [],
      dest_lat: [],
      dest_lng: [],
      dest_rad: [],
      vehicle_type: [],
      status: [],
    });
  }

  ngOnInit() {
    this.vehicleTypeService.getVehicleType().
      subscribe(response => {
        this.vehicleTypeOptions = response.body.
          map(responseMap => responseMap);
      });

    this.statusOptions = Object.values(enquiryStatusOpt);
  }

  enquiriesSearchForm: FormGroup;
  vehicleTypeOptions: VehicleType[];
  statusOptions: string[];
  $data: Observable<any>;

  resetSourceDest(input, field: string) {
    if (!input.target.value.replace(/\s/g, '').length) {
      if (field.includes('source')) {
        this.source_lat.reset();
        this.source_lng.reset();
      } else if (field.includes('dest')) {
        this.dest_lat.reset();
        this.dest_lng.reset();
      }
    }
  }

  handleSourceAddressChange(address: Address) {
    this.source_lat.setValue(address.geometry.location.lat());
    this.source_lng.setValue(address.geometry.location.lng());
  }

  handleDestAddressChange(address: Address) {
    this.dest_lat.setValue(address.geometry.location.lat());
    this.dest_lng.setValue(address.geometry.location.lng());
  }

  searchEnquiry(enquiriesSearchForm) {
    this.service.searchEnquiry(enquiriesSearchForm.value)
      .subscribe(response => {
        this.$data = of(response.body);
      });
  }

  // The following get functions are used to describe
  // properties which can be used for cleaner code in html file.

  get from_date() {
    return this.enquiriesSearchForm.get('from_date');
  }

  get to_date() {
    return this.enquiriesSearchForm.get('to_date');
  }

  get source_lat() {
    return this.enquiriesSearchForm.get('source_lat');
  }

  get source_lng() {
    return this.enquiriesSearchForm.get('source_lng');
  }

  get source_rad() {
    return this.enquiriesSearchForm.get('source_rad');
  }

  get dest_lat() {
    return this.enquiriesSearchForm.get('dest_lat');
  }

  get dest_lng() {
    return this.enquiriesSearchForm.get('dest_lng');
  }

  get dest_rad() {
    return this.enquiriesSearchForm.get('dest_rad');
  }

  get vehicle_type() {
    return this.enquiriesSearchForm.get('vehicle_type');
  }

  get status() {
    return this.enquiriesSearchForm.get('status');
  }
}
