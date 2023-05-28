import type { PetAd } from '@pet-ad/model';
import { fetcher } from '@shared/application/fetcher';
import type { EntityCreation } from '@shared/domain/entity';
import type { PetAdUpdaterById } from '@pet-ad/application/pet-ad-updater-by-id';

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/api/pet-ads`;

export const PET_AD_CACHE_TAGS = {
  DETAIL: 'pet-ad-:id',
  LIST: 'pet-ads-list',
};

export const createPetAd = async (
  petAd: Omit<EntityCreation<PetAd>, 'userId'>
) => {
  const res = await fetcher<PetAd>(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(petAd),
  });

  return res;
};

export const updatePetAdById = async ({
  data,
  searchParam,
}: Parameters<PetAdUpdaterById>[0]) => {
  /**
   * TODO: añadir "cacheTag" para la lista y el detalle cuando se creen
   */
  const res = await fetcher<PetAd>(BASE_URL, {
    method: 'PATCH',
    body: JSON.stringify({ data, searchParam }),
  });

  return res;
};
