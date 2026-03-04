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
- Call from frontend (switch provider by path):

```text
https://<your-worker>.workers.dev/proxy/arc/api/v1/items?limit=100&offset=0
https://<your-worker>.workers.dev/proxy/metaforge/api/arc-raiders/items
https://<your-worker>.workers.dev/proxy/ardb/api/items
```

The worker injects `arc_api_key` server-side.

### Provider routing map

- `arc` → upstream `https://arcraidersapi.com` (requires Worker secret `ARC_API_KEY`)
- `metaforge` → upstream `https://metaforge.app` (no API key)
- `ardb` → upstream `https://ardb.app` (use `/api/...` path, no API key)

## 2) Preparing for more APIs later

Use one env prefix per provider:

- Worker secrets: `ARC_API_KEY`, `XYZ_API_KEY`, `ABC_API_KEY`
- Public frontend vars (repo variables): `PUBLIC_API_PROXY_URL`, etc.

And extend:

- `cloudflare/multi-api-proxy-worker.js` `PROVIDERS` map

## Source usage requirements

- **MetaForge attribution required:** include a visible credit and link to `https://metaforge.app/arc-raiders`.
- **MetaForge commercial usage:** contact MetaForge team first for paid/monetized products.
- **ARDB attribution required:** include a disclaimer like `Data provided by https://ardb.app`.
- **Caching recommended:** both sources indicate responses can change; cache and periodically refresh instead of spamming live endpoints.

## ARDB image paths

- ARDB image/icon paths are relative.
- Prefix ARDB image paths with: `https://ardb.app/static`

## Arc Raiders endpoints snapshot

- `GET /api/v1/items`, `GET /api/v1/items/:id`
- `GET /api/v1/arcs`, `GET /api/v1/arcs/:id`
- `GET /api/v1/skills`, `GET /api/v1/skills/:id`
- `GET /api/v1/maps`, `GET /api/v1/maps/:id`
- `GET /api/v1/traders`, `GET /api/v1/traders/:id`
- `GET /api/v1/quests`
- `GET /api/health` (public)
