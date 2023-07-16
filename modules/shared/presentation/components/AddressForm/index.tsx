import { useForm } from 'react-hook-form';
import { VStack, Button } from '@chakra-ui/react';
import { useAsync } from '@hooks/useAsync';
import { InputText, Select, Switch } from '@components';
import { upsertUserAddress } from '@user/presentation/user-service';
import { useCountriesStore } from '@country/presentation/country-store';
import { AppClientError } from '@shared/application/errors/app-client-error';
import { validateAddress } from '@shared/presentation/services/address-service';
import { AddressFormProps, AddressFormFields } from './AddressForm.interface';

export type {
  AddressDefaultValues,
  AddressSubmit,
} from './AddressForm.interface';

export const AddressForm = ({
  onSubmit,
  submitButtonLabel,
  defaultValue,
  status,
  enableSaveAddress,
}: AddressFormProps) => {
  const { register, control, handleSubmit, formState } =
    useForm<AddressFormFields>();

  const { countries } = useCountriesStore();

  const handleSubmitForm = useAsync(async (data: AddressFormFields) => {
    const address = await validateAddress(data);

    const isValidCountry = countries.some(
      ({ isoCode }) => isoCode === address.country.toLowerCase()
    );

    if (!isValidCountry) {
      throw new AppClientError(
        'Lo sentimos, no ofrecemos nuestros servicios en el país introducido.'
      );
    }

    if (enableSaveAddress && data.shouldSaveAddress) {
      await upsertUserAddress(address);
    }

    onSubmit(address);
  });

  return (
    <VStack
      as="form"
      spacing={6}
      onSubmit={handleSubmit(handleSubmitForm.execute)}
      py={8}
    >
      <Select
        label="País"
        control={control}
        name="country"
        defaultValue={defaultValue?.country}
        options={countries.map(item => ({
          label: item.name.es,
          value: item.isoCode,
        }))}
      />
      <InputText
        label="Ciudad"
        register={register}
        name="city"
        errors={formState.errors}
        rules={{ required: true }}
        defaultValue={defaultValue?.city}
      />
      <InputText
        label="Calle"
        register={register}
        name="streetName"
        errors={formState.errors}
        rules={{ required: true }}
        defaultValue={defaultValue?.streetName}
      />
      <InputText
        label="Número de la calle"
        type="number"
        register={register}
        name="streetNumber"
        errors={formState.errors}
        rules={{ required: true }}
        defaultValue={defaultValue?.streetNumber ?? ''}
      />
      <InputText
        label="Código postal"
        type="number"
        register={register}
        name="postalCode"
        errors={formState.errors}
        rules={{ required: true }}
        defaultValue={defaultValue?.postalCode.toString()}
      />
      {Boolean(!defaultValue && enableSaveAddress) && (
        <Switch
          label="Marca si quieres guardar la dirección"
          register={register}
          name="shouldSaveAddress"
          errors={formState.errors}
        />
      )}
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
