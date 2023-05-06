import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

import {
  ActionTypeEnum,
  DealAlertNotificationType,
  PermissionType,
  Urls,
} from '../../infrastructure/enums';
import { UtilitiesService } from '../../../utilities/utilities.service';
import { State, Store } from 'src/app/shared/store';
import { LookUpModel } from '../../infrastructure/models';
import { LanguageService } from '../languages/language.service';

declare const jQuery: any;

interface Obj {
  [key: string]: any;
}

interface Options {
  trim: boolean;
}

@Injectable()
export class HelperService {
  private from1900: number;
  private from1800to1900: number;
  private from1700to1800: number;
  private from1600to1700: number;
  private from1500to1600: number;
  private from1400to1500: number;
  private from1360to1400: number;
  private from1300to1360: number;
  private from1200to1300: number;
  private from1140to1200: number;
  private from1100to1140: number;
  private from1020to1100: number;
  updateComponentData: Subject<string> = new Subject<string>();
  isNavigatedFromNotification: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  ignoreGuardChecking = new BehaviorSubject<boolean>(false);

  constructor(
    private store: Store<State>,
    private router: Router,
    private utilitiesService: UtilitiesService,
    private injector: Injector
  ) {}

  navigateFromNotification(
    event: Event,
    value: number,
    counterpartId: number
  ): void {
    // this.store.update({ previousRoute: null });
    // this.isNavigatedFromNotification.next(true);
    // let tab = '';
    // let basePath: string = Urls.IndividualDashboard;
    // if (value === DealAlertNotificationType.InviteParty) {
    //   const { userClaims } = this.store.getState();
    //  // const action = userClaims.actions.find((item) => item.action === ActionTypeEnum.allocateDeals);
    //   // if (action && action.permissionType === PermissionType.FullAccess) {
    //   //    basePath = `/${Urls.AllocationDashboardUnassigned}`;
    //   //    this.router.navigate([ basePath ]);
    //   // } else {
    //   //   this.store.update({
    //   //     showLoader: false,
    //   //     showErrorPageButton: true,
    //   //     errorMessage: this.injector.get(LanguageService).getTranslation('NoAccessError'),
    //   //   });
    //   //   this.router.navigate([Urls.UserError]);
    //   // }
    // } else if (value === DealAlertNotificationType.PrimaryAllocation ||
    //   value === DealAlertNotificationType.SecondaryAllocation ||
    //   value === DealAlertNotificationType.ReadOnlyAllocation) {
    //   tab = 'contract-dashboard';
    //   this.router.navigate([`/${basePath}/${tab}/${dealId}`]);
    //   this.updateComponentData.next('contract-dashboard');
    // }
  }

  deepCompare(
    obj1: Obj,
    obj2: Obj,
    numericControlNames: Array<string> = [],
    except?: string[],
    forceFullCheck?: string[],
    options?: Options,
    ignoreOrder?: boolean,
    resettableFields?: string[]
  ): boolean {
    this.normaliseFormValue(obj1, numericControlNames);
    return this.utilitiesService.deepCompare(
      this.resetFields(this.deepClone(obj1), resettableFields as string[]),
      this.resetFields(this.deepClone(obj2), resettableFields as string[]),
      except,
      forceFullCheck,
      options,
      ignoreOrder
    );
  }

  private resetFields(obj: Obj, resettableFields: string[]): Obj {
    if (!resettableFields) {
      return obj;
    }
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] instanceof Array) {
          if (resettableFields.includes(key)) {
            obj[key] = null;
          } else {
            for (const objElementKey in obj[key]) {
              if (obj[key].hasOwnProperty(objElementKey)) {
                this.resetFields(obj[key][objElementKey], resettableFields);
              }
            }
          }
        } else {
          if (resettableFields.includes(key)) {
            obj[key] = null;
          }
        }
      }
    }
    return obj;
  }

  private normaliseFormValue(obj1: Obj, numericControlNames: Array<string>) {
    if (numericControlNames.length) {
      const keys = Object.keys(obj1);
      keys.forEach((key) => {
        const type = Object.prototype.toString.call(obj1[key]);
        if (type === '[object Array]') {
          obj1[key].forEach((el: Obj) => {
            const type1 = Object.prototype.toString.call(el);
            if (type1 === '[object Object]') {
              this.normaliseFormValue(el, numericControlNames);
            }
          });
        } else if (type === '[object Object]') {
          this.normaliseFormValue(obj1[key], numericControlNames);
        } else if (type === '[object String]') {
          numericControlNames.forEach((name) => {
            if (name === key) {
              if (obj1[key]) {
                if (!obj1[key].includes(',')) {
                  obj1[key] = this.changeInputNumbers(obj1[key]);
                } else {
                  return;
                }
              } else {
                obj1[key] = null;
                return;
              }
            }
          });
        } else {
          return;
        }
      });
    }
  }

  private changeInputNumbers(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  compareArrays(
    arr1: Array<number>,
    arr2: Array<number>,
    except?: string[],
    ignoreOrder?: boolean
  ): boolean {
    return this.utilitiesService.compareArrays(arr1, arr2, except, ignoreOrder);
  }

  deepClone(obj: { [key: string]: any }): { [key: string]: any } {
    return this.utilitiesService.deepClone(obj);
  }

  notificationStatus(status: number, enumValue: number): boolean {
    if (status === enumValue || status === enumValue) {
      return true;
    } else {
      return false;
    }
  }

  lines(str: string, tabName: string): string {
    const text = str;
    str = str ? str : '';
    switch (tabName) {
      case 'location': {
        this.from1900 = 29;
        this.from1800to1900 = 26;
        this.from1700to1800 = 25;
        this.from1600to1700 = 21;
        this.from1500to1600 = 17;
        this.from1400to1500 = 15;
        this.from1360to1400 = 16;
        this.from1300to1360 = 21;
        this.from1200to1300 = 17;
        this.from1140to1200 = 17;
        this.from1100to1140 = 21;
        this.from1020to1100 = 17;
        break;
      }
      case 'timing': {
        this.from1900 = 35;
        this.from1800to1900 = 35;
        this.from1700to1800 = 22;
        this.from1600to1700 = 18;
        this.from1500to1600 = 15;
        this.from1400to1500 = 15;
        this.from1360to1400 = 17;
        this.from1300to1360 = 22;
        this.from1200to1300 = 17;
        this.from1140to1200 = 15;
        this.from1100to1140 = 22;
        this.from1020to1100 = 17;
        break;
      }
      case 'quality': {
        this.from1900 = 29;
        this.from1800to1900 = 20;
        this.from1700to1800 = 18;
        this.from1600to1700 = 18;
        this.from1500to1600 = 16;
        this.from1400to1500 = 15;
        this.from1360to1400 = 15;
        this.from1300to1360 = 18;
        this.from1200to1300 = 16;
        this.from1140to1200 = 15;
        this.from1100to1140 = 18;
        this.from1020to1100 = 16;
        break;
      }
      case 'counterParty': {
        this.from1900 = 29;
        this.from1800to1900 = 29;
        this.from1700to1800 = 29;
        this.from1600to1700 = 29;
        this.from1500to1600 = 18;
        this.from1400to1500 = 16;
        this.from1360to1400 = 16;
        this.from1300to1360 = 29;
        this.from1200to1300 = 29;
        this.from1140to1200 = 18;
        this.from1100to1140 = 29;
        this.from1020to1100 = 18;
        break;
      }
      case 'sharePopup': {
        this.from1900 = 24;
        this.from1800to1900 = 24;
        this.from1700to1800 = 24;
        this.from1600to1700 = 24;
        this.from1500to1600 = 13;
        this.from1400to1500 = 11;
        this.from1360to1400 = 11;
        this.from1300to1360 = 24;
        this.from1200to1300 = 24;
        this.from1140to1200 = 13;
        this.from1100to1140 = 24;
        this.from1020to1100 = 13;
        break;
      }
      case 'companyName': {
        this.from1900 = 50;
        this.from1800to1900 = 45;
        this.from1700to1800 = 40;
        this.from1600to1700 = 40;
        this.from1500to1600 = 30;
        this.from1400to1500 = 30;
        this.from1360to1400 = 30;
        this.from1300to1360 = 40;
        this.from1200to1300 = 30;
        this.from1140to1200 = 30;
        this.from1100to1140 = 30;
        this.from1020to1100 = 30;
        break;
      }
      case 'creatorFullName': {
        this.from1900 = 50;
        this.from1800to1900 = 45;
        this.from1700to1800 = 40;
        this.from1600to1700 = 40;
        this.from1500to1600 = 30;
        this.from1400to1500 = 30;
        this.from1360to1400 = 30;
        this.from1300to1360 = 40;
        this.from1200to1300 = 30;
        this.from1140to1200 = 30;
        this.from1100to1140 = 30;
        this.from1020to1100 = 30;
        break;
      }
      case 'name': {
        this.from1900 = 50;
        this.from1800to1900 = 43;
        this.from1700to1800 = 38;
        this.from1600to1700 = 37;
        this.from1500to1600 = 28;
        this.from1400to1500 = 28;
        this.from1360to1400 = 28;
        this.from1300to1360 = 36;
        this.from1200to1300 = 28;
        this.from1140to1200 = 28;
        this.from1100to1140 = 28;
        this.from1020to1100 = 28;
        break;
      }
      case 'createdByName': {
        this.from1900 = 50;
        this.from1800to1900 = 45;
        this.from1700to1800 = 40;
        this.from1600to1700 = 40;
        this.from1500to1600 = 30;
        this.from1400to1500 = 30;
        this.from1360to1400 = 30;
        this.from1300to1360 = 40;
        this.from1200to1300 = 30;
        this.from1140to1200 = 30;
        this.from1100to1140 = 30;
        this.from1020to1100 = 30;
        break;
      }
    }
    if (window.innerWidth >= 1900 && str.length > this.from1900) {
      str = str.slice(0, this.from1900) + '...';
    } else if (
      window.innerWidth < 1900 &&
      window.innerWidth >= 1800 &&
      str.length > this.from1800to1900
    ) {
      str = str.slice(0, this.from1800to1900) + '...';
    } else if (
      window.innerWidth < 1800 &&
      window.innerWidth >= 1700 &&
      str.length > this.from1700to1800
    ) {
      str = str.replace('<br>', '');
      str = str.slice(0, this.from1700to1800) + '...';
    } else if (
      window.innerWidth < 1700 &&
      window.innerWidth >= 1600 &&
      str.length > this.from1600to1700
    ) {
      str = str.replace('<br>', '');
      str = str.slice(0, this.from1600to1700) + '...';
    } else if (
      window.innerWidth < 1600 &&
      window.innerWidth >= 1500 &&
      str.length > this.from1500to1600
    ) {
      str = str.replace('<br>', '');
      str = str.slice(0, this.from1500to1600) + '...';
    } else if (
      window.innerWidth < 1500 &&
      window.innerWidth >= 1400 &&
      str.length > this.from1400to1500
    ) {
      str = str.replace('<br>', '');
      str = str.slice(0, this.from1400to1500) + '...';
    } else if (
      window.innerWidth < 1400 &&
      window.innerWidth >= 1360 &&
      str.length > this.from1360to1400
    ) {
      str = str.replace('<br>', '');
      str = str.slice(0, this.from1360to1400) + '...';
    } else if (
      window.innerWidth < 1360 &&
      window.innerWidth >= 1300 &&
      str.length > this.from1300to1360
    ) {
      str = str.replace('<br>', '');
      str = str.slice(0, this.from1300to1360) + '...';
    } else if (
      window.innerWidth < 1300 &&
      window.innerWidth >= 1200 &&
      str.length > this.from1200to1300
    ) {
      str = str.replace('<br>', '');
      str = str.slice(0, this.from1200to1300) + '...';
    } else if (
      window.innerWidth < 1200 &&
      window.innerWidth >= 1140 &&
      str.length > this.from1140to1200
    ) {
      str = str.replace('<br>', '');
      str = str.slice(0, this.from1140to1200) + '...';
    } else if (
      window.innerWidth < 1140 &&
      window.innerWidth >= 1100 &&
      str.length > this.from1100to1140
    ) {
      str = str.replace('<br>', '');
      str = str.slice(0, this.from1100to1140) + '...';
    } else if (
      window.innerWidth < 1100 &&
      window.innerWidth >= 1020 &&
      str.length > this.from1020to1100
    ) {
      str = str.replace('<br>', '');
      str = str.slice(0, this.from1020to1100) + '...';
    }
    return str;
  }

  returnTabId(notificationsTypes: number[]): number {
    if (
      this.compareArrays(
        notificationsTypes,
        [DealAlertNotificationType.Todo],
        [],
        true
      ) ||
      this.compareArrays(
        notificationsTypes,
        [DealAlertNotificationType.Todo],
        [],
        true
      )
    ) {
      return 1;
    } else {
      return 0;
    }
  }

  addScroll(styleClass: string): void {
    jQuery(styleClass).scrollbar();
  }

  scrollToElem(className: string, x: number, y: number): void {
    const elem = document.querySelectorAll(className);
    if (elem[elem.length - 1]) {
      elem[elem.length - 1].scroll({
        left: x,
        top: y,
      });
    }
  }

  setIgnoreGuardSetting(bool: boolean): void {
    this.ignoreGuardChecking.next(bool);
  }
}
