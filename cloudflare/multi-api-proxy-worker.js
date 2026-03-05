const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const PROVIDERS = {
  arc: {
    baseUrl: 'https://www.shrouded.gg',
    keyHeader: 'arc_api_key',
    secretName: 'ARC_API_KEY',
    prefix: '/api/v1/',
  },
  metaforge: {
    baseUrl: 'https://metaforge.app',
    prefix: '/api/',
  },
  ardb: {
    baseUrl: 'https://ardb.app',
    prefix: '/api/',
  },
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...CORS_HEADERS,
    },
  });
}

function badRequest(message, status = 400) {
  return json({ error: message }, status);
}

function getProviderFromPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length < 2 || parts[0] !== 'proxy') return null;
  return { providerKey: parts[1], targetPath: `/${parts.slice(2).join('/')}` };
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== 'GET') {
      return badRequest('Method not allowed', 405);
    }

    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return json({ ok: true, service: 'multi-api-proxy' });
    }

    const parsed = getProviderFromPath(url.pathname);
    if (!parsed) {
      return badRequest('Use /proxy/:provider/*path');
    }

    const provider = PROVIDERS[parsed.providerKey];
    if (!provider) {
      return badRequest(`Unknown provider: ${parsed.providerKey}`, 404);
    }

    const needsSecret = Boolean(provider.secretName && provider.keyHeader);
    const secret = needsSecret ? env[provider.secretName] : null;
    if (needsSecret && !secret) {
      return badRequest(`Missing worker secret: ${provider.secretName}`, 500);
    }

    if (!parsed.targetPath.startsWith(provider.prefix)) {
      return badRequest(`Path must start with ${provider.prefix}`, 400);
    }

    const upstream = new URL(parsed.targetPath, provider.baseUrl);
    upstream.search = url.search;

    const headers = needsSecret ? { [provider.keyHeader]: secret } : undefined;

    const upstreamResponse = await fetch(upstream.toString(), headers ? { headers } : undefined);

    const text = await upstreamResponse.text();

    return new Response(text, {
      status: upstreamResponse.status,
      headers: {
        'Content-Type': upstreamResponse.headers.get('Content-Type') ?? 'application/json; charset=utf-8',
        ...CORS_HEADERS,
      },
    });
  },
};
