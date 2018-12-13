import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleTypeReportComponent } from './../vehicle-type-report/vehicle-type-report.component';
import { VehicleTypeService } from './../../../common/services/masters/vehicle-type.service';

@Component({
  selector: 'ngx-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class VehicleTypeComponent implements OnInit {

  @Output() refreshTable = new EventEmitter();

  constructor(private service: VehicleTypeService) {}

  ngOnInit() {
    this.service.getVehicleType()
    .subscribe(response => {
      // this.source.load(response.json());
    });
  }

  vehicleTypeForm = new FormGroup(
    {
      vehicle: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(5),
      ]),
      length: new FormControl('', [
        Validators.required,
        Validators.max(300),
      ]),
      width: new FormControl('', [
        Validators.required,
        Validators.max(30),
      ]),
      height: new FormControl('', [
        Validators.required,
        Validators.max(15),
      ]),
      weight: new FormControl('', [
        Validators.required,
        Validators.max(1000),
      ]),
    },
  );

  addVehicleType(vehicleTypeForm) {
    this.service.addVehicleType(vehicleTypeForm.value)
      .subscribe(response => {
        this.service.getVehicleType()
        .subscribe(responseGet => {
          this.refreshTable.emit();
        });
      });
      vehicleTypeForm.reset();
  }

  // The following get functions are used to describe
  // properties which can be used for cleaner code in html file.

  get vehicle()
  {
    return this.vehicleTypeForm.get('vehicle');
  }

  get length()
  {
    return this.vehicleTypeForm.get('length');
  }

  get width()
  {
    return this.vehicleTypeForm.get('width');
  }

  get height()
  {
    return this.vehicleTypeForm.get('height');
  }

  get weight()
  {
    return this.vehicleTypeForm.get('weight');
  }

  // The following section is for the reports section smart table
  // reportInstance: VehicleTypeReportComponent = new VehicleTypeReportComponent(this.service);

  // source = this.reportInstance.getLocalDataSource();

  // settings = this.reportInstance.getSettings();

  // onDeleteConfirm(event): void {
  //   this.reportInstance.onDeleteConfirm(event);
  // }

  // onAddConfirm(event): void {
  //   this.reportInstance.onAddConfirm(event);
  // }

}
