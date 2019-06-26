import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { EnquiriesService } from './../../../common/services/enquiries-quotes/enquiries.service';
import { EnquiriesViewComponent } from '../enquiries-view/enquiries-view.component';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-enquiries-report',
  templateUrl: './enquiries-report.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class EnquiriesReportComponent implements OnInit {

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
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      enquiry_no: {
        title: 'Enquiry No',
        type: 'string',
      },
      vehicle_type_str: {
        title: 'Vehicle Type',
        type: 'string',
      },
      places_source: {
        title: 'Pickup',
        type: 'string',
      },
      places_destination: {
        title: 'Destination',
        type: 'string',
      },
      length: {
        title: 'Length',
        type: 'number',
      },
      width: {
        title: 'Width',
        type: 'number',
      },
      height: {
        title: 'Height',
        type: 'number',
      },
      weight: {
        title: 'Weight',
        type: 'number',
      },
    },
    actions: {
      add : false,
      edit: false,
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: EnquiriesService,
    // private transporterComponent: TransporterComponent,
    private modalService: NgbModal,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit() {
    // this.transporterComponent.refreshTable
    //   .subscribe(response => {
    //     this.service.getTransporter()
    //       .subscribe(responseGet => {
    //         this.source.load(responseGet.body);
    //       });
    //   });
    this.service.getEnquiry()
      .subscribe(response => {
        this.source.load(response.body);
        // Trigger toastr for reminding to subsribe
        if (Notification.permission !== 'granted') {
          this.toastrShow('info', false, 'nb-notifications', '5000', 'top-right');
        }
      });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.service.deleteEnquiry(event['data'])
        .subscribe(response => {});
    } else {
      event.confirm.reject();
    }
  }

  // This function opens up a modal with the enquiry details filled in.
  viewEnquiry(event) {
    const activeModal = this.modalService.open(
      EnquiriesViewComponent,
      { size: 'lg', container: 'nb-layout' },
    );
    activeModal.componentInstance.enquiryId = event['data']['enquiry_id'];
    activeModal.componentInstance.isModalOpen = true;
    activeModal.componentInstance.modalRef = activeModal;
  }

  // Trigger toastr for reminding to subsribe
  toastrShow(status, preventDuplicates, icon, duration, position) {
    this.toastrService.show('Click on Bell Icon to Subscribe',
      'Get Notified on New Enquiries',
      {status, preventDuplicates, icon, duration, position},
    );
  }

  getLocalDataSource() {
    return this.source;
  }

  getSettings() {
    return this.settings;
  }

}
