import { SelectCountryDrawerProps } from '@country/presentation/components/SelectCountryDrawer/SelectCountryDrawer.interface';

export type PetAdsMarketListFiltersProps = Pick<
  SelectCountryDrawerProps,
  'countries'
> & {
  onChangeCountry: (countryIso: string) => void;
};
