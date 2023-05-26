import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { PetAdCreationForm } from '@pet-ad/presentation/components/PetAdCreationForm';
import { getBreedsList } from '@breed/presentation/breed-fetcher';
import { userAddressesFinder } from '@user/application/user-addresses-finder';
import { getSession } from '@shared/presentation/services/auth-service';
import { PAGES } from '@shared/application/pages';

const PetAdCreation = async () => {
  const session = await getSession(headers().get('cookie') ?? '');

  if (!session?.user?.email) {
    redirect(PAGES.HOME);
  }

  const [breeds, addresses] = await Promise.all([
    getBreedsList({
      data: { petType: 'DOG' },
    }),
    userAddressesFinder(session.user.email),
  ]);

  return (
    <PetAdCreationForm
      petType="DOG"
      options={{ breeds: breeds.results, addresses }}
    />
  );
};

export default PetAdCreation;
