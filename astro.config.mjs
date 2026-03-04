import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ku-tadao.github.io',
  base: '/ArcRaided',
  output: 'static',
  build: {
    assets: '_assets',
  },
});
