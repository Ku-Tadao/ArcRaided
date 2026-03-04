/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_PROXY_URL?: string;
  readonly PUBLIC_ARC_PROVIDER?: 'arc' | 'metaforge' | 'ardb';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
