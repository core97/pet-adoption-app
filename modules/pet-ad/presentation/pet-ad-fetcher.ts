import type { PetAd } from '@pet-ad/model';
import { PetAdDetailDto } from '@pet-ad/dto';
import { fetcher, FetchCacheConfig } from '@shared/application/fetcher';
import type { EntityCreation } from '@shared/domain/entity';
import type { PaginationResult } from '@shared/domain/pagination';
import type { PetAdUpdaterById } from '@pet-ad/application/pet-ad-updater-by-id';
import type { PetAdsListFinderByCountry } from '@pet-ad/application/pet-ad-list-finder-by-country';

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
  const url = `${BASE_URL}?cacheTag=${PET_AD_CACHE_TAGS.DETAIL.replace(
    ':id',
    searchParam.id
  )}`;

  const res = await fetcher<PetAd>(url, {
    method: 'PATCH',
    body: JSON.stringify({ data, searchParam }),
  });

  return res;
};

export const getPetAdsListByCountry = async ({
  data: { country, breedIds, pagination, petType, sortBy },
  cacheConfig,
}: FetchCacheConfig<Parameters<PetAdsListFinderByCountry>[0]>) => {
  let url = `${BASE_URL}?country=${country.toUpperCase()}`;

  if (petType) {
    url += `&petType=${petType}`;
  }

  if (breedIds?.length) {
    breedIds.forEach(breed => {
      url += `&breedIds=${breed}`;
    });
  }

  if (pagination) {
    url += `&page=${pagination.page}&limit=${pagination.limit}`;
  }

  if (sortBy) {
    Object.entries(sortBy).forEach(([key, value]) => {
      url += `&${key}=${value}`;
    });
  }

  const res = await fetcher<PaginationResult<PetAd>>(url, {
    ...cacheConfig,
    method: 'GET',
    next: {
      ...(!cacheConfig?.next?.revalidate && { revalidate: 60 * 5 }),
      tags: [...(cacheConfig?.next?.tags || []), PET_AD_CACHE_TAGS.LIST],
    },
  });

  return res;
};

export const getPetAdById = async ({
  data: { id },
  cacheConfig,
}: FetchCacheConfig<Pick<PetAd, 'id'>>) => {
  const cacheTag = PET_AD_CACHE_TAGS.DETAIL.replace(':id', id);

  const res = await fetcher<PetAdDetailDto>(`${BASE_URL}/${id}`, {
    ...cacheConfig,
    method: 'GET',
    next: { ...cacheConfig?.next, tags: [cacheTag] },
  });

  return res;
};

export const updatePetAdAsFavourite = async ({ id }: Pick<PetAd, 'id'>) => {
  const res = await fetcher<PetAdDetailDto>(`${BASE_URL}/favourite/${id}`, {
    method: 'PUT',
  });

  return res;
};
