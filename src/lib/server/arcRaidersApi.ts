import { apiConfig, assertServerSecrets } from '@/lib/server/apiConfig';

type QueryParams = Record<string, string | number | undefined>;

function buildUrl(pathname: string, query?: QueryParams): string {
  const url = new URL(pathname, apiConfig.arc.baseUrl);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

async function request<T>(pathname: string, query?: QueryParams): Promise<T> {
  assertServerSecrets();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), apiConfig.defaults.timeoutMs);

  try {
    const response = await fetch(buildUrl(pathname, query), {
      method: 'GET',
      headers: {
        arc_api_key: apiConfig.arc.apiKey,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Arc Raiders API error ${response.status}: ${response.statusText}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export function listItems(limit = apiConfig.defaults.limit, offset = 0) {
  return request<{ items: unknown[]; count: number }>('/api/v1/items', { limit, offset });
}

export function getItem(id: string | number) {
  return request<unknown>(`/api/v1/items/${id}`);
}

export function listArcs(limit = apiConfig.defaults.limit, offset = 0) {
  return request<{ arcs: unknown[]; count: number }>('/api/v1/arcs', { limit, offset });
}

export function getArc(id: string | number) {
  return request<unknown>(`/api/v1/arcs/${id}`);
}

export function listSkills(limit = apiConfig.defaults.limit, offset = 0) {
  return request<{ skills: unknown[]; count: number }>('/api/v1/skills', { limit, offset });
}

export function getSkill(id: string | number) {
  return request<unknown>(`/api/v1/skills/${id}`);
}

export function listMaps() {
  return request<{ maps: unknown[]; count?: number }>('/api/v1/maps');
}

export function getMap(id: string | number) {
  return request<unknown>(`/api/v1/maps/${id}`);
}

export function listTraders() {
  return request<{ traders: unknown[]; count?: number }>('/api/v1/traders');
}

export function getTrader(id: string | number) {
  return request<unknown>(`/api/v1/traders/${id}`);
}

export function listQuests() {
  return request<{ quests: unknown[]; count?: number }>('/api/v1/quests');
}

export function healthCheck() {
  return request<{ status?: string; [key: string]: unknown }>('/api/health');
}
