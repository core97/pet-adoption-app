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
  onClickModifyStatus,
}: AdoptionRequestCardProps) => (
  <VStack
    as="article"
    p={3}
    alignItems="flex-start"
    borderRadius={4}
    boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
  >
    <Box as="header">
      <VStack alignItems="flex-start">
        <Heading fontSize="xl" as="h4">
          {request.user.name || 'Usuario sin nombre'}
        </Heading>
        <HStack>
          <Text>Estado de la adopción</Text>
          <Tag ml={4} colorScheme={colorRequestStatus[request.status]}>
            {request.status}
          </Tag>
        </HStack>
      </VStack>

      <Box mt={4}>
        <Text>{request.user.email}</Text>
        <HStack>
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={() =>
              onClickModifyStatus({ adoptionRequestId: request.id })
            }
          >
            Modificar estado de la solicitud
          </Button>

          <Link href={`${PAGES.PREADOPTION_FORM}/${request.id}`}>
            Ver formulario de preadopción
          </Link>
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
