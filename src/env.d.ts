/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_PROXY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
