import { User, PreadoptionForm } from '@user/model';
import { fetcher } from '@shared/application/fetcher';
import type { Address } from '@shared/domain/address';

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/api/users`;

export const USER_CACHE_TAGS = {};

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

export const upsertUserPreadoptionForm = async (
  preadoptionForm: PreadoptionForm
) => {
  const res = await fetcher<Omit<User, 'password'>>(`${BASE_URL}/preadoption-form`, {
    method: 'PUT',
    body: JSON.stringify(preadoptionForm),
  });

  return res;
};
