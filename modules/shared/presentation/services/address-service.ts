import { Address } from '@shared/domain/address';
import { fetcher } from '@shared/application/fetcher';
import { AddressFormFields } from '@components/AddressForm/AddressForm.interface';

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/api/addresses`;

export const validateAddress = async ({
  city,
  country,
  postalCode,
  streetName,
  streetNumber,
}: AddressFormFields) => {
  const address = await fetcher<Address>(`${BASE_URL}/validate`, {
    method: 'PUT',
    body: JSON.stringify({
      city,
      country,
      postalCode,
      streetName,
      streetNumber,
    }),
  });

  return address;
};
