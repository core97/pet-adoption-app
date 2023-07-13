'use client';

import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { VStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { Table } from '@components/Table';
import { DASHBOARD_PAGES } from '@shared/application/pages';
import {
  getCountriesList,
  COUNTRY_CACHE_TAGS,
} from '@country/presentation/country-fetcher';

export const CountryTable = () => {
  const { data, isLoading } = useSWR(
    COUNTRY_CACHE_TAGS.LIST,
    () => getCountriesList({ data: {} }),
    {}
  );

  const router = useRouter();

  return (
    <VStack width="100%" spacing={4} alignItems="flex-start">
      <Link href={`${DASHBOARD_PAGES.COUNTRIES}/creation`}>Crear país</Link>
      <Table
        enableGlobalFilter
        isLoading={isLoading}
        onClickRow={({ id }) => router.push(`${DASHBOARD_PAGES.COUNTRIES}/${id}`)}
        total={data?.length}
        columns={{
          id: { name: 'ID' },
          isoCode: { name: 'ISO' },
        }}
        rows={(data || []).map(country => ({
          id: country.id,
          isoCode: country.isoCode,
        }))}
      />
    </VStack>
  );
};
