'use client';

import { useState } from 'react';
import {
  Box,
  VStack,
  Button,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Address } from '@shared/domain/address';
import { InputRadioCard, Icon } from '@components';
import { AddressForm } from '@components/AddressForm';
import {
  SelectAddressFormProps,
  SelectAddressFormFields,
} from './SelectAddressForm.interface';

export type { SelectAddressSubmit } from './SelectAddressForm.interface';

export const SelectAddressForm = ({
  addresses,
  onSubmit,
  submitButtonLabel,
  defaultValue,
  status,
}: SelectAddressFormProps) => {
  const [addressesOptions, setAddressesOptions] = useState<Address[]>(
    addresses || []
  );

  const { register, handleSubmit, formState } =
    useForm<SelectAddressFormFields>();

  const toast = useToast();

  const modalHandler = useDisclosure();

  const handleSubmitForm = (data: SelectAddressFormFields) => {
    const address = addressesOptions.find(
      ({ placeId }) => placeId === data.placeId
    );

    if (!address) {
      toast({ title: 'Debes añadir una dirección', status: 'error' });
      return;
    }

    onSubmit(address);
  };

  return (
    <>
      <Box
      width="100%"
        alignItems="flex-start"
        as="form"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <FormLabel as="p">Selecciona la dirección</FormLabel>
        {!!addressesOptions?.length && (
          <Button
            type="button"
            onClick={modalHandler.onOpen}
            variant="ghost"
            size="sm"
            leftIcon={<Icon size={20} iconName="plus" />}
          >
            Añadir nueva dirección
          </Button>
        )}
        {addressesOptions?.length ? (
          <VStack as="ul" spacing={3} my={6}>
            {addressesOptions.map(address => (
              <Box key={address.placeId} as="li" width="100%">
                <InputRadioCard
                  id={address.placeId}
                  register={register}
                  name="placeId"
                  value={address.placeId}
                  defaultChecked={address.placeId === defaultValue?.placeId}
                  errors={formState.errors}
                  rules={{ required: true }}
                  width="100%"
                >
                  {address.displayName}
                </InputRadioCard>
              </Box>
            ))}
          </VStack>
        ) : (
          <Button
            type="button"
            onClick={modalHandler.onOpen}
            width="100%"
            colorScheme="teal"
            leftIcon={<Icon size={20} iconName="plus" />}
            my={6}
          >
            Añadir nueva dirección
          </Button>
        )}
        <Button type="submit" isLoading={status === 'loading'} width="100%">
          {submitButtonLabel}
        </Button>
      </Box>

      <Modal isOpen={modalHandler.isOpen} onClose={modalHandler.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <AddressForm
              enableSaveAddress
              submitButtonLabel="Añadir dirección"
              onSubmit={newAddress => {
                setAddressesOptions(prev => prev.concat(newAddress));
                modalHandler.onClose();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
