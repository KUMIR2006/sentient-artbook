import { defineConfig, createSystem, defaultConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'IBM Plex Mono', monospace` },
        body: { value: `'IBM Plex Mono', monospace` },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
