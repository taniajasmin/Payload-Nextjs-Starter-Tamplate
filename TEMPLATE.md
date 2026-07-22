# Payload + Next.js Starter Template

A production-ready website starter built with **Next.js 16** and **Payload CMS 3.x**. Every page is fully dynamic — create, edit, and publish content entirely from the admin panel.

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment variables
cp .env.example .env

# 3. Start Docker services (Postgres, Valkey, Meilisearch, Mailpit, MinIO)
make up

# 4. Create MinIO bucket
make minio-buckets

# 5. Seed the database with example content
pnpm seed

# 6. Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS admin panel.

**Default admin login:** `admin@example.com` / `admin123`

## Project Structure

```
├── payload.config.ts          # Payload CMS configuration
├── next.config.ts             # Next.js configuration
├── seed/index.ts              # Database seed script
├── src/
│   ├── app/
│   │   ├── (payload)/         # Payload admin routes
│   │   └── (frontend)/[locale]/
│   │       ├── page.tsx       # Homepage (fetches Pages[slug=home])
│   │       ├── [slug]/page.tsx # Dynamic catch-all page route
│   │       └── preview/       # Live preview route
│   ├── collections/           # Payload collections
│   │   ├── Users.ts           # Auth & roles
│   │   ├── Media.ts           # File uploads (S3-backed)
│   │   ├── MediaFolders.ts    # Media organisation
│   │   ├── Pages.ts           # Dynamic pages with blocks
│   │   └── Messages.ts        # Contact form submissions
│   ├── globals/               # Payload globals (singletons)
│   │   ├── Header.ts          # Site navigation
│   │   ├── Footer.ts          # Site footer
│   │   ├── SiteSettings.ts    # Site name, SEO, typography
│   │   └── Theme.ts           # Design tokens (light+dark)
│   ├── components/
│   │   ├── blocks/            # Page block components (7 types)
│   │   ├── layout/            # Header, Footer, Theme
│   │   └── ui/                # Reusable primitives
│   ├── payload-theme/         # Rebrandable admin theme
│   ├── lib/                   # Data fetching utilities
│   ├── hooks/                 # React hooks
│   ├── access/                # Access control (RBAC)
│   └── i18n/                  # Internationalization
├── infra/docker/              # Dev infrastructure (Postgres, MinIO, etc.)
├── messages/                  # i18n translation files
└── patches/                   # pnpm patches
```

## How It Works

### Dynamic Pages

Every page on the site is a **Pages collection entry** in Payload. Each page has:

- **Title** & **Slug** — the URL path (e.g., slug `about` → `/en/about`)
- **Layout** — drag-and-drop **blocks** that compose the page content
- **Meta** — SEO title, description, and Open Graph image
- **Status** — Draft, Published, or Archived

The homepage is just a Pages entry with slug `home`.

### Available Block Types

| Block | Description |
|---|---|
| **Hero** | Full-width hero with background image, headline, subheadline, and CTA button |
| **Rich Text** | Headed rich text section using the Lexical editor |
| **Feature Cards** | Responsive grid of icon + title + description cards |
| **Highlight** | Icon + title + description list with optional rich text intro |
| **CTA** | Call-to-action banner with phone, email, and demo link buttons |
| **Image Gallery** | Responsive image grid with captions |
| **Stats Counter** | Animated number counters with labels, prefix, and suffix |

### Creating a New Page

1. Go to `/admin/collections/pages`
2. Click "Create New"
3. Enter a **title** and **slug** (e.g., `my-page`)
4. Add blocks to the **Layout** field
5. Set status to **Published**
6. Visit `/en/my-page` — your page is live!

## Rebranding

### Admin Panel

Edit `src/payload-theme/theme.config.ts`:

```ts
export const themeConfig: PayloadThemeConfig = {
  brandName: "Your Brand",
  brandSuffix: "CMS",
  logoUrl: "/your-logo.png",
  colors: {
    primary: "#your-color",
    primaryDark: "#your-dark-color",
    secondary: "#your-accent",
  },
  // ...
};
```

Place your logo in `/public/`.

### Site Identity

Update the seed data in `seed/index.ts` with your brand name, colors, and content. Or set these from the admin panel after seeding:

- **Header** → `/admin/globals/header`
- **Footer** → `/admin/globals/footer`
- **Site Settings** → `/admin/globals/site-settings`
- **Theme** → `/admin/globals/theme`

### Typography

Edit typography sizes in Site Settings (admin panel) or in the seed script.

## Adding a New Block Type

1. **Add the block definition** in `src/collections/Pages.ts` under `layout.blocks`:

```ts
{
  slug: 'myBlock',
  labels: { singular: 'My Block', plural: 'My Blocks' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    // ...more fields
  ],
}
```

2. **Create the React component** in `src/components/blocks/my-block.tsx`

3. **Register it in the renderer** — add a case in `src/components/blocks/renderer.tsx`:

```ts
case "myBlock":
  return <MyBlock key={key} {...block} />;
```

## Adding a New Collection

1. Copy an existing collection (e.g., `Messages.ts`) as a starting point
2. Add your fields following the Payload schema format
3. Register it in `payload.config.ts` under `collections: [...]`
4. If your collection has relationships, add it before the collections that reference it in the array order
5. Run `pnpm payload generate:types` to update `payload-types.ts`
6. Run `pnpm payload migrate:create` + `pnpm payload migrate` to create the DB table

## Adding Locales

1. Add locales to `src/i18n/routing.ts`:

```ts
export const routing = defineRouting({
  locales: ["en", "fr", "de"],
  defaultLocale: "en",
});
```

2. Add locale codes to `payload.config.ts`:

```ts
localization: {
  locales: ["en", "fr", "de"],
  defaultLocale: "en",
  fallback: true,
},
```

3. Create message files: `messages/fr.json`, `messages/de.json`
4. Regenerate types: `pnpm payload generate:types`
5. Run a migration: `pnpm payload migrate:create` + `pnpm payload migrate`

## Infrastructure

The `make` commands manage a Docker Compose stack for local development:

| Service | Port | Purpose |
|---|---|---|
| Postgres 16 | 5434 | Primary database |
| Valkey 8 | 6380 | Redis-compatible cache |
| Meilisearch | 7700 | Full-text search |
| Mailpit | 8025 (UI), 1025 (SMTP) | Email testing |
| MinIO | 9010 (API), 9011 (Console) | S3-compatible media storage |
| Nginx | 80 | Reverse proxy with caching |

```bash
make up          # Start all services
make down        # Stop all services
make reset-db    # Wipe and recreate database
make psql        # Connect to Postgres
make logs        # Tail all service logs
```

## Deployment

1. Set `NODE_ENV=production`
2. Update `.env` with production credentials (use a proper `PAYLOAD_SECRET`)
3. Run `pnpm build` then `pnpm start`
4. For media, point `S3_*` env vars to your production S3/MinIO instance

## Commands Reference

| Command | Description |
|---|---|
| `pnpm dev` | Start Next.js dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm seed` | Seed database with example content |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm payload` | Payload CLI (migrations, types, etc.) |
| `pnpm format` | Format code with Prettier |
