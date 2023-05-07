import { Inject, Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  Router,
  NavigationExtras,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IResponse } from '../../../core/infrastructure/interfaces';
import { UserClaimModel } from '../../../core/infrastructure/models/shared';
import { State, Store } from '../../../shared/store';
import { UserService } from '../user';
import { Urls } from '../../../core/infrastructure/enums';
import { AuthService } from '../../../core/services/auth';

@Injectable()
export class TermsAndConditionsGuard implements CanLoad {
  constructor(
    private router: Router,
    private store: Store<State>,
    private userService: UserService,
    private authService: AuthService
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated()) {
      const navigationExtras: NavigationExtras = {
        queryParams: { redirectUrl: window.location.pathname },
      };
      this.authService.logOut(navigationExtras);
      return false;
    }
    return this.checkUserClaims().pipe(
      tap((hasAccess) => {
        if (!hasAccess) {
          this.router.navigate([Urls.Home]);
        }
      })
    );
  }

  private getCurrentUserClaims(): Observable<boolean> {
    return this.userService.getCurrentUserClaims().pipe(
      map((e: IResponse<UserClaimModel>) => {
        if (e.success && e.data && e.data.menuItems.length) {
          this.store.update({ userClaims: e.data });
        }
        if (e.data.isTCConditionsAccepted) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  checkUserClaims(): Observable<boolean> {
    const { userClaims } = this.store.getState();
    if (userClaims && userClaims.isTCConditionsAccepted) {
      return of(true);
    } else if (userClaims && userClaims.isTCConditionsAccepted === false) {
      return of(false);
    } else {
      return this.getCurrentUserClaims();
    }
  }
}
