import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { LoginFormModel } from 'src/app/core/infrastructure/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // form: FormControl;
  // controls: LoginFormModel;

  constructor(
    private fb: FormBuilder,
    private activatedRout: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  submit(): void {}

  private initForm(): void {
    // this.form = this.fb.group({
    //   email: ['', Validators.compose([])],
    //   password: ['', Validators.compose([])],
    // });
    this.setControls();
  }

  private setControls(): void {
    // this.controls = {
    //   email: this.form.get('email'),
    //   password: this.form.get('password'),
    // };
  }
}
