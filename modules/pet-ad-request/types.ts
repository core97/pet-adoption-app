import { PetAdRequest } from '@pet-ad-request/model';
import { PetAd } from '@pet-ad/model';
import { User } from '@user/model';

export type AdoptionRequest = PetAdRequest & {
  user: Pick<User, 'name'>;
  petAd: Pick<PetAd, 'name' | 'images'>;
};
