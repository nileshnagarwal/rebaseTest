import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'ngx-enquiries',
  templateUrl: './enquiries.component.html',

  styleUrls: ['./enquiries.component.css'],
})
export class EnquiriesComponent {

  constructor() {}


  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

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

  vehicleTypeOptions: string[];

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

  getErrorMessage() {
    return this.enquiriesForm.controls.status.hasError('required') ? 'You must enter a value' :
    this.enquiriesForm.controls.source.hasError('required') ? 'You must enter a value' :
    this.enquiriesForm.controls.destination.hasError('required') ? 'You must enter a value' : '';
  }

  get status()
  {
    return this.enquiriesForm.get('status');
  }

  public handleSourceAddressChange(address: Address) {
    this.latSource = this.placesRef.place.geometry.location.lat();
    this.lngSource = this.placesRef.place.geometry.location.lng();
  }

  public handleDestAddressChange(address: Address) {
    this.latSource = this.placesRef.place.geometry.location.lat();
    this.lngSource = this.placesRef.place.geometry.location.lng();
  }

  public handleReturnAddressChange(address: Address) {
    this.latSource = this.placesRef.place.geometry.location.lat();
    this.lngSource = this.placesRef.place.geometry.location.lng();
  }

}
