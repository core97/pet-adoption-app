'use client';

import { UnorderedList, ListItem } from '@chakra-ui/react';
import { AdoptionRequestCard } from '@adoption-request/presentation/components/AdoptionRequestCard';
import { AdoptionRequestsListProps } from './AdoptionRequestLists.interface';

export const AdoptionRequestsList = ({
  requests,
  isUserRequest,
}: AdoptionRequestsListProps) => (
  <UnorderedList listStyleType="none">
    {requests.map(request => (
      <ListItem key={request.id}>
        <AdoptionRequestCard request={request} isUserRequest={isUserRequest} />
      </ListItem>
    ))}
  </UnorderedList>
);
