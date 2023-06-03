'use client';

import { useState } from 'react';
import { PopupButton } from '@typeform/embed-react';
import {
  Container,
  Button,
  Heading,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Icon } from '@components/Icon';
import { useAsync } from '@hooks/useAsync';
import { SendPetAdRequestModal } from '@pet-ad-request/presentation/components/SendPetAdRequestModal';
import { createPetAdRequest } from '@pet-ad-request/presentation/pet-ad-request-fetcher';
import { PetAdRequestErrorsCode } from '@pet-ad-request/application/errors-code';
import { AppError } from '@shared/application/errors/app-error';
import { HttpErrorCode } from '@shared/application/http/http-errors';

import { PetAdDetailProps } from './PetAdDetail.interface';

export const PetAdDetail = ({ petAd }: PetAdDetailProps) => {
  const [errorReason, setErrorReason] = useState<
    HttpErrorCode | PetAdRequestErrorsCode
  >();

  const [isOpenForm, setIsOpenForm] = useState(false);

  const toast = useToast();

  const modalHandler = useDisclosure();

  const handleClickSendAdoptionRequest = useAsync(async () => {
    try {
      setErrorReason(undefined);

      await createPetAdRequest({
        petAdId: petAd.id,
        status: 'PENDING',
      });

      modalHandler.onOpen();
    } catch (error) {
      const validErrors = [
        PetAdRequestErrorsCode.ALREADY_CREATED_REQUEST_WITH_SAME_AD,
        PetAdRequestErrorsCode.MISSING_PREADOPTION_FORM_IN_USER,
        PetAdRequestErrorsCode.REQUEST_WITH_SAME_CREATION_USER,
        HttpErrorCode.UNAUTHORIZATED,
      ] as string[];

      if (
        !(error instanceof AppError) ||
        !validErrors.includes(error.businessCode)
      ) {
        throw error;
      }

      setErrorReason(
        error.businessCode as HttpErrorCode | PetAdRequestErrorsCode
      );

      if (
        error.businessCode ===
        PetAdRequestErrorsCode.MISSING_PREADOPTION_FORM_IN_USER
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

  return (
    <Container maxW="2xl">
      <Heading>{petAd.name}</Heading>
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
        onSubmit={data => {
          console.log(data);

          toast({
            status: 'success',
            title: 'Ya puedes enviar la solicitud de aopción',
          });
        }}
        onClose={() => {
          console.log('*** El modal se ha cerrado ***');
          setIsOpenForm(false);
        }}
      >
        Formulario de preadopción
      </PopupButton>

      <SendPetAdRequestModal
        isOpen={modalHandler.isOpen}
        onClose={modalHandler.onClose}
        error={errorReason}
      />
    </Container>
  );
};
