import { useForm } from 'react-hook-form';
import { VStack, Button } from '@chakra-ui/react';
import { useAsync } from '@hooks/useAsync';
import { InputText, Select, Switch } from '@components';
import { useUser } from '@user/presentation/hooks/useUser';
import { upsertUserAddress } from '@user/presentation/user-service';
import { COUNTRY_ISO } from '@shared/domain/country-iso';
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

  const { setUser } = useUser();

  const handleSubmitForm = useAsync(async (data: AddressFormFields) => {
    const address = await validateAddress(data);

    if (enableSaveAddress && data.shouldSaveAddress) {
      await upsertUserAddress(address);

      setUser(prev =>
        prev ? { ...prev, addresses: prev.addresses.concat(address) } : null
      );
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
        options={Object.values(COUNTRY_ISO).map(item => ({
          label: item,
          value: item,
        }))}
        defaultValue={defaultValue?.country}
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
