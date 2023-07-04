import { headers } from 'next/headers';
import { petAdFinderById } from '@pet-ad/application/pet-ad-finder-by-id';
import { PetAdDetail } from '@pet-ad/presentation/components/PetAdDetail';
import { getSession } from '@shared/presentation/services/auth-service';

/**
 * Creates the dynamic segment for the last created pet ads.
 * If the dynamic segment is not found, it will be generated on demand by default.
 */
/* export async function generateStaticParams() {
  const petAds = await prisma.petAd.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: { id: true },
  });

  return petAds.map(({ id }) => ({ id }));
} */

const PetAdDetailPage = async ({ params }: { params: { id: string } }) => {
  const session = await getSession(headers().get('cookie') ?? '');

  const petAd = await petAdFinderById({
    id: params.id,
    options: { requestingUser: session?.user?.id },
  });

  return <PetAdDetail petAd={petAd} />;
};

export default PetAdDetailPage;
