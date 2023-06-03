import { PetAdRequestErrorsCode } from '@pet-ad-request/application/errors-code';
import { HttpErrorCode } from '@shared/application/http/http-errors';

export interface PetAdRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  error?: PetAdRequestErrorsCode | HttpErrorCode;
}
