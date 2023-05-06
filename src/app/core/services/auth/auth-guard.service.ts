import { Inject, Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  NavigationExtras,
  Router,
} from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { AuthorizationLocalStorageStrategy } from './authorizationLocalStorageStrategy';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    protected router: Router,
    private authService: AuthService,
    @Inject('STRATEGY') private strategy: AuthorizationLocalStorageStrategy
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (state.url !== '/login' && !this.strategy.isAuthenticated()) {
      const navigationExtras: NavigationExtras = {
        queryParams: { redirectUrl: state.url },
      };
      this.authService.logOut(navigationExtras);
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
