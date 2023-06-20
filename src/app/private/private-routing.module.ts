import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateResolverService } from './services';
import { AuthGuardService } from '../core/services';
import { PrivateComponent } from './private.component';
import { SummaryComponent } from './components/summary/summary.component';
import { PermissionsGuard } from './services/guard';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    canActivateChild: [AuthGuardService],
    resolve: {
      userClaimsData: PrivateResolverService
    },
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
        // canActivate: [PermissionsGuard],
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
