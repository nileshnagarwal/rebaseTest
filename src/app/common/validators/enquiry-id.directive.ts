import { ValidatorFn, AbstractControl } from '@angular/forms';
/* This Validation Function ensures the value of enquiry no is of
required format taking into consideration the "enquiry status" value.
- Alphabets at the beginning are for Status Code
    UF = Unfloated, F = Floated and C = Confirmed
- First 6 digits are for date of enquiry
- The last three digits is the enquiry counter for the day
*/

/* Since Validator functions only takes AbstractControl as an
argument, we need to wrap this Validator function in another function
that takes the required arguments and returns the Validator Function.
*/
export function enquiryNoValidator(status: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const enquiryNo: string = control.value;
    // First we check if enquiry status has been entered correctly and if
    // the enquiry no field is filled.
    if (status === undefined || status == null || control.value === '')
        return null;
    /* Next we check if the alphabets in the start and the length of the
    enquiry no value are in accordance with the enquiry status selected.*/

    // Check for Enquiry Status = "Confirm"
    else if (status.toLowerCase().includes('confirm')) {
        if (enquiryNo.length === 10 || enquiryNo.length === 12) {
            if (enquiryNo.substr(0, 1) === 'C') {
                // Last we check if the date entered is of current year
                // and is a valid date.
                return enquiryDateChecker(enquiryNo);
            } else {
                return {inValid : {
                mustBeginWith: 'C',
                beginingWith: enquiryNo.substr(0, 1),
                'enquiryNo': enquiryNo,
                }};
              }
        } else {
            return {inValid : {
            expectedLength: '10 OR 12',
            actualLength: enquiryNo.length,
            'enquiryNo': enquiryNo,
            }};
          }

    // Check for Enquiry Status = "Unfloated"
    } else if (status.toLowerCase().includes('unfloated')) {
        if (enquiryNo.length === 11 || enquiryNo.length === 13) {
            if (enquiryNo.substr(0, 2) === 'UF') {
                return enquiryDateChecker(enquiryNo);
            } else return {inValid : {
                mustBeginWith: 'UF',
                beginingWith: enquiryNo.substr(0, 2),
                'enquiryNo': enquiryNo,
            }};
        } else return {inValid : {
            expectedLength: '11 OR 13',
            actualLength: enquiryNo.length,
            'enquiryNo': enquiryNo,
        }};

    // Check for Enquiry Status = "Floated"
    } else if ((!(status.toLowerCase().includes('unfloated')))
        && (status.toLowerCase().includes('floated'))) {
          if (enquiryNo.length === 10 || enquiryNo.length === 12) {
            if (enquiryNo.substr(0, 1) === 'F') {
                return enquiryDateChecker(enquiryNo);
            } else return {inValid : {
                mustBeginWith: 'F',
                beginingWith: enquiryNo.substr(0, 1),
                'enquiryNo': enquiryNo,
            }};
        } else return {inValid : {
            expectedLength: '10 OR 12',
            actualLength: enquiryNo.length,
            'enquiryNo': enquiryNo,
        }};
    } else return null;
  };
}

function enquiryDateChecker(enquiryNo: string): {[key: string]: any} | null {
    // This function is used if the date in Enquiry No is valid and of current year.
    let date: string;
    // + Operator is used to convert string ie enquiryNo to number ie date
    if (enquiryNo.length === 10 || enquiryNo.length === 11) {
      date = enquiryNo.slice(enquiryNo.length - 9, enquiryNo.length - 3);
    } else {
      date = enquiryNo.slice(enquiryNo.length - 11, enquiryNo.length - 5);
    }
    const day: number = +date.toString().substr(0, 2);
    const month: number = +date.toString().substr(2, 2);
    const year: number = +date.toString().substr(4, 2);
    const currentYear: number = (new Date()).getFullYear() - 2000;

    // Check if days are within 30
    if (day > 31) {
      return {inValid : {
        dayIs: day,
        mustBeWithin: 31,
        'enquiryNo': enquiryNo,
      }};

    // Check if months are within 12
    } else if (month > 12) {
      return {inValid : {
        monthIs: month,
        mustBeWithin: 12,
        'enquiryNo': enquiryNo,
      }};

    // Check if year is within current year
    } else if (year > currentYear) {
      return {inValid : {
        yearIs: year,
        mustBeWithin: currentYear,
        'enquiryNo': enquiryNo,
      }};
    } else return null;
}
