'use client';

import {
  BreedForm,
  BreedSubmit,
} from '@breed/presentation/components/BreedForm';
import { createBreed } from '@breed/presentation/breed-service';
import { DASHBOARD_PAGES } from '@shared/application/pages';
import { useAsync } from '@shared/presentation/hooks/useAsync';

const BreedCreation = () => {
  const handleSubmit = useAsync(
    async (data: BreedSubmit) => {
      await createBreed({
        images: data.images,
        name: data.name,
        petAdsId: [],
        petType: data.petType,
      });
    },
    {
      onSuccess: {
        redirect: DASHBOARD_PAGES.BREEDS,
      },
    }
  );

  return (
    <BreedForm
      onSubmit={handleSubmit.execute}
      status={handleSubmit.status}
      submitButtonLabel="Crear raza"
    />
  );
};

export default BreedCreation;
