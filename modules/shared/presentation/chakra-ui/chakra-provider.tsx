'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider as Provider } from '@chakra-ui/react';
import { chakraTheme } from './chakra-theme';

export const ChakraProvider = ({ children }: { children: React.ReactNode }) => (
  <CacheProvider>
    <Provider theme={chakraTheme}>{children}</Provider>
  </CacheProvider>
);
