import { Address } from '@shared/domain/address';
import { FormProps } from '@shared/presentation/types/form-type';

export type AddressFormFields = Pick<
  Address,
  'city' | 'country' | 'postalCode' | 'streetName' | 'streetNumber'
> & { shouldSaveAddress?: boolean };

export type AddressSubmit = Address;

export type AddressDefaultValues = Address;

export type AddressFormProps = FormProps<
  AddressSubmit,
  AddressDefaultValues
> & { enableSaveAddress?: boolean };
