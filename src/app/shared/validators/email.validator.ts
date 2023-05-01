import { AbstractControl } from '@angular/forms';

export class EmailValidator {
  static validate(control: AbstractControl): object | null {
    const EMAIL_REGEXP =
      /* tslint:disable */
      /^[0-9a-zA-Z]+([a-z0-9!#$%&'*+\/=?^_`{|}~.-]?)+@[a-z0-9][a-z0-9-]*[a-z0-9]\.[a-z0-9]([a-z0-9-]*[a-z0-9])((\.[a-z0-9]([a-z0-9-]*[a-z0-9]))?)*$/i;
    /* tslint:enable*/
    return control.value &&
      control.value !== '' &&
      !EMAIL_REGEXP.test(control.value)
      ? {
          validateEmail: {
            valid: false,
          },
        }
      : null;
  }
}
