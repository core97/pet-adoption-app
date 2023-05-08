import { HttpErrorCode } from '@shared/application/http/http-errors';

export class AppError extends Error {
  public readonly code: HttpErrorCode;

  constructor(message: string, code: HttpErrorCode) {
    super(message);
    this.code = code;
  }
}
