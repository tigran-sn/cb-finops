export class ValidateCodeModel {
  userId: number;
  code: string | null;

  constructor(userId: number, code: string) {
    this.userId = userId || 0;
    this.code = code || null;
  }
}
