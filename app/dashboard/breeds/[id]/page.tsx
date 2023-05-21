import { breedFinderById } from '@breed/application/breed-finder-by-id';
import { BreedFormUpdate } from '@breed/presentation/components/BreedFormUpdate';

export const revalidate = 0;

const getBreedById = async (id: string) => {
  const breed = await breedFinderById({ id });
  return breed;
};

const BreedDetailDashboard = async ({ params }: { params: { id: string } }) => {
  const breed = await getBreedById(params.id);

  return (
    <BreedFormUpdate
      defaultValue={{
        images: breed.images,
        name: breed.name,
        petType: breed.petType,
      }}
    />
  );
};

export default BreedDetailDashboard;
