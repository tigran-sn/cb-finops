import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';

@Injectable()
export class Store<T extends any> {
  private static instance: Store<any> = null;
  /* tslint:disable:variable-name */
  private _store: BehaviorSubject<T>;
  private _history: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private _changes: Subject<string> = new Subject();

  /* tslint:enable:variable-name */

  constructor(private initialState: T) {
    this._store = new BehaviorSubject(initialState);
    this._store
      .pipe(scan((acc, cur) => [...acc, cur], []))
      .subscribe(this._history);
  }

  static getInstance<T extends any>(initialState: any = {}): Store<T> {
    if (Store.instance === null) {
      Store.instance = new Store(initialState);
    }
    return Store.instance;
  }

  get changes(): Observable<string> {
    return this._changes.asObservable();
  }

  getState(): T {
    return this._store.getValue();
  }

  getHistory(): T[] {
    return this._history.getValue();
  }

  update(updater: ((prevState: T) => Partial<T>) | Partial<T>): void {
    const prevState = this.getState();
    const newPartialState =
      typeof updater === 'function'
        ? (updater(prevState) as object)
        : (updater as object);
    const keys = Object.keys(newPartialState);
    const temporaryState = { ...(prevState as unknown as object) };
    const newState = { ...temporaryState, ...newPartialState } as T;
    this._store.next(newState);
    keys.forEach((key) => this._changes.next(key));
  }

  select<M>(mapper: (prevState: T) => M): Observable<M> {
    return this._store.pipe(map(mapper));
  }

  reset(): void {
    this._store.next(this.initialState);
  }

  undo(): void {
    const history = this.getHistory();
    const prevState = history[history.length - 2];
    this.update(prevState);
  }

  rewind(steps: number): void {
    const history = this.getHistory();
    const prevState = history[history.length - (steps + 1)];
    if (prevState) {
      this.update(prevState);
    }
  }
}
