import { AbstractControl, ValidatorFn } from '@angular/forms';

export class IntegerValidator {
  static validate(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: any } | null => {
      const value = c.value;
      if (value === null || value === undefined || value === '') {
        return null;
      }

      const isValid = Number.isInteger(+value);

      return (!isValid) ?
        {
          integersOnly: {
            valid: false,
          }
        } : null;
    };
  }
}
