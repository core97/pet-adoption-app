'use client';

import { useParams } from 'next/navigation';
import {
  CountryDefaultValues,
  CountryForm,
  CountrySubmit,
} from '@country/presentation/components/CountryForm';
import { updateCountryById } from '@country/presentation/country-fetcher';
import { useAsync } from '@hooks/useAsync';
import { DASHBOARD_PAGES } from '@shared/application/pages';

export const CountryFormUpdate = ({
  defaultValue,
}: {
  defaultValue: CountryDefaultValues;
}) => {
  const urlParams = useParams();

  const handleSubmit = useAsync(
    async (data: CountrySubmit) => {
      if (typeof urlParams?.id !== 'string') {
        return;
      }

      await updateCountryById({ data, searchParam: { id: urlParams.id } });
    },
    {
      onSuccess: { redirect: DASHBOARD_PAGES.COUNTRIES },
    }
  );

  return (
    <CountryForm
      status={handleSubmit.status}
      onSubmit={handleSubmit.execute}
      submitButtonLabel="Actualizar"
      defaultValue={defaultValue}
    />
  );
};
