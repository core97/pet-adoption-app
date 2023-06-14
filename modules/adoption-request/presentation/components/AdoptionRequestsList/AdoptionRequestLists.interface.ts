import { AdoptionRequestDto } from '@adoption-request/dto';
import { AdoptionRequestCardProps } from '@adoption-request/presentation/components/AdoptionRequestCard/AdoptionRequestCard.interface';

export type AdoptionRequestsListProps = Pick<
  AdoptionRequestCardProps,
  'isUserRequest'
> & {
  requests: AdoptionRequestDto[];
};
