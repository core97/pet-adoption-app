'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  UnorderedList,
  ListItem,
  Box,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { AdoptionRequestCard } from '@adoption-request/presentation/components/AdoptionRequestCard';
import { AdoptionRequestStatusModifier } from '@adoption-request/presentation/components/AdoptionRequestStatusModifier';
import { AdoptionRequestsListProps } from './AdoptionRequestLists.interface';

export const AdoptionRequestsList = ({
  requests,
}: AdoptionRequestsListProps) => {
  const [selectedRequestId, setSelectedRequestId] = useState<string>();

  const router = useRouter();

  const modalHandler = useDisclosure();

  if (!requests.length) {
    return (
      <Box>
        <Text>
          Aún no te han hecho ninguna solicitud de adopción sobre este anuncio
        </Text>
      </Box>
    );
  }

  return (
    <>
      <UnorderedList listStyleType="none">
        {requests.map(request => (
          <ListItem key={request.id}>
            <AdoptionRequestCard
              request={request}
              onClickModifyStatus={({ adoptionRequestId }) => {
                setSelectedRequestId(adoptionRequestId);
                modalHandler.onOpen();
              }}
            />
          </ListItem>
        ))}
      </UnorderedList>
      <AdoptionRequestStatusModifier
        isOpen={modalHandler.isOpen}
        onClose={modalHandler.onClose}
        adoptionRequestId={selectedRequestId}
        onModifyStatus={router.refresh}
      />
    </>
  );
};
