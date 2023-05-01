import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';

import { RepotsComponent } from './reports.component';
import { FilledReportsComponent } from './filled-reports/filled-reports.component';
import { SentReportsComponent } from './sent-reports/sent-reports.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    RepotsComponent,
    FilledReportsComponent,
    SentReportsComponent,
    DetailsComponent,
  ],
  imports: [CommonModule, ReportsRoutingModule, SharedModule],
})
export class ReportsModule {}
