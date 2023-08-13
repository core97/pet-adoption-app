'use client';

import { Link } from '@chakra-ui/next-js';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { PetAd } from '@pet-ad/model';
import { PetAdCard } from '@pet-ad/presentation/components/PetAdCard';

export const PetAdsList = ({
  petAds,
  redirectOnClick,
}: {
  petAds: PetAd[];
  redirectOnClick: string;
}) => (
  <SimpleGrid as="ul" columns={[4]} gap={4}>
    {petAds.map(petAd => (
      <Box as="li" key={petAd.id}>
        <Link href={`${redirectOnClick}/${petAd.id}`}>
          <PetAdCard {...petAd}/>
        </Link>
      </Box>
    ))}
  </SimpleGrid>
);
