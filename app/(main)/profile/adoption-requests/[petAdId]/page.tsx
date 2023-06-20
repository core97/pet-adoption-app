import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdoptionRequestsList } from '@adoption-request/presentation/components/AdoptionRequestsList';
import { adoptionRequestsFinderByUserPetAds } from '@adoption-request/application/adoption-requests-finder-by-user-pet-ads';
import { getSession } from '@shared/presentation/services/auth-service';
import { PAGES } from '@shared/application/pages';

const AdoptionsRequests = async ({
  params,
}: {
  params: { petAdId: string };
}) => {
  const session = await getSession(headers().get('cookie') ?? '');

  if (!session?.user?.id) {
    redirect(PAGES.SIGN_IN);
  }

  const requestsFromPetAds = await adoptionRequestsFinderByUserPetAds({
    userId: session.user.id,
    petAdId: params.petAdId,
  });

  return requestsFromPetAds.results.length ? (
    <AdoptionRequestsList requests={requestsFromPetAds.results} />
  ) : (
    <p>Aún no te han hecho ninguna solicitud de adopción sobre este anuncio</p>
  );
};

export default AdoptionsRequests;
