import { PetAd } from '@pet-ad/model';
import { Breed } from '@breed/model';
import { Address } from '@shared/domain/address';

export type PetAdCardProps = Pick<
  PetAd,
  'name' | 'gender' | 'images' | 'petType' | 'id'
> & { address: Pick<Address, 'city'>; breeds: Pick<Breed, 'name'>[] };
