'use client';

import Image from 'next/image';
import {
  Box,
  Button,
  SimpleGrid,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { InputRadioCard } from '@components/InputRadioCard';
import {
  SearchPreferenceModalProps,
  SearchPreferencesFormFields,
} from './SearchPreferenceModal.interface';

export const SearchPreferenceModal = ({
  countries,
  isOpen,
  onClose,
  defaultValue,
}: SearchPreferenceModalProps) => {
  const { register, formState } = useForm<SearchPreferencesFormFields>();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Preferencias de búsqueda</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" id="searchPreferenceForm">
            <FormLabel as="p">Selecciona el país de búsqueda</FormLabel>
            <SimpleGrid
              templateColumns="repeat(auto-fit, minmax(160px, 1fr))"
              gap={6}
            >
              {countries.map(country => (
                <InputRadioCard
                  id={country.isoCode}
                  key={country.isoCode}
                  register={register}
                  name="countryToSearch"
                  value={country.isoCode}
                  defaultChecked={
                    country.isoCode === defaultValue?.countryToSearch
                  }
                  errors={formState.errors}
                  rules={{ required: true }}
                >
                  <HStack>
                    <Image
                      alt={country.name.en}
                      src={`/flags/${country.isoCode}.svg`}
                      width={35}
                      height={20}
                    />
                    <Text fontSize="sm" whiteSpace="nowrap">
                      {country.name.es}
                    </Text>
                  </HStack>
                </InputRadioCard>
              ))}
            </SimpleGrid>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" colorScheme="teal" form="searchPreferenceForm">
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
