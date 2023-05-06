export class LoginModel {
  email: string;
  password: string | null;
  constructor(loginModel: LoginModel) {
    this.email = loginModel.email || '';
    this.password = loginModel.password || null;
  }
}
