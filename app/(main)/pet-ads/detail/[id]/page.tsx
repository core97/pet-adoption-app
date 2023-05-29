import { getPetAdById } from '@pet-ad/presentation/pet-ad-fetcher';
import { PetAdDetail } from '@pet-ad/presentation/components/PetAdDetail';
import prisma from '@shared/application/prisma';

/**
 * Creates the dynamic segment for the last created pet ads.
 * If the dynamic segment is not found, it will be generated on demand by default.
 */
export async function generateStaticParams() {
  const petAds = await prisma.petAd.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: { id: true },
  });

  return petAds.map(({ id }) => ({ id }));
}

const PetAdDetailPage = async ({ params }: { params: { id: string } }) => {
  const petAd = await getPetAdById({ data: { id: params.id } });

  return <PetAdDetail petAd={petAd} />;
};

export default PetAdDetailPage;
