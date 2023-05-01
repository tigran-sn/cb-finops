import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { SentReportsComponent } from './components/sent-reports/sent-reports.component';
import { SummaryComponent } from './components/summary/summary.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    canActivateChild: [],
    children: [
      {
        path: '',
        redirectTo: 'reports',
        pathMatch: 'full',
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./components/reports/reports.module').then(
            (m) => m.ReportsModule
          ),
      },
      {
        path: 'sent-reports',
        component: SentReportsComponent,
      },
      {
        path: 'summary',
        component: SummaryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
