import { NgModule, ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from './shared/shared.module';
import { DialogService } from './shared/services'
import { CoreModule } from './core/core.module';

export function initializeDialogService() {
  return () => {
    inject(DialogService)
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    {
      provide: ENVIRONMENT_INITIALIZER,
      useFactory: initializeDialogService,
      deps: [MatDialog],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
