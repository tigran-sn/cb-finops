class UserUrl {
  get currentUserClaims(): string {
    return '/api/GetUserInfo';
  }
}

export const USER_API_URL = new UserUrl();
