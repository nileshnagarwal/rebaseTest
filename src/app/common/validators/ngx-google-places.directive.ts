import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export function googlePlaceValidator(place: Address | null): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let invalid: boolean = false;
    if (control.value !== '') {
      if (place == null) {
        invalid = true;
        return invalid ? {'invalid': {inputValue: control.value}} : null;
      } else if (place.formatted_address !== control.value) {
        invalid = true;
        return {'invalid':
          {inputValue: control.value, googlePlaceValue: place.formatted_address},
        };
      } else {
        return null;
      }
    } else return null;
  };
}
