import { VStack, Button, Text } from '@chakra-ui/react';
import { FormStepIndicatorProps } from './FormStepIndicator.interface';

export const FormStepIndicator = ({
  index,
  isActive,
  onClick,
  disabled,
  isCompleted,
  label,
}: FormStepIndicatorProps) => (
  <VStack>
    <Button
      type="button"
      height="50px"
      width="50px"
      borderRadius="50%"
      colorScheme={isActive || isCompleted ? 'blue' : 'gray'}
      isDisabled={disabled}
      onClick={() => onClick(index)}
    >
      {index}
    </Button>
    {label && <Text whiteSpace="nowrap">{label}</Text>}
  </VStack>
);
