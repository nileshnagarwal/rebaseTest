import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ValidatorFn, AbstractControl } from '@angular/forms';

// Since we want to take an argument with validator which is not possible with
// ValidatorFn, we have to create a function which takes the parameter as inpur and
// return the ValidatorFn from this function.
export function googlePlaceValidator(place: Address | null): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    // How to handle not required fields? If a value is not empty, we will
    // conduct the validation normally. But, if a value is is empty then we
    // return null as the required validator will handle this case.
    if (control.value !== '') {
      if (place == null) {
        return {'invalid':
          {inputValue: control.value, 'place': null},
        };
      } else if (place.formatted_address !== control.value) {
        return {'invalid':
          {inputValue: control.value, googlePlaceValue: place.formatted_address, 'place': place},
        };
      } else {
        return null;
      }
    } else return null;
  };
}
