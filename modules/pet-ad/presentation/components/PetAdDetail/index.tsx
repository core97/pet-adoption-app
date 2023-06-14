'use client';

import { useState } from 'react';
import { PopupButton } from '@typeform/embed-react';
import {
  Container,
  Button,
  Heading,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Icon } from '@components/Icon';
import { useAsync } from '@hooks/useAsync';
import { SendAdoptionRequestModal } from '@adoption-request/presentation/components/SendAdoptionRequestModal';
import { createAdoptionRequest } from '@adoption-request/presentation/adoption-request-fetcher';
import { AdoptionRequestErrorsCode } from '@adoption-request/application/adoption-request-errors-code';
import { upsertUserPreadoptionForm } from '@user/presentation/user-service';
import { AppError } from '@shared/application/errors/app-error';
import { HttpErrorCode } from '@shared/application/http/http-errors';
import {
  PetAdDetailProps,
  PreadoptionFormSubmit,
} from './PetAdDetail.interface';

export const PetAdDetail = ({ petAd }: PetAdDetailProps) => {
  const [errorReason, setErrorReason] = useState<
    HttpErrorCode | AdoptionRequestErrorsCode
  >();

  const [isOpenForm, setIsOpenForm] = useState(false);

  const toast = useToast();

  const modalHandler = useDisclosure();

  const handleClickSendAdoptionRequest = useAsync(async () => {
    try {
      setErrorReason(undefined);

      await createAdoptionRequest({
        petAdId: petAd.id,
        status: 'PENDING',
      });

      modalHandler.onOpen();
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
        error.businessCode ===
        AdoptionRequestErrorsCode.MISSING_PREADOPTION_FORM_IN_USER
      ) {
        toast({
          isClosable: true,
          status: 'info',
          title:
            'Antes de enviar la solicitud, debes de completar el formulario de preadopción',
          onCloseComplete: () => {
            setIsOpenForm(true);
          },
        });
      } else {
        modalHandler.onOpen();
      }
    }
  });

  const handleOnSubmitPreadoptionForm = useAsync(
    async (data: any) => {
      const submitData = data as PreadoptionFormSubmit;

      await upsertUserPreadoptionForm({
        formId: submitData.formId,
        responseId: submitData.responseId,
      });
    },
    {
      onSuccess: {
        toast: { title: 'Ya puedes enviar la solicitud de adopción' },
      },
    }
  );

  return (
    <Container maxW="2xl">
      <Heading>{petAd.name}</Heading>
      <Text>{petAd.user.email}</Text>
      <Button
        type="button"
        onClick={handleClickSendAdoptionRequest.execute}
        colorScheme="teal"
        leftIcon={<Icon iconName="send" />}
        isLoading={handleClickSendAdoptionRequest.status === 'loading'}
      >
        Enviar solicitud de adopción
      </Button>
      <PopupButton
        id="GgL5zYYK"
        buttonProps={{ style: { display: 'none' } } as any}
        autoClose
        open={isOpenForm ? 'load' : undefined}
        onSubmit={handleOnSubmitPreadoptionForm.execute}
        onClose={() => {
          setIsOpenForm(false);
        }}
      >
        Formulario de preadopción
      </PopupButton>

      <SendAdoptionRequestModal
        isOpen={modalHandler.isOpen}
        onClose={modalHandler.onClose}
        error={errorReason}
      />
    </Container>
  );
};
