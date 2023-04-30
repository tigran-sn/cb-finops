import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { SharedModule } from '../shared/shared.module';
import { RepotsComponent } from './components/reports/reports.component';
import { PrivateRoutingModule } from './private-routing.module';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FilledReportsComponent } from './components/filled-reports/filled-reports.component';
import { SentReportsComponent } from './components/sent-reports/sent-reports.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SummaryComponent } from './components/summary/summary.component';
import { FilterComponent } from './components/filter/filter.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    PrivateComponent,
    RepotsComponent,
    BreadcrumbsComponent,
    FilledReportsComponent,
    SentReportsComponent,
    HeaderComponent,
    NavigationComponent,
    SummaryComponent,
    FilterComponent,
    EditDialogComponent,
  ],
  imports: [CommonModule, SharedModule, PrivateRoutingModule],
})
export class PrivateModule {}
