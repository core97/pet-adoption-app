import { ThemingProps } from '@chakra-ui/react';
import { PetAdRequest } from '@adoption-request/model';
import { AdoptionRequestDto } from '@adoption-request/dto';

export type AdoptionRequestCardProps = {
  request: AdoptionRequestDto;
  onClickModifyStatus: (params: { adoptionRequestId: string }) => void;
};

export const colorRequestStatus: Record<
  PetAdRequest['status'],
  ThemingProps['colorScheme']
> = {
  ACCEPTED: 'green',
  PENDING: 'gray',
  REJECTED: 'red',
};
