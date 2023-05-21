'use client';

import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { VStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { Table } from '@components/Table';
import { getBreedsList } from '@breed/presentation/breed-service';
import { DASHBOARD_PAGES } from '@shared/application/pages';

export const BreedTable = () => {
  const { data, isLoading } = useSWR(
    '/api/breeds',
    () => getBreedsList({ sortBy: { createdAt: 'desc' } }),
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
        columns={['id', 'name', 'petType']}
        rows={(data?.results || []).map(breed => ({
          id: breed.id,
          name: breed.name,
          petType: breed.petType,
        }))}
      />
    </VStack>
  );
};
