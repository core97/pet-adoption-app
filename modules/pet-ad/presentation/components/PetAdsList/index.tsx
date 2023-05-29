'use client';

import { Link } from '@chakra-ui/next-js';
import { PetAd } from '@pet-ad/model';

export const PetAdsList = ({
  petAds,
  redirectOnClick,
}: {
  petAds: PetAd[];
  redirectOnClick: string;
}) => (
  <ul>
    {petAds.map(petAd => (
      <li key={petAd.id}>
        <Link href={`${redirectOnClick}/${petAd.id}`}>{petAd.name}</Link>
      </li>
    ))}
  </ul>
);
