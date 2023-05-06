import { Injectable } from '@angular/core';

interface Obj {
  [key: string]: any;
}

function trim(str: string) {
  return str.trim();
}

interface Options {
  trim: boolean;
}

const defaultOptions: Options = {
  trim: false,
};

@Injectable()
export class UtilitiesService {
  deepCompare(
    obj1: Obj,
    obj2: Obj,
    except: string[] = [],
    forceFullCheck: string[] = [],
    options: Options = defaultOptions,
    ignoreOrder: boolean = false
  ): boolean {
    for (const key in obj1) {
      if (
        obj1.hasOwnProperty(key) &&
        obj2.hasOwnProperty(key) &&
        except.indexOf(key) === -1
      ) {
        if (obj1[key] instanceof Array && obj2[key] instanceof Array) {
          if (!this.compareArrays(obj1[key], obj2[key], except, ignoreOrder)) {
            return false;
          }
          continue;
        }
        if (obj1[key] instanceof Date && obj2[key] instanceof Date) {
          if (
            obj1[key].getHours() !== obj2[key].getHours() ||
            obj1[key].getMinutes() !== obj2[key].getMinutes() ||
            obj1[key].getSeconds() !== obj2[key].getSeconds() ||
            obj1[key].getMilliseconds() !== obj2[key].getMilliseconds()
          ) {
            return false;
          }
          continue;
        }
        if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
          if (
            !this.deepCompare(
              obj1[key],
              obj2[key],
              forceFullCheck.indexOf(key) !== -1 ? [] : except,
              forceFullCheck
            )
          ) {
            return false;
          }
          continue;
        }
        // if any of the fields has value
        const field1 = this.castToNumberIfPossible(obj1[key]);
        const field2 = this.castToNumberIfPossible(obj2[key]);
        // if are strings and trimming is enabled
        if (
          options.trim &&
          typeof field1 === 'string' &&
          typeof field2 === 'string'
        ) {
          if (trim(field1) !== trim(field2)) {
            return false;
          }
        } else if ((field1 || field2) && field1 !== field2) {
          return false;
        } else if (obj1[key] !== obj2[key]) {
          return false;
        }
        // if none of the fields has value
        if (!!field1 !== !!field2) {
          return false;
        }
      } else if (
        Object.prototype.toString.call(obj1) === '[object File]' &&
        Object.prototype.toString.call(obj2) === '[object File]' &&
        except.indexOf(key) === -1
      ) {
        const newObj1 = {
          lastModified: obj1['lastModified'],
          lastModifiedDate: obj1['lastModifiedDate'],
          name: obj1['name'],
          size: obj1['size'],
          type: obj1['type'],
          webkitRelativePath: obj1['webkitRelativePath'],
        };
        const newObj2 = {
          lastModified: obj2['lastModified'],
          lastModifiedDate: obj2['lastModifiedDate'],
          name: obj2['name'],
          size: obj2['size'],
          type: obj2['type'],
          webkitRelativePath: obj1['webkitRelativePath'],
        };
        if (
          !this.deepCompare(
            newObj1,
            newObj2,
            forceFullCheck.indexOf(key) !== -1 ? [] : except,
            forceFullCheck
          )
        ) {
          return false;
        }
        continue;
      } else if (except.indexOf(key) === -1) {
        return false;
      }
    }
    return true;
  }

  compareArrays(
    arr1: Array<any>,
    arr2: Array<any>,
    except: string[] = [],
    ignoreOrder: boolean = false
  ): boolean {
    arr1 = arr1.slice();
    arr2 = arr2.slice();
    if (arr1.length !== arr2.length) {
      return false;
    }
    if (ignoreOrder) {
      const comparison = (a: any, b: any) =>
        (!a.id && a > b) || a.id > b.id
          ? 1
          : (!a.id && b > a) || b.id > a.id
          ? -1
          : 0;
      arr1.sort(comparison);
      arr2.sort(comparison);
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
        if (!this.compareArrays(arr1[i], arr2[i], except, ignoreOrder)) {
          return false;
        }
      } else if (arr1[i] instanceof Object && arr2[i] instanceof Object) {
        if (!this.deepCompare(arr1[i], arr2[i], except)) {
          return false;
        }
      } else {
        const field1 = this.castToNumberIfPossible(arr1[i]);
        const field2 = this.castToNumberIfPossible(arr2[i]);
        if (field2 !== field1) {
          return false;
        }
      }
    }
    return true;
  }

  castToNumberIfPossible(str: string): number | string {
    if (str === '') {
      return str;
    }
    return !isNaN(+str) ? +str : str;
  }

  deepClone(obj: { [key: string]: any }): { [key: string]: any } {
    const returnable: { [key: string]: any } = {};
    if (!(obj instanceof Array || obj instanceof Object)) {
      return obj;
    }
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] instanceof Array) {
          returnable[key] = [];
          for (const objElementKey in obj[key]) {
            if (obj[key].hasOwnProperty(objElementKey)) {
              if (
                Object.prototype.toString.call(obj[key][objElementKey]) ===
                '[object File]'
              ) {
                const newFileObj = {
                  lastModified: obj[key][objElementKey].lastModified,
                  lastModifiedDate: obj[key][objElementKey].lastModifiedDate,
                  name: obj[key][objElementKey].name,
                  size: obj[key][objElementKey].size,
                  type: obj[key][objElementKey].type,
                  webkitRelativePath:
                    obj[key][objElementKey].webkitRelativePath,
                };
                returnable[key].push(newFileObj);
              } else {
                returnable[key].push(this.deepClone(obj[key][objElementKey]));
              }
            }
          }
        } else if (obj[key] instanceof Object) {
          if (Object.prototype.toString.call(obj[key]) === '[object Date]') {
            returnable[key] = obj[key];
          } else {
            returnable[key] = this.deepClone(obj[key]);
          }
        } else {
          returnable[key] = obj[key];
        }
      }
    }
    return returnable;
  }

  toQueryParams(obj: { [key: string]: any }, prefix?: string): string {
    const str = [];
    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        const k = prefix ? prefix + '[' + property + ']' : property;
        const v = obj[property];
        str.push(
          v !== null && typeof v === 'object'
            ? this.toQueryParams(v, k)
            : encodeURIComponent(k) + '=' + encodeURIComponent(v)
        );
      }
    }
    return str.join('&');
  }

  // TODO understand how to implement correctly
  // regroupQueryParams(obj: {[key: string]: any}): {[key: string]: any} {
  //   const returnable: {[key: string]: any} = {};

  //   for (const key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       if (key.indexOf('[') !== -1) {
  //         const keyName: string = key.split('[')[0];
  //         if (returnable[keyName]) {
  //           returnable[keyName].push(obj[key]);
  //         } else {
  //           returnable[keyName] = [];
  //         }
  //       } else {
  //         returnable[key] = obj[key];
  //       }
  //     }
  //   }
  //   return returnable;
  // }

  isEmpty(obj: Object) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }
}
