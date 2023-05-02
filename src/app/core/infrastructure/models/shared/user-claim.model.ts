import { IMenu, IPermission, IAdmin } from '../../interfaces';

export class UserClaimModel {
  actions: Array<IPermission> = [];
  culture: string;
  email: string;
  firstName: string;
  id: number;
  isTCConditionsAccepted: boolean;
  lastName: string;
  menuItems: Array<IMenu> = [];
  middleName: string;
  picture?: { path: string };
  mc?: string;
}
