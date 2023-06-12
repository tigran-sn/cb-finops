import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';

import { RepotsComponent } from './reports.component';
import { FilledReportsComponent } from './filled-reports/filled-reports.component';
import { SentReportsComponent } from './sent-reports/sent-reports.component';
import { DetailsComponent } from './details/details.component';
import { CreateReportButtonComponent } from '../create-report-button/create-report-button.component';
import { ReportsService } from '../../services';
import {LookupsService} from "../../services/lookups/lookups.service";

@NgModule({
  declarations: [
    RepotsComponent,
    FilledReportsComponent,
    SentReportsComponent,
    DetailsComponent,
    CreateReportButtonComponent,
  ],
  imports: [CommonModule, ReportsRoutingModule, SharedModule],
  providers: [ReportsService, LookupsService],
})
export class ReportsModule {}
