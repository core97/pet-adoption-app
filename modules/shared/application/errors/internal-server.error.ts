import { AppError } from '@shared/application/errors/app-error';
import { HttpErrorCode } from '@shared/application/http/http-errors';

export class InternalServerError extends AppError {
  constructor(message?: string) {
    super(message || 'Internal server error', HttpErrorCode.INTERNAL_ERROR);
  }
}
