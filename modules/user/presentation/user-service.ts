import { fetcher } from '@shared/application/fetcher';
import type { Address } from '@shared/domain/address';

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/api/users`;

export const upsertUserAddress = async (address: Address) => {
  await fetcher(`${BASE_URL}/address`, {
    method: 'PUT',
    body: JSON.stringify(address),
  });
};

export const deleteUserAddress = async (placeId: Address['placeId']) => {
  await fetcher(`${BASE_URL}/address`, {
    method: 'DELETE',
    body: JSON.stringify({ placeId }),
  });
};