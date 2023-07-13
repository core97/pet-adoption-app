'use client';

import {
  CountryForm,
  CountrySubmit,
} from '@country/presentation/components/CountryForm';
import { createCountry } from '@country/presentation/country-fetcher';
import { DASHBOARD_PAGES } from '@shared/application/pages';
import { useAsync } from '@shared/presentation/hooks/useAsync';

const CountryCreation = () => {
  const handleSubmit = useAsync(
    async (data: CountrySubmit) => {
      await createCountry({
        isAvailableToSearch: data.isAvailableToSearch,
        isoCode: data.isoCode,
        name: data.name,
      });
    },
    {
      onSuccess: {
        redirect: DASHBOARD_PAGES.COUNTRIES,
      },
    }
  );

  return (
    <CountryForm
      onSubmit={handleSubmit.execute}
      status={handleSubmit.status}
      submitButtonLabel="Crear país"
    />
  );
};

export default CountryCreation;
