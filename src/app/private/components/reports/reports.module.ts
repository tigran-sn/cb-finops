import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';

import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule, ReportsRoutingModule],
})
export class ReportsModule {}
