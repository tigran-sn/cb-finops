import { HelperService } from 'src/app/core/services';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Store, State } from 'src/app/shared/store';
import { IFormsCompare } from '../../../core/infrastructure/interfaces';
import { take } from 'rxjs/operators';

@Injectable()
export class DiscardChangesGuard implements CanDeactivate<IFormsCompare> {
  constructor(
    private helperService: HelperService,
    private store: Store<State>
  ) {}

  canDeactivate(
    component: IFormsCompare
  ): Subject<boolean> | boolean | Promise<boolean> | Observable<boolean> {
    let ignoreGuardChecking = false;
    this.helperService.ignoreGuardChecking.pipe(take(1)).subscribe((res) => {
      ignoreGuardChecking = res;
    });
    if (ignoreGuardChecking) {
      return true;
    }
    const { isSaveChangesPopupOpen } = this.store.getState();
    const { showErrorComponent } = this.store.getState();
    if (showErrorComponent) {
      this.store.update({ isSaveChangesPopupOpen: false });
      return true;
    } else {
      for (let i = 0; i < component.formArray.length; i++) {
        if (
          !this.helperService.deepCompare(
            component.formArray[i].value,
            component.initialFormArray[i]
          ) &&
          !isSaveChangesPopupOpen
        ) {
          this.store.update({ isSaveChangesPopupOpen: true });
          return false;
        }
      }
      this.store.update({ isSaveChangesPopupOpen: false });
      return true;
    }
  }
}
