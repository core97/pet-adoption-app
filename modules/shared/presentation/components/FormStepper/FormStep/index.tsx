import { memo } from 'react';
import { Box } from '@chakra-ui/react';
import { FormStepProps } from './FormStep.interface';

// eslint-disable-next-line react/display-name
export const FormStep = memo(({ children }: FormStepProps) => (
  <Box>{children}</Box>
));
