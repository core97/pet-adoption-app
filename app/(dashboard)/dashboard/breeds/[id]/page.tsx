import { BreedFormUpdate } from '@breed/presentation/components/BreedFormUpdate';
import { getBreedById } from '@breed/presentation/breed-fetcher';

const BreedDetailDashboard = async ({ params }: { params: { id: string } }) => {
  const breed = await getBreedById({ data: { id: params.id } });

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
