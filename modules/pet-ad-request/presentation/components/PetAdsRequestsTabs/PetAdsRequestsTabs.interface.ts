import { AdoptionRequestDto } from '@pet-ad-request/types';

export type PetAdsRequestsTabsProps = {
  requestsFromMe: AdoptionRequestDto[];
  requestsFromPetAds: AdoptionRequestDto[];
};
