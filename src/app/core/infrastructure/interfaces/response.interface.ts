export interface IResponse<T> {
  success: boolean;
  data: T;
  error?: { displayMessage: string };
  message?: string;
}
