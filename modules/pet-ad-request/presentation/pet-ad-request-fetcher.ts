import type { PetAdRequest } from '@pet-ad-request/model';
import { fetcher } from '@shared/application/fetcher';
import type { EntityCreation } from '@shared/domain/entity';

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/api/pet-ads-requests`;

export const PET_AD_REQUEST_CACHE_TAGS = {};

export const createPetAdRequest = async (
  petAdRequest: Omit<EntityCreation<PetAdRequest>, 'userId' | 'adoptionSteps'>
) => {
  const res = await fetcher<PetAdRequest>(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(petAdRequest),
    cache: 'no-cache',
  });

  return res;
};
