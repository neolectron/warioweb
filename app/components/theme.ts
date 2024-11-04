import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  ...defaultConfig,
  strictTokens: true,
});

export const system = createSystem(config);
