import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../user';
import { UserClaimModel } from '../../../core/infrastructure/models';
import { State, Store } from '../../../shared/store';

@Injectable()
export class PrivateResolverService implements Resolve<UserClaimModel> {
  constructor(private userService: UserService, private store: Store<State>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserClaimModel> {
    return this.checkUserClaims();
  }

  checkUserClaims(): Observable<UserClaimModel> {
    const { userClaims } = this.store.getState();
    if (userClaims && userClaims.menuItems && userClaims.menuItems.length) {
      return of(userClaims);
    } else {
      return this.userService
        .getCurrentUserClaims()
        .pipe(map((res) => res.data));
    }
  }
}
