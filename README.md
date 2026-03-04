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

- Put secrets in `.env.local` for local development.
- For production browser access, use the Cloudflare proxy worker template in `cloudflare/multi-api-proxy-worker.js`.
- Full setup guide: [docs/API_SETUP.md](docs/API_SETUP.md)

## Notes

- GitHub Actions workflow deploys `dist/` to `gh-pages` on pushes to `master`.
- Astro base path is configured for GitHub Pages at `/ArcRaided`.
