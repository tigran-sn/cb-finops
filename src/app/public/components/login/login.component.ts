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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  controls: LoginFormModel;
  submitted: boolean;
  validationMessages: ValidationMessages = {};
  isCapsLockOn: boolean;
  showPassword = true;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    // public localStorage: LocalStorageService,
    private router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.languageService.reset();
    this.initForm();
    this.getValidationMessages();
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.form);
    if (this.form.valid) {
      // Show loader
      // Login
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  checkCapsLock(event: KeyboardEvent): void {
    if (event.getModifierState('CapsLock')) {
      this.isCapsLockOn = true;
    } else {
      this.isCapsLockOn = false;
    }
  }

  private initForm() {
    this.form = this.fb.group({
      username: [
        '',
        Validators.compose([
          RequiredValidator.validate,
          Validators.maxLength(250),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          RequiredValidator.validate,
          Validators.maxLength(20),
          Validators.minLength(8),
        ]),
      ],
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
    this.validationMessages.email = [
      { type: 'required', message: Messages.required },
      { type: 'maxlength', message: 'LongEmailError' },
      { type: 'validateEmail', message: 'IncorrectEmailError' },
    ];
    this.validationMessages.password = [
      { type: 'required', message: Messages.required },
      { type: 'maxlength', message: 'LongPasswordError' },
      { type: 'minlength', message: 'ShortPasswordError' },
      // { type: 'validateCopyPastPattern', message: `${Messages.westernKeyboard}` }
    ];
  }
}
