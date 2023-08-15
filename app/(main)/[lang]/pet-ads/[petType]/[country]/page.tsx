import { redirect } from 'next/navigation';
import { getBreedsList } from '@breed/presentation/breed-fetcher';
import {
  petAdsListFinderByCountry,
  isValidPetAdSorTypeOptions,
} from '@pet-ad/application/pet-ad-list-finder-by-country';
import { PetAdsMarketList } from '@pet-ad/presentation/components/PetAdsMarketList';
import {
  LIMIT_PER_PET_ADS_PAGE,
  PET_ADS_PAGE_SEARCH_PARAM,
} from '@pet-ad/presentation/components/PetAdsMarketList/PetAdsMarketList.constants';
import { isValidPetType } from '@shared/domain/pet-type';
import { isValidActivityLevelLabel, isValidSize } from '@pet-ad/model';
import { isValidGender } from '@shared/domain/gender';
import { PAGES } from '@shared/application/pages';

const PetAdsMarketListByPetType = async ({
  params,
  searchParams,
}: {
  params: { petType: string; country: string };
  searchParams: {
    breed: string;
    gender: string;
    activityLevel: string;
    size: string;
    sortBy: string;
    lat: string;
    lng: string;
    [PET_ADS_PAGE_SEARCH_PARAM]: string;
  };
}) => {
  const petType = params.petType.toUpperCase();

  if (!isValidPetType(petType)) {
    redirect(PAGES.HOME);
  }

  const [petAds, breeds] = await Promise.all([
    petAdsListFinderByCountry({
      country: params.country,
      petType,
      ...(isValidGender(searchParams.gender) && {
        gender: searchParams.gender,
      }),
      ...(isValidActivityLevelLabel(searchParams.activityLevel) && {
        activityLevelLabel: searchParams.activityLevel,
      }),
      ...(isValidSize(searchParams.size) && {
        size: searchParams.size,
      }),
      ...(isValidPetAdSorTypeOptions(searchParams.sortBy) && {
        sortBy: searchParams.sortBy,
      }),
      ...(searchParams.lat &&
        searchParams.lng && {
          coordinates: {
            lat: Number(searchParams.lat),
            lng: Number(searchParams.lng),
          },
        }),
      ...(searchParams.breed &&
        typeof searchParams.breed === 'string' && {
          breedIds: [searchParams.breed],
        }),
      pagination: {
        page: Number(searchParams[PET_ADS_PAGE_SEARCH_PARAM] || 0),
        limit: LIMIT_PER_PET_ADS_PAGE,
      },
    }),
    getBreedsList({
      data: {
        petType,
      },
    }),
  ]);

  return (
    <PetAdsMarketList
      breeds={breeds.results}
      petAds={petAds.results}
      total={petAds.total}
    />
  );
};

export default PetAdsMarketListByPetType;
