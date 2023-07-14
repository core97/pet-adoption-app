'use client';

import Image from 'next/image';
import {
  Button,
  SimpleGrid,
  HStack,
  Text,
  FormLabel,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useAsync } from '@hooks/useAsync';
import { InputRadioCard } from '@components/InputRadioCard';
import { updateUserPreference } from '@user/presentation/user-service';
import { useUserStore } from '@user/presentation/user-store';
import {
  UserPreferenceDrawerProps,
  UserPreferencesFormFields,
} from './UserPreferenceDrawer.interface';

export const UserPreferenceDrawer = ({
  countries,
  isOpen,
  onClose,
}: UserPreferenceDrawerProps) => {
  const { register, handleSubmit, formState } =
    useForm<UserPreferencesFormFields>();

  const user = useUserStore();

  const onSubmit = useAsync(async (data: UserPreferencesFormFields) => {
    const countryCookieName = 'searchCountry';

    if (user?.id) {
      await updateUserPreference({ searchCountry: data.countryToSearch });
    }

    // Delete old cookie
    document.cookie = `${countryCookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // Create new cookie
    document.cookie = `${countryCookieName}=${data.countryToSearch}; path=/;`;

    useUserStore.setState(state => ({
      ...state,
      preferences: {
        ...(state.preferences || {}),
        searchCountry: data.countryToSearch,
      },
    }));

    onClose();
  });

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Preferencias de búsqueda</DrawerHeader>
        <DrawerBody
          as="form"
          id="searchPreferenceForm"
          onSubmit={handleSubmit(onSubmit.execute)}
        >
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
                  country.isoCode === user.preferences?.searchCountry
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
        </DrawerBody>

        <DrawerFooter>
          <Button
            type="submit"
            colorScheme="teal"
            form="searchPreferenceForm"
            isLoading={onSubmit.status === 'loading'}
          >
            Guardar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
