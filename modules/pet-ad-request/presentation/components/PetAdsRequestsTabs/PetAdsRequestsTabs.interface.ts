import { AdoptionRequest } from '@/modules/pet-ad-request/types';

export type PetAdsRequestsTabsProps = {
  requestsFromMe: AdoptionRequest[];
  requestsFromPetAds: AdoptionRequest[];
};
