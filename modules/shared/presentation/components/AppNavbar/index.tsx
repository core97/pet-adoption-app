'use cient';

import { Stack, StackProps } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { useUserStore } from '@user/presentation/user-store';
import { PAGES } from '@shared/application/pages';
import { PET_TYPES } from '@shared/domain/pet-type';
import styles from './AppNavbar.module.css';

const DEFAULT_COUNTRY = 'es';

export const AppNavbar = ({
  direction,
}: {
  direction: StackProps['direction'];
}) => {
  const user = useUserStore();

  return (
    <Stack as="nav" direction={direction} className={styles.container}>
      <Link
        href={`${PAGES.PET_ADS_LIST}/${PET_TYPES.DOG.toLowerCase()}/${
          user.preferences?.searchCountry || DEFAULT_COUNTRY
        }`}
      >
        Perros
      </Link>
      <Link
        href={`${PAGES.PET_ADS_LIST}/${PET_TYPES.CAT.toLowerCase()}/${
          user.preferences?.searchCountry || DEFAULT_COUNTRY
        }`}
      >
        Gatos
      </Link>
    </Stack>
  );
};
