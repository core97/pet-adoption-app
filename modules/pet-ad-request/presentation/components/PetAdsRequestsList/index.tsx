'use client';

import { UnorderedList, ListItem } from '@chakra-ui/react';
import { PetAdRequestCard } from '@pet-ad-request/presentation/components/PetAdRequestCard';
import { PetAdsRequestsListProps } from './PetAdRequestList.interface';

export const PetAdRequestList = ({
  requests,
  isUserRequest,
}: PetAdsRequestsListProps) => (
  <UnorderedList listStyleType="none">
    {requests.map(request => (
      <ListItem key={request.id}>
        <PetAdRequestCard request={request} isUserRequest={isUserRequest} />
      </ListItem>
    ))}
  </UnorderedList>
);
