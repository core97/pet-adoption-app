import { VStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { PAGES } from '@shared/application/pages';
import { PET_TYPES } from '@shared/domain/pet-type';

export const AppNavbarMobile = () => (
  <VStack as="nav">
    <Link href={`${PAGES.PET_ADS_LIST}/${PET_TYPES.DOG.toLowerCase()}`}>
      Perros
    </Link>
    <Link href={`${PAGES.PET_ADS_LIST}/${PET_TYPES.CAT.toLowerCase()}`}>
      Gatos
    </Link>
    <Link href={PAGES.USER_PET_ADS_LIST}>Mi cuenta</Link>
  </VStack>
);
