# Hi-Tech Farming BD — Corporate Website

Corporate website for **Hi-Tech Farming Ltd** (hitechfarmingbd.com) — a research,
development, business and innovation organization driving smart agricultural and
industrial development in Bangladesh through 4th Industrial Revolution (4IR)
technology. Content is sourced from the company's original WordPress site.

Built on the Payload Next.js starter template.

## Stack

- **Next.js 16** (App Router) + **Payload 3.x** CMS (Lexical editor)
- **PostgreSQL** via `@payloadcms/db-postgres` (Drizzle migrations)
- **MinIO** (S3-compatible media storage), **Valkey**, **Meilisearch**, **Mailpit** via Docker Compose
- **Tailwind CSS v4**, TypeScript, pnpm

## Getting started

Prerequisites: Node 20+, pnpm 9.x, Docker.

```bash
cp .env.example .env          # then set PAYLOAD_SECRET (random string)
pnpm install                  # installs dependencies (applies the @next/env patch)
make up                       # starts postgres, minio, valkey, meilisearch, mailpit, nginx
make minio-buckets            # creates the app-public-dev media bucket (run once after every volume reset)
pnpm tsx scripts/migrate.mts  # applies database migrations
pnpm seed                     # seeds Hi-Tech Farming BD content (idempotent)
pnpm dev                      # start the site at http://localhost:3000
```

Admin panel: **http://localhost:3000/admin** — `admin@example.com` / `admin123`
(change these after first login).

> **Note:** `pnpm payload migrate` (the Payload CLI) fails under newer Node
> versions because of the CLI's bundled loader. Use `pnpm tsx scripts/migrate.mts`
> instead (`create <name>` to generate, `status` to inspect).

## Project structure

- `payload.config.ts` — Payload config (DB, S3/MinIO storage, i18n, admin theme)
- `src/collections/` — Media, MediaFolders, Pages, Users, Messages
- `src/globals/` — Header, Footer, SiteSettings, Theme (green palette)
- `src/app/(frontend)/[locale]/` — localized public site (en/ar/fr/ru); pages are
  rendered dynamically from the `pages` collection by slug (`home`, `about`,
  `services`, `portfolio`, `team`, `advisors`, `gallery`, `contact`)
- `src/components/blocks/` — layout block components (hero, rich text, feature
  cards, highlights, CTA, image gallery, stats counter)
- `seed/` — database seed (`index.ts`) + `assets/` (images from the original site)
- `scripts/migrate.mts` — in-process migration runner
- `infra/docker/` — dev infrastructure (compose file, nginx config)

## Content management

Every page and section is editable from the Payload admin panel — no code changes
needed. Pages are built from layout blocks; the theme (colors, radius, typography)
is controlled from the **Theme** global. Re-run `pnpm seed` to restore the
original content baseline.
