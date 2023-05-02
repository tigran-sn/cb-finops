import {
  ModuleWithProviders,
  NgModule,
  Inject,
  InjectionToken,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from './store.service';

export function storeFactory<T>(initialState: T): Store<T> {
  return Store.getInstance(initialState);
}

export const INITIAL_STATE = new InjectionToken<any>('initialState');

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class StoreModule {
  static forRoot(initialState: any): ModuleWithProviders<StoreModule> {
    return {
      ngModule: StoreModule,
      providers: [
        { provide: 'INITIAL_STATE', useValue: initialState },
        {
          provide: Store,
          useFactory: storeFactory,
          deps: ['INITIAL_STATE'],
        },
      ],
    };
  }

  static forChild(): StoreModule {
    return StoreModule;
  }
}
