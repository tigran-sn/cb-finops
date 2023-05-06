import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Config, Options, AuthorizationStrategy } from './interfaces';

const defaultOptions = {
  headers: {},
  queryParams: {},
};

// @dynamic
@Injectable()
export class HttpService {
  constructor(
    private http: HttpClient,
    @Inject('CONFIG') protected config: Config,
    @Inject('STRATEGY') private strategy: AuthorizationStrategy
  ) {}

  protected get baseUrl() {
    return this.config.baseUrl;
  }

  private get token() {
    return this.strategy.getToken();
  }

  private get headers() {
    let headers = new HttpHeaders();
    if (this.strategy.isAuthenticated()) {
      headers = headers.append('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }

  private buildHeaders(
    hdrs: { [key: string]: string } | undefined
  ): HttpHeaders {
    let headers = this.headers;
    for (const hdr in hdrs) {
      if (hdrs.hasOwnProperty(hdr)) {
        headers = headers.append(hdr, hdrs[hdr]);
      }
    }
    return headers;
  }

  private buildUrl(url: string, queryParams: any): string {
    const finalUrl = this.baseUrl + url;
    const queryArray: string[] = [];
    for (const q in queryParams) {
      if (queryParams.hasOwnProperty(q)) {
        queryArray.push(`${q}=${queryParams[q]}`);
      }
    }
    const query = queryArray.length ? '?' + queryArray.join('&') : '';
    return finalUrl + query;
  }

  get<T extends any>(
    url: string,
    options: Options = defaultOptions
  ): Observable<T> {
    return this.http.get<T>(this.buildUrl(url, options.queryParams), {
      ...options,
      headers: this.buildHeaders(options.headers),
    });
  }

  post<T extends any>(
    url: string,
    data: any,
    options: Options = defaultOptions
  ): Observable<T> {
    return this.http.post<T>(this.buildUrl(url, options.queryParams), data, {
      ...options,
      headers: this.buildHeaders(options.headers),
    });
  }

  put<T extends any>(
    url: string,
    data: any,
    options: Options = defaultOptions
  ): Observable<T> {
    return this.http.put<T>(this.buildUrl(url, options.queryParams), data, {
      ...options,
      headers: this.buildHeaders(options.headers),
    });
  }

  patch<T extends any>(
    url: string,
    data: any,
    options: Options = defaultOptions
  ): Observable<T> {
    return this.http.patch<T>(this.buildUrl(url, options.queryParams), data, {
      ...options,
      headers: this.buildHeaders(options.headers),
    });
  }

  delete<T extends any>(
    url: string,
    options: Options = defaultOptions
  ): Observable<T> {
    return this.http.delete<T>(this.buildUrl(url, options.queryParams), {
      ...options,
      headers: this.buildHeaders(options.headers),
    });
  }
}
