import { fetcher } from '@shared/application/fetcher';
import type { PetAd } from '@pet-ad/model';
import type { EntityCreation } from '@shared/domain/entity';

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/api/pet-ads`;

export const PET_AD_CACHE_TAGS = {}

export const createPetAd = async (petAd: EntityCreation<PetAd>) => {
  const res = await fetcher<PetAd>(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(petAd),
  });

  return res;
};
