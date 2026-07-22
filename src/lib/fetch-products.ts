import { unstable_cache } from "next/cache";
import { getCachedPayload } from "@/lib/get-payload";
import type { Product } from "@/lib/product-config";

// ─── CMS product shape (after depth: 2 population) ────────────────────

interface CMSImage {
  image?: {
    url?: string;
    filename?: string;
    alt?: string;
  };
  alt?: string;
}

interface CMSProduct {
  id: string;
  sku: string;
  slug: string;
  name: string;
  description: string;
  brand:
    | { id: string; name: string; slug: string }
    | string
    | null;
  category:
    | { id: string; title: string; slug: string }
    | string
    | null;
  images?: CMSImage[];
  specs?: Record<string, string> | null;
  seoKeywords?: string;
  _status?: string;
}

// ─── Mapping helpers ───────────────────────────────────────────────────

function mapCMSProduct(cms: CMSProduct): Product {
  const brandData =
    typeof cms.brand === "object" && cms.brand !== null ? cms.brand : null;
  const categoryData =
    typeof cms.category === "object" && cms.category !== null
      ? cms.category
      : null;

  const brandName = brandData?.name || "";
  const brandSlug = brandData?.slug || "";
  const categoryName = categoryData?.title || "";
  const categorySlug = categoryData?.slug || "";

  const images = cms.images || [];
  const mainImage = images[0]?.image;

  return {
    id: 0,
    sku: cms.sku || "",
    name: cms.name || "",
    slug: cms.slug || "",
    description: cms.description || "",
    brand: brandName,
    brandSlug: brandSlug,
    category: categoryName,
    categorySlug: categorySlug,
    image: mainImage?.url || "",
    gallery: images
      .map((img) => img.image?.url || "")
      .filter(Boolean),
    tags: (cms.seoKeywords || "")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    attributes: cms.specs || undefined,
  };
}

// ─── Public API ────────────────────────────────────────────────────────
//
// Both fetchers are wrapped in `unstable_cache` so a page navigation does not
// re-run the `depth: 2, limit: 200` Payload query from scratch each time.
// `draft: true` is kept INSIDE the cache so Payload Live Preview still
// receives draft content, but the expensive DB hit happens at most once per
// revalidate window (60s) instead of on every request. Payload's
// collection-level revalidate (revalidateTag("products")) purges on save when
// configured.

/**
 * Fetch all products from Payload CMS, mapped to the Product interface.
 * Returns an empty array if the CMS is unavailable or has no products.
 */
export const fetchAllProducts = unstable_cache(
  async (locale?: string): Promise<Product[]> => {
    try {
      const payload = await getCachedPayload();
      const result = await payload.find({
        collection: "products",
        depth: 2,
        limit: 200,
        locale: locale as "en" | "ar" | "fr" | "ru" | "all" | undefined,
        draft: true,
        overrideAccess: true,
      });

      return result.docs.map((doc) =>
        mapCMSProduct(doc as unknown as CMSProduct),
      );
    } catch {
      // CMS unavailable
      return [];
    }
  },
  ["products-all"],
  { revalidate: 60, tags: ["products"] },
);

/**
 * Fetch products filtered by category slug.
 * Returns an empty array if the CMS is unavailable or has no matches.
 */
export const fetchProductsByCategory = unstable_cache(
  async (categorySlug: string, locale?: string): Promise<Product[]> => {
    try {
      const payload = await getCachedPayload();

      // Resolve category ID from slug
      const catResult = await payload.find({
        collection: "categories",
        where: { slug: { equals: categorySlug } },
        limit: 1,
      });

      if (catResult.docs.length > 0) {
        const categoryId = catResult.docs[0].id;

        const result = await payload.find({
          collection: "products",
          where: { category: { equals: categoryId } },
          depth: 2,
          limit: 200,
          locale: locale as "en" | "ar" | "fr" | "ru" | "all" | undefined,
          draft: true,
        });

        return result.docs.map((doc) =>
          mapCMSProduct(doc as unknown as CMSProduct),
        );
      }
    } catch {
      // CMS unavailable
    }
    return [];
  },
  ["products-by-category"],
  { revalidate: 60, tags: ["products"] },
);
