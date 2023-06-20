import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

export class MaxCharacterValidator {
  static validate(maxValue: number): ValidatorFn {
    return (c: AbstractControl) => {
      return (c.value.length > maxValue) ?
        {
          maxLength: {
            valid: false,
          }
        } : null;
    };
  }
}
