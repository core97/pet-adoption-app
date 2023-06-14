'use client';

import { useParams } from 'next/navigation';
import {
  Button,
  VStack,
  Heading,
  UnorderedList,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useAsync } from '@hooks/useAsync';
import { PetAdRequestStatus } from '@adoption-request/model';
import { updateAdoptionStepById } from '@adoption-request/presentation/adoption-request-fetcher';
import { PAGES } from '@shared/application/pages';
import { PreadoptionFormResponsesProps } from './PreadoptionFormresponses.interface';

export const PreadoptionFormResponses = ({
  formResult,
}: PreadoptionFormResponsesProps) => {
  const params = useParams();

  const modalHandler = useDisclosure();

  const handleClickValidation = useAsync(
    async (stepStatus: PetAdRequestStatus) => {
      if (typeof params?.petAdRequest !== 'string') {
        throw new Error('No exist "petAdRequest" parameter.');
      }

      await updateAdoptionStepById({
        adoptionStep: {
          status: stepStatus,
          step: 'PREADOPTION_FORM',
          updatedAt: new Date(),
        },
        petAdRequestId: params.petAdRequest,
      });

      modalHandler.onClose();
    },
    {
      onSuccess: {
        toast: {
          title:
            'El estado de formulario de preadopción se ha actualizado con éxito',
        },
        redirect: PAGES.ADOPTION_REQUESTS_LIST,
      },
    }
  );

  return (
    <>
      <VStack>
        <Heading>Formulario de preadopción</Heading>
        <UnorderedList>
          {formResult.map(({ answer, question }) => (
            <VStack as="li" key={question}>
              <Text fontWeight={600}>{question}</Text>
              <Text>{answer}</Text>
            </VStack>
          ))}
        </UnorderedList>
        <Button type="button" onClick={modalHandler.onOpen} width="100%">
          Validar respuestas del formulario
        </Button>
      </VStack>
      <Modal isOpen={modalHandler.isOpen} onClose={modalHandler.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Validación del formulario 🧐❓</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              <Text>
                Tras la revisión del formulario puedes dar como válidas sus
                respuestas para avanzar con el proceso de adopción del futuro
                dueño.
              </Text>
              <Text>
                En caso de lo contrario puedes rechazar el formulario dando por
                hecho que no es el dueño apropiado.
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              colorScheme="red"
              mr={3}
              onClick={() => handleClickValidation.execute('REJECTED')}
              isLoading={handleClickValidation.status === 'loading'}
            >
              Rechazar
            </Button>
            <Button
              colorScheme="teal"
              onClick={() => handleClickValidation.execute('ACCEPTED')}
              isLoading={handleClickValidation.status === 'loading'}
            >
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
