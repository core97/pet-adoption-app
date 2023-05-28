import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { PetAdUser } from '@pet-ad/presentation/components/PetAdUser';
import { petAdUserFinderById } from '@pet-ad/application/pet-ad-user-finder-by-id';
import { getBreedsList } from '@breed/presentation/breed-fetcher';
import { userAddressesFinder } from '@user/application/user-addresses-finder';
import { getSession } from '@shared/presentation/services/auth-service';
import { PAGES } from '@shared/application/pages';

const PetAdUserPage = async ({ params }: { params: { id: string } }) => {
  const session = await getSession(headers().get('cookie') ?? '');

  if (!session?.user?.email || !session?.user?.id) {
    redirect(PAGES.SIGN_IN);
  }

  const petAd = await petAdUserFinderById({
    id: params.id,
    userId: session.user.id,
  });

  const [breeds, addresses] = await Promise.all([
    getBreedsList({
      data: { petType: petAd.petType },
    }),
    userAddressesFinder(session.user.email),
  ]);

  return (
    <PetAdUser options={{ addresses, breeds: breeds.results }} petAd={petAd} />
  );
};

export default PetAdUserPage;
