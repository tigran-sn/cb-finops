import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepotsComponent } from './reports.component';
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
