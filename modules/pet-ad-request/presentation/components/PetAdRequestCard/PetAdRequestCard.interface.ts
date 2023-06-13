import { ThemingProps } from '@chakra-ui/react';
import { PetAdRequest } from '@pet-ad-request/model';
import { AdoptionRequest } from '@/modules/pet-ad-request/types';

export type PetAdRequestCardProps = {
  onClickCreateVisit: (request: AdoptionRequest) => void;
  request: AdoptionRequest;
  isUserRequest?: boolean;
};

export const colorRequestStatus: Record<
  PetAdRequest['status'],
  ThemingProps['colorScheme']
> = {
  ACCEPTED: 'green',
  PENDING: 'gray',
  REJECTED: 'red',
};
