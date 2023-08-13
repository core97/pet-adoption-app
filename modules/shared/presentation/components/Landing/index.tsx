'use client';

import { Container, Heading, VStack } from '@chakra-ui/react';
import { useTranslation } from '@hooks/useTransalation';
import { InputRadio } from '@components/InputRadio';

export const Landing = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Heading>{t('name')}</Heading>
      <VStack width="100%">
      <InputRadio width="100%" id="juan" value="juan" name="name"><h1>Juan</h1></InputRadio>
      <InputRadio width="100%" id="pepe" value="pepe" name="name"><h1>Pepe</h1></InputRadio>
      </VStack>

    </Container>
  );
};
