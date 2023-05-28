import { PetAd } from '@pet-ad/model';
import { Breed } from '@breed/model';
import { Address } from '@shared/domain/address';

export type PetAdUserProps = {
  petAd: PetAd;
  options: { addresses: Address[]; breeds: Breed[] };
};
