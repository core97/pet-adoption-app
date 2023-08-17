import { Breed } from '@breed/model';
import { PetAdCardProps } from '@pet-ad/presentation/components/PetAdCard/PetAdCard.interface';

export type PetAdsMarketListProps = {
  breeds: Pick<Breed, 'id' | 'name'>[];
  petAds: PetAdCardProps[];
  total: number;
};
