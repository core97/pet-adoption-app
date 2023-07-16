'use client';

import { useRef } from 'react';
import { Country } from '@country/model';
import { useCountriesStore } from '@country/presentation/country-store';

export const CountriesStoreInitializer = ({
  countries,
}: {
  countries: Country[];
}) => {
  const initialized = useRef<boolean>();

  if (!initialized.current) {
    useCountriesStore.setState({ countries });
    initialized.current = true;
  }

  return null;
};
