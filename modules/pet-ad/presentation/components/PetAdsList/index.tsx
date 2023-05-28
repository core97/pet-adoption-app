'use client';

import { Link } from '@chakra-ui/next-js';
import { PetAd } from '@pet-ad/model';
import { PAGES } from '@shared/application/pages';

export const PetAdsList = ({ petAds }: { petAds: PetAd[] }) => (
  <ul>
    {petAds.map(petAd => (
      <li key={petAd.id}>
        <Link href={`${PAGES.USER_PET_ADS_LIST}/${petAd.id}`}>
          {petAd.name}
        </Link>
      </li>
    ))}
  </ul>
);
