import { Injectable, Inject } from '@angular/core';
import { StorageConfig } from './config.interface';
import { STORAGE_CONFIG_TOKEN } from './constants';

@Injectable()
export class CookieService {

  constructor(@Inject(STORAGE_CONFIG_TOKEN) private config: StorageConfig) { }

  private get expirationDate() {
    return this.config.cookies.expirationDate;
  }

  set(name: string, value: string | number | boolean, expiration: Date = this.expirationDate) {
    const expires = `expires=${expiration.toUTCString()}`;
    window.document.cookie = `${name}=${value.toString()};${expires};path=/`;
  }

  get(cookieName: string): string {
    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  has(cookieName: string): boolean {
    return !!this.get(cookieName);
  }

  remove(cookieName: string): void {
    this.set(cookieName, '', new Date(0));
  }
}
