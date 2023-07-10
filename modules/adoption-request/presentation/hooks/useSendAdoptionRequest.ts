import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAsync } from '@hooks/useAsync';
import { createAdoptionRequest } from '@adoption-request/presentation/adoption-request-fetcher';
import { AdoptionRequestErrorsCode } from '@adoption-request/application/adoption-request-errors-code';
import { HttpErrorCode } from '@shared/application/http/http-errors';
import { AppError } from '@shared/application/errors/app-error';

export function useSendAdoptionRequest({
  petAdId,
  onMissingPreadoptionFormInUser,
  onOpenFeedbackModal,
}: {
  petAdId: string;
  onMissingPreadoptionFormInUser?: () => void;
  onOpenFeedbackModal?: () => void;
}) {
  const [errorReason, setErrorReason] = useState<
    HttpErrorCode | AdoptionRequestErrorsCode
  >();

  const toast = useToast();

  const onSendAdoptionRequest = useAsync(async () => {
    try {
      setErrorReason(undefined);

      await createAdoptionRequest({
        petAdId,
        status: 'PENDING',
      });

      onOpenFeedbackModal?.();
    } catch (error) {
      const validErrors = [
        AdoptionRequestErrorsCode.ALREADY_CREATED_REQUEST_WITH_SAME_AD,
        AdoptionRequestErrorsCode.MISSING_PREADOPTION_FORM_IN_USER,
        AdoptionRequestErrorsCode.REQUEST_WITH_SAME_CREATION_USER,
        HttpErrorCode.UNAUTHORIZATED,
      ] as string[];

      if (
        !(error instanceof AppError) ||
        !validErrors.includes(error.businessCode)
      ) {
        throw error;
      }

      setErrorReason(
        error.businessCode as HttpErrorCode | AdoptionRequestErrorsCode
      );

      if (
        error.businessCode !==
        AdoptionRequestErrorsCode.MISSING_PREADOPTION_FORM_IN_USER
      ) {
        onOpenFeedbackModal?.();
        return;
      }

      toast({
        isClosable: true,
        status: 'info',
        title:
          'Antes de enviar la solicitud, debes de completar el formulario de preadopción',
        onCloseComplete: onMissingPreadoptionFormInUser,
      });
    }
  });

  return {
    errorReason,
    execute: onSendAdoptionRequest.execute,
    status: onSendAdoptionRequest.status,
  };
}
