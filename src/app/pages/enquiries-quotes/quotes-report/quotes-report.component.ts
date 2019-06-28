import { Quote } from './../../../common/interfaces/quote';
import { Component, OnInit, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { QuotesService } from '../../../common/services/enquiries-quotes/quotes.service';
import { QuotesHelper } from '../../../common/functions/quotes-helper';

@Component({
  selector: 'ngx-quotes-report',
  templateUrl: './quotes-report.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class QuotesReportComponent implements OnInit {

  @Input() settings = {
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
      places_source: {
        title: 'Pickup',
        type: 'string',
      },
      places_destination: {
        title: 'Destination',
        type: 'string',
      },
      transporter_str: {
        title: 'Transporter',
        type: 'string',
      },
      freight: {
        title: 'Freight',
        type: 'number',
      },
      including_fine: {
        title: 'Including Fine?',
        type: 'string',
      },
      vehicle_avail: {
        title: 'Vehicle Available?',
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
      delete: false,
    },
  };

  // Used to get quotes for a given enquiry only
  @Input('enquiry_id') enquiry_id: number;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: QuotesService,
  ) {}

  ngOnInit() {
    this.getQuotesForEnquiry();
  }

  refreshTable() {
    this.getQuotesForEnquiry();
  }

  /**Checks if used in enquiry view page or Quotes page
   * if used inside enquiry view page, enquiry_id will be
   * set else it will be blank.
   */
  private getQuotesForEnquiry() {
    if (this.enquiry_id) {
      // If enquiry_id is set get quotes for given enquiry only
      this.service.getQuoteByEnquiry(this.enquiry_id)
        .subscribe(response => {
          const quotes: Quote[] = QuotesHelper.quotePropToString(response.body);
          this.source.load(quotes);
        });
      // If enquiry_id is not set get all quotes
    } else this.service.getQuote()
        .subscribe(response => {
          let quotes: Quote[] = QuotesHelper.quotePropToString(response.body);
          quotes = QuotesHelper.getDimensions(quotes);
          this.source.load(quotes);
        });
  }

  getLocalDataSource() {
    return this.source;
  }

  getSettings() {
    return this.settings;
  }

}
