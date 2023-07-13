import { fetcher, FetchCacheConfig } from '@shared/application/fetcher';
import type { Country } from '@country/model';
import type { CountriesListFinder } from '@country/application/country-list-finder';
import type { CountryUpdaterById } from '@country/application/country-updater-by-id';
import type { EntityCreation } from '@shared/domain/entity';

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/api/countries`;

export const COUNTRY_CACHE_TAGS = {
  LIST: 'country-list',
  DETAIL: 'country-:id',
};

export const createCountry = async (country: EntityCreation<Country>) => {
  const res = await fetcher(`${BASE_URL}?cacheTag=${COUNTRY_CACHE_TAGS.LIST}`, {
    method: 'POST',
    body: JSON.stringify(country),
  });

  return res;
};

export const getCountryById = async ({
  data: { id },
  cacheConfig,
}: FetchCacheConfig<Pick<Country, 'id'>>) => {
  const cacheTag = COUNTRY_CACHE_TAGS.DETAIL.replace(':id', id);

  const res = await fetcher<Country>(`${BASE_URL}/${id}?cacheTag=${cacheTag}`, {
    ...cacheConfig,
    method: 'GET',
    next: { ...cacheConfig?.next, tags: [cacheTag] },
  });

  return res;
};

export const getCountriesList = async ({
  data: { isAvailableToSearch } = {},
  cacheConfig,
}: FetchCacheConfig<Parameters<CountriesListFinder>[0]>) => {
  let url = `${BASE_URL}?`;

  if (typeof isAvailableToSearch === 'boolean') {
    url += `&isAvailableToSearch=${isAvailableToSearch}`;
  }

  const res = await fetcher<Country[]>(url, {
    ...cacheConfig,
    method: 'GET',
    next: {
      ...cacheConfig?.next,
      tags: [...(cacheConfig?.next?.tags || []), COUNTRY_CACHE_TAGS.LIST],
    },
  });

  return res;
};

export const updateCountryById = async ({
  data,
  searchParam,
}: Parameters<CountryUpdaterById>[0]) => {
  const res = await fetcher<Country>(
    `${BASE_URL}?cacheTag=${
      COUNTRY_CACHE_TAGS.LIST
    }&cacheTag=${COUNTRY_CACHE_TAGS.DETAIL.replace(':id', searchParam.id)}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ data, searchParam }),
    }
  );

  return res;
};
