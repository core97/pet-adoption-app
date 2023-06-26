import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  HStack,
  VStack,
} from '@chakra-ui/react';
import {
  PET_AD_REQUEST_STATUSES,
  PetAdRequestStatus,
} from '@adoption-request/model';
import { updateAdoptionStatusById } from '@adoption-request/presentation/adoption-request-fetcher';
import { useAsync } from '@hooks/useAsync';
import {
  AdoptionRequestStatusModifierProps,
  DESCRIPTION_BY_STATUS,
} from './AdoptionRequestStatusModifier.interface';

export const AdoptionRequestStatusModifier = ({
  isOpen,
  onClose,
  adoptionRequestId,
}: AdoptionRequestStatusModifierProps) => {
  const handleModifyStatus = useAsync(
    async (status: PetAdRequestStatus) => {
      try {
        if (!adoptionRequestId) return;

        await updateAdoptionStatusById({ status, adoptionRequestId });
      } finally {
        onClose();
      }
    },
    {
      onSuccess: {
        toast: {
          title: 'El estado de la solicitud se ha actualizado correctamente',
        },
      },
    }
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Estado de la solicitud</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Text>
              Selecciona el estado con el que deseas actualizar la solicitud.
            </Text>
            <Text>
              Solo podrás aceptar una solicitud de todas las que te han hecho.
              En caso de equivocarte de usuario al aceptar, podrás rechazar la
              aceptada por error y aceptar una diferente.
            </Text>
            <Text>
              Si rechazas la solicitud el usuario será descartado del proceso.
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack>
            {Object.values(PET_AD_REQUEST_STATUSES)
              .filter(value => value === 'ACCEPTED' || value === 'REJECTED')
              .map(value => (
                <Button
                  key={value}
                  colorScheme={DESCRIPTION_BY_STATUS[value]}
                  onClick={() => handleModifyStatus.execute(value)}
                  isLoading={handleModifyStatus.status === 'loading'}
                >
                  {value}
                </Button>
              ))}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
