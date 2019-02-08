import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { VehicleTypeService } from '../../../common/services/masters/vehicle-type.service';
import { VehicleBodyService } from './../../../common/services/masters/vehicle-body.service';
import { EnquiriesService } from './../../../common/services/enquiries-quotes/enquiries.service';
import { DateAdapter } from '@angular/material/core';
import { googlePlaceValidator } from '../../../common/validators/ngx-google-places.directive';
import { dropdownValidator } from '../../../common/validators/dropdown.directive';
import { enquiryNoValidator } from '../../../common/validators/enquiry-id.directive';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'ngx-enquiries',
  templateUrl: './enquiries.component.html',

  styleUrls: ['./enquiries.component.css'],
})
export class EnquiriesComponent implements OnInit {

  constructor(
    private vehicleTypeService: VehicleTypeService,
    private vehicleBodyService: VehicleBodyService,
    private adapter: DateAdapter<any>,
    private service: EnquiriesService) {}

  ngOnInit() {
    this.vehicleTypeService.getVehicleType()
    .subscribe(response => {
      this.vehicleTypeOptions = response.body.
        map(responseMap => responseMap);
    });

    this.vehicleBodyService.getVehicleBody()
    .subscribe(response => {
      this.vehicleBodyOptions = response.body.
        map(responseMap => responseMap);
    });

    // The below statement changes the date locale to India
    // displaying DD-MM-YYYY date format in form
    this.adapter.setLocale('in');

    // Initialise Source and Destination FormArray with 1 Source/Dest
    this.addSource();
    this.addDestination();
  }

  @ViewChild('sourceRef') sourceRef: GooglePlaceDirective;
  @ViewChild('destRef') destRef: GooglePlaceDirective;
  @ViewChild('returnRef') returnRef: GooglePlaceDirective;

  // StatusOptions are hard coded at backend as well as frontend.
  // Changing this involves changing it in this component as well as
  // as changing it in validator.
  statusOptions: string[] = [
    'Confirmed Order',
    'Unfloated Enquiry',
    'Floated Enquiry',
  ];

  public latSource: number;
  public lngSource: number;
  public latDest: number;
  public lngDest: number;
  public latRet: number;
  public lngRet: number;

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

  addEnquiry(enquiriesForm) {
    this.service.addEnquiry(enquiriesForm.value)
      .subscribe(response => {});
      // enquiriesForm.reset(); TO BE DELETED
  }

  enquiriesForm = new FormGroup({
    status: new FormControl('', [
      Validators.required,
      dropdownValidator(this.statusOptions),
    ]),
    load_type: new FormControl('', [
      Validators.required,
    ]),
    vehicle_type: new FormControl('', [
      Validators.required,
    ]),
    vehicle_body: new FormControl('', []),
    enquiry_no: new FormControl('', [
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
    destinations: new FormArray([]),
    return: new FormControl('', [
      googlePlaceValidator(null),
    ]),
    comments: new FormControl('', []),
    loading_date: new FormControl('', [
      Validators.required,
    ]),
    sources: new FormArray([]),
  });

  public enquiryNoValidationTrigger(event: MatAutocompleteSelectedEvent) {
    this.enquiry_no.setValidators([
      Validators.required,
      enquiryNoValidator(this.status.value),
    ]);
    this.enquiry_no.updateValueAndValidity();
  }

  public handleDestinationAddressChange(address: Address, i: number) {
    this.destinations.controls[i].get('place').setValue(address.formatted_address);
    this.destinations.controls[i].get('place').setValidators([
      Validators.required,
      googlePlaceValidator(address),
    ]);
    this.destinations.controls[i].get('place').updateValueAndValidity();
    this.destinations.controls[i].get('lat').setValue(address.geometry.location.lat());
    this.destinations.controls[i].get('lng').setValue(address.geometry.location.lng());
  }

  public handleReturnAddressChange(address: Address) {
    this.latRet = address.geometry.location.lat();
    this.lngRet = address.geometry.location.lng();
    this.return.setValue(address.formatted_address);
    this.return.setValidators(googlePlaceValidator(address));
    this.return.updateValueAndValidity();
  }

  public handleSourceAddressChange(address: Address, i: number) {
    this.sources.controls[i].get('place').setValue(address.formatted_address);
    this.sources.controls[i].get('place').setValidators([
      Validators.required,
      googlePlaceValidator(address),
    ]);
    this.sources.controls[i].get('place').updateValueAndValidity();
    this.sources.controls[i].get('lat').setValue(address.geometry.location.lat());
    this.sources.controls[i].get('lng').setValue(address.geometry.location.lng());
  }

  addSource() {
    // add source to the list
    this.sources.push(new FormGroup({
      place: new FormControl('', [Validators.required]),
      lat: new FormControl('', [Validators.required]),
      lng: new FormControl('', [Validators.required]),
    }));
  }

  removeSource(source) {
    // remove source from the list
    // <FormArray> means 'as FormArray'. This is alternative way to
    // the method used in addSource()
    const index = this.sources.controls.indexOf(source);
    this.sources.removeAt(index);
  }

  addDestination() {
    // add source to the list
    this.destinations.push(new FormGroup({
      place: new FormControl('', [Validators.required]),
      lat: new FormControl('', [Validators.required]),
      lng: new FormControl('', [Validators.required]),
    }));
  }

  removeDestination(destination) {
    // remove source from the list
    // <FormArray> means 'as FormArray'. This is alternative way to
    // the method used in addSource()
    const index = this.destinations.controls.indexOf(destination);
    this.destinations.removeAt(index);
  }

  // Below we handle error messages for each field individually

  getStatusErrorMessage() {
    return this.enquiriesForm.controls.status.hasError('required') ? 'You must enter a value' :
      this.enquiriesForm.controls.status.hasError('invalidOption') ?  'You must select from the given options' : '';
  }

  getSourceErrorMessage() {
    return this.enquiriesForm.controls.source.hasError('required') ? 'You must enter a value' :
      this.enquiriesForm.controls.source.hasError('invalidPlace') ? 'Please select from suggested places' : '';
  }

  getDestinationErrorMessage() {
    return this.enquiriesForm.controls.destination.hasError('required') ? 'You must enter a value' :
      this.enquiriesForm.controls.destination.hasError('invalidPlace') ? 'Please select from suggested places' : '';
  }

  getReturnErrorMessage() {
    return this.enquiriesForm.controls.return.hasError('required') ? 'You must enter a value' :
      this.enquiriesForm.controls.return.hasError('invalidPlace') ? 'Please select from suggested places' : '';
  }

  getLoadTypeErrorMessage() {
    // return this.enquiriesForm.controls.source.hasError('required') ? 'You must enter a value' : '';
  }

  // The following get functions are used to describe
  // properties which can be used for cleaner code in html file.

  get status()
  {
    return this.enquiriesForm.get('status');
  }

  get destinations()
  {
    return (this.enquiriesForm.get('destinations') as FormArray);
  }

  get return()
  {
    return this.enquiriesForm.get('return');
  }

  get enquiry_no()
  {
    return this.enquiriesForm.get('enquiry_no');
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

  get load_type()
  {
    return this.enquiriesForm.get('load_type');
  }

  get vehicle_type()
  {
    return this.enquiriesForm.get('vehicle_type');
  }

  get vehicle_body()
  {
    return this.enquiriesForm.get('vehicle_body');
  }

  get loading_date()
  {
    return this.enquiriesForm.get('loading_date');
  }

  get comments()
  {
    return this.enquiriesForm.get('comments');
  }

  get sources()
  {
    return (this.enquiriesForm.get('sources') as FormArray);
  }

  get place()
  {
    return this.enquiriesForm.get('place');
  }
}
