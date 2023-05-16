'use client';

import { useForm } from 'react-hook-form';
import { VStack, Button } from '@chakra-ui/react';
import { InputImage, InputText, Select } from '@components';
import { PET_TYPES } from '@shared/domain/pet-type';
import { useAsync } from '@shared/presentation/hooks/useAsync';
import { uploadFiles } from '@shared/presentation/services/storage-service';
import { BreedFormFields, BreedFormProps } from './BreedForm.interface';

export type { BreedSubmit } from './BreedForm.interface';

export const BreedForm = ({
  onSubmit,
  submitButtonLabel,
  defaultValue,
  status,
}: BreedFormProps) => {
  const { control, handleSubmit } = useForm<BreedFormFields>();

  const handleSubmitForm = useAsync(async (data: BreedFormFields) => {
    const filesStoraged = await uploadFiles(data.images, 'BREED_IMAGES');

    onSubmit({
      images: filesStoraged,
      name: data.name,
      petAdsId: [],
      petType: data.petType,
    });
  });

  return (
    <VStack
      as="form"
      spacing={6}
      onSubmit={handleSubmit(handleSubmitForm.execute)}
      py={8}
    >
      <InputImage
        maxImageSize={7}
        defaultValue={defaultValue?.images.map(({ url }) => url)}
        control={control}
        name="images"
        rules={{ required: true }}
      />
      <InputText
        control={control}
        name="name"
        rules={{ required: true }}
        defaultValue={defaultValue?.name}
      />
      <Select
        control={control}
        name="petType"
        rules={{ required: true }}
        defaultValue={defaultValue?.petType}
        options={Object.values(PET_TYPES).map(item => ({
          label: item,
          value: item,
        }))}
      />
      <Button
        type="submit"
        isLoading={
          status === 'loading' || handleSubmitForm.status === 'loading'
        }
      >
        {submitButtonLabel}
      </Button>
    </VStack>
  );
};
