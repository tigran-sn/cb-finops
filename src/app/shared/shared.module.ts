import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { LogoComponent } from './components/logo/logo.component';
import { GetFirstErrorPipe } from './pipes';
import { FilterComponent } from './components/filter/filter.component';
import { HeaderComponent } from './components/header/header.component';

const COMPONENTS = [
  NotFoundComponent,
  LogoComponent,
  FilterComponent,
  HeaderComponent,
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
})
export class SharedModule {}
