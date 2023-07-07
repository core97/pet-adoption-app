import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { petAdsListFinderByFavourites } from '@pet-ad/application/pet-ad-list-finder-by-favourites';
import { PetAdsList } from '@pet-ad/presentation/components/PetAdsList';
import { getSession } from '@shared/presentation/services/auth-service';
import { PAGES } from '@shared/application/pages';

const FavouritesPetsAds = async () => {
  const session = await getSession(headers().get('cookie') ?? '');

  if (!session?.user?.id) {
    redirect(PAGES.SIGN_IN);
  }

  const petAds = await petAdsListFinderByFavourites({
    userId: session.user.id,
  });

  return (
    <PetAdsList petAds={petAds.results} redirectOnClick={PAGES.PET_AD_DETAIL} />
  );
};

export default FavouritesPetsAds;
