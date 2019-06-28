import { Quote } from '../interfaces/quote';

// This is a helper class having helper functions to work with quotes
export class QuotesHelper {
  /* This function is used to convert the values of 'including_fine'
  and 'vehicle_avail' from backend values to front end values
  Eg. no = No*/
  static quotePropToString(quotes: Quote[]) {
    quotes.map(quote => {
      switch (quote.including_fine) {
        case 'na': {
          quote.including_fine = 'Normal Cargo';
          break;
        }
        case 'yes': {
          quote.including_fine = 'Yes';
          break;
        }
        case 'no': {
          quote.including_fine = 'No';
          break;
        }
      }
      switch (quote.vehicle_avail) {
        case 'na': {
          quote.vehicle_avail = 'Didn\'t Bother';
          break;
        }
        case 'yes': {
          quote.vehicle_avail = 'Yes';
          break;
        }
        case 'no': {
          quote.vehicle_avail = 'No';
          break;
        }
      }
    });
    return quotes;
  }

  /* This function gets dimensions from enquiry object inside
  quote and creates individual props for length,width etc
  at the root level of quote object, assigning the correct
  values. */
  static getDimensions(quotes: Quote[]) {
    quotes.map(quote => {
      quote.length = quote.enquiry.length;
      quote.width = quote.enquiry.width;
      quote.height = quote.enquiry.height;
      quote.weight = quote.enquiry.weight;
    });
    return quotes;
  }
}
