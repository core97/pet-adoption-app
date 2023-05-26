import { PetAdCreationForm } from '@pet-ad/presentation/components/PetAdCreationForm';
import { getBreedsList } from '@breed/presentation/breed-service';

const PetAdCreation = async () => {
  const breeds = await getBreedsList({ petType: 'DOG' });

  return (
    <PetAdCreationForm petType="DOG" options={{ breeds: breeds.results }} />
  );
};

export default PetAdCreation;
