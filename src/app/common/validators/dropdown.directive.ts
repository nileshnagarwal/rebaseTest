import { ValidatorFn, AbstractControl } from '@angular/forms';

export function dropdownValidator(dropdown: string[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (dropdown.indexOf(control.value) > -1) {
        return null;
    } else return {'invalidOption' : {
        'optionEntered' : control.value,
        'optionsAvailable' : dropdown,
        },
    };
  };
}
