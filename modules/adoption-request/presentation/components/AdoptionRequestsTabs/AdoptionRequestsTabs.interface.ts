import { AdoptionRequestDto } from '@adoption-request/dto';
import { PetAd } from '@pet-ad/model';

export type AdoptionRequestsTabsProps = {
  requestsFromMe: AdoptionRequestDto[];
  petAds: Pick<PetAd, 'id' | 'name'>[];
};
