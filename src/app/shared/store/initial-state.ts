import { Languages } from 'src/app/core/infrastructure/enums';
import { State } from './state';
import { AdminModel, UserClaimModel } from '../../core/infrastructure/models';
// import { OperatorEnum } from '../../core/infrastructure/enums';

export const initialState: State = {
  userClaims: Object.create(UserClaimModel),
  showLoader: false,
  cleanProfilePicture: false,
  isSaveChangesPopupOpen: false,
  showPopup: false,
  // showSharingPopup: false,
  errorMessage: '',
  errorPageData: '',
  successMessage: '',
  showErrorPageButton: false,
  showLeftMenu: false,
  showNoAvailableActionPopup: false,
  showNoAccessMenuPopup: false,
  currentPageNotAccessible: false,
  disableSubmit: false,
  // showTemplatePopup: false,
  needUpdatePermissions: false,
  // needUpdateOperator: false,
  needCloseSignalr: false,
  // firstAdmin: Object.create(AdminModel),
  showErrorComponent: false,
  expiredLinkButtonText: '',
  resetPasswordEmail: '',
  // createNewVersion: false,
  // showUserListPopup: false,
  // operator: null,
  actionId: 0,
  // dealId: 1,
  language: Languages.English,
  loginHereButtonText: '',
  resendLinkButtonText: '',
  // thirdPartyIntegrations: [],
};
