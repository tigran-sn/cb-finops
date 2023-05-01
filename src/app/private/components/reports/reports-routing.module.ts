import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepotsComponent } from './reports.component';
import { FilledReportsComponent } from './filled-reports/filled-reports.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RepotsComponent,
      },
      {
        path: 'filled-reports',
        component: FilledReportsComponent,
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
