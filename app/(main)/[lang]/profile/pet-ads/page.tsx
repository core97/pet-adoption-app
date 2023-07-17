import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { PetAdsList } from '@pet-ad/presentation/components/PetAdsList';
import { petAdsListFinderByUser } from '@pet-ad/application/pet-ads-list-finder-by-user';
import { getSession } from '@shared/presentation/services/auth-service';
import { PAGES } from '@shared/application/pages';

const PetAdsListUser = async () => {
  const session = await getSession(headers().get('cookie') ?? '');

  if (!session?.user?.id) {
    redirect(PAGES.SIGN_IN);
  }

  const petAds = await petAdsListFinderByUser({ userId: session.user.id });

  return (
    <PetAdsList
      petAds={petAds.results}
      redirectOnClick={PAGES.USER_PET_ADS_LIST}
    />
  );
};

export default PetAdsListUser;
