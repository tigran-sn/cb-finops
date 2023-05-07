import { LanguageService } from 'src/app/core/services/languages';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';

import { State, Store } from '../../../shared/store';
import { UserService } from '../user';
import { IResponse } from '../../../core/infrastructure/interfaces';
import { UserClaimModel } from '../../../core/infrastructure/models/shared';
import { ActionPathsConst } from '../../../core/consts';
import { PermissionType, Urls } from '../../../core/infrastructure/enums';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<State>,
    private userService: UserService,
    private languageService: LanguageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkUserPermissions(next, state);
  }

  private checkUserPermissions(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const { userClaims } = this.store.getState();
    // const { showNoAccessMenuPopup } = this.store.getState();
    // if (!showNoAccessMenuPopup) {
    if (userClaims && userClaims.actions && userClaims.actions.length) {
      return this.checkActionId(next, state, userClaims);
    } else {
      return this.getCurrentUserClaims(next, state);
    }
    // } else {
    //   return of(false);
    // }
  }

  private getCurrentUserClaims(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.getCurrentUserClaims().pipe(
      map((res: IResponse<UserClaimModel>) => {
        if (res.success) {
          if (res.success && res.data && res.data?.menuItems.length) {
            this.store.update({ userClaims: res.data });
          }
          return this.checkActionId(next, state, res.data);
        } else {
          this.store.update({
            showLoader: false,
            showErrorPageButton: true,
            errorMessage:
              this.languageService.getTranslation('NoPermissionError'),
          });
          this.router.navigate([Urls.UserError]);
          return of(false);
        }
      }),
      mergeAll()
    );
  }

  private checkActionId(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    userClaims: UserClaimModel
  ): Observable<boolean> {
    let id = 0;
    ActionPathsConst.forEach((action) => {
      if (next.routeConfig?.path === action.name) {
        id = action.id;
        return;
      }
    });
    if (
      userClaims.actions.some(
        (el) =>
          el.action === id &&
          el.permissionType !== PermissionType.NoAccess &&
          // check if the page is in edit mode
          ((!state.url.includes('edit') && !state.url.includes('create')) ||
            el.permissionType === PermissionType.FullAccess)
      )
    ) {
      return of(true);
    } else {
      this.store.update({
        showLoader: false,
        showErrorPageButton: true,
        errorMessage: this.languageService.getTranslation('NoPermissionError'),
      });
      this.router.navigate([Urls.UserError]);
      return of(false);
    }
    return of(true);
  }
}
