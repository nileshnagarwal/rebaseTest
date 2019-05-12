import { VehicleBody } from './../../../common/interfaces/vehicle-body';
import { VehicleType } from './../../../common/interfaces/vehicle-type';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransporterService } from '../../../common/services/masters/transporter.service';
import { Transporter } from '../../../common/interfaces/transporter';

@Component({
  selector: 'ngx-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent implements OnInit {

  constructor(
    private transporterService: TransporterService,
  ) {}

  ngOnInit() {
    // Get Transporter list from Backend
    this.transporterService.getTransporter()
      .subscribe(response => {
        this.transporterOptions = response.body.
          map(responseMap => responseMap);
      });
    this.enquiry_id.setValue(this.enquiryId);
    this.enquiry_no.setValue(this.enquiryNo);
  }

  @Input() enquiryId: string;
  @Input() enquiryNo: number;
  vehicleTypeOptions: VehicleType[];
  transporterOptions: Transporter[] = [];
  vehicleBodyOptions: VehicleBody[];
  transFilteredOptions: Transporter[];

  @ViewChild('transInput') transInput: ElementRef;

  filter($event) {
    $event['type'] === 'click' ? '' : this.transporter.reset();
    const filterValue = $event['target']['value'];
    if (filterValue !== undefined) {
      this.transFilteredOptions = this.transporterOptions
        .filter(option => option.transporter.toLowerCase().includes(filterValue.toLowerCase()));
    }
  }

  transDisplayFn(transporter) {
    return transporter ? transporter['transporter'] : null;
  }

  transSelected($event) {
    this.transporter.setValue($event['option']['value']['transporter_id']);
  }

  // Quote Form Controls Defined
  quotesForm = new FormGroup({
    enquiry_id: new FormControl('', [
      Validators.required,
    ]),
    enquiry_no: new FormControl(this.enquiryNo, [
      Validators.required,
    ]),
    transporter: new FormControl('', [
      Validators.required,
    ]),
    freight: new FormControl('', [
      Validators.required,
    ]),
    including_fine: new FormControl('', [
      Validators.required,
    ]),
    vehicle_avail: new FormControl('', [
      Validators.required,
    ]),
    vehicle_type: new FormControl('', [
      Validators.required,
    ]),
    vehicle_body: new FormControl('', []),
    comments: new FormControl('', []),
  });

  addQuote(quotesForm) {}

  // The following get functions are used to describe
  // properties which can be used for cleaner code in html file.

  get enquiry_id() {
    return this.quotesForm.get('enquiry_id');
  }
  get enquiry_no() {
    return this.quotesForm.get('enquiry_no');
  }

  get transporter() {
    return this.quotesForm.get('transporter');
  }

  get freight() {
    return this.quotesForm.get('freight');
  }

  get including_fine() {
    return this.quotesForm.get('including fine');
  }

  get vehicle_avail() {
    return this.quotesForm.get('vehicle_avail');
  }

  get vehicle_type() {
    return this.quotesForm.get('vehicle_type');
  }

  get vehicle_body() {
    return this.quotesForm.get('vehicle_body');
  }

  get comments() {
    return this.quotesForm.get('comments');
  }
}
