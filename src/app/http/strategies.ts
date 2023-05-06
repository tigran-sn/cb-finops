import { AuthorizationStrategy } from './interfaces';

export class LocalStorageStrategy implements AuthorizationStrategy {
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string {
    return <string>window.localStorage.getItem('token');
  }

  onUnAuthorized(): void {
    window.localStorage.removeItem('token');
  }
}

export class NoopStrategy implements AuthorizationStrategy {
  isAuthenticated() {
    return false;
  }

  getToken() {
    return '';
  }

  onUnAuthorized() {}
}
