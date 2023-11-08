import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RequiredValidator } from '../../../shared/validators';
import { LoginFormModel } from '../../../core/infrastructure/models';
import {
  Messages,
  ValidationMessages,
} from '../../../core/infrastructure/interfaces';
import { LanguageService } from '../../../core/services/languages';
import { LocalStorageService } from '../../../storage/local-storage.service';
import { AuthService } from 'src/app/core/services';
import { State, Store } from 'src/app/shared/store';
import { LoginBaseComponent } from '../login-base/login-base.component';
import { CustomSnackbarService } from "../../../shared/services";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends LoginBaseComponent implements OnInit {
  form: FormGroup;
  controls: LoginFormModel;
  submitted: boolean;
  validationMessages: ValidationMessages = {};
  isCapsLockOn: boolean;
  showPassword = true;

  constructor(
    private fb: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public localStorage: LocalStorageService,
    public router: Router,
    public store: Store<State>,
    // public notificationService: NotificationService,
    private languageService: LanguageService,
    protected customSnackbarService: CustomSnackbarService
  ) {
    super(authService, localStorage, router, activatedRoute, store, customSnackbarService); // notificationService
  }

  ngOnInit(): void {
    this.languageService.reset();
    this.initForm();
    this.getValidationMessages();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.store.update({ showLoader: true });
      this.login(this.form.value);
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  private initForm() {
    this.form = this.fb.group({
      username: [
        '',
        Validators.compose([
          RequiredValidator.validate,
        ]),
      ],
      password: ['', Validators.compose([RequiredValidator.validate])],
    });
    this.setControls();
  }

  private setControls(): void {
    this.controls = {
      username: this.form.get('username') as FormControl,
      password: this.form.get('password') as FormControl,
    };
  }

  private getValidationMessages(): void {
    this.validationMessages.username = [
      { type: 'required', message: Messages.required },
    ];
    this.validationMessages.password = [
      { type: 'required', message: Messages.required },
    ];
  }
}
