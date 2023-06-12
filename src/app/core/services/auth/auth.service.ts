import { UserService } from '../../../private/services/user/user.service';
import { Injectable, Inject, Injector } from '@angular/core';
import { AuthorizationService } from '../../../http/authorization.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../../storage/local-storage.service';
// import { UserInfoViewModel } from '@tc/cha';
import { Router, NavigationExtras } from '@angular/router';

import { AUTH_API_URL } from './auth.url';
import { AuthorizationLocalStorageStrategy } from './authorizationLocalStorageStrategy';
import { LoginModel, UserClaimModel } from '../../infrastructure/models/shared';
import { ValidateCodeModel } from '../../infrastructure/models/shared/validate-code-model';
import { State, Store } from '../../../shared/store';
import { IResponse } from '../../infrastructure/interfaces';
import { Urls } from '../../infrastructure/enums';
import { LanguageService } from '../languages/language.service';
import { HelperService } from '../helper';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /* tslint:disable:variable-name */
  private readonly client_id: string = 'web_client';
  private readonly grant_type: string = 'password';
  private readonly client_secret: string = 'secret';
  /* tslint:enable:variable-name */
  // TODO Remove
  // private readonly scope: string = 'api openid';
  private readonly scope: string = 'api openid';
  // UserInfoSubject = new BehaviorSubject<UserInfoViewModel>(null);
  UserIdSubject = new BehaviorSubject<number | null>(null);
  TokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private authorizationService: AuthorizationService,
    @Inject('STRATEGY') private strategy: AuthorizationLocalStorageStrategy,
    private localStorage: LocalStorageService,
    private injector: Injector,
    private router: Router,
    private userService: UserService,
    private store: Store<State>,
    private helperService: HelperService
  ) {
    // this.UserInfoSubject.subscribe(newUserInfo => {
    //   if (newUserInfo) {
    //     if (newUserInfo.userId !== this.UserIdSubject.getValue()) {
    //       this.UserIdSubject.next(newUserInfo.userId);
    //     }
    //   }
    // });
  }

  login(
    loginModel: LoginModel
  ): Observable<{ error?: object; token?: string }> {
    this.helperService.setIgnoreGuardSetting(false);
    const username = loginModel.username;
    const password = loginModel.password;
    const credentials = {
      username: encodeURIComponent(username),
      password: encodeURIComponent(password),
    }
    return this.authorizationService.post(AUTH_API_URL.login, credentials, {
      headers: { 'Content-Type': 'application/json' },
      queryParams: {},
    });
  }

  logOut(navigationExtras: NavigationExtras): void {
    const languagesService = this.injector.get(LanguageService);
    languagesService.reset();
    this.localStorage.remove('access_token');
    this.localStorage.remove('id');
    this.store.update({ userClaims: Object.create(UserClaimModel) });
    this.TokenSubject.next(null);
    this.router.navigate([Urls.Login], navigationExtras);
  }

  getToken(): string {
    return this.strategy.getToken();
  }

  isAuthenticated(): boolean {
    return this.strategy.isAuthenticated();
  }

  private get accessToken(): string {
    return this.strategy.getToken();
  }

  // get currentUser(): Promise<object> {
  //   return this.userService.getCurrentUserClaims().toPromise();
  // }
  async currentUser(): Promise<object> {
    const userClaimResponse = await this.userService
      .getCurrentUserClaims()
      .toPromise();
    if (userClaimResponse && userClaimResponse.data) {
      return userClaimResponse.data as object;
    } else {
      throw new Error('User claims not found');
    }
  }

  checkUserToken(): void {
    if (this.TokenSubject.getValue() == null) {
      return;
    }
    if (!this.strategy.checkUserToken()) {
      this.logOut({});
      this.router.navigate([Urls.Login]);
    }
  }

  unlockAccount(userId: number, code: string): Observable<any> {
    return this.authorizationService.post(
      AUTH_API_URL.unlockUserAccount,
      new ValidateCodeModel(userId, code)
    );
  }

  resend(emailValue: string): Observable<any> {
    return this.authorizationService.post(AUTH_API_URL.resend, {
      email: emailValue,
    });
  }

  /* tslint:disable:max-line-length */
  // TODO for SSO
  // login(url: string): void {
  //   console.log(`http://localhost:4201/login?client_id=${encodeURIComponent(this.client_id)}&scope=${encodeURIComponent(this.scope)}&redirectUrl=http://localhost:4202${encodeURIComponent('/sso-redirection')}?&intermediateUrl=${encodeURIComponent(url)}`);
  // //  window.location.replace(`http://localhost:4201/login?client_id=${encodeURIComponent(this.client_id)}&scope=${encodeURIComponent(this.scope)}&redirectUrl=http://localhost:4202${encodeURIComponent('/sso-redirection')}${encodeURIComponent('?')}intermediateUrl=${encodeURIComponent(url)}`);
  //   window.location.replace(`http://localhost:4201/login?client_id=${encodeURIComponent(this.client_id)}&scope=${encodeURIComponent(this.scope)}&redirectUrl=http://localhost:4202${encodeURIComponent('/sso-redirection')}${encodeURIComponent(url)}`);
  // }

  // TODO for SSO
  // logout(navigationExtras): void {
  //   localStorage.removeItem('access_token');
  //   window.location.replace(`http://localhost:4201/login?client_id=${this.client_id}&scope=${this.scope}&redirectUrl=http://localhost:4202${navigationExtras.queryParams.redirectUrl}`);
  // }
  /* tslint:enable:max-line-length */
}
