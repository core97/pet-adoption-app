import { PetAd } from '@pet-ad/model';
import { User } from '@user/model';
import { Address } from '@shared/domain/address';

export type PetAdDetailDto = Omit<PetAd, 'address'> & {
  address: Pick<Address, 'city' | 'country'>;
  user: Pick<User, 'name' | 'email'>;
};
