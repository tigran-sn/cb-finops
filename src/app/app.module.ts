import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  ENVIRONMENT_INITIALIZER,
  inject,
  ApplicationModule,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import {
  AuthGuardService,
  AuthPublicGuardService,
  AuthService,
  LanguageInterceptorService,
  LanguageService,
} from './core/services';
import { DialogService } from './shared/services';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
  // TODO Need to be FixedSizeVirtualScrollStrategy, this is a solution for building
  // return new TranslateHttpLoader(http, './assets/i18n', '.json');
}

export function initializeDialogService() {
  return () => {
    inject(DialogService);
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    ApplicationModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // FormsModule,
    CoreModule,
    SharedModule,
    // HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: ENVIRONMENT_INITIALIZER,
      useFactory: initializeDialogService,
      deps: [MatDialog],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptorService,
      multi: true,
    },
    AuthGuardService,
    AuthPublicGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
