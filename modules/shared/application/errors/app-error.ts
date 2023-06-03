import { HttpErrorCode } from '@shared/application/http/http-errors';

export class AppError extends Error {
  public readonly httpCode: HttpErrorCode;

  public readonly businessCode: string;

  constructor(
    message: string,
    httpCode: HttpErrorCode,
    businessCode?: string
  ) {
    super(message);
    this.httpCode = httpCode;
    this.businessCode = businessCode || httpCode;
  }
}
