class UserUrl {
  get currentUserClaims(): string {
    return '/api/user/current';
  }

  get acceptTC(): string {
    return '/api/user/AcceptTC';
  }
}

export const USER_API_URL = new UserUrl();
