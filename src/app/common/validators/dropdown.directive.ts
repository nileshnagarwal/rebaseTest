import { ValidatorFn, AbstractControl } from '@angular/forms';
// Check if the option selected is one of the options in dropdown

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
