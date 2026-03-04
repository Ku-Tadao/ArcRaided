const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_LIMIT = 100;

function parseNumber(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const apiConfig = {
  arc: {
    baseUrl: import.meta.env.ARC_API_BASE_URL ?? 'https://arcraidersapi.com',
    apiKey: import.meta.env.ARC_API_KEY ?? '',
  },
  defaults: {
    limit: parseNumber(import.meta.env.API_DEFAULT_LIMIT, DEFAULT_LIMIT),
    timeoutMs: parseNumber(import.meta.env.API_REQUEST_TIMEOUT_MS, DEFAULT_TIMEOUT_MS),
  },
};

export function assertServerSecrets(): void {
  if (!apiConfig.arc.apiKey) {
    throw new Error('Missing ARC_API_KEY. Add it to .env.local (or deployment secret store).');
  }
}
