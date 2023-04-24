import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { LoginModel } from 'src/app/core/infrastructure/models/shared';

@Component({
  template: '',
})
export class LoginBaseComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  // form: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  login(loginModel: LoginModel): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
