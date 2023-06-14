'use client';

import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
} from '@chakra-ui/react';
import { PAGES } from '@shared/application/pages';
import {
  AdoptionRequestCardProps,
  colorRequestStatus,
} from './AdoptionRequestCard.interface';

export const AdoptionRequestCard = ({
  request,
  isUserRequest,
}: AdoptionRequestCardProps) => (
  <VStack
    as="article"
    p={3}
    alignItems="flex-start"
    borderRadius={4}
    boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
  >
    <Box as="header">
      <Heading fontSize="xl" as="h4">
        {request.petAd.name}
      </Heading>

      <Box>
        {!isUserRequest && (
          <Text>{request.user.name || 'Usuario sin nombre'}</Text>
        )}

        <HStack>
          {!isUserRequest && (
            <>
              <Button type="button" variant="link" size="sm">
                Modificar estado de la solicitud
              </Button>

              <Link
                href={`${PAGES.PREADOPTION_FORM}/${request.id}/${request.petAdId}/${request.userId}`}
              >
                Ver formulario de preadopción
              </Link>
            </>
          )}
        </HStack>
      </Box>
    </Box>
    <Box as="main">
      <Text mb={2}>Proceso de la adopción</Text>
      {request.steps.map(({ status, step }) => (
        <HStack key={step}>
          <Text>{step}</Text>
          <Tag colorScheme={colorRequestStatus[status]}>{status}</Tag>
        </HStack>
      ))}
    </Box>
  </VStack>
);
