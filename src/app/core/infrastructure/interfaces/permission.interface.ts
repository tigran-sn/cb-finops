import { ActionTypeEnum, PermissionType } from '../enums';

export interface IPermission {
  action: ActionTypeEnum;
  permissionType?: PermissionType;
}
