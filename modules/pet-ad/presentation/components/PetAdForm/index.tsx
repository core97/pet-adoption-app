import { useForm } from 'react-hook-form';
import { VStack, Button, useToast, FormLabel } from '@chakra-ui/react';
import {
  InputDate,
  InputImage,
  InputText,
  Textarea,
  Select,
  Switch,
} from '@components';
import { useAsync } from '@hooks/useAsync';
import { useTranslation } from '@hooks/useTransalation';
import { PET_SIZE } from '@pet-ad/model';
import { GenderInputRadioCard } from '@pet-ad/presentation/components/GenderInputRadioCard';
import { FileStoraged } from '@shared/domain/file-storaged';
import { uploadFiles } from '@shared/presentation/services/storage-service';
import { PetAdFormFields, PetAdFormProps } from './PetAdForm.interface';
import { petCheckpoints } from './PetAdForm.contants';

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

  const { lang } = useTranslation();

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
      activityLevel: Number(data.activityLevel),
      sociability: Number(data.sociability),
      checkpoints: data.checkpoints,
      description: data.description,
      size: data.size,
    });
  });

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(handleSubmitForm.execute)}
      spacing={6}
      alignItems="flex-start"
    >
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
          label: breed.name[lang],
          value: breed.id,
        }))}
        rules={{ required: true }}
        defaultValue={defaultValue?.breedIds}
      />
      {petType === 'DOG' && (
        <Select
          label="Tamaño"
          control={control}
          name="size"
          options={Object.values(PET_SIZE).map(size => ({
            label: size,
            value: size,
          }))}
          rules={{ required: true }}
          defaultValue={defaultValue?.size}
        />
      )}
      <GenderInputRadioCard
        register={register}
        name="gender"
        rules={{ required: true }}
        errors={formState.errors}
        defaultValue={defaultValue?.gender}
      />
      <InputText
        label="Nivel de actividad"
        description="Del 1 al 10 valora cual es su nivel de actividad"
        register={register}
        name="activityLevel"
        type="number"
        rules={{
          required: true,
          pattern: {
            value: /^(10|[1-9])$/,
            message: 'Por favor introduce un número del 1 al 10',
          },
        }}
        errors={formState.errors}
        defaultValue={defaultValue?.activityLevel}
      />
      <InputText
        label="Sociabilidad con otros animales"
        description="Del 1 al 10 valora cual es su sociabilidad"
        register={register}
        name="sociability"
        type="number"
        rules={{
          required: true,
          pattern: {
            value: /^(10|[1-9])$/,
            message: 'Por favor introduce un número del 1 al 10',
          },
        }}
        errors={formState.errors}
        defaultValue={defaultValue?.sociability}
      />
      <Textarea
        name="description"
        label="Descripción"
        rows={8}
        register={register}
        rules={{ required: true }}
        errors={formState.errors}
      />
      <VStack width="100%" alignItems="flex-start">
        <FormLabel>¿Como me entregan?</FormLabel>
        {petCheckpoints.map(checkoint => (
          <Switch
            key={checkoint.value}
            labelAsTextStyle
            label={checkoint.label}
            name={`checkpoints.${checkoint.value}`}
            register={register}
            defaultChecked={defaultValue?.checkpoints[checkoint.value]}
            errors={formState.errors}
          />
        ))}
      </VStack>
      <Button
        type="submit"
        isLoading={
          handleSubmitForm.status === 'loading' || status === 'loading'
        }
        width="100%"
      >
        {submitButtonLabel}
      </Button>
    </VStack>
  );
};
