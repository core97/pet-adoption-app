import { ThemingProps } from '@chakra-ui/react';
import { PetAdRequestStatus } from '@adoption-request/model';

export interface AdoptionRequestStatusModifierProps {
  isOpen: boolean;
  onClose: () => void;
  adoptionRequestId?: string;
  onModifyStatus?: () => void;
}

export const DESCRIPTION_BY_STATUS: {
  [key in PetAdRequestStatus]?: ThemingProps['colorScheme'];
} = {
  ACCEPTED: 'green',
  REJECTED: 'red',
};
