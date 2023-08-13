'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Container } from '@chakra-ui/react';
import { PetAdsList } from '@pet-ad/presentation/components/PetAdsList';
import { PetAdsListHeader } from '@pet-ad/presentation/components/PetAdsListHeader';
import { PetAdsFilterFormSubmit } from '@pet-ad/presentation/components/PetAdsFilterDrawer';
import { PAGES } from '@shared/application/pages';
import { PetAdsMarketListProps } from './PetAdsMarketList.interface';

export const PetAdsMarketList = ({ petAds, breeds }: PetAdsMarketListProps) => {
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

  const handleOnSubmitFilters = (filters: PetAdsFilterFormSubmit) => {
    if (!pathname) return;

    let url = `${pathname}?`;

    if (filters.breed) {
      url += `&breed=${filters.breed}`;
    }

    if (filters.gender) {
      url += `&gender=${filters.gender}`;
    }

    if (filters.size) {
      url += `&size=${filters.size}`;
    }

    if (filters.activityLevel) {
      url += `&activityLevel=${filters.activityLevel}`;
    }

    if (filters.sortBy) {
      url += `&sortBy=${filters.sortBy}`;
    }

    if (filters.coordinates) {
      url += `&lng=${filters.coordinates.lng}&lat=${filters.coordinates.lat}`;
    }

    router.push(url);
  };

  return (
    <Container maxWidth="7xl">
      <PetAdsListHeader
        breeds={breeds}
        onChangeCountry={handleOnChangeCountry}
        onSubmitFilters={handleOnSubmitFilters}
      />
      <PetAdsList petAds={petAds} redirectOnClick={PAGES.PET_AD_DETAIL} />
    </Container>
  );
};
