# ArcRaided

Arc Raiders project scaffold built with [Astro](https://astro.build), aligned with the structure used in your other game repos.

## Live (after first deploy)

**[ku-tadao.github.io/ArcRaided](https://ku-tadao.github.io/ArcRaided/)**

## Development

```bash
npm install
npm run dev
npm run build
```

## API Keys & Security

- API key is stored only in Cloudflare Worker secret `ARC_API_KEY`.
- Frontend only uses the public proxy URL (`PUBLIC_API_PROXY_URL`).
- Provider switching supported via proxy paths: `arc`, `metaforge`, `ardb`.
- Proxy worker template: `cloudflare/multi-api-proxy-worker.js`.
- Full setup guide: [docs/API_SETUP.md](docs/API_SETUP.md)
- Full endpoint docs: [docs/API_REFERENCE.md](docs/API_REFERENCE.md)

## Notes

- GitHub Actions workflow deploys `dist/` to `gh-pages` on pushes to `master`.
- Astro base path is configured for GitHub Pages at `/ArcRaided`.
