import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { ImageModalProps } from './ImageModal.interface';

export const ImageModal = ({
  imageSrc,
  isOpen,
  onClose,
  size = 'md',
  imageAlt,
}: ImageModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} size={size}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody py={12}>
        <img src={imageSrc} alt={imageAlt || imageSrc} />
      </ModalBody>
    </ModalContent>
  </Modal>
);
