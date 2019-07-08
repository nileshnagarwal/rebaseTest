import { ConfirmEnquiryService } from './../../../common/services/enquiries-quotes/confirm-enquiry.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ngx-enquiry-confirm',
  templateUrl: './enquiry-confirm.component.html',
  styleUrls: ['./enquiry-confirm.component.scss'],
})
export class EnquiryConfirmComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: ConfirmEnquiryService,
  ) {
    this.enquiryConfirmForm = this.fb.group({
      enquiry_id: [, Validators.required],
      loading_date: [, Validators.required],
      comments: [],
    });

    /** Initialising to false as we only disable it when waiting
     * for a response from backend.*/
    this.isPending$ = of(false);
  }

  ngOnInit() {
    this.enquiry_id.setValue(this.enquiryId);
  }

  enquiryConfirmForm: FormGroup;
  /** isPending$ is an observable used to toggle the
   * disabled state of submit button.*/
  isPending$: Observable<Boolean>;

  @Input() enquiryId: number;
  @Input() enquiryNo: string;

  @ViewChild('submit')submit: ElementRef;
  @ViewChild(FormGroupDirective) conEnqFormDir;

  // Submit confirmed enquiry details to the backend
  addEnquiry(enquiryConfirmForm) {
    /** As soon as the user clicks on submit button, we disable
     * the button so as to avoid double submission.
    */
    this.isPending$ = of(true);
    this.service.addConfirmEnquiry(enquiryConfirmForm.value)
      .subscribe(response => {
        this.conEnqFormDir.resetForm();
        this.enquiryConfirmForm.markAsPristine();
        this.enquiry_id.setValue(this.enquiryId);
        this.isPending$ = of(false);
      });
  }

  // The following get functions are used to describe
  // properties which can be used for cleaner code in html file.

  get enquiry_id() {
    return this.enquiryConfirmForm.get('enquiry_id');
  }

  get loading_date() {
    return this.enquiryConfirmForm.get('loading_date');
  }

  get comments() {
    return this.enquiryConfirmForm.get('comments');
  }
}
