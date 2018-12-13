import { VehicleBodyComponent } from './../vehicle-body/vehicle-body.component';
import { VehicleBodyService } from '../../../common/services/masters/vehicle-body.service';
import { Component, OnInit, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { VehicleBody } from '../../../common/interfaces/vehicle-body';


@Component({
  selector: 'ngx-vehicle-body-report',
  templateUrl: './vehicle-body-report.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class VehicleBodyReportComponent implements OnInit {

  //ng2 Smart Table Setting
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      body: {
        title: 'Vehicle Body',
        type: 'string',
      },
    },
  };

  //ng2 Smart Table Data Source
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: VehicleBodyService,
    private vehicleBodyComponent: VehicleBodyComponent
  ){}

  ngOnInit() {
    this.service.getVehicleBody()
    .subscribe(response => {
      this.source.load(response.body);
    });

    //Subscirbe to the refreshTable event emitter 
    //of VehicleBodyComponent
    this.vehicleBodyComponent.refreshTable
    .subscribe(response => {
      this.service.getVehicleBody()
        .subscribe(responseGet => {
          this.source.load(responseGet.body);
        });
    });

  }

  onAddConfirm(event): void {
    console.log("onAddConfirm Trigerred");
    // Confirm if the user wants to add the data and
    // then call the service to add the data.
    if (window.confirm('Are you sure you want to add?')) {
      event.confirm.resolve();
      this.service.addVehicleBody(event['newData'])
        .subscribe(response => {
          //Refresh Table Data
          this.service.getVehicleBody()
          .subscribe(responseGet => {
            this.source.load(responseGet.body);
          });
        });
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (window.confirm('Are you sure you want to edit?')) {
      event.confirm.resolve();
      this.service.updateVehicleBody(event['newData'])
        .subscribe(response => {
          //Refresh Table Data
          this.service.getVehicleBody()
          .subscribe(responseGet => {
            this.source.load(responseGet.body);
          });
        });
    } else {
      event.confirm.reject();
    }    
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      console.log(event);
      this.service.deleteVehicleBody(event['data'])
        .subscribe(response => {
          //Refresh Table Data
          this.service.getVehicleBody()
          .subscribe(responseGet => {
            this.source.load(responseGet.body);
          });
        });
    } else {
      event.confirm.reject();
    }
  }

  getLocalDataSource() {
    return this.source;
  }

  getSettings() {
    return this.settings;
  }

}
