import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getFirstError',
})
export class GetFirstErrorPipe implements PipeTransform {
  transform(value: any, ...args: any[]): string | void {
    if (args.length > 1) {
      const controlName = args[0];
      for (const validationMessageKey in args[1][controlName]) {
        if (
          args[1][controlName].hasOwnProperty(validationMessageKey) &&
          args[1][controlName][validationMessageKey].type ===
            Object.keys(value)[0]
        ) {
          return args[1][controlName][validationMessageKey].message;
        }
      }
    }
  }
}
