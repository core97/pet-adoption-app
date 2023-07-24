'use client';

import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { VStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { Table } from '@components/Table';
import { DASHBOARD_PAGES } from '@shared/application/pages';
import {
  getBreedsList,
  BREED_CACHE_TAGS,
} from '@breed/presentation/breed-fetcher';

export const BreedTable = () => {
  const { data, isLoading } = useSWR(
    BREED_CACHE_TAGS.LIST,
    () => getBreedsList({ data: { sortBy: { createdAt: 'desc' } } }),
    {}
  );

  const router = useRouter();

  return (
    <VStack width="100%" spacing={4} alignItems="flex-start">
      <Link href={`${DASHBOARD_PAGES.BREEDS}/creation`}>Crear raza</Link>
      <Table
        enableGlobalFilter
        isLoading={isLoading}
        onClickRow={({ id }) => router.push(`${DASHBOARD_PAGES.BREEDS}/${id}`)}
        total={data?.total}
        columns={{
          id: { name: 'ID' },
          name: { name: 'Nombre' },
          petType: { name: 'Tipo mascota' },
        }}
        rows={(data?.results || []).map(breed => ({
          id: breed.id,
          name: breed.name.es,
          petType: breed.petType,
        }))}
      />
    </VStack>
  );
};
