import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { VehicleTypeService } from '../../../common/services/masters/vehicle-type.service';
import { VehicleBodyService } from './../../../common/services/masters/vehicle-body.service';

@Component({
  selector: 'ngx-enquiries',
  templateUrl: './enquiries.component.html',

  styleUrls: ['./enquiries.component.css'],
})
export class EnquiriesComponent implements OnInit {

  constructor(
    private vehicleTypeService: VehicleTypeService,
    private vehicleBodyService: VehicleBodyService) {}

  ngOnInit() {
    this.vehicleTypeService.getVehicleType()
    .subscribe(response => {
      this.vehicleTypeOptions = response.body.
        map(responseMap => responseMap.vehicle);
    });

    this.vehicleBodyService.getVehicleBody()
    .subscribe(response => {
      this.vehicleBodyOptions = response.body.
        map(responseMap => responseMap.body);
    });
  }

  @ViewChild('sourceRef') sourceRef: GooglePlaceDirective;
  @ViewChild('destRef') destRef: GooglePlaceDirective;
  @ViewChild('returnRef') returnRef: GooglePlaceDirective;

  statusOptions: string[] = [
    'Finalised Order',
    'Quote Required',
  ];

  public latSource: number;
  public lngSource: number;
  public latDest: number;
  public lngDest: number;
  public latRet: number;
  public lngRet: number;

  text: string;

  results: string[];

  vehicleTypeResults: string[];

  vehicleTypeOptions: any[];

  vehicleBodyOptions: any[];

  loadTypeOptions: string[] = [
    'ODC',
    'Normal',
    'Part',
    'Container',
  ];

  placesOptions = {
    componentRestrictions: {country: 'in'},
  };


  searchStatus(event) {
    this.results = [];
        for (let i = 0; i < this.statusOptions.length; i++) {
            const statusQuery = this.statusOptions[i];
            if (statusQuery.toLowerCase().includes(event.query.toLowerCase())) {
                this.results.push(statusQuery);
            }
        }
  }

  searchLoadType(event) {
    this.results = [];
        for (let i = 0; i < this.loadTypeOptions.length; i++) {
            const statusQuery = this.loadTypeOptions[i];
            if (statusQuery.toLowerCase().includes(event.query.toLowerCase())) {
                this.results.push(statusQuery);
            }
        }
  }

  enquiriesForm = new FormGroup({
    status: new FormControl('', [
      Validators.required,
    ]),
    loadType: new FormControl('', [
      Validators.required,
    ]),
    vehicleType: new FormControl('', [
      Validators.required,
    ]),
    vehicleBody: new FormControl('', []),
    enquiryId: new FormControl('', [
      Validators.required,
    ]),
    length: new FormControl('', [
      Validators.required,
    ]),
    width: new FormControl('', [
      Validators.required,
    ]),
    height: new FormControl('', [
      Validators.required,
    ]),
    weight: new FormControl('', [
      Validators.required,
    ]),
    source: new FormControl('', [
      Validators.required,
    ]),
    destination: new FormControl('', [
      Validators.required,
    ]),
    return: new FormControl('', []),
    comments: new FormControl('', []),
    loadingDate: new FormControl('', []),
  });

  public handleSourceAddressChange(address: Address) {
    this.latSource = this.sourceRef.place.geometry.location.lat();
    this.lngSource = this.sourceRef.place.geometry.location.lng();
  }

  public handleDestAddressChange(address: Address) {
    this.latDest = this.destRef.place.geometry.location.lat();
    this.lngDest = this.destRef.place.geometry.location.lng();
  }

  public handleReturnAddressChange(address: Address) {
    this.latRet = this.returnRef.place.geometry.location.lat();
    this.lngRet = this.returnRef.place.geometry.location.lng();
  }

  // Below we handle error messages for each field individually

  getStatusErrorMessage() {
    return this.enquiriesForm.controls.status.hasError('required') ? 'You must enter a value' : '';
  }

  getSourceErrorMessage() {
    return this.enquiriesForm.controls.source.hasError('required') ? 'You must enter a value' : '';
  }

  getLoadTypeErrorMessage() {
    return this.enquiriesForm.controls.source.hasError('required') ? 'You must enter a value' : '';
  }

  // The following get functions are used to describe
  // properties which can be used for cleaner code in html file.

  get status()
  {
    return this.enquiriesForm.get('status');
  }

  get source()
  {
    return this.enquiriesForm.get('source');
  }

  get destination()
  {
    return this.enquiriesForm.get('destination');
  }

  get return()
  {
    return this.enquiriesForm.get('return');
  }

  get length()
  {
    return this.enquiriesForm.get('length');
  }

  get width()
  {
    return this.enquiriesForm.get('width');
  }

  get height()
  {
    return this.enquiriesForm.get('height');
  }

  get weight()
  {
    return this.enquiriesForm.get('weight');
  }

  get loadType()
  {
    return this.enquiriesForm.get('loadType');
  }

  get vehicleType()
  {
    return this.enquiriesForm.get('vehicleType');
  }

  get vehicleBody()
  {
    return this.enquiriesForm.get('vehicleBody');
  }

}
