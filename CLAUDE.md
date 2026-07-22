# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project layout

Single Next.js 16 + Payload 3.x CMS app at the repo root (no monorepo/workspaces — `apps/web` was flattened on 2026-07-16). All source, config, and scripts live at the top level; `infra/`, `docs/`, `backups/`, and the orchestration shell scripts sit alongside.

- Node 20.x or newer, pnpm 9.x (see root `package.json` `engines`).
- Three pnpm patches are applied at install time: `@payloadcms/next`, `@payloadcms/db-postgres@3.85.0`, and `@next/env@15.5.18` (see `patches/`). If you change Payload code in ways that touch Next rendering, the postgres adapter, or Next's env handling, the relevant patch may need updating.
- Next.js 16 here has breaking changes vs. earlier majors. `AGENTS.md` instructs you to read the relevant guide under `node_modules/next/dist/docs/` before writing Next.js code — heed that, don't rely on prior-memory Next.js APIs.

## Commands

Run from repo root:

- `pnpm dev` — start Next.js dev server (`next dev --webpack`, not turbopack). `pnpm dev:turbo` for the turbopack variant.
- `pnpm build` / `pnpm start` — production build and server.
- `pnpm lint` — eslint (`eslint`, flat config at `eslint.config.mjs`).
- `pnpm typecheck` — `tsc --noEmit`.
- `pnpm format` / `pnpm format:check` — prettier (with `prettier-plugin-tailwindcss`).
- `pnpm payload ...` — run Payload CLI (e.g. `pnpm payload generate:types` to regenerate `payload-types.ts`).
- `pnpm seed` — run `src/scripts/seed-all.ts` to populate the DB with content. `pnpm seed:it-distribution` runs only the IT-distribution seeder.
- `make up` / `make down` / `make logs` — control the dev infra stack (docker compose at `infra/docker/docker-compose.dev.yml`).
- `make reset-db` — wipe volumes and recreate postgres/valkey/meilisearch/mailpit/minio containers.
- `make psql` — connect to postgres (`simal-postgres` container, db `simal_web`).

There is no test suite (`pnpm test` is a stub).

## Infrastructure

`infra/docker/docker-compose.dev.yml` provides supporting services. The Next.js/Payload app itself runs on the host (not in compose); `simal-nginx` reverse-proxies :80 → host:3000 via `host.docker.internal`. Ports are remapped to avoid host conflicts:

- postgres :5434 (container 5432), user/db `simal`/`simal_web`, password `simaldev`
- valkey :6380, meilisearch :7700 (master key `simal-meili-dev-key`), mailpit :8025/:1025, minio :9010/:9011 (console), nginx :80

MinIO is the S3 backend for Payload media (bucket `simal-public-dev`, creds `simalminio`/`simalminio123`). `make minio-buckets` creates the buckets. Media is served through Payload's `/api/media/file/<filename>` route, **not** directly from MinIO — the S3 adapter does not support a custom `generateURL` (see `payload.config.ts` comment). Relative media paths are prefixed with `NEXT_PUBLIC_MEDIA_BASE_URL` (defaults to `http://localhost`, the nginx proxy) — see `src/lib/media-url.ts`.

Copy `env.example` → `.env` before running. Required: `DATABASE_URI`, `PAYLOAD_SECRET`, optional `NEXT_PUBLIC_MEDIA_BASE_URL`.

## App architecture

Next.js App Router with two route groups under `src/app`:

- `(payload)` — Payload admin (`/admin`) and Payload REST/GraphQL API (`/api`). Layout at `src/app/(payload)/layout.tsx`.
- `(frontend)` — the public site. Routes are localized under `src/app/(frontend)/[locale]/...` (locales `en`, `ar`, `fr`, `ru`, default `en`, fallback on — see `payload.config.ts`). `next-intl` handles messages in `messages/`.
- `src/app/maintenance/` — maintenance mode page.

### Payload CMS

`payload.config.ts` (at the repo root, not under `src/`) wires:

- **DB**: `@payloadcms/db-postgres` against the compose postgres. Migration directory is `src/migrations/` (timestamped files plus `index.ts`). Generate/run via the Payload CLI (`pnpm payload migrate:create` / `pnpm payload migrate`); check state with `pnpm payload migrate:status`.
- **Editor**: Lexical.
- **Storage**: `@payloadcms/storage-s3` against MinIO (see Infrastructure).
- **i18n**: same four locales as the frontend.
- **Admin theme**: custom admin components wired via `src/payload-theme/snippets/admin.components.wiring.ts`.

Collections live in `src/collections/` (Media, MediaFolders, Pages, Posts, BlogPosts, InsightsPosts, Categories, Products, Brands, Careers, OfficeLocations, FAQEntries, NewsItems, Users, Stats, Testimonials, Awards, Applications, Messages, Services, WebhookLogs). Globals live in `src/globals/` — a large set covering `Header`, `Footer`, `Homepage`, `SiteSettings`, and many per-page globals (`AboutPage`, `ServicesPage`, `LaptopsPage`, `ItDistributionPage`, etc.).

Key consequence: most pages are CMS-driven. A `[locale]/<section>/page.tsx` typically fetches its content from the matching global or collection via `src/lib/get-payload.ts` and renders React components from `src/components/<section>/`. The home page sections under `src/components/home/*-new.tsx` are the currently-active variants (note the `-new` suffix — older non-suffixed versions may still exist alongside).

### Supporting code

- `src/lib/` — data fetching and config: `get-payload.ts`, `fetch-global.ts`, `fetch-products.ts`, `fetch-services.ts`, `media-url.ts`, `page-data.ts`, `services-config.ts`, `search.ts`, `utils.ts` (likely `cn`/clsx+tailwind-merge).
- `src/scripts/` — seed/migration scripts (`seed-all.ts` orchestrates the others: `seed-globals`, `seed-homepage`, `seed-about`, `seed-brands-full`, `seed-careers-contact`, `seed-pages`, `seed-it-distribution`, etc.). Also `run-migration.ts`, `delete-imageless-products.ts`, `update-header-labels.ts`.
- `src/components/` — React components grouped by site section (`home`, `about`, `brands`, `careers`, `company`, `contact`, `erp`, `hardware`, `layout`, `products`, `resources`, `search`, `services`, `ui`). `src/components/layout/` has the header/footer. Live-preview helpers (`page-live-preview.tsx`, `preview-wrapper.tsx`, `live-preview-dom-updater.tsx`) support Payload's live preview feature.
- `src/access/`, `src/hooks/`, `src/i18n/`, `src/proxy.ts` — Payload access control, hooks, i18n config, and the middleware/proxy layer.

### Animation / styling

Tailwind v4 (`@tailwindcss/postcss`). Animation libs in use: GSAP (`@gsap/react`, `src/lib/gsap-setup.ts`), Framer Motion, Swiper, Lenis (smooth scroll), Three.js / `@react-three/fiber` / `@react-three/drei` for 3D, `animate.css`, `wow.js`. Reach for the matching lib when extending an animated section rather than introducing a new one.

## Workflow notes

- When you change a collection or global schema, regenerate types (`pnpm payload generate:types` writes `payload-types.ts`) and create/run a migration (`pnpm payload migrate:create` / `pnpm payload migrate`).
- Seed scripts are the source of truth for dev content — if a page looks empty locally, run `pnpm seed` before debugging the component.
- The repo also contains `backup.sh` / `restore-backup.sh` (DB and asset backups → `backups/`) and `docs/` with the RFP/BRD/URD, technology-stack evaluation, content inventory, and implementation roadmap. Treat `docs/Primary_Doc/` as authoritative for product scope.
