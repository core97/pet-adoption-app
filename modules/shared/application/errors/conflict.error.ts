import { AppError } from '@shared/application/errors/app-error';
import { HttpErrorCode } from '@shared/application/http/http-errors';

export class ConflictError extends AppError {
  constructor(message?: string) {
    super(message || 'Conflict', HttpErrorCode.CONFLICT);
  }
}
