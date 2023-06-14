import { AdoptionRequestDto } from '@adoption-request/dto';

export type AdoptionRequestsTabsProps = {
  requestsFromMe: AdoptionRequestDto[];
  requestsFromPetAds: AdoptionRequestDto[];
};
