import { AbstractControl } from '@angular/forms';

export class RequiredValidator {

  private static isEmptyInputValue(value: string | null): boolean {
    if (typeof value === 'string') {
      value = value.trim();
    }
    return value === undefined || value === null || value.length === 0;
  }

  static validate(control: AbstractControl): object | null {
    return RequiredValidator.isEmptyInputValue(control.value) ? { required: true } : null;
  }

}
