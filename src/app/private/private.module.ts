import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { SharedModule } from '../shared/shared.module';
import { PrivateRoutingModule } from './private-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SummaryComponent } from './components/summary/summary.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { PermissionsGuard } from './services/guard';
import {SummaryService} from "./services/summary";
import {PrivateResolverService} from "./services";

@NgModule({
  declarations: [
    PrivateComponent,
    NavigationComponent,
    SummaryComponent,
    EditDialogComponent,
  ],
  imports: [CommonModule, SharedModule, PrivateRoutingModule],
  providers: [PermissionsGuard, SummaryService, PrivateResolverService],
})
export class PrivateModule {}
