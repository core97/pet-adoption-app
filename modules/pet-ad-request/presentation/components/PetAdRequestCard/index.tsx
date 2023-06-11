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
  PetAdRequestCardProps,
  colorRequestStatus,
} from './PetAdRequestCard.interface';

export const PetAdRequestCard = ({
  request,
  isUserRequest,
}: PetAdRequestCardProps) => (
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
          {request.adoptionSteps.some(
            adoptionStep =>
              adoptionStep.step === 'PREADOPTION_FORM' &&
              adoptionStep.status === 'ACCEPTED'
          ) && (
            <Button type="button" variant="link" size="sm">
              Crear visita
            </Button>
          )}

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
      <Text mb={2}>Proceso de la solicitud</Text>
      {request.adoptionSteps.map(({ status, step }) => (
        <HStack key={step}>
          <Text>{step}</Text>
          <Tag colorScheme={colorRequestStatus[status]}>{status}</Tag>
        </HStack>
      ))}
    </Box>
  </VStack>
);
