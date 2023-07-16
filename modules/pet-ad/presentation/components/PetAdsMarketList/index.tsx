'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Link } from '@chakra-ui/next-js';
import { Container } from '@chakra-ui/react';
import { PetAdsMarketListFilters } from '@pet-ad/presentation/components/PetAdsMarketListFilters';
import { PetAdsMarketListProps } from './PetAdsMarketList.interface';

export const PetAdsMarketList = ({
  petAds,
  redirectOnClick,
  counries,
}: PetAdsMarketListProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleOnChangeCountry = (countryIso: string) => {
    if (!pathname) return;

    const urlInArray = pathname.split('/');

    urlInArray.pop();

    let url = `${urlInArray.join('/')}/${countryIso}`;

    if (window.location.search) {
      url += window.location.search;
    }

    router.push(url);
  };

  return (
    <Container maxWidth="7xl">
      <PetAdsMarketListFilters
        countries={counries}
        onChangeCountry={handleOnChangeCountry}
      />
      <ul>
        {petAds.map(petAd => (
          <li key={petAd.id}>
            <Link href={`${redirectOnClick}/${petAd.id}`}>{petAd.name}</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};
