import { QuotesReportComponent } from './../quotes-report/quotes-report.component';
import { QuotesComponent } from './../quotes/quotes.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EnquiriesService } from './../../../common/services/enquiries-quotes/enquiries.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';


@Component({
  selector: 'ngx-enquiries-view',
  templateUrl: './enquiries-view.component.html',
  styleUrls: ['./enquiries-view.component.css'],
})

export class EnquiriesViewComponent implements OnInit {

  constructor(
    private service: EnquiriesService,
    private modalService: NgbModal) {}

  ngOnInit() {
    this.service.getEnquiryById(this.enquiryId)
    .subscribe(
      response => {
      this.response = response;
      this.latitude = parseFloat(this.response['places_obj'][0]['lat']);
      this.longitude = parseFloat(this.response['places_obj'][0]['lng']);
      },
      (error: any) => {},
      () => this.getDirections(),
    );

    // Delete Columns from Quotes Report Table
    this.deleteProps(this.quotesReport.settings.columns, ['length',
      'width', 'height', 'weight', 'places_source',
      'places_destination', 'enquiry_no']);
  }

  response;
  enquiryId: number;
  origin: {lat: number, lng: number};
  destination: {lat: number, lng: number};
  latitude: number;
  longitude: number;
  counter = 0;
  waypoints: Array<object>;
  renderOptions = {draggable: true};
  provideRouteAlternatives: boolean = true;
  sourceLength: number; // Length of Sources Array
  destLength: number; // Length of Destinations Array
  directionsUrlBase = 'https://www.google.com/maps/dir/?api=1';
  directionsUrl: string;
  originPlaceId: string;
  destinationPlaceId: string;
  waypointsPlaceIds: Array<string> = [];
  originString: string;
  destinationString: string;
  waypointsString: string = '';
  @Input() isModalOpen: boolean;
  @Input() modalRef: NgbModalRef;

  @ViewChild('report') quotesReport: QuotesReportComponent;


  // getDirections() sets origin, destination and waypoints.
  // For origin we take the first place of the sources array and for
  // destination, we take the last place of the destinations array.
  getDirections() {
    this.setOrigin();
    this.setDestination();
    this.setWaypoints();
    this.generateUrl();
  }

  setOrigin() {
    this.sourceLength = this.response['places_source_obj'].length;
    this.origin = {
      lat: parseFloat(this.response['places_source_obj'][0]['lat']),
      lng: parseFloat(this.response['places_source_obj'][0]['lng']),
    };
    this.originPlaceId = this.response['places_source_obj'][0]['place_id_agm'];
    this.originString = encodeURIComponent(this.response['places_source_obj'][0]['place']);
  }

  setDestination() {
    this.destLength = this.response['places_destination_obj'].length;
    this.destination = {
      lat: parseFloat(this.response['places_destination_obj'][this.destLength - 1]['lat']),
      lng: parseFloat(this.response['places_destination_obj'][this.destLength - 1]['lng']),
    };
    this.destinationPlaceId = this.response['places_destination_obj'][this.destLength - 1]['place_id_agm'];
    this.destinationString = encodeURIComponent(this.response['places_destination_obj'][0]['place']);
  }

  setWaypoints() {
    const waypoints = [];

    // Getting Waypoints of source
    for (const waypoint of this.response['places_source_obj']) {
      if (this.counter > 0) {
        waypoints.push({
          location: {
            lat: parseFloat(waypoint['lat']),
            lng: parseFloat(waypoint['lng']),
          },
          stopover: true,
        });
        this.waypointsPlaceIds.push(waypoint['place_id_agm']);
        this.waypointsString = this.waypointsString.concat(encodeURIComponent(waypoint['place']), '%7C');
      }
      this.counter = this.counter + 1;
    }

    // Getting Waypoints of destination
    this.counter = 0; // resetting counter
    for (const waypoint of this.response['places_destination_obj']) {
      if (this.counter < (this.destLength - 1)) {
        waypoints.push({
          location: {
            lat: parseFloat(waypoint['lat']),
            lng: parseFloat(waypoint['lng']),
          },
          stopover: true,
        });
        this.waypointsPlaceIds.push(waypoint['place_id_agm']);
        this.waypointsString = this.waypointsString.concat(encodeURIComponent(waypoint['place']), '%7C');
      }
      this.counter = this.counter + 1;
    }

    this.waypoints = waypoints;
  }

  // Generate "show route on map" url
  generateUrl() {
      this.directionsUrl = this.directionsUrlBase +
        '&origin=' + this.originString + '&origin_place_id=' + this.originPlaceId +
        '&destination=' + this.destinationString +
        '&destination_place_id=' + this.destinationPlaceId +
        '&waypoints=' + this.waypointsString +
        '&waypoints_place_ids=' + this.waypointsPlaceIds.join('%7C') +
        '&travelmode=driving';
  }

  modalStatus() {
    if (this.isModalOpen) {
      return of(true);
    } else {
      return of(false);
    }
  }

  closeModal() {
    this.modalRef.dismiss();
  }

  openQuote() {
    const activeModal = this.modalService.open(
      QuotesComponent,
      { size: 'lg', container: 'nb-layout' },
    );
    activeModal.componentInstance.enquiryId = this.enquiryId;
    activeModal.componentInstance.enquiryNo = this.response['enquiry_no'];
    activeModal.componentInstance.vehicleTypeOptions = this.response['vehicle_type_obj'];
    activeModal.componentInstance.vehicleBodyOptions = this.response['vehicle_body_obj'];
    activeModal.componentInstance.isModalOpen = true;
    activeModal.componentInstance.modalRef = activeModal;
    activeModal.result.then(result => {
      this.quotesReport.refreshTable();
    }, reason => {
      this.quotesReport.refreshTable();
    });
  }

  // Custom function to delete list of prop from obj
  private deleteProps(obj, props: string[]) {
    for (const prop of props) {
      (prop in obj) && (delete obj[prop]);
    }
  }
}
