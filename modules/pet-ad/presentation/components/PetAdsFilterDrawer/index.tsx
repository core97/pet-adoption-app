'use client';

import { useSearchParams } from 'next/navigation';
import {
  Button,
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
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Select } from '@components/Select';
import { InputRadioCard } from '@components/InputRadioCard';
import { useTranslation } from '@hooks/useTransalation';
import { Icon } from '@shared/presentation/components';
import { GENDERS, isValidGender } from '@shared/domain/gender';
import {
  PetAdsFilterDrawerProps,
  PetAdsFilterFormFields,
} from './PetAdsFilterDrawer.interface';

export type { PetAdsFilterFormSubmit } from './PetAdsFilterDrawer.interface';

export const PetAdsFilterDrawer = ({
  breeds,
  isOpen,
  onClose,
  onSubmit,
  submitButtonLabel,
  status,
}: PetAdsFilterDrawerProps) => {
  const searchParams = useSearchParams();

  const { lang } = useTranslation();

  const queryParams = {
    breed: searchParams?.get('breed'),
    gender: searchParams?.get('gender'),
  };

  const { register, handleSubmit, formState, control, reset } =
    useForm<PetAdsFilterFormFields>({
      defaultValues: {
        breed: queryParams.breed || undefined,
        gender: isValidGender(queryParams.gender)
          ? queryParams.gender
          : undefined,
      },
    });

  const onSubmitForm = (data: PetAdsFilterFormFields) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Filtros de búsqueda</DrawerHeader>
        <DrawerBody
          as="form"
          id="petAdFiltersForm"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <VStack spacing={4}>
            <Select
              control={control}
              label="Razas"
              name="breed"
              options={breeds.map(item => ({
                label: item.name[lang],
                value: item.id,
              }))}
            />
            <VStack width="100%" alignItems="flex-start">
              <FormLabel as="p">Género</FormLabel>
              <HStack width="100%">
                {Object.keys(GENDERS).map(gender => (
                  <InputRadioCard
                    id={gender}
                    key={gender}
                    register={register}
                    name="gender"
                    value={gender}
                    errors={formState.errors}
                    width="100%"
                  >
                    <HStack width="100%">
                      <Icon iconName="filter" />
                      <Text>{gender}</Text>
                    </HStack>
                  </InputRadioCard>
                ))}
              </HStack>
            </VStack>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button type="button" mr={4} onClick={() => reset()}>
            Resetear filros
          </Button>
          <Button
            type="submit"
            colorScheme="teal"
            form="petAdFiltersForm"
            isLoading={status === 'loading'}
          >
            {submitButtonLabel}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
