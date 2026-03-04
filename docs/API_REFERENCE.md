# API Reference (ArcRaided)

This document is the canonical endpoint reference for all currently supported ARC Raiders data providers behind the Cloudflare proxy.

## Proxy Base

Use the public proxy base URL:

- `PUBLIC_API_PROXY_URL`
- Current deployed value: `https://arcraided-api-proxy.kubilay12344.workers.dev`

Provider format:

- `/proxy/arc/...`
- `/proxy/metaforge/...`
- `/proxy/ardb/...`

## Provider Quick Comparison

| Provider | Proxy Prefix | Upstream | Auth | Notes |
|---|---|---|---|---|
| ArcRaiders API | `/proxy/arc` | `https://arcraidersapi.com` | Required (`arc_api_key`, injected by worker) | Has per-endpoint rate limits |
| MetaForge | `/proxy/metaforge` | `https://metaforge.app` | None documented | Attribution required, commercial restrictions |
| ARDB | `/proxy/ardb` | `https://ardb.app` | None documented | Attribution required, image paths are relative |

## ArcRaiders API

Upstream base: `https://arcraidersapi.com`

Proxy examples:

- `GET /proxy/arc/api/v1/items?limit=100&offset=0`
- `GET /proxy/arc/api/v1/items/:id`
- `GET /proxy/arc/api/v1/arcs?limit=100&offset=0`
- `GET /proxy/arc/api/v1/arcs/:id`
- `GET /proxy/arc/api/v1/skills?limit=100&offset=0`
- `GET /proxy/arc/api/v1/skills/:id`
- `GET /proxy/arc/api/v1/maps`
- `GET /proxy/arc/api/v1/maps/:id`
- `GET /proxy/arc/api/v1/traders`
- `GET /proxy/arc/api/v1/traders/:id`
- `GET /proxy/arc/api/v1/quests`
- `GET /proxy/arc/api/health`

Auth behavior:

- Do not send `arc_api_key` from the browser.
- Worker injects the key from secret `ARC_API_KEY`.

Rate limits (as documented):

- Items: `1000/min`
- Item by id: `1000/min`
- ARCs: `500/min`
- ARC by id: `500/min`
- Skills: `1000/min`
- Skill by id: `1000/min`
- Maps: `500/min`
- Map by id: `500/min`
- Traders: `500/min`
- Trader by id: `500/min`
- Quests: `500/min`
- Health: `5000/min`

Pagination params:

- `limit` (example default shown in docs: `100`)
- `offset` (example default shown in docs: `0`)

## MetaForge API

Upstream base: `https://metaforge.app`

Proxy examples:

- `GET /proxy/metaforge/api/arc-raiders/items`
- `GET /proxy/metaforge/api/arc-raiders/arcs`
- `GET /proxy/metaforge/api/arc-raiders/quests`
- `GET /proxy/metaforge/api/game-map-data`
- `GET /proxy/metaforge/api/arc-raiders/event-timers` (deprecated upstream)
- `GET /proxy/metaforge/api/arc-raiders/events-schedule`
- `GET /proxy/metaforge/api/arc-raiders/traders`

Usage requirements:

- Public projects must include attribution with link: `https://metaforge.app/arc-raiders`
- Monetized use requires contacting MetaForge team first
- Endpoints can change without notice; cache on your side

## ARDB API

Upstream base: `https://ardb.app`

Proxy examples:

- `GET /proxy/ardb/api/items`
- `GET /proxy/ardb/api/items/{id}`
- `GET /proxy/ardb/api/quests`
- `GET /proxy/ardb/api/quests/{id}`
- `GET /proxy/ardb/api/arc-enemies`
- `GET /proxy/ardb/api/arc-enemies/{id}`

Usage requirements:

- Include source disclaimer with link to `https://ardb.app`
- Suggested disclaimer: `Data provided by https://ardb.app`
- Endpoint shapes may change; store/cached refresh is recommended

Image/icon paths:

- ARDB returns relative icon/image paths
- Prefix with `https://ardb.app/static` (NOT `https://ardb.app` — that returns Next.js HTML 404s)

## Common Error Handling

Expected upstream failures include `400`, `404`, `413`, `500`.

Recommended handling in app:

- Retry transient failures with backoff
- Cache successful responses
- Show provider-specific fallback messages when unavailable
- Avoid high-frequency polling

## Compliance Snippets (ready to display)

- MetaForge: `Data provided by MetaForge (https://metaforge.app/arc-raiders)`
- ARDB: `Data provided by https://ardb.app`
