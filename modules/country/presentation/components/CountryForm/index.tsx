'use client';

import { useForm } from 'react-hook-form';
import { VStack, Button, SimpleGrid } from '@chakra-ui/react';
import { InputText, Switch } from '@components';
import { Language } from '@shared/domain/languages';
import { CountryFormFields, CountryFormProps } from './CountryForm.interface';

export type {
  CountrySubmit,
  CountryDefaultValues,
} from './CountryForm.interface';

export const CountryForm = ({
  onSubmit,
  submitButtonLabel,
  defaultValue,
  status,
}: CountryFormProps) => {
  const { register, handleSubmit, formState } = useForm<CountryFormFields>();

  const handleSubmitForm = (data: CountryFormFields) => {
    onSubmit(data);
  };

  return (
    <VStack
      as="form"
      spacing={6}
      onSubmit={handleSubmit(handleSubmitForm)}
      py={8}
    >
      <InputText
        register={register}
        label="Código ISO"
        name="isoCode"
        rules={{ required: true, pattern: /^[a-z]{2}$/ }}
        defaultValue={defaultValue?.isoCode}
        errors={formState.errors}
      />
      <Switch
        register={register}
        label="¿Está disponible para realizar búsquedas?"
        name="isAvailableToSearch"
        defaultChecked={defaultValue?.isAvailableToSearch}
        errors={formState.errors}
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
      <Button type="submit" isLoading={status === 'loading'}>
        {submitButtonLabel}
      </Button>
    </VStack>
  );
};
