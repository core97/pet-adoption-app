'use client';

import { VStack, Heading, UnorderedList, Text } from '@chakra-ui/react';
import { PreadoptionFormResponsesProps } from './PreadoptionFormresponses.interface';

export const PreadoptionFormResponses = ({
  formResult,
}: PreadoptionFormResponsesProps) => (
  <VStack>
    <Heading>Formulario de preadopción</Heading>
    <UnorderedList>
      {formResult.map(({ answer, question }) => (
        <VStack as="li" key={question}>
          <Text fontWeight={600}>{question}</Text>
          <Text>{answer}</Text>
        </VStack>
      ))}
    </UnorderedList>
  </VStack>
);
