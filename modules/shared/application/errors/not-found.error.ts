import { AppError } from '@shared/application/errors/app-error';
import { HttpErrorCode } from '@shared/application/http/http-errors';

export class NotFoundError extends AppError {
  constructor(message?: string) {
    super(message || 'Not found', HttpErrorCode.NOT_FOUND);
  }
}
