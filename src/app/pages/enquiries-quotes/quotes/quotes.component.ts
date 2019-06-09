import { QuotesService } from './../../../common/services/enquiries-quotes/quotes.service';
import { VehicleBody } from './../../../common/interfaces/vehicle-body';
import { VehicleType } from './../../../common/interfaces/vehicle-type';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransporterService } from '../../../common/services/masters/transporter.service';
import { Transporter } from '../../../common/interfaces/transporter';
import { AuthService } from '../../../common/services/auth/auth-service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransporterComponent } from '../../masters/transporter/transporter.component';

@Component({
  selector: 'ngx-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent implements OnInit {

  constructor(
    private transporterService: TransporterService,
    private service: QuotesService,
    private authService: AuthService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    // Get Transporter list from Backend
    this.transporterService.getTransporter()
      .subscribe(response => {
        this.transporterOptions = response.body.
          map(responseMap => responseMap);
      });
    this.enquiry_id.setValue(this.enquiryId);

    // Set user field to current user_id
    this.authService.getUser()
    .subscribe(user => {
      this.user_id.setValue(user.user_id);
    });
  }

  @Input() enquiryId: string;
  @Input() enquiryNo: number;
  vehicleTypeOptions: VehicleType[];
  transporterOptions: Transporter[] = [];
  vehicleBodyOptions: VehicleBody[];
  transFilteredOptions: Transporter[];

  filter($event) {
    $event['type'] === 'click' ? '' : this.transporter_id.reset();
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
    this.transporter_id.setValue($event['option']['value']['transporter_id']);
  }

  // Quote Form Controls Defined
  quotesForm = new FormGroup({
    enquiry_id: new FormControl('', [
      Validators.required,
    ]),
    transporter_id: new FormControl('', [
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
    vehicle_type_id: new FormControl('', [
      Validators.required,
    ]),
    vehicle_body_id: new FormControl('', []),
    comments: new FormControl('', []),
    user_id: new FormControl('', [
      Validators.required,
    ]),
  });

  addQuote(quotesForm) {
    this.service.addQuote(quotesForm.value)
    .subscribe(response => {});
      // quotesForm.reset(); TO BE DELETED
  }

  addTransporter() {
    event.stopPropagation();
    const activeModal = this.modalService.open(
      TransporterComponent,
      { size: 'lg', container: 'nb-layout' },
    );

    // Get transporter list from backend when a
    // new transporter is added from modal
    activeModal.componentInstance.refreshTable
      .subscribe(resRefresh => {
        this.transporterService.getTransporter()
        .subscribe(response => {
          this.transporterOptions = response.body.
            map(responseMap => responseMap);
        });
      });
  }

  // The following get functions are used to describe
  // properties which can be used for cleaner code in html file.

  get enquiry_id() {
    return this.quotesForm.get('enquiry_id');
  }

  get transporter_id() {
    return this.quotesForm.get('transporter_id');
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

  get vehicle_type_id() {
    return this.quotesForm.get('vehicle_type_id');
  }

  get vehicle_body_id() {
    return this.quotesForm.get('vehicle_body_id');
  }

  get comments() {
    return this.quotesForm.get('comments');
  }

  get user_id() {
    return this.quotesForm.get('user_id');
  }
}
