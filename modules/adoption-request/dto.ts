import { PetAdRequest } from '@adoption-request/model';
import { PetAd } from '@pet-ad/model';
import { User } from '@user/model';

export type AdoptionRequestDto = PetAdRequest & {
  user: Pick<User, 'name' | 'email'>;
  petAd: Pick<PetAd, 'name' | 'images'>;
};
