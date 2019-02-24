import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransporterService } from './../../../common/services/masters/transporter.service';

@Component({
  selector: 'ngx-transporter',
  templateUrl: './transporter-view.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})

export class TransporterViewComponent implements OnInit {

  constructor(
    private service: TransporterService,
  ) {}

  ngOnInit() {
    // Preset readOnly, submiy button's visibility and display
    // text of edit button on loading.
    // readOnly is used to change the readonly status of fields
    // and visibility of buttons.
    this.readOnly = true;
    document.getElementById('submit').style.visibility = 'hidden';
    this.editButton = 'EDIT';

    // Get data from backend using the transporter id and update
    // transporterForm values from response.
    this.service.getTransporterById(this.transporterId)
      .subscribe(response => {
        this.transporterForm.patchValue(response);
      });
  }

  transporterId: number;
  readOnly: boolean;
  editButton: string;

  transporterForm = new FormGroup(
    {
      transporter: new FormControl('', [
        Validators.required,
        Validators.maxLength(70),
        Validators.minLength(5),
      ]),
      primary_mobile: new FormControl('', [
        Validators.required,
        Validators.max(9999999999),
      ]),
      primary_contact: new FormControl('', [
        Validators.maxLength(255),
      ]),
      primary_person: new FormControl('', [
        Validators.maxLength(40),
      ]),
      other_contact: new FormControl('', [
        Validators.maxLength(255),
      ]),
      address: new FormControl('', [
      ]),
    },
  );

  onEdit() {
    // readOnly is used to change the readonly status of fields
    // and visibility of buttons.
    this.readOnly = !this.readOnly;
    if (this.readOnly ===  false) {
      document.getElementById('submit').style.visibility = 'visible';
      this.editButton = 'CANCEL';
      // ^This changes the display text of edit button to cancel.
    } else {
      document.getElementById('submit').style.visibility = 'hidden';
      this.editButton = 'EDIT';
    }

    // Following code refreshes the table. To handle the case if user
    // changes a value and clicks cancel without submiting.
    this.service.getTransporterById(this.transporterId)
      .subscribe(response => {
        this.transporterForm.patchValue(response);
      });
  }

  // Trigerred on clicking submit button. Put method is used to update
  // the data in editTransporter service.
  editTransporter(transporterForm) {
    this.service.editTransporter(transporterForm.value, this.transporterId)
      .subscribe(() => {
        this.onEdit();
      });
  }

  // The following get functions are used to describe
  // properties which can be used for cleaner code in html file.

  get transporter() {
    return this.transporterForm.get('transporter');
  }

  get primary_mobile() {
    return this.transporterForm.get('primary_mobile');
  }

  get primary_contact() {
    return this.transporterForm.get('primary_contact');
  }

  get primary_person() {
    return this.transporterForm.get('primary_person');
  }

  get other_contact() {
    return this.transporterForm.get('other_contact');
  }

}
