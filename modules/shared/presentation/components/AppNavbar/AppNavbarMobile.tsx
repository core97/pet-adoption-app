import { VStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { PAGES } from '@shared/application/pages';

export const AppNavbarMobile = () => (
  <VStack as="nav">
    <Link href="/dogs">Perros</Link>
    <Link href="/cats">Gatos</Link>
    <Link href={PAGES.USER_PET_ADS_LIST}>Mi cuenta</Link>
  </VStack>
);
