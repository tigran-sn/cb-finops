import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../core/services/auth';
import { PrivateComponent } from './private.component';
import { SummaryComponent } from './components/summary/summary.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    canActivateChild: [AuthGuardService],
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
        path: 'summary',
        component: SummaryComponent,
        // canActivate: [PermissionsGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
