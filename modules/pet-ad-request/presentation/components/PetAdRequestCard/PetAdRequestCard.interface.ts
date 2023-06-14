import { ThemingProps } from '@chakra-ui/react';
import { PetAdRequest } from '@pet-ad-request/model';
import { AdoptionRequest } from '@/modules/pet-ad-request/types';

export type PetAdRequestCardProps = {
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
