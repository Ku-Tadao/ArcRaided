# API Setup (secure)

## Where to put your ARC Raiders API key

- **Cloudflare Worker:** store as Worker secret `ARC_API_KEY`
- **Frontend runtime base URL (public, safe):** set repo variable `PUBLIC_API_PROXY_URL`

Never expose keys in client code and never use `PUBLIC_` prefix for secrets.

## 1) Production-safe browser access (Cloudflare proxy)

Use `cloudflare/multi-api-proxy-worker.js` so browser requests never contain API keys.

- Deploy Worker
- Add secret: `ARC_API_KEY`
- Worker deployed name: `arcraided-api-proxy`
- Worker URL: `https://arcraided-api-proxy.kubilay12344.workers.dev`
- Call from frontend:

```text
https://<your-worker>.workers.dev/proxy/arc/api/v1/items?limit=100&offset=0
```

The worker injects `arc_api_key` server-side.

## 2) Preparing for more APIs later

Use one env prefix per provider:

- Worker secrets: `ARC_API_KEY`, `XYZ_API_KEY`, `ABC_API_KEY`
- Public frontend vars (repo variables): `PUBLIC_API_PROXY_URL`, etc.

And extend:

- `cloudflare/multi-api-proxy-worker.js` `PROVIDERS` map

## Arc Raiders endpoints snapshot

- `GET /api/v1/items`, `GET /api/v1/items/:id`
- `GET /api/v1/arcs`, `GET /api/v1/arcs/:id`
- `GET /api/v1/skills`, `GET /api/v1/skills/:id`
- `GET /api/v1/maps`, `GET /api/v1/maps/:id`
- `GET /api/v1/traders`, `GET /api/v1/traders/:id`
- `GET /api/v1/quests`
- `GET /api/health` (public)
