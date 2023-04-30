import { ModuleWithProviders, NgModule, InjectionToken } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { CookieService } from './cookie.service';
import { StorageConfig } from './config.interface';
import { STORAGE_CONFIG_TOKEN } from './constants';

const defaultConfig: StorageConfig = {
  cookies: {
    expirationDate: null,
  },
  localStorage: {
    prefix: 'default',
    suppressWarnings: false,
  },
};

// export const STORAGE_CONFIG_TOKEN = new InjectionToken('STORAGE_CONFIG');

export function localStorageFactory(config: StorageConfig) {
  return new LocalStorageService(config);
}

export function cookieStorageFactory(config: StorageConfig) {
  return new CookieService(config);
}

@NgModule({
  declarations: [],
  imports: [
  ],
  exports: []
})
export class StorageModule {
  static forRoot(config = defaultConfig): ModuleWithProviders<StorageModule> {
    return {
      ngModule: StorageModule,
      providers: [
        {
          provide: STORAGE_CONFIG_TOKEN,
          useValue: config,
        },
        {
          provide: LocalStorageService,
          useFactory: localStorageFactory,
          deps: [STORAGE_CONFIG_TOKEN],
        },
        {
          provide: CookieService,
          useFactory: cookieStorageFactory,
          deps: [STORAGE_CONFIG_TOKEN],
        },
      ],
    };
  }

  static forChild() {
    return StorageModule;
  }
}
