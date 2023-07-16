import { Breed } from '@breed/model';
import { PetAd } from '@pet-ad/model';

export type PetAdsMarketListProps = {
  breeds: Pick<Breed, 'id' | 'name'>[];
  petAds: PetAd[];
};
