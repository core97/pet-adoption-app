'use client';

import { useEffect } from 'react';
import { Link } from '@chakra-ui/next-js';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  Text,
} from '@chakra-ui/react';
import { NotificationItemModalProps } from './NotificationItemModal.interface';

export const NotificationItemModal = ({
  isOpen,
  notification,
  onClose,
  onOpen,
}: NotificationItemModalProps) => {
  useEffect(() => {
    onOpen?.()
  }, [onOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Notificación</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading>{notification?.type}</Heading>
          <Text>{notification?.description}</Text>
          {notification?.url && (
            <Link href={notification.url}>Más detalles</Link>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
