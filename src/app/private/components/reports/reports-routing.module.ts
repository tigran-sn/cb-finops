import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { FilledReportsComponent } from './filled-reports/filled-reports.component';
import { SentReportsComponent } from './sent-reports/sent-reports.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ReportsComponent,
      },
      {
        path: 'filled-reports',
        component: FilledReportsComponent,
      },
      {
        path: 'sent-reports',
        component: SentReportsComponent,
      },
      {
        path: 'create',
        component: DetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
