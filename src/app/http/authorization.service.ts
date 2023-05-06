import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorizationStrategy, Config } from './interfaces';

@Injectable()
export class AuthorizationService extends HttpService {
  protected get baseUrl() {
    return this.config.authUrl || this.config.baseUrl;
  }
}

export function thirdPartyAPIFactory(
  http: HttpClient,
  config: Config,
  strategy: AuthorizationStrategy,
  baseUrl: string
): HttpService {
  return new HttpService(http, { ...config, baseUrl }, strategy);
}

export function httpFactory(
  http: HttpClient,
  config: Config,
  strategy: AuthorizationStrategy
) {
  return new HttpService(http, config, strategy);
}

export function authFactory(
  http: HttpClient,
  config: Config,
  strategy: AuthorizationStrategy
) {
  return new AuthorizationService(http, config, strategy);
}
