import { AppError } from '@shared/application/errors/app-error';
import { HttpErrorCode } from '@shared/application/http/http-errors';

export class ConflictError extends AppError {
  constructor(message = 'Conflict', bussinessCode?: string) {
    super(message, HttpErrorCode.CONFLICT, bussinessCode);
  }
}
