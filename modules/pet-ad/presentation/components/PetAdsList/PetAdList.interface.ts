import { SimpleGridProps } from '@chakra-ui/react';
import { PetAdCardProps } from '@pet-ad/presentation/components/PetAdCard/PetAdCard.interface';

export interface PetAdsListProps extends SimpleGridProps {
  petAds: PetAdCardProps[];
  redirectOnClick: string;
}
