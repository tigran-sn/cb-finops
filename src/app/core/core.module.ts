import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { HttpModule } from '../http';
import { StorageModule } from '../storage/storage.module';
import { throwIfAlreadyLoaded } from './module-import.guard';
import { StoreModule } from '../shared/store/store.module';
import { initialState } from '../shared/store';
import { environment } from '../../environments/environment';
import { AuthorizationLocalStorageStrategy } from './services/auth/authorizationLocalStorageStrategy';
import { HelperService } from './services/helper';
import { Environment } from './infrastructure/models';
// import { PasswordSetupGuard, PasswordSetupService } from './services';
import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(initialState),
    StorageModule.forRoot({
      localStorage: { prefix: 'cba', suppressWarnings: false },
      cookies: { expirationDate: null },
    }),
    HttpModule.forRoot({
      baseUrl: environment.apiUrl,
      authUrl: environment.identityServerUrl,
      strategy: AuthorizationLocalStorageStrategy,
    }),
    UtilitiesModule,
  ],
  exports: [StoreModule, StorageModule, HttpModule, UtilitiesModule],
  providers: [
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: null },
    { provide: Environment, useValue: environment },
    HelperService,
    // PasswordSetupGuard,
    // PasswordSetupService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
