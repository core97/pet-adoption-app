'use client';

import { Heading, VStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { DASHBOARD_PAGES } from '@shared/application/pages';

export const DashboardNavbar = () => (
  <VStack alignItems="flex-start" p={6} spacing={4}>
    <Heading as="h4" size="md">
      <VStack alignItems="flex-start">
        <Link href={DASHBOARD_PAGES.BREEDS}>Razas</Link>
        <Link href={DASHBOARD_PAGES.COUNTRIES}>Paises</Link>
      </VStack>
    </Heading>
  </VStack>
);
