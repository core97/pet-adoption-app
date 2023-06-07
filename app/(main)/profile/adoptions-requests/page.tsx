import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { PetAdRequestsTabs } from '@pet-ad-request/presentation/components/PetAdsRequestsTabs';
import { petAdsRequestsFinderByUser } from '@pet-ad-request/application/pet-ads-requests-finder-by-user';
import { petAdsRequestsFinderByUserPetAds } from '@pet-ad-request/application/pet-ads-requests-finder-by-user-pet-ads';
import { getSession } from '@shared/presentation/services/auth-service';
import { PAGES } from '@shared/application/pages';

const AdoptionsRequests = async () => {
  const session = await getSession(headers().get('cookie') ?? '');

  if (!session?.user?.id) {
    redirect(PAGES.SIGN_IN);
  }

  const [requestsFromMe, requestsFromPetAds] = await Promise.all([
    petAdsRequestsFinderByUser({ userId: session.user.id }),
    petAdsRequestsFinderByUserPetAds({ userId: session.user.id }),
  ]);

  return (
    <PetAdRequestsTabs
      requestsFromMe={requestsFromMe.results}
      requestsFromPetAds={requestsFromPetAds.results}
    />
  );
};

export default AdoptionsRequests;
