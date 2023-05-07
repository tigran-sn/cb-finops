import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { SharedModule } from '../shared/shared.module';
import { PrivateRoutingModule } from './private-routing.module';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SummaryComponent } from './components/summary/summary.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { PermissionsGuard } from './services/guard';

@NgModule({
  declarations: [
    PrivateComponent,
    BreadcrumbsComponent,
    NavigationComponent,
    SummaryComponent,
    EditDialogComponent,
  ],
  imports: [CommonModule, SharedModule, PrivateRoutingModule],
  providers: [PermissionsGuard],
})
export class PrivateModule {}
