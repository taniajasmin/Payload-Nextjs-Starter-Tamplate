import { unstable_cache } from "next/cache";
import type { GlobalSlug } from "payload";
import { getCachedPayload } from "@/lib/get-payload";

/**
 * Cached Payload global read.
 *
 * Wraps the Local API `findGlobal` call in `unstable_cache` so a page navigation
 * does not re-fetch the global from Postgres every time (the layout already did
 * this for its own globals; now every page reading a CMS global benefits).
 * `draft: false` inside, so published data is returned and is at most `revalidate`
 * seconds stale — Payload's global-level `revalidateTag("global-<slug>")` purges
 * on save when configured. Live Preview still works because it streams draft
 * updates through the `useLivePreview` hook on top of this initial data.
 *
 * Returns an empty object when the CMS is unavailable (e.g. during static
 * generation or before the database tables exist).
 */
export const fetchGlobal = unstable_cache(
  async <T = Record<string, unknown>>(
    slug: GlobalSlug,
    locale?: string,
    depth = 2,
  ): Promise<T> => {
    try {
      const payload = await getCachedPayload();
      const result = await payload.findGlobal({
        slug,
        depth,
        locale: locale as "en" | "ar" | "fr" | "ru" | "all" | undefined,
        draft: false,
        overrideAccess: true,
      });
      return result as T;
    } catch {
      // Payload CMS database is not available during static generation or
      // tables do not exist yet. Components will render with documented
      // fallback static content.
      return {} as T;
    }
  },
  ["global"],
  { revalidate: 60 },
);

/**
 * Fetch multiple globals in parallel.
 */
export async function fetchGlobals<T extends Record<string, unknown>>(
  globals: { slug: GlobalSlug; locale?: string; depth?: number }[],
): Promise<Record<keyof T, unknown>> {
  const results = await Promise.all(
    globals.map((g) => fetchGlobal(g.slug, g.locale, g.depth)),
  );
  return globals.reduce(
    (acc, g, i) => {
      (acc as Record<string, unknown>)[g.slug as string] = results[i];
      return acc;
    },
    {} as Record<keyof T, unknown>,
  );
}
