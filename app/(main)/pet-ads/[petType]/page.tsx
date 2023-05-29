import { getPetAdsListByCountry } from '@pet-ad/presentation/pet-ad-fetcher';
import { PetAdsList } from '@pet-ad/presentation/components/PetAdsList';
import { PET_TYPES, isValidPetType } from '@shared/domain/pet-type';
import { PAGES } from '@shared/application/pages';

export function generateStaticParams() {
  return Object.values(PET_TYPES).map(petType => ({
    petType: petType.toLowerCase(),
  }));
}

const PetAdsListByPetType = async ({
  params,
}: {
  params: { petType: string };
}) => {
  const petType = params.petType.toUpperCase();

  const petAds = await getPetAdsListByCountry({
    data: { country: 'ES', ...(isValidPetType(petType) && { petType }) },
    cacheConfig: {
      next: { revalidate: 60 * 10 },
    },
  });

  return (
    <PetAdsList petAds={petAds.results} redirectOnClick={PAGES.PET_AD_DETAIL} />
  );
};

export default PetAdsListByPetType;
