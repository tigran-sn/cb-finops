import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, delay, takeUntil } from 'rxjs';

import { Store, State } from './shared/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  showLoader$: Observable<boolean>;
  title = 'Financial Operations';

  constructor(private store: Store<State>) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.showLoader$ = this.store
      .select((state: State) => state.showLoader)
      .pipe(takeUntil(this.destroy$), delay(0));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
