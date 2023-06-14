import { AdoptionRequestErrorsCode } from '@adoption-request/application/adoption-request-errors-code';
import { HttpErrorCode } from '@shared/application/http/http-errors';

export interface AdoptionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  error?: AdoptionRequestErrorsCode | HttpErrorCode;
}
