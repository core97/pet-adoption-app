import { AdoptionRequestDto } from '@pet-ad-request/types';
import { PetAdRequestCardProps } from '@pet-ad-request/presentation/components/PetAdRequestCard/PetAdRequestCard.interface';

export type PetAdsRequestsListProps = Pick<
  PetAdRequestCardProps,
  'isUserRequest'
> & {
  requests: AdoptionRequestDto[];
};
