import { useState } from 'react';
import {
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  FormControl,
  FormLabel,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Icon } from '@components/Icon';
import { InputFileModalProps } from './InputFileModal.interface';

export const InputFileModal = ({
  accept,
  isOpen,
  maxFileSize,
  name,
  onClose,
  onSubmit,
  label,
  header,
}: InputFileModalProps) => {
  const [file, setFile] = useState<File>();
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile =
      e.target.files && e.target.files.length
        ? Array.from(e.target.files)[0]
        : null;

    if (!currentFile) return;

    const fileInMb = currentFile.size / 1024 / 1024;

    if (fileInMb > maxFileSize) {
      toast({
        title: 'No se puede subir este archivo.',
        description:
          'El archivo tiene un tamaño superior al límite máximo de subida.',
        status: 'warning',
      });
      return;
    }

    setFile(currentFile);
  };

  const handleClickConfirm = () => {
    if (!file) return;

    const blob = file.slice(0, file.size, file.type);
    const newFile = new File([blob], new Date().getTime().toString(), {
      type: file.type,
    });

    onSubmit(newFile);
    onClose();
    setFile(undefined);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent borderRadius="8px">
        <ModalHeader
          pt="2rem"
          display="flex"
          alignItems="center"
          columnGap="1.5rem"
          bgColor="gray.50"
          borderTopRadius="8px"
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Icon iconName="upload" size={24} />
          <Heading fontSize="3xl">{header || 'Añadir archivo'}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py="2rem">
          <VStack alignItems="flex-start" spacing={4}>
            <FormControl>
              <FormLabel htmlFor={name}>
                {label || 'Subir un archivo'}
              </FormLabel>
              <input
                id={name}
                name={name}
                type="file"
                accept={accept}
                onChange={handleChange}
              />
            </FormControl>
            <Text>
              {`El tamaño máximo por archivo es de ${maxFileSize} MB`}
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter
          bgColor="gray.50"
          borderBottomRadius="8px"
          borderTop="1px solid"
          borderColor="gray.200"
        >
          <Button mr={3} onClick={onClose} variant="outline" colorScheme="gray">
            Cancelar
          </Button>
          <Button
            onClick={handleClickConfirm}
            variant="outline"
            colorScheme="blue"
            disabled={!file}
          >
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
