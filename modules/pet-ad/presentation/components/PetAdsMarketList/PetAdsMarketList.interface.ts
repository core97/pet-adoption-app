import { Country } from '@country/model';
import { PetAd } from '@pet-ad/model';

export type PetAdsMarketListProps = {
  counries: Country[];
  petAds: PetAd[];
  redirectOnClick: string;
};
