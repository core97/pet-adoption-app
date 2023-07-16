import { getPetAdsListByCountry } from '@pet-ad/presentation/pet-ad-fetcher';
import { PetAdsMarketList } from '@pet-ad/presentation/components/PetAdsMarketList';
import { countryListFinder } from '@country/application/country-list-finder';
import { isValidPetType } from '@shared/domain/pet-type';
import { PAGES } from '@shared/application/pages';

/* export function generateStaticParams() {
  return Object.values(PET_TYPES).map(petType => ({
    petType: petType.toLowerCase(),
  }));
} */

const PetAdsMarketListByPetType = async ({
  params,
}: {
  params: { petType: string; country: string };
}) => {
  const petType = params.petType.toUpperCase();

  const [countries, petAds] = await Promise.all([
    countryListFinder({ isAvailableToSearch: true }),
    getPetAdsListByCountry({
      data: {
        country: params.country,
        ...(isValidPetType(petType) && { petType }),
      },
      cacheConfig: {
        next: { revalidate: 60 * 10 },
      },
    }),
  ]);

  return (
    <PetAdsMarketList
      counries={countries}
      petAds={petAds.results}
      redirectOnClick={PAGES.PET_AD_DETAIL}
    />
  );
};

export default PetAdsMarketListByPetType;
