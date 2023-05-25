import { Address } from '@shared/domain/address';
import { FormProps } from '@shared/presentation/types/form-type';

export type SelectAddressFormFields = Pick<Address, 'placeId'>;

export type SelectAddressSubmit = Address;

export type SelectAddressDefaultValues = Pick<Address, 'placeId'>;

export type SelectAddressFormProps = FormProps<
  SelectAddressSubmit,
  SelectAddressDefaultValues
> & { addresses?: Address[] };
