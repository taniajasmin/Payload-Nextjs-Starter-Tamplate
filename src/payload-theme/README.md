# TwinMOS Payload Theme

A reusable **Payload CMS v3 admin theme**, extracted from the TwinMOS corporate website.
It skins Payload's **default admin views** (sidebar nav, header, login, buttons, pills,
tabs, dropzone, array add-row, doc controls) and ships **custom chrome components**
(logo, header, sidebar footer, account dropdown, theme toggle, "Main" nav group).

Everything is parameterized through a single [theme.config.ts](theme.config.ts), so you
can drop it into any other Payload project and rebrand in one file.

> Source project: `twinmos_corporate/`. Active theme file there is
> `app/(payload)/admin-overrides.css`; the stale `src/app/(payload)/custom.scss`
> brand-accent rules have been merged into this theme's `admin-overrides.css`.

---

## What's included

```
twinmos-payload-theme/
├── admin-overrides.css        # THE theme — skins all default admin views + brand accents
├── theme.config.ts            # ← edit this to rebrand (name, logo, colors, links, menu)
├── components/
│   ├── Logo.tsx               # sidebar logo (graphics.Logo)
│   ├── Icon.tsx               # collapsed-sidebar icon (graphics.Icon)
│   ├── Nav.tsx                # passthrough nav wrapper (Nav slot)
│   ├── NavMain.tsx            # "Main" nav group pinned to top (beforeNavLinks)
│   ├── AdminHeader.tsx        # branded gradient header strip (beforeDashboard)
│   ├── AdminSidebarFooter.tsx # sidebar footer (afterNav)
│   ├── ThemeToggle.tsx + .scss# light/dark toggle (useTheme from @payloadcms/ui)
│   └── ProfileMenu.tsx + .scss# account dropdown (actions) — fetches /api/users/me
├── snippets/
│   ├── admin.components.wiring.ts  # drop-in `admin.components` block
│   └── layout.tsx                  # (payload)/layout.tsx that loads the CSS
└── package.json
```

**Not included (deliberately):** the TwinMOS-specific dashboard widgets
(`DashboardView`, `OverviewWidget`, `RecentActivityWidget`, `PendingInquiriesWidget`)
and `WebsiteMenuListView` — these hardcode collection slugs (`products`,
`contact-inquiries`, …) and are business logic, not theme. Rebuild those per-project.

---

## Install

1. Copy this folder into your Payload project, e.g. `src/payload-theme/`.
2. Add the peer deps if you don't already have them: `payload`, `@payloadcms/next`,
   `@payloadcms/ui`, `lucide-react`.
3. Put your logo in `/public` and set `logoUrl` in [theme.config.ts](theme.config.ts).

## Wire it up (2 edits)

**a) Load the CSS** — in `app/(payload)/layout.tsx`, add the import (see
[snippets/layout.tsx](snippets/layout.tsx)):

```tsx
import "@payloadcms/next/css";
import "../../src/payload-theme/admin-overrides.css"; // 👈 add this
```

**b) Register the components** — in `payload.config.ts`, spread the wiring block
(see [snippets/admin.components.wiring.ts](snippets/admin.components.wiring.ts)):

```ts
import { themeAdminComponents } from "./src/payload-theme/snippets/admin.components.wiring";

export default buildConfig({
  admin: {
    user: "users",
    components: themeAdminComponents,
    suppressHydrationWarning: true,
  },
  // ...
});
```

Then run `payload generate:importMap` (or your normal dev/build) so Payload picks up
the new component paths.

---

## Rebranding

Edit [theme.config.ts](theme.config.ts):

| Field                                          | What it controls                                  |
| ---------------------------------------------- | ------------------------------------------------- |
| `brandName`, `brandSuffix`                     | header + sidebar footer text                      |
| `logoUrl`, `logoHeight`, `iconHeight`          | sidebar logo + collapsed icon                     |
| `colors.primary` / `primaryDark` / `secondary` | accent bar, active nav, header gradient, buttons  |
| `headerLinks`                                  | header quick-links                                |
| `footerLinks`                                  | sidebar footer links                              |
| `accountMenu`                                  | items in the account dropdown (lucide icon names) |
| `websiteUrl`                                   | "Visit Website" target                            |

The CSS reads `--brand-primary`, `--brand-primary-dark`, `--brand-secondary`, and
`--brand-logo-url` from the `:root` block at the top of
[admin-overrides.css](admin-overrides.css). Change those to match your
`theme.config.ts` colors (or override them per-environment).

## Nav group emoji icons

[admin-overrides.css](admin-overrides.css) maps emoji icons to nav **group names**
(`Catalog`, `Content`, `System`, `Website`, `Inquiries`, `Navigation`, `Settings`,
`Main`). Match these to the `admin.group` values on your collections/globals, or
edit the `.nav-group.<Name>` rules.

## Theme (light/dark)

Keep `theme: "all"` in `admin` config so users can switch. The
[ThemeToggle.tsx](components/ThemeToggle.tsx) uses Payload's `useTheme()`; mount it
anywhere in chrome (e.g. inside a custom header) if you want a visible toggle. The
CSS already adjusts the accent bar + primary button for
`html[data-theme="dark"]`.
