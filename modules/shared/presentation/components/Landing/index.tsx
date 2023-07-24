'use client';

import { Container, Heading } from '@chakra-ui/react';
import { useTranslation } from '@hooks/useTransalation';

export const Landing = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Heading>{t('name')}</Heading>
    </Container>
  );
};
