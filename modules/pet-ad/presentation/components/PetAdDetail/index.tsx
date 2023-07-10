'use client';

import { useState } from 'react';
import { PopupButton } from '@typeform/embed-react';
import {
  Container,
  Button,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Icon } from '@components/Icon';
import { useAsync } from '@hooks/useAsync';
import { SendAdoptionRequestModal } from '@adoption-request/presentation/components/SendAdoptionRequestModal';
import { useSetAsFavourite } from '@pet-ad/presentation/hooks/useSetAsFavourite';
import { useSendAdoptionRequest } from '@adoption-request/presentation/hooks/useSendAdoptionRequest';
import { upsertUserPreadoptionForm } from '@user/presentation/user-service';
import {
  PetAdDetailProps,
  PreadoptionFormSubmit,
} from './PetAdDetail.interface';

export const PetAdDetail = ({ petAd, userId }: PetAdDetailProps) => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const modalHandler = useDisclosure();

  const sendAdoptionRequest = useSendAdoptionRequest({
    petAdId: petAd.id,
    onMissingPreadoptionFormInUser: () => setIsOpenForm(true),
    onOpenFeedbackModal: modalHandler.onOpen,
  });

  const { isMarkedAsFavourite, ...setAsFavourite } = useSetAsFavourite({
    petAd,
    userId,
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
        onClick={sendAdoptionRequest.execute}
        colorScheme="teal"
        leftIcon={<Icon iconName="send" />}
        isLoading={sendAdoptionRequest.status === 'loading'}
      >
        Enviar solicitud de adopción
      </Button>
      <Button
        type="button"
        onClick={setAsFavourite.execute}
        colorScheme="teal"
        isLoading={setAsFavourite.status === 'loading'}
        leftIcon={
          <Icon iconName={isMarkedAsFavourite ? 'heartFill' : 'heartOutline'} />
        }
      >
        {isMarkedAsFavourite ? 'Quitar de favoritos' : 'Marcar como favorito'}
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
        error={sendAdoptionRequest.errorReason}
      />
    </Container>
  );
};
