export class LoginModel {
  username: string;
  password: string;
  constructor(loginModel: LoginModel) {
    this.username = loginModel.username;
    this.password = loginModel.password;
  }
}
