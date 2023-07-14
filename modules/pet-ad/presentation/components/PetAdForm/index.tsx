import { useForm } from 'react-hook-form';
import { VStack, Button, useToast } from '@chakra-ui/react';
import { InputDate, InputImage, InputText, Select } from '@components';
import { useAsync } from '@hooks/useAsync';
import { GENDER } from '@pet-ad/model';
import { FileStoraged } from '@shared/domain/file-storaged';
import { uploadFiles } from '@shared/presentation/services/storage-service';
import { PetAdFormFields, PetAdFormProps } from './PetAdForm.interface';

export type { PetAdSubmit, PetAdDefaultValues } from './PetAdForm.interface';

export const PetAdForm = ({
  onSubmit,
  submitButtonLabel,
  defaultValue,
  status,
  petType,
  options,
}: PetAdFormProps) => {
  const { register, formState, handleSubmit, control } =
    useForm<PetAdFormFields>();

  const toast = useToast();

  const handleSubmitForm = useAsync(async (data: PetAdFormFields) => {
    const filesToUpload = data.images.filter(item => typeof item !== 'string');
    let filesStoraged: FileStoraged[] = [];

    if (data.breedIds.length > 2) {
      toast({
        status: 'error',
        title: 'No puedes seleccionar más de dos razas.',
      });
      return;
    }

    if (filesToUpload.length) {
      filesStoraged = await uploadFiles(
        filesToUpload as File[],
        'PET_AD_IMAGES'
      );
    }

    onSubmit({
      images: defaultValue?.images
        ? filesStoraged.concat(defaultValue.images)
        : filesStoraged,
      name: data.name,
      breedIds: data.breedIds,
      dateBirth: new Date(data.dateBirth),
      petType,
      gender: data.gender,
      adoptionStatus: 'IN_SEARCH',
      favouritesUsersId: [],
    });
  });

  return (
    <VStack as="form" onSubmit={handleSubmit(handleSubmitForm.execute)}>
      <InputImage
        limit={4}
        maxImageSize={7}
        defaultValue={defaultValue?.images.map(({ url }) => url)}
        control={control}
        name="images"
        rules={{ required: true }}
      />
      <InputText
        label="Nombre"
        register={register}
        name="name"
        rules={{ required: true }}
        errors={formState.errors}
        defaultValue={defaultValue?.name}
      />
      <InputDate
        label="Fecha de nacimiento"
        register={register}
        name="dateBirth"
        rules={{ required: true }}
        errors={formState.errors}
        defaultValue={defaultValue?.dateBirth.toString()}
      />
      <Select
        label="Razas"
        isMulti
        control={control}
        name="breedIds"
        options={options.breeds.map(breed => ({
          label: breed.name,
          value: breed.id,
        }))}
        rules={{ required: true }}
        defaultValue={defaultValue?.breedIds}
      />
      <Select
        label="Género"
        control={control}
        name="gender"
        options={Object.values(GENDER).map(gender => ({
          label: gender,
          value: gender,
        }))}
        rules={{ required: true }}
        defaultValue={defaultValue?.breedIds}
      />
      <Button
        type="submit"
        isLoading={
          handleSubmitForm.status === 'loading' || status === 'loading'
        }
      >
        {submitButtonLabel}
      </Button>
    </VStack>
  );
};
