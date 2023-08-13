import { redirect } from 'next/navigation';
import { getBreedsList } from '@breed/presentation/breed-fetcher';
import { getPetAdsListByCountry } from '@pet-ad/presentation/pet-ad-fetcher';
import { PetAdsMarketList } from '@pet-ad/presentation/components/PetAdsMarketList';
// TODO: mover este tipo de aquí
import { isValidSorTypeOptions } from '@pet-ad/presentation/components/PetAdsFilterDrawer/PetAdsFilterDrawer.utils';
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
  };
}) => {
  const petType = params.petType.toUpperCase();

  if (!isValidPetType(petType)) {
    redirect(PAGES.HOME);
  }

  const [petAds, breeds] = await Promise.all([
    getPetAdsListByCountry({
      data: {
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
        ...(isValidSorTypeOptions(searchParams.sortBy) && {
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
      },
      cacheConfig: {
        next: { revalidate: 60 * 10 },
      },
    }),
    getBreedsList({
      data: {
        petType,
      },
    }),
  ]);

  return <PetAdsMarketList breeds={breeds.results} petAds={petAds.results} />;
};

export default PetAdsMarketListByPetType;
