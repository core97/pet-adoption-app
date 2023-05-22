import { fetcher } from '@shared/application/fetcher';
import type { Breed } from '@breed/model';
import type { BreedsListFinder } from '@breed/application/breeds-list-finder';
import type { BreedUpdaterById } from '@breed/application/breed-updater-by-id';
import type { EntityCreation } from '@shared/domain/entity';
import type { PaginationResult } from '@shared/domain/pagination';

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/api/breeds`;

export const createBreed = async (breed: EntityCreation<Breed>) => {
  const res = await fetcher(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(breed),
  });

  return res;
};

export const getBreedsList = async ({
  pagination,
  petType,
  sortBy,
}: Parameters<BreedsListFinder>[0]) => {
  let url = `${BASE_URL}?`;

  if (petType) {
    url += `petType=${petType}`;
  }

  if (pagination) {
    url += `page=${pagination.page}&limit=${pagination.limit}`;
  }

  if (sortBy) {
    Object.entries(sortBy).forEach(([key, value]) => {
      url += `${key}=${value}`;
    });
  }

  const res = await fetcher<PaginationResult<Breed>>(url);

  return res;
};

export const updateBreedById = async ({
  data,
  searchParam,
}: Parameters<BreedUpdaterById>[0]) => {
  const res = await fetcher<Breed>(BASE_URL, {
    method: 'PATCH',
    body: JSON.stringify({ data, searchParam }),
  });

  return res;
};
