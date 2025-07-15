import { defineConfig, createSystem, defaultConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'IBM Plex Mono', monospace` },
        body: { value: `'IBM Plex Mono', monospace` },
      },
      // можно добавить цветовые токены, semanticTokens и другие настройки
    },
    // можно добавить recipes, globalCss, conditions и пр.
  },
});

export const system = createSystem(defaultConfig, config);
