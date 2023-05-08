import { AppError } from '@shared/application/errors/app-error';
import { HttpErrorCode } from '@shared/application/http/http-errors';

export class UnprocessableEntityError extends AppError {
  constructor(message?: string) {
    super(message || 'Unprocesable entity', HttpErrorCode.UNPROCESSABLE_ENTITY);
  }
}
