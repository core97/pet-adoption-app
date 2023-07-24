'use client';

import { useForm } from 'react-hook-form';
import { VStack, Button, SimpleGrid } from '@chakra-ui/react';
import { InputImage, InputText, Select } from '@components';
import { Language } from '@shared/domain/languages';
import { PET_TYPES } from '@shared/domain/pet-type';
import { FileStoraged } from '@shared/domain/file-storaged';
import { useAsync } from '@shared/presentation/hooks/useAsync';
import { uploadFiles } from '@shared/presentation/services/storage-service';
import { BreedFormFields, BreedFormProps } from './BreedForm.interface';

export type { BreedSubmit, BreedDefaultValues } from './BreedForm.interface';

export const BreedForm = ({
  onSubmit,
  submitButtonLabel,
  defaultValue,
  status,
}: BreedFormProps) => {
  const { register, control, handleSubmit, formState } =
    useForm<BreedFormFields>();

  const handleSubmitForm = useAsync(async (data: BreedFormFields) => {
    const filesToUpload = data.images.filter(item => typeof item !== 'string');
    let filesStoraged: FileStoraged[] = [];

    if (filesToUpload.length) {
      filesStoraged = await uploadFiles(
        filesToUpload as File[],
        'BREED_IMAGES'
      );
    }

    onSubmit({
      images: defaultValue?.images
        ? filesStoraged.concat(defaultValue.images)
        : filesStoraged,
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
        limit={4}
        maxImageSize={7}
        defaultValue={defaultValue?.images.map(({ url }) => url)}
        control={control}
        name="images"
        rules={{ required: true }}
      />
      <SimpleGrid columns={[1, 2]} spacing={4}>
        {Object.keys(Language)
          .map(lang => lang.toLowerCase())
          .map(lang => (
            <InputText
              key={`name.${lang}`}
              register={register}
              label={`Nombre en ${lang}`}
              name={`name.${lang}` as any}
              rules={{ required: true }}
              defaultValue={(defaultValue?.name as any)?.[lang]}
              errors={formState.errors}
            />
          ))}
      </SimpleGrid>
      <Select
        control={control}
        label="Tipo de mascota"
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
