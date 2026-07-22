import { unstable_cache } from "next/cache";
import { getCachedPayload } from "@/lib/get-payload";
import { allBrands, type BrandPageData } from "@/lib/brand-data";
import { CATEGORY_MAP } from "@/lib/product-config";

/**
 * Slug → human-readable category label, used when a CMS brand has its
 * `category` select populated (Payload stores the select value, e.g.
 * "computer-components", not the label).
 *
 * Extends product-config.CATEGORY_MAP with the brand-specific categories
 * defined on the Brands collection (storage, audio-visual, networking) and
 * maps them to the richer labels used in brand-data.ts so the grouping
 * headers on /brands read naturally.
 */
const BRAND_CATEGORY_LABELS: Record<string, string> = {
  ...CATEGORY_MAP,
  storage: "Storage & Memory Cards",
  "audio-visual": "Audio-Visual & Collaboration",
  networking: "Networking",
};

// Pre-compute a slug → category map from the static brand data so we can fill
// in the category for CMS brands that have none (currently all of them have
// category = NULL in the database).
const STATIC_CATEGORY_BY_SLUG = new Map<string, string>(
  allBrands.map((b) => [b.slug, b.category]),
);

function resolveCategory(
  slug: string,
  cmsCategory?: string | null | undefined,
): string {
  // Prefer the authored static category (correct, stable labels); fall back to
  // the CMS select value (mapped to a label); finally "Other".
  return (
    STATIC_CATEGORY_BY_SLUG.get(slug) ||
    (cmsCategory ? (BRAND_CATEGORY_LABELS[cmsCategory] ?? cmsCategory) : "") ||
    "Other"
  );
}

/**
 * Fetch brands for the /brands directory.
 *
 * Reads brand documents from the CMS (so logos stay manageable in the admin)
 * and enriches each with a `category`. This is the whole reason this helper
 * exists: the CMS `category` field is unset on every brand document, so
 * without enrichment `groupBrandsByCategory()` in brands-page-content.tsx
 * dumps every brand into a single "Other" block and the page loses its
 * per-category grouping ("separate columns and rows per category").
 *
 * Category is resolved from the static brand-data.ts (by slug) first, so the
 * rich authored categories drive the grouping; the CMS category is used only
 * as a fallback for brands added in the admin that have no static entry.
 *
 * Only the `category` field is forced — every other CMS field (name, slug,
 * logo / logoSvg / logoPng, status, …) is preserved as-is. This avoids the old
 * footgun where a sparse CMS doc was spread over the rich static brand and
 * wiped the hero/copy/product-table fields.
 *
 * Returns the static `allBrands` list if the CMS is unreachable.
 */
export const fetchBrands = unstable_cache(
  async (locale?: string): Promise<BrandPageData[]> => {
    try {
      const payload = await getCachedPayload();
      const result = await payload.find({
        collection: "brands",
        depth: 2,
        locale: locale as "en" | "ar" | "fr" | "ru" | "all" | undefined,
        limit: 0,
      });

      if (!result.docs || result.docs.length === 0) {
        return allBrands;
      }

      return result.docs.map((doc) => {
        const d = doc as unknown as Record<string, unknown>;
        const slug = (d.slug as string) ?? "";
        return {
          ...(d as object),
          category: resolveCategory(
            slug,
            d.category as string | null | undefined,
          ),
        } as unknown as BrandPageData;
      });
    } catch {
      // CMS unavailable (static generation, DB down, tables missing) — fall
      // back to the static list, which already carries correct categories.
      return allBrands;
    }
  },
  ["brands-directory"],
  { revalidate: 60 },
);
