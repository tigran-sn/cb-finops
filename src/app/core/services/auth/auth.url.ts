class AuthUrl {
  get login(): string {
    return '/connect/token';
  }

  get logout(): string {
    return '';
  }

  get unlockUserAccount(): string {
    return '/api/account/unlock';
  }

  get resend(): string {
    return '/api/account/email/send/3';
  }
}

export const AUTH_API_URL = new AuthUrl();
