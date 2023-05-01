import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PublicComponent } from './public.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { PublicRoutingModule } from './public-routing.module';
import { LoginBaseComponent } from './components/login-base/login-base.component';

@NgModule({
  declarations: [PublicComponent, LoginComponent, LoginBaseComponent],
  imports: [CommonModule, SharedModule, PublicRoutingModule, TranslateModule],
  exports: [PublicComponent],
})
export class PublicModule {}
