import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getCachedPayload } from "@/lib/get-payload";

export interface PageDoc {
  id: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: unknown;
  meta?: {
    title?: string;
    description?: string;
    image?: { url?: string; alt?: string };
  };
}

// ─── Public API ────────────────────────────────────────────────────────
//
// Wrapped in `unstable_cache` so a navigation does not re-query Postgres
// for the same page, and `draft: false` so the route can be statically
// generated / ISR-cached rather than forced dynamic. Mirrors the pattern in
// fetch-products.ts / fetch-services.ts / fetch-global.ts. Payload's
// collection-level revalidate (revalidateTag("pages")) purges on save when
// configured.
//
// Returns null when the CMS is unavailable or no published page matches.

/**
 * Fetch a single published page by slug, locale-aware.
 */
export const fetchPageBySlug = unstable_cache(
  async (slug: string, locale?: string): Promise<PageDoc | null> => {
    try {
      const payload = await getCachedPayload();
      const result = await payload.find({
        collection: "pages",
        where: {
          slug: { equals: slug },
          status: { equals: "published" },
        },
        limit: 1,
        locale: locale as "en" | "ar" | "fr" | "ru" | "all" | undefined,
        draft: false,
        overrideAccess: true,
      });
      return (result.docs[0] as unknown as PageDoc | undefined) ?? null;
    } catch {
      // CMS unavailable during static generation / before tables exist.
      return null;
    }
  },
  // unstable_cache auto-appends (slug, locale) so each page/locale is
  // cached independently.
  ["pages-by-slug"],
  { revalidate: 60, tags: ["pages"] },
);

/**
 * React `cache()` wrapper so `generateMetadata` and the page component —
 * which both need the same doc — share ONE Payload query per request, on
 * top of the cross-request `unstable_cache` above.
 */
export const getCachedPageBySlug = cache((slug: string, locale?: string) =>
  fetchPageBySlug(slug, locale),
);
