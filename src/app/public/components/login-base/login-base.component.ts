import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocalStorageService } from '../../../storage/local-storage.service';

import { AuthService } from '../../../core/services/auth';
import { LoginModel } from '../../../core/infrastructure/models/shared';
import { State, Store } from '../../../shared/store';
// import { NotificationService } from '../../core/services';
// import { ValidationMessages } from '../../core/infrastructure/interfaces/profile';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomSnackbarService } from "../../../shared/services";

@Component({
  template: '',
})
export class LoginBaseComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  form: FormGroup;
  // validationMessages: ValidationMessages = {};

  constructor(
    protected authService: AuthService,
    protected localStorage: LocalStorageService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected customSnackbarService: CustomSnackbarService // protected notificationService: NotificationService,
  ) {}

  ngOnInit() {}

  login(loginModel: LoginModel): void {
    this.authService.login(loginModel).subscribe({
      next: (res) => {
        if (!res.error) {
          const jwtHelper: JwtHelperService = new JwtHelperService();
          const decodedToken = jwtHelper.decodeToken(
            res.token as string
          );
          // this.localStorage.set('language', 'hy');
          this.localStorage.set('access_token', res.token);
          this.localStorage.set('id', this.form.value.username);

          this.authService.TokenSubject.next('Bearer ' + res.token);

          this.activatedRoute.queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe((queryParam: { [key: string]: any }) => {
              this.store.update({ showLoader: false });
              const navUrl = queryParam['redirectUrl']
                ? queryParam['redirectUrl']
                : '/reports';
              this.router.navigateByUrl(decodeURIComponent(navUrl));
            });
        }
      },
      error: (err) => {
        this.customSnackbarService.openSnackbar(err.error.message, 'error');
        this.authService.logOut({});
        this.store.update({ showLoader: false });
        // this.notificationService.showError(err.error.error_description);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
