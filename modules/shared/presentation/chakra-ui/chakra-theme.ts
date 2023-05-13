import {
  extendTheme,
  withDefaultVariant,
  ComponentStyleConfig,
} from '@chakra-ui/react';

const FormLabel: ComponentStyleConfig = {
  baseStyle: {
    color: 'gray.600',
    fontSize: 'md',
    fontWeight: 600,
  },
};

export const chakraTheme = extendTheme(
  {
    components: {
      FormLabel,
    },
  },
  withDefaultVariant({
    variant: 'filled',
    components: ['Input', 'Textarea'],
  })
);
