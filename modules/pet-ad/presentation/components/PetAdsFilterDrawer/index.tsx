'use client';

import { useSearchParams } from 'next/navigation';
import {
  Button,
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
import { useTranslation } from '@hooks/useTransalation';
import { GenderInputRadioCard } from '@pet-ad/presentation/components/GenderInputRadioCard';
import { isValidGender } from '@shared/domain/gender';
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
              label="Raza"
              name="breed"
              options={breeds.map(item => ({
                label: item.name[lang],
                value: item.id,
              }))}
            />
            <GenderInputRadioCard
              register={register}
              name="gender"
              errors={formState.errors}
              defaultValue={
                isValidGender(queryParams.gender)
                  ? queryParams.gender
                  : undefined
              }
            />
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
