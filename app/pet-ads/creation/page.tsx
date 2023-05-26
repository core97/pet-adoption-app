import { PetAdCreationForm } from '@pet-ad/presentation/components/PetAdCreationForm';
import { getBreedsList } from '@/modules/breed/presentation/breed-fetcher';

const PetAdCreation = async () => {
  const breeds = await getBreedsList({
    data: { petType: 'DOG' },
  });

  return (
    <PetAdCreationForm petType="DOG" options={{ breeds: breeds.results }} />
  );
};

export default PetAdCreation;
