import { AuthService } from './../../../common/services/auth/auth-service/auth.service';
import { ExtraExpensesService } from './../../../common/services/masters/extra-expenses.service';
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
    private extraExpensesService: ExtraExpensesService,
    private adapter: DateAdapter<any>,
    private service: EnquiriesService,
    private authService: AuthService) {}

  ngOnInit() {

    // Prefill Dropdown Boxes of Vehicle Type, Vehicle Body and
    // Extra Expenses
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

    this.extraExpensesService.getExtraExpenses()
    .subscribe(response => {
      this.extraExpensesOptions = response.body.
        map(responseMap => responseMap);
    });

    // The below statement changes the date locale to India
    // displaying DD-MM-YYYY date format in form
    this.adapter.setLocale('in');

    // Initialise Source and Destination FormArray with 1 Source/Dest
    this.addSource();
    this.addDestination();

    // Set user field to current user_id
    this.authService.getUser()
      .subscribe(user => {
        this.user.setValue(user.user_id);
      })
  }

  /*
  The below section defines all the local fields
  */

  // Gives us access to GooglePlaceDirective which contains
  // all information related to the directive.
  // This is unused for now. Delete if not required.
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

  // Below are arrays for DropDowns. Except for loadTypeOptions all
  // arrays are pulled from Backend. loadTypeOptions are hardcoded.
  vehicleTypeOptions: any[];
  vehicleBodyOptions: any[];
  extraExpensesOptions: any[];
  loadTypeOptions: string[] = [
    'ODC',
    'Normal',
    'Part',
    'Container',
  ];

  // This is used in template to restrict Google Places
  // text box to India.
  placesOptions = {
    componentRestrictions: {country: 'in'},
  };

  // Submit function for the form
  addEnquiry(enquiriesForm) {
    this.service.addEnquiry(enquiriesForm.value)
      .subscribe(response => {});
      // enquiriesForm.reset(); TO BE DELETED
  }

  // Enquiry Form Controls Defined
  enquiriesForm = new FormGroup({
    status: new FormControl('', [
      Validators.required,
      // Checks if option selected is available in dropdown
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
    // Source and Dest are defined as FormArrays
    // to allow multiple Sources and Destinations
    sources: new FormArray([]),
    destinations: new FormArray([]),
    return: new FormGroup({
      place: new FormControl('', []),
      lat: new FormControl('', []),
      lng: new FormControl('', []),
    }),
    comments: new FormControl('', []),
    loading_date: new FormControl('', [
      Validators.required,
    ]),
    extra_expenses: new FormControl('', [
      Validators.required,
    ]),
    user: new FormControl('', [
      Validators.required,
    ]),
  });

  // EnquiryNoValidator gets set here. This function is triggered
  // on (optionSelected) selected event of Status Field as it needs
  // to be passed the status field value.
  public enquiryNoValidationTrigger(event: MatAutocompleteSelectedEvent) {
    this.enquiry_no.setValidators([
      Validators.required,
      enquiryNoValidator(this.status.value),
    ]);
    // This rechecks the validation
    this.enquiry_no.updateValueAndValidity();
  }

  // Below are AddressChange handlers for Source, Destination and Return.
  public handleSourceAddressChange(address: Address, i: number) {
    // First we update the value selected from suggestions in input box
    this.sources.controls[i].get('place').setValue(address.formatted_address);
    // Next we set googlePlaceValidator passing the address. This was not
    // set before as we need to pass the address to validator and initially
    // this value is null.
    this.sources.controls[i].get('place').setValidators([
      Validators.required,
      googlePlaceValidator(address),
    ]);
    this.sources.controls[i].get('place').updateValueAndValidity();
    // Final step we store the lat and long from address
    this.sources.controls[i].get('lat').setValue(address.geometry.location.lat());
    this.sources.controls[i].get('lng').setValue(address.geometry.location.lng());
  }

  public handleDestinationAddressChange(address: Address, i: number) {
    // Refer handleSourceAddressChange() for explanation
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
    // Refer handleSourceAddressChange() for explanation
    this.return.get('place').setValue(address.formatted_address);
    this.return.get('place').setValidators([
      googlePlaceValidator(address),
    ]);
    this.return.get('place').updateValueAndValidity();
    this.return.get('lat').setValue(address.geometry.location.lat());
    this.return.get('lng').setValue(address.geometry.location.lng());
  }

  // Below we have functions to add and remove FormControls to
  // Multiple Source and Destination FormArrays. These are triggered
  // when user clicks on Add Source/Dest or Remove Source/Dest buttons.
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
    // add destination to the list
    this.destinations.push(new FormGroup({
      place: new FormControl('', [Validators.required]),
      lat: new FormControl('', [Validators.required]),
      lng: new FormControl('', [Validators.required]),
    }));
  }

  removeDestination(destination) {
    // remove destination from the list
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

  get status() {
    return this.enquiriesForm.get('status');
  }

  get destinations() {
    // This is returned as FormArray to get access to the functions
    // associated with FormArrays such as push, removeAt etc.
    return (this.enquiriesForm.get('destinations') as FormArray);
  }

  get return() {
    return this.enquiriesForm.get('return');
  }

  get enquiry_no() {
    return this.enquiriesForm.get('enquiry_no');
  }

  get length() {
    return this.enquiriesForm.get('length');
  }

  get width() {
    return this.enquiriesForm.get('width');
  }

  get height() {
    return this.enquiriesForm.get('height');
  }

  get weight() {
    return this.enquiriesForm.get('weight');
  }

  get load_type() {
    return this.enquiriesForm.get('load_type');
  }

  get vehicle_type() {
    return this.enquiriesForm.get('vehicle_type');
  }

  get vehicle_body() {
    return this.enquiriesForm.get('vehicle_body');
  }

  get loading_date() {
    return this.enquiriesForm.get('loading_date');
  }

  get comments() {
    return this.enquiriesForm.get('comments');
  }

  get sources() {
    // This is returned as FormArray to get access to the functions
    // associated with FormArrays such as push, removeAt etc.
    return (this.enquiriesForm.get('sources') as FormArray);
  }

  get user() {
    return this.enquiriesForm.get('user');
  }

}
