import { AuthorizationStrategy } from '../../../http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../../storage/local-storage.service';

@Injectable()
export class AuthorizationLocalStorageStrategy
  implements AuthorizationStrategy
{
  constructor(
    private jwtHelperService: JwtHelperService,
    private localStorage: LocalStorageService
  ) {}

  isAuthenticated(): boolean {
    try {
      const token = this.getToken();
      return !this.jwtHelperService.isTokenExpired(token);
    } catch (err) {
      return false;
    }
  }

  getToken(): string {
    return this.localStorage.get('access_token').toString();
  }

  onUnAuthorized(): void {}
  checkUserToken(): boolean {
    const token = this.localStorage.get('access_token').toString();
    if (token) {
      const decodedToken = this.jwtHelperService.decodeToken(token);
      const expired = decodedToken.exp;
      const currentTimestamp = new Date().getTime() / 1000;

      if (currentTimestamp > expired) {
        return false;
      } else {
        return true;
      }
    } else if (!token && window.location.pathname !== '/login') {
      return false;
    }
    return false;
  }
}
