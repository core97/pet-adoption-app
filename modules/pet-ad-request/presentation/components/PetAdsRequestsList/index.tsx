'use client';

import { UnorderedList, ListItem, useDisclosure } from '@chakra-ui/react';
import { PetAdRequestCard } from '@pet-ad-request/presentation/components/PetAdRequestCard';
import { VisitSelectorModal } from '@visit/presentation/components/VisitSelectorModal';
import { PetAdsRequestsListProps } from './PetAdRequestList.interface';

export const PetAdRequestList = ({
  requests,
  isUserRequest,
}: PetAdsRequestsListProps) => {
  const visitModalHandler = useDisclosure();

  return (
    <>
      <UnorderedList listStyleType="none">
        {requests.map(request => (
          <ListItem key={request.id}>
            <PetAdRequestCard
              request={request}
              isUserRequest={isUserRequest}
              onClickCreateVisit={visitModalHandler.onOpen}
            />
          </ListItem>
        ))}
      </UnorderedList>
      <VisitSelectorModal
        isOpen={visitModalHandler.isOpen}
        onClose={visitModalHandler.onClose}
      />
    </>
  );
};
