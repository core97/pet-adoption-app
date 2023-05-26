'use client';

import { useParams } from 'next/navigation';
import {
  BreedForm,
  BreedDefaultValues,
  BreedSubmit,
} from '@breed/presentation/components/BreedForm';
import { updateBreedById } from '@breed/presentation/breed-fetcher';
import { useAsync } from '@hooks/useAsync';
import { DASHBOARD_PAGES } from '@shared/application/pages';

export const BreedFormUpdate = ({
  defaultValue,
}: {
  defaultValue: BreedDefaultValues;
}) => {
  const urlParams = useParams();

  const handleSubmit = useAsync(
    async (data: BreedSubmit) => {
      if (typeof urlParams?.id !== 'string') {
        return;
      }

      await updateBreedById({ data, searchParam: { id: urlParams.id } });
    },
    {
      onSuccess: { redirect: DASHBOARD_PAGES.BREEDS },
    }
  );

  return (
    <BreedForm
      status={handleSubmit.status}
      onSubmit={handleSubmit.execute}
      submitButtonLabel="Actualizar"
      defaultValue={defaultValue}
    />
  );
};
