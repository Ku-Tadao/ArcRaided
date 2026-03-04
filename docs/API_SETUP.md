# API Setup (secure)

## Where to put your ARC Raiders API key

- **Local dev:** create `.env.local` (never committed)
- **Cloudflare Worker (recommended for production):** store as Worker secret `ARC_API_KEY`
- **GitHub Actions (optional build-time fetch):** store as repo secret `ARC_API_KEY`

Never expose keys in client code and never use `PUBLIC_` prefix for secrets.

## 1) Local development

Copy `.env.example` to `.env.local` and set values:

```bash
ARC_API_BASE_URL=https://arcraidersapi.com
ARC_API_KEY=arc_live_xxx
API_DEFAULT_LIMIT=100
API_REQUEST_TIMEOUT_MS=10000
```

The server-only helper is in `src/lib/server/arcRaidersApi.ts`.

## 2) Production-safe browser access (Cloudflare proxy)

Use `cloudflare/multi-api-proxy-worker.js` so browser requests never contain API keys.

- Deploy Worker
- Add secret: `ARC_API_KEY`
- Call from frontend:

```text
https://<your-worker>.workers.dev/proxy/arc/api/v1/items?limit=100&offset=0
```

The worker injects `arc_api_key` server-side.

## 3) Preparing for more APIs later

Use one env prefix per provider:

- `ARC_API_*`
- `XYZ_API_*`
- `ABC_API_*`

And extend:

- `src/lib/server/apiConfig.ts`
- `src/lib/server/<provider>Api.ts`
- `cloudflare/multi-api-proxy-worker.js` `PROVIDERS` map

## Arc Raiders endpoints snapshot

- `GET /api/v1/items`, `GET /api/v1/items/:id`
- `GET /api/v1/arcs`, `GET /api/v1/arcs/:id`
- `GET /api/v1/skills`, `GET /api/v1/skills/:id`
- `GET /api/v1/maps`, `GET /api/v1/maps/:id`
- `GET /api/v1/traders`, `GET /api/v1/traders/:id`
- `GET /api/v1/quests`
- `GET /api/health` (public)
