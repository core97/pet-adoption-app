'use client';

import { useSearchParams, useParams } from 'next/navigation';
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
import {
  PET_SIZE,
  ActivityLevelLabel,
  isValidSize,
  isValidActivityLevelLabel,
} from '@pet-ad/model';
import { GenderInputRadioCard } from '@pet-ad/presentation/components/GenderInputRadioCard';
import { isValidGender } from '@shared/domain/gender';
import { isValidPetType } from '@shared/domain/pet-type';
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
  const params = useParams();

  const { lang } = useTranslation();

  const urlParams = {
    petType: params?.petType,
  };

  const queryParams = {
    activityLevel: searchParams?.get('activityLevel'),
    breed: searchParams?.get('breed'),
    gender: searchParams?.get('gender'),
    size: searchParams?.get('size'),
  };

  const { register, handleSubmit, formState, control, reset } =
    useForm<PetAdsFilterFormFields>({
      defaultValues: {
        activityLevel: isValidActivityLevelLabel(queryParams.activityLevel)
          ? queryParams.activityLevel
          : undefined,
        breed: queryParams.breed || undefined,
        gender: isValidGender(queryParams.gender)
          ? queryParams.gender
          : undefined,
        size: isValidSize(queryParams.size) ? queryParams.size : undefined,
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
            <Select
              control={control}
              label="Nivel de actividad"
              name="activityLevel"
              options={Object.values(ActivityLevelLabel).map(activityLevel => ({
                label: activityLevel,
                value: activityLevel,
              }))}
            />
            {typeof urlParams.petType === 'string' &&
              isValidPetType(urlParams.petType.toUpperCase()) &&
              urlParams.petType.toUpperCase() === 'DOG' && (
                <Select
                  control={control}
                  label="Tamaño"
                  name="size"
                  options={Object.values(PET_SIZE).map(item => ({
                    label: item,
                    value: item,
                  }))}
                />
              )}

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
