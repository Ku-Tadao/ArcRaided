import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

export default defineConfig({
  site: 'https://ku-tadao.github.io',
  base: '/ArcRaided',
  output: 'static',

  build: {
    assets: '_assets',
  },

  integrations: [preact()],
});