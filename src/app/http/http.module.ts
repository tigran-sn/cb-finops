import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { Config } from './interfaces';
import { LocalStorageStrategy } from './strategies';
import { HttpService } from './http.service';
import { UnAuthInterceptor } from './http.interceptor';
import {
  AuthorizationService,
  thirdPartyAPIFactory,
  httpFactory,
} from './authorization.service';
import { authFactory } from './authorization.service';

const defaultConfig: Config = {
  strategy: LocalStorageStrategy,
  baseUrl: '',
  authUrl: '',
};

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  exports: [],
})
export class HttpModule {
  static forRoot(
    config: Config = defaultConfig
  ): ModuleWithProviders<HttpModule> {
    return {
      ngModule: HttpModule,
      providers: [
        {
          provide: HttpService,
          useFactory: httpFactory,
          deps: [HttpClient, 'CONFIG', 'STRATEGY'],
        },
        {
          provide: AuthorizationService,
          useFactory: authFactory,
          deps: [HttpClient, 'CONFIG', 'STRATEGY'],
        },
        { provide: 'CONFIG', useValue: config },

        { provide: 'STRATEGY', useClass: config.strategy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UnAuthInterceptor,
          multi: true,
        },
      ],
    };
  }

  static forChild() {
    return HttpModule;
  }
}
