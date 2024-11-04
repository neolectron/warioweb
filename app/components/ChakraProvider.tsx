'use client';

import { ChakraProvider as DefaultChakraProvider } from '@chakra-ui/react';
import { system } from './theme';

export const ChakraProvider = ({ children }: React.PropsWithChildren) => (
  <DefaultChakraProvider value={system}>{children}</DefaultChakraProvider>
);
