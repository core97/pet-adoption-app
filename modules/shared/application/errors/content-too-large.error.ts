import { AppError } from '@shared/application/errors/app-error';
import { HttpErrorCode } from '@shared/application/http/http-errors';

export class ContentTooLargeError extends AppError {
  constructor(message?: string) {
    super(message || 'Content Too Large', HttpErrorCode.CONTENT_TOO_LARGE);
  }
}
