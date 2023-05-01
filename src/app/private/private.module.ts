import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { SharedModule } from '../shared/shared.module';
import { PrivateRoutingModule } from './private-routing.module';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SummaryComponent } from './components/summary/summary.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    PrivateComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    NavigationComponent,
    SummaryComponent,
    EditDialogComponent,
  ],
  imports: [CommonModule, SharedModule, PrivateRoutingModule],
})
export class PrivateModule {}
