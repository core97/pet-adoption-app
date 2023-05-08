import { AppError } from '@shared/application/errors/app-error';
import { HttpErrorCode } from '@shared/application/http/http-errors';

export class UnauthorizatedError extends AppError {
  constructor(message?: string) {
    super(message || 'Unauthorizated', HttpErrorCode.UNAUTHORIZATED);
  }
}
