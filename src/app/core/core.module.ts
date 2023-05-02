import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '../shared/store/store.module';
import { initialState } from '../shared/store';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forRoot(initialState)],
  exports: [StoreModule],
})
export class CoreModule {}
