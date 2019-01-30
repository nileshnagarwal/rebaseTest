import { ValidatorFn, AbstractControl } from '@angular/forms';

export function enquiryNoValidator(status: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const enquiryNo: string = control.value;
    if (status === undefined || status == null || control.value === '')
        return null;
    else if (status.toLowerCase().includes('confirm')) {
        if (enquiryNo.length === 10) {
            if (enquiryNo.substr(0, 1) === 'C') {
                return enquiryDateChecker(enquiryNo);
            } else {
                return {inValid : {
                mustBeginWith: 'C',
                beginingWith: enquiryNo.substr(0, 1),
                'enquiryNo': enquiryNo,
                }};
              }
        } else return {inValid : {
            expectedLength: 10,
            actualLength: enquiryNo.length,
            'enquiryNo': enquiryNo,
        }};
    } else if (status.toLowerCase().includes('unfloated')) {
        if (enquiryNo.length === 11) {
            if (enquiryNo.substr(0, 2) === 'UF') {
                return enquiryDateChecker(enquiryNo);
            } else return {inValid : {
                mustBeginWith: 'UF',
                beginingWith: enquiryNo.substr(0, 2),
                'enquiryNo': enquiryNo,
            }};
        } else return {inValid : {
            expectedLength: 11,
            actualLength: enquiryNo.length,
            'enquiryNo': enquiryNo,
        }};
    } else if ((!(status.toLowerCase().includes('unfloated')))
        && (status.toLowerCase().includes('floated'))) {
        if (enquiryNo.length === 10) {
            if (enquiryNo.substr(0, 1) === 'F') {
                return enquiryDateChecker(enquiryNo);
            } else return {inValid : {
                mustBeginWith: 'F',
                beginingWith: enquiryNo.substr(0, 1),
                'enquiryNo': enquiryNo,
            }};
        } else return {inValid : {
            expectedLength: 10,
            actualLength: enquiryNo.length,
            'enquiryNo': enquiryNo,
        }};
    } else return null;
  };
}

function enquiryDateChecker(enquiryNo: string): {[key: string]: any} | null {
    // + Operator is used to convert string ie enquiryNo to number ie date
    const date: string = enquiryNo.slice(enquiryNo.length - 9, enquiryNo.length - 3);
    const day: number = +date.toString().substr(0, 2);
    const month: number = +date.toString().substr(2, 2);
    const year: number = +date.toString().substr(4, 2);
    const currentYear: number = (new Date()).getFullYear() - 2000;

    if (day > 31) {
      return {inValid : {
        dayIs: day,
        mustBeWithin: 31,
        'enquiryNo': enquiryNo,
      }};
    } else if (month > 12) {
      return {inValid : {
        monthIs: month,
        mustBeWithin: 12,
        'enquiryNo': enquiryNo,
      }};
    } else if (year > currentYear) {
      return {inValid : {
        yearIs: year,
        mustBeWithin: currentYear,
        'enquiryNo': enquiryNo,
      }};
    } else return null;
}
