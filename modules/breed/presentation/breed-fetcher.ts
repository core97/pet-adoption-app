import { fetcher, FetchCacheConfig } from '@shared/application/fetcher';
import type { Breed } from '@breed/model';
import type { BreedsListFinder } from '@breed/application/breeds-list-finder';
import type { BreedUpdaterById } from '@breed/application/breed-updater-by-id';
import type { EntityCreation } from '@shared/domain/entity';
import type { PaginationResult } from '@shared/domain/pagination';

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/api/breeds`;

export const BREED_CACHE_TAGS = {
  LIST: 'breed-list',
  DETAIL: 'breed-:id',
};

export const createBreed = async (breed: EntityCreation<Breed>) => {
  const res = await fetcher(`${BASE_URL}?cacheTag=${BREED_CACHE_TAGS.LIST}`, {
    method: 'POST',
    body: JSON.stringify(breed),
  });

  return res;
};

export const getBreedById = async ({
  data: { id },
  cacheConfig,
}: FetchCacheConfig<Pick<Breed, 'id'>>) => {
  const cacheTag = BREED_CACHE_TAGS.DETAIL.replace(':id', id);

  const res = await fetcher<Breed>(`${BASE_URL}/${id}?cacheTag=${cacheTag}`, {
    ...cacheConfig,
    method: 'GET',
    next: { ...cacheConfig?.next, tags: [cacheTag] },
  });

  return res;
};

export const getBreedsList = async ({
  data: { pagination, petType, sortBy },
  cacheConfig,
}: FetchCacheConfig<Parameters<BreedsListFinder>[0]>) => {
  let url = `${BASE_URL}?`;

  if (petType) {
    url += `&petType=${petType}`;
  }

  if (pagination) {
    url += `&page=${pagination.page}&limit=${pagination.limit}`;
  }

  if (sortBy) {
    Object.entries(sortBy).forEach(([key, value]) => {
      url += `&${key}=${value}`;
    });
  }

  const res = await fetcher<PaginationResult<Breed>>(url, {
    ...cacheConfig,
    method: 'GET',
    next: {
      ...cacheConfig?.next,
      tags: [...(cacheConfig?.next?.tags || []), BREED_CACHE_TAGS.LIST],
    },
  });

  return res;
};

export const updateBreedById = async ({
  data,
  searchParam,
}: Parameters<BreedUpdaterById>[0]) => {
  const res = await fetcher<Breed>(
    `${BASE_URL}?cacheTag=${
      BREED_CACHE_TAGS.LIST
    }&cacheTag=${BREED_CACHE_TAGS.DETAIL.replace(':id', searchParam.id)}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ data, searchParam }),
    }
  );

  return res;
};
