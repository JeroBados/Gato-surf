import { defineConfig } from 'astro/config';

// Sitio estático: se publica en Vercel (o cualquier hosting estático) sin servidor.
export default defineConfig({
  site: 'https://gatosurfhouses.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
  i18n: { defaultLocale: 'en', locales: ['en', 'es'], routing: { prefixDefaultLocale: false } },
});
