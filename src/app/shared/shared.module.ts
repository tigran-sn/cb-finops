import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { LogoComponent } from './components/logo/logo.component';
import { GetFirstErrorPipe } from './pipes';
import { FilterComponent } from './components/filter/filter.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CustomSnackbarComponent } from './components/custom-snackbar/custom-snackbar.component';
import { ConfirmDialogBasicComponent } from './components/confirm-dialog-basic/confirm-dialog-basic.component';

const COMPONENTS = [
  NotFoundComponent,
  LogoComponent,
  FilterComponent,
  HeaderComponent,
  FooterComponent,
  CustomSnackbarComponent,
  ConfirmDialogBasicComponent,
];

const PIPES = [GetFirstErrorPipe];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
  ],
  providers: [DatePipe],
})
export class SharedModule {}
