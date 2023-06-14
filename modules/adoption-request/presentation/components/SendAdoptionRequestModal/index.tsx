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
import { AdoptionRequestErrorsCode } from '@adoption-request/application/adoption-request-errors-code';
import { HttpErrorCode } from '@shared/application/http/http-errors';
import { AdoptionRequestModalProps } from './SendAdoptionRequestModal.interface';

export const SendAdoptionRequestModal = ({
  isOpen,
  onClose,
  error,
}: AdoptionRequestModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent px={4}>
      <ModalHeader mt={6}>
        {error ? 'Uuupps 😵‍💫' : 'La solicitud se ha enviado correctamente 🎉🎉'}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={8}>
        {!error && (
          <>
            <Text>
              En los próximos días el anunciante revisará tu solicitud junto con
              el formulario de preadopción que rellenaste anteriormente. Si
              cumples con los requisitos, serás notificado y el anunciante se
              pondrá en contacto contigo por correo o teléfono.
            </Text>
            <Text mt={4}>Mucha suerte. 🍀</Text>
          </>
        )}
        {error ===
          AdoptionRequestErrorsCode.ALREADY_CREATED_REQUEST_WITH_SAME_AD && (
          <>
            <Text>
              Ya has enviado la solicitud anteriormente. Debes esperar a que el
              usuario revise tu solicitud según con lo que esté buscando.
            </Text>
            <Text mt={3}>
              Recibirás una notificación con el estado de la solicitud.
            </Text>
          </>
        )}
        {error ===
          AdoptionRequestErrorsCode.REQUEST_WITH_SAME_CREATION_USER && (
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
