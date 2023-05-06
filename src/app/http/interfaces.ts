import { InjectionToken } from '@angular/core';

export interface Config {
  strategy: StrategyType;
  baseUrl?: string;
  authUrl?: string;
  thirdPartyAPIs?: { token: string | InjectionToken<any>; url: string }[];
}

interface KeyValue {
  [key: string]: any;
}

export interface Options extends KeyValue {
  headers?: KeyValue;
  queryParams?: KeyValue;
}

export interface AuthorizationStrategy {
  isAuthenticated(): boolean;
  getToken(): string;
  onUnAuthorized(): void;
}

export interface StrategyType {
  new (...deps: any[]): AuthorizationStrategy;
}

export interface ServerResponse<T> {
  success: boolean;
  data: T;
  error: { displayMessage: string };
  message: string;
}
