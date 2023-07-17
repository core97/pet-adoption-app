import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdoptionRequestsTabs } from '@adoption-request/presentation/components/AdoptionRequestsTabs';
import { adoptionRequestsFinderByUser } from '@adoption-request/application/adoption-requests-finder-by-user';
import { petAdsListFinderByUser } from '@pet-ad/application/pet-ads-list-finder-by-user';
import { getSession } from '@shared/presentation/services/auth-service';
import { PAGES } from '@shared/application/pages';

const AdoptionsRequests = async () => {
  const session = await getSession(headers().get('cookie') ?? '');

  if (!session?.user?.id) {
    redirect(PAGES.SIGN_IN);
  }

  const [requestsFromMe, petAds] = await Promise.all([
    adoptionRequestsFinderByUser({ userId: session.user.id }),
    petAdsListFinderByUser({ userId: session.user.id }),
  ]);

  return (
    <AdoptionRequestsTabs
      requestsFromMe={requestsFromMe.results}
      petAds={petAds.results}
    />
  );
};

export default AdoptionsRequests;
