'use client';

import { Container, Button, Heading } from '@chakra-ui/react';
import { PopupButton } from '@typeform/embed-react';
import { Icon } from '@components/Icon';
import { useAsync } from '@hooks/useAsync';
import { PetAdDetailProps } from './PetAdDetail.interface';

export const PetAdDetail = ({ petAd }: PetAdDetailProps) => {
  const handleClickSendAdoptionRequest = useAsync(async () => {
    try {
      // TODO: crear pet ad request. Informar del proceso con un modal. Una vez creado informar en un toast y redirigir a "/"
    } catch (error) {
      /**
       * TODO: si el error es que el usuario no tiene formulario de preadopcion,
       * redirigir a "/preadoption-missing?pet-ad=XXX" (esta página no será estática). Una vez termine el formulario,
       * crear la pet ad request e informar en un toast redirigiendo a "/"
       */
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
      <PopupButton id="GgL5zYYK" className="my-form" onSubmit={console.log}>
        Formulario de preadopción
      </PopupButton>
    </Container>
  );
};
