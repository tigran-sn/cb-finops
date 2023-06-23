import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  NavigationExtras,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from './auth.service';
import { Urls } from '../../infrastructure/enums';

@Injectable()
export class AuthPublicGuardService implements CanActivate, CanActivateChild {
  constructor(protected router: Router, protected authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      const navigationExtras: NavigationExtras = {
        queryParams: { redirectUrl: state.url },
      };
      const queryParams =
        navigationExtras.queryParams?.['redirectUrl'].split('redirectUrl=')[1];
      const navUrl = navigationExtras.queryParams?.['redirectUrl']
        ? queryParams
          ? queryParams
          : Urls.Reports
        : Urls.Reports;
      this.router.navigateByUrl(decodeURIComponent(navUrl));
      return false;
    }
    return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }
}
