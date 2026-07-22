import { getCachedPayload } from "@/lib/get-payload";
import type { Where } from "payload";
import { mediaUrl } from "@/lib/media-url";

/**
 * Site-wide search.
 *
 * Queries every public content collection in Payload and returns a unified
 * list of results plus per-type groups. Text matching uses Payload's `like`
 * operator, which the Postgres adapter maps to `ILIKE` (case-insensitive).
 *
 * All collection access is wrapped in try/catch so a single failing
 * collection (or the CMS being down) never breaks the whole search — that
 * type simply yields no results.
 */

export type SearchResultType =
  | "page"
  | "product"
  | "brand"
  | "blog"
  | "news"
  | "career"
  | "faq"
  | "category";

export interface SearchResult {
  type: SearchResultType;
  id: string;
  title: string;
  excerpt?: string;
  url: string;
  image?: string;
  /** Secondary label — brand, category, department, date, etc. */
  meta?: string;
}

export interface SearchResponse {
  /** Flat list, ordered by type priority then relevance. */
  items: SearchResult[];
  /** Results bucketed by type (only non-empty types present). */
  groups: Partial<Record<SearchResultType, SearchResult[]>>;
  total: number;
  query: string;
}

export interface SearchOptions {
  /** Max results per collection. */
  perTypeLimit?: number;
}

/* ------------------------------------------------------------------ */
/* Query helpers                                                       */
/* ------------------------------------------------------------------ */

/** Escape SQL LIKE wildcards so the user's query is matched literally. */
function escapeLike(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/%/g, "\\%")
    .replace(/_/g, "\\_");
}

function likePattern(q: string): string {
  return `%${escapeLike(q)}%`;
}

/** Flatten a Lexical rich-text node into plain text (best-effort). */
export function lexicalToText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as Record<string, unknown>;
  if (n.root && typeof n.root === "object") return lexicalToText(n.root);
  if (n.type === "text" && typeof n.text === "string") return n.text;
  if (Array.isArray(n.children)) {
    return (n.children as unknown[]).map(lexicalToText).join(" ");
  }
  return "";
}

function truncate(text: string, max = 180): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).trimEnd() + "…";
}

/* ------------------------------------------------------------------ */
/* Per-collection searchers                                           */
/* ------------------------------------------------------------------ */

interface Doc {
  id: string | number;
  [key: string]: unknown;
}

/** Combine the text-search OR clauses with any additional AND filters. */
function whereWithFilters(orClauses: Where[], filters: Where[] = []): Where {
  if (filters.length === 0) return { or: orClauses };
  return { and: [{ or: orClauses }, ...filters] };
}

interface MediaLike {
  url?: string;
}

function pickMedia(...candidates: unknown[]): string {
  for (const c of candidates) {
    if (c && typeof c === "object" && typeof (c as MediaLike).url === "string") {
      return mediaUrl((c as MediaLike).url);
    }
  }
  return "";
}

async function searchCollection(args: {
  collection: string;
  locale: string;
  where: Where;
  limit: number;
  depth?: number;
  draft?: boolean;
  map: (doc: Doc) => SearchResult | null;
}): Promise<SearchResult[]> {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: args.collection as never,
      where: args.where,
      locale: args.locale as "en" | "ar" | "fr" | "ru" | "all" | undefined,
      limit: args.limit,
      depth: args.depth ?? 0,
      draft: args.draft ?? false,
      overrideAccess: true,
    });
    return (result.docs as unknown as Doc[])
      .map(args.map)
      .filter((r): r is SearchResult => r !== null);
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/* Main search                                                         */
/* ------------------------------------------------------------------ */

const TYPE_PRIORITY: Record<SearchResultType, number> = {
  page: 0,
  product: 1,
  brand: 2,
  blog: 3,
  career: 4,
  faq: 5,
  category: 6,
  news: 7,
};

export async function searchContent(
  rawQuery: string,
  locale: string,
  opts: SearchOptions = {},
): Promise<SearchResponse> {
  const q = (rawQuery || "").trim();
  const perTypeLimit = opts.perTypeLimit ?? 8;

  const empty: SearchResponse = { items: [], groups: {}, total: 0, query: q };

  if (q.length < 2) return empty;

  const pattern = likePattern(q);

  const run = <T,>(fn: () => Promise<T[]>): Promise<T[]> =>
    fn().catch(() => [] as T[]);

  const [products, brands, blog, news, pages, careers, faqs, categories] =
    await Promise.all([
      run(() =>
        searchCollection({
          collection: "products",
          locale,
          depth: 1,
          limit: perTypeLimit,
          where: whereWithFilters([
            { name: { like: pattern } },
            { sku: { like: pattern } },
            { slug: { like: pattern } },
            { description: { like: pattern } },
            { seoKeywords: { like: pattern } },
          ]),
          map: (d) => {
            const brand = d.brand as Doc | string | null;
            const category = d.category as Doc | string | null;
            const brandName =
              brand && typeof brand === "object" ? String(brand.name ?? "") : "";
            const catName =
              category && typeof category === "object"
                ? String(category.title ?? "")
                : "";
            const image = pickMedia(
              d.mainImage,
              (d.images as { image?: MediaLike }[] | undefined)?.[0]?.image,
            );
            const meta = [brandName, catName].filter(Boolean).join(" · ");
            return {
              type: "product" as const,
              id: String(d.id),
              title: String(d.name ?? d.sku ?? "Product"),
              excerpt: d.description ? truncate(String(d.description)) : undefined,
              url: `/products/${d.slug}`,
              image: image || undefined,
              meta: meta || undefined,
            };
          },
        }),
      ),

      run(() =>
        searchCollection({
          collection: "brands",
          locale,
          depth: 1,
          limit: perTypeLimit,
          where: whereWithFilters([
            { name: { like: pattern } },
            { slug: { like: pattern } },
            { tagline: { like: pattern } },
            { heroSlogan: { like: pattern } },
            { seoTitle: { like: pattern } },
            { seoKeywords: { like: pattern } },
          ]),
          map: (d) => ({
            type: "brand" as const,
            id: String(d.id),
            title: String(d.name ?? "Brand"),
            excerpt: d.tagline
              ? truncate(String(d.tagline))
              : d.heroDescription
                ? truncate(String(d.heroDescription))
                : undefined,
            // Brands have no detail page — route to the product catalog
            // pre-filtered by this brand.
            url: `/hardware/product-catalog?brand=${d.slug}`,
            image: pickMedia(d.logo) || undefined,
            meta: "Brand",
          }),
        }),
      ),

      run(() =>
        searchCollection({
          collection: "blog-posts",
          locale,
          depth: 1,
          limit: perTypeLimit,
          where: whereWithFilters(
            [
              { title: { like: pattern } },
              { slug: { like: pattern } },
              { excerpt: { like: pattern } },
              { "meta.title": { like: pattern } },
              { "meta.description": { like: pattern } },
            ],
            [{ status: { equals: "published" } }],
          ),
          map: (d) => ({
            type: "blog" as const,
            id: String(d.id),
            title: String(d.title ?? "Article"),
            excerpt: d.excerpt
              ? truncate(String(d.excerpt))
              : truncate(lexicalToText(d.content)),
            url: `/resources/blog/${d.slug}`,
            image: pickMedia(d.coverImage) || undefined,
            meta: "Article",
          }),
        }),
      ),

      run(() =>
        searchCollection({
          collection: "news-items",
          locale,
          depth: 1,
          limit: perTypeLimit,
          where: whereWithFilters(
            [
              { title: { like: pattern } },
              { slug: { like: pattern } },
              { excerpt: { like: pattern } },
              { "meta.title": { like: pattern } },
            ],
            [{ active: { equals: true } }],
          ),
          map: (d) => ({
            type: "news" as const,
            id: String(d.id),
            title: String(d.title ?? "News"),
            excerpt: d.excerpt ? truncate(String(d.excerpt)) : undefined,
            // No news detail route — link to the blog/news hub.
            url: `/resources/blog`,
            image: pickMedia(d.coverImage) || undefined,
            meta: "News",
          }),
        }),
      ),

      run(() =>
        searchCollection({
          collection: "pages",
          locale,
          depth: 1,
          limit: perTypeLimit,
          where: whereWithFilters(
            [
              { title: { like: pattern } },
              { slug: { like: pattern } },
              { excerpt: { like: pattern } },
              { "hero.headline": { like: pattern } },
              { "meta.title": { like: pattern } },
            ],
            [{ status: { equals: "published" } }],
          ),
          map: (d) => ({
            type: "page" as const,
            id: String(d.id),
            title: String(d.title ?? "Page"),
            excerpt: d.excerpt
              ? truncate(String(d.excerpt))
              : truncate(lexicalToText(d.content)),
            url: `/${d.slug}`,
            meta: "Page",
          }),
        }),
      ),

      run(() =>
        searchCollection({
          collection: "careers",
          locale,
          depth: 0,
          limit: perTypeLimit,
          where: whereWithFilters(
            [
              { title: { like: pattern } },
              { slug: { like: pattern } },
              { department: { like: pattern } },
              { location: { like: pattern } },
            ],
            [{ status: { equals: "open" } }],
          ),
          map: (d) => {
            const meta = [d.department, d.location]
              .filter((v) => typeof v === "string" && v)
              .map(String)
              .join(" · ");
            return {
              type: "career" as const,
              id: String(d.id),
              title: String(d.title ?? "Position"),
              excerpt: truncate(lexicalToText(d.description)),
              url: `/careers/openings/${d.slug}`,
              meta: meta || "Open role",
            };
          },
        }),
      ),

      run(() =>
        searchCollection({
          collection: "faq-entries",
          locale,
          depth: 0,
          limit: perTypeLimit,
          where: whereWithFilters([{ question: { like: pattern } }], [
            { active: { equals: true } },
          ]),
          map: (d) => ({
            type: "faq" as const,
            id: String(d.id),
            title: String(d.question ?? "FAQ"),
            excerpt: truncate(lexicalToText(d.answer)),
            url: `/resources/faq`,
            meta: "FAQ",
          }),
        }),
      ),

      run(() =>
        searchCollection({
          collection: "categories",
          locale,
          depth: 0,
          limit: perTypeLimit,
          where: whereWithFilters([
            { title: { like: pattern } },
            { slug: { like: pattern } },
            { description: { like: pattern } },
          ]),
          map: (d) => ({
            type: "category" as const,
            id: String(d.id),
            title: String(d.title ?? "Category"),
            excerpt: d.description ? truncate(String(d.description)) : undefined,
            url: `/hardware/product-catalog`,
            meta: "Category",
          }),
        }),
      ),
    ]);

  const buckets: Record<SearchResultType, SearchResult[]> = {
    page: pages,
    product: products,
    brand: brands,
    blog,
    news,
    career: careers,
    faq: faqs,
    category: categories,
  };

  const groups: Partial<Record<SearchResultType, SearchResult[]>> = {};
  let items: SearchResult[] = [];
  (Object.keys(buckets) as SearchResultType[]).forEach((type) => {
    const list = buckets[type];
    if (list.length > 0) {
      groups[type] = list;
      items = items.concat(list);
    }
  });

  // Stable ordering by type priority.
  items.sort((a, b) => TYPE_PRIORITY[a.type] - TYPE_PRIORITY[b.type]);

  return { items, groups, total: items.length, query: q };
}

/* ------------------------------------------------------------------ */
/* Related content                                                     */
/* ------------------------------------------------------------------ */

export interface RelatedContent {
  /** Brands referenced by the matched products. */
  brands: { title: string; url: string; image?: string }[];
  /** Categories referenced by the matched products. */
  categories: { title: string; url: string }[];
  /** Latest published articles — always shown. */
  latestArticles: { title: string; excerpt?: string; url: string; date?: string; image?: string }[];
  /** Quick category chips for browsing. */
  browseCategories: { title: string; url: string }[];
}

async function fetchLatestArticles(locale: string, limit = 3) {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "blog-posts",
      locale: locale as never,
      limit,
      depth: 1,
      draft: false,
      overrideAccess: true,
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
    });
    return (result.docs as unknown as Doc[]).map((d) => {
      const dateStr = d.publishedAt ? String(d.publishedAt) : undefined;
      const date = dateStr
        ? new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })
        : undefined;
      return {
        title: String(d.title ?? "Article"),
        excerpt: d.excerpt
          ? truncate(String(d.excerpt))
          : truncate(lexicalToText(d.content)),
        url: `/resources/blog/${d.slug}`,
        image: pickMedia(d.coverImage) || undefined,
        date,
      };
    });
  } catch {
    return [];
  }
}

const BROWSE_CATEGORIES = [
  { title: "Laptops", url: "/hardware/laptops" },
  { title: "Monitors", url: "/hardware/monitors" },
  { title: "Computer Components", url: "/hardware/computer-components" },
  { title: "Computer Accessories", url: "/hardware/computer-accessories" },
  { title: "Gaming", url: "/hardware/gaming" },
  { title: "Product Catalog", url: "/hardware/product-catalog" },
];

export async function getRelatedContent(
  results: SearchResponse,
  locale: string,
): Promise<RelatedContent> {
  const productItems = results.groups.product ?? [];

  // Derive related brands/categories from matched products (depth:1 gave names).
  const brandMap = new Map<string, { title: string; url: string; image?: string }>();
  const catMap = new Map<string, { title: string; url: string }>();
  for (const p of productItems) {
    if (p.meta) {
      // meta is "Brand · Category"
      const [brandPart, catPart] = p.meta.split("·").map((s) => s.trim());
      if (brandPart) {
        const slug = brandPart.toLowerCase().replace(/\s+/g, "-");
        brandMap.set(brandPart, {
          title: brandPart,
          url: `/hardware/product-catalog?brand=${encodeURIComponent(slug)}`,
        });
      }
      if (catPart) {
        catMap.set(catPart, { title: catPart, url: "/hardware/product-catalog" });
      }
    }
  }

  const latestArticles = await fetchLatestArticles(locale, 3);

  return {
    brands: Array.from(brandMap.values()).slice(0, 6),
    categories: Array.from(catMap.values()).slice(0, 6),
    latestArticles: latestArticles.map((a) => ({
      title: a.title,
      excerpt: a.excerpt,
      url: a.url,
      date: a.date,
      image: a.image,
    })),
    browseCategories: BROWSE_CATEGORIES,
  };
}

/* ------------------------------------------------------------------ */
/* Empty-state / no-query suggestions                                  */
/* ------------------------------------------------------------------ */

export interface EmptyStateSuggestions {
  popularSearches: string[];
  latestArticles: { title: string; excerpt?: string; url: string; date?: string; image?: string }[];
  browseCategories: { title: string; url: string }[];
}

const POPULAR_SEARCHES = [
  "SSD",
  "Laptops",
  "HIKVISION",
  "Gaming",
  "Monitors",
  "Careers",
];

export async function getEmptyStateSuggestions(
  locale: string,
): Promise<EmptyStateSuggestions> {
  const latestArticles = await fetchLatestArticles(locale, 4);
  return {
    popularSearches: POPULAR_SEARCHES,
    latestArticles: latestArticles.map((a) => ({
      title: a.title,
      excerpt: a.excerpt,
      url: a.url,
      date: a.date,
      image: a.image,
    })),
    browseCategories: BROWSE_CATEGORIES,
  };
}
