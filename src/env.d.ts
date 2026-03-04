/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ARC_API_BASE_URL?: string;
  readonly ARC_API_KEY?: string;
  readonly API_DEFAULT_LIMIT?: string;
  readonly API_REQUEST_TIMEOUT_MS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
