import { AbstractControl, ValidatorFn } from '@angular/forms';

export class RateFormatValidator {
  static validate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (value === null || value === undefined || value === '') {
        return null;
      }

      const regex = /^(\d{1,3})(\.\d{1,2})?$/;

      const isValid = regex.test(value);

      return !isValid
        ? {
            rateFormat: {
              valid: false,
            },
          }
        : null;
    };
  }
}
