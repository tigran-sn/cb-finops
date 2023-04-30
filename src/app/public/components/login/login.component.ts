import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RequiredValidator } from "../../../shared/validators";
import { LoginFormModel } from "../../../core/infrastructure/models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  controls: LoginFormModel;
  submitted: boolean;
  isCapsLockOn: boolean;
  showPassword = true;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.form);
    if(this.form.valid) {
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
      username: ['', Validators.compose([
        RequiredValidator.validate,
        Validators.maxLength(250),
      ])],
      password: ['', Validators.compose([
        RequiredValidator.validate,
        Validators.maxLength(20),
        Validators.minLength(8),
      ])],
    });
    this.setControls();
  }

  private setControls(): void {
    this.controls = {
      username: this.form.get('username') as FormControl,
      password: this.form.get('password') as FormControl,
    };
  }
}
