'use client';

import { Link } from '@chakra-ui/next-js';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { PetAdCard } from '@pet-ad/presentation/components/PetAdCard';
import { PetAdsListProps } from './PetAdList.interface';
import styles from './PetAdsList.module.css';

export const PetAdsList = ({
  petAds,
  redirectOnClick,
  ...rest
}: PetAdsListProps) => (
  <SimpleGrid as="ul" columns={[4]} gap={4} {...rest}>
    {petAds.map(petAd => (
      <Box as="li" key={petAd.id}>
        <Link
          href={`${redirectOnClick}/${petAd.id}`}
          className={styles['pet-ad-list-item']}
        >
          <PetAdCard {...petAd} />
        </Link>
      </Box>
    ))}
  </SimpleGrid>
);
