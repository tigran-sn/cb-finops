import { UserClaimModel } from '../../core/infrastructure/models';
import { IAdmin } from 'src/app/core/infrastructure/interfaces';
import { ActionTypeEnum } from '../../core/infrastructure/enums';

export interface State {
  userClaims: UserClaimModel;
  showLoader: boolean;
  cleanProfilePicture: boolean;
  isSaveChangesPopupOpen: boolean;
  showPopup: boolean;
  // showSharingPopup: boolean;
  errorMessage: string;
  errorPageData: string;
  successMessage: string;
  showErrorPageButton: boolean;
  showLeftMenu: boolean;
  showNoAvailableActionPopup: boolean;
  showNoAccessMenuPopup: boolean;
  currentPageNotAccessible: boolean;
  disableSubmit: boolean;
  previousRoute?: string;
  // showTemplatePopup?: boolean;
  needUpdatePermissions: boolean;
  // needUpdateOperator: boolean;
  needCloseSignalr: boolean;
  // firstAdmin: IAdmin;
  showErrorComponent: boolean;
  expiredLinkButtonText: string;
  resetPasswordEmail: string;
  // createNewVersion: boolean;
  // showUserListPopup: boolean;
  // operator: OperatorEnum | null;
  actionId: ActionTypeEnum;
  // dealId: number;
  language: string;
  loginHereButtonText: string;
  resendLinkButtonText: string;
  // thirdPartyIntegrations: DealParticipantThirdPartyIntegrations[];
}
