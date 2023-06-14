'use client';

import { signIn } from 'next-auth/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
} from '@chakra-ui/react';
import { PetAdRequestErrorsCode } from '@pet-ad-request/application/errors-code';
import { HttpErrorCode } from '@shared/application/http/http-errors';
import { PetAdRequestModalProps } from './SendPetAdRequestModal.interface';

export const SendPetAdRequestModal = ({
  isOpen,
  onClose,
  error,
}: PetAdRequestModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent px={4}>
      <ModalHeader mt={6}>
        {error ? 'Uuupps' : 'La solicitud se ha enviado correctamente'}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={8}>
        {!error && (
          <>
            <Text>
              En los próximos días el anunciante revisará tu solicitud junto con
              el formulario de preadopción que rellenaste anteriormente. Si
              cumples con los requisitos, serás notificado y el anunciante se
              pondrá en contacto contigo por email o por teléfono.
            </Text>
            <Text mt={4}>Mucha suerte.</Text>
          </>
        )}
        {error ===
          PetAdRequestErrorsCode.ALREADY_CREATED_REQUEST_WITH_SAME_AD && (
          <Text>
            Ya has enviado la solicitud anteriormente. Debes esperar a que el
            usuario revise tu solicitud según con lo que esté buscando.
            Recibirás una notificación con el estado de la solicitud.
          </Text>
        )}
        {error === PetAdRequestErrorsCode.REQUEST_WITH_SAME_CREATION_USER && (
          <Text>
            Este anuncio lo has creado tú. No puedes enviar una solicitud de
            adopción.
          </Text>
        )}
        {error === HttpErrorCode.UNAUTHORIZATED && (
          <>
            <Text>Antes de enviar la solicitud debes iniciar sesión.</Text>
            <Button type="button" onClick={() => signIn()}>
              Iniciar sesión
            </Button>
          </>
        )}
      </ModalBody>
    </ModalContent>
  </Modal>
);
