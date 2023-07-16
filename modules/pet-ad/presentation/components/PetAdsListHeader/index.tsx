'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import { Icon } from '@components/Icon';
import { SelectCountryDrawer } from '@country/presentation/components/SelectCountryDrawer';
import { useCountriesStore } from '@country/presentation/country-store';
import { PetAdsFilterDrawer } from '@pet-ad/presentation/components/PetAdsFilterDrawer';
import { PetAdsListHeaderProps } from './PetAdsListHeader.interface';

export const PetAdsListHeader = ({
  onChangeCountry,
  breeds,
  onSubmitFilters,
}: PetAdsListHeaderProps) => {
  const { countries } = useCountriesStore();

  const countryDrawerHandler = useDisclosure();
  const filterDrawerHandler = useDisclosure();

  const params = useParams();

  const countryParam = Array.isArray(params?.country)
    ? undefined
    : params?.country;

  const selectedCountry = countries.find(
    ({ isoCode }) => isoCode === countryParam
  );

  return (
    <>
      <HStack justifyContent="space-between">
        <Button
          type="button"
          variant="outline"
          onClick={filterDrawerHandler.onOpen}
          leftIcon={<Icon iconName="filter" size={24} />}
        >
          Filtros
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={countryDrawerHandler.onOpen}
          leftIcon={
            <Image
              alt={countryParam || ''}
              src={`/flags/${countryParam}.svg`}
              width={30}
              height={20}
            />
          }
        >
          {selectedCountry?.name.es}
        </Button>
      </HStack>
      <SelectCountryDrawer
        countries={countries}
        isOpen={countryDrawerHandler.isOpen}
        onClose={countryDrawerHandler.onClose}
        onSelectCountry={onChangeCountry}
      />
      <PetAdsFilterDrawer
        breeds={breeds}
        isOpen={filterDrawerHandler.isOpen}
        onClose={filterDrawerHandler.onClose}
        onSubmit={onSubmitFilters}
        submitButtonLabel="Buscar"
      />
    </>
  );
};
