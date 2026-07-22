import { getCachedPayload } from "@/lib/get-payload";
// Client-safe types + helper live in services-config so Client Components can
// import them WITHOUT pulling `payload.config.ts` (→ sharp → child_process)
// into the browser bundle. Re-exported here for server-side convenience.
import {
  serviceHref,
  type ServiceDetail,
  type ServiceSummary,
} from "./services-config";

export { serviceHref, type ServiceDetail, type ServiceSummary };

function toSummary(doc: Record<string, unknown>): ServiceSummary {
  return {
    id: String(doc.id ?? doc._id ?? ""),
    title: (doc.title as string) || "",
    slug: (doc.slug as string) || "",
    family: (doc.family as string) || "it-services",
    tagline: (doc.tagline as string) || undefined,
    icon: (doc.icon as string) || undefined,
    iconColor: (doc.iconColor as string) || undefined,
    customHref: (doc.customHref as string) || undefined,
  };
}

/** All published services (for the hub + sub-nav), locale-aware. */
export async function fetchServices(
  locale?: string,
): Promise<ServiceSummary[]> {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "services",
      where: { status: { equals: "published" } },
      locale: locale as "en" | "ar" | "fr" | "ru" | "all" | undefined,
      limit: 100,
      sort: "family",
    });
    return result.docs.map((d) => toSummary(d as unknown as Record<string, unknown>));
  } catch {
    // CMS unavailable during static generation / before tables exist.
    return [];
  }
}

/** A single published service by slug (for the detail page), locale-aware. */
export async function fetchServiceBySlug(
  slug: string,
  locale?: string,
): Promise<ServiceDetail | null> {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "services",
      where: { slug: { equals: slug }, status: { equals: "published" } },
      locale: locale as "en" | "ar" | "fr" | "ru" | "all" | undefined,
      limit: 1,
      depth: 2,
    });
    const doc = result.docs[0] as unknown as Record<string, unknown> | undefined;
    if (!doc) return null;
    return {
      ...toSummary(doc),
      heroBackgroundImage: doc.heroBackgroundImage as
        | { url?: string; alt?: string }
        | undefined,
      hero: doc.hero as ServiceDetail["hero"],
      overview: (doc.overview as string) || undefined,
      features: (doc.features as ServiceDetail["features"]) || [],
      benefits: (doc.benefits as ServiceDetail["benefits"]) || [],
      subCategories: (doc.subCategories as ServiceDetail["subCategories"]) || [],
      useCases: (doc.useCases as ServiceDetail["useCases"]) || [],
      processSteps: (doc.processSteps as ServiceDetail["processSteps"]) || [],
      heroStats: (doc.heroStats as ServiceDetail["heroStats"]) || [],
      brands: (doc.brands as ServiceDetail["brands"]) || [],
      relatedServices: (doc.relatedServices as ServiceDetail["relatedServices"]) || [],
      ctaSection: doc.ctaSection as ServiceDetail["ctaSection"],
      meta: doc.meta as ServiceDetail["meta"],
    };
  } catch {
    return null;
  }
}

/** Every service slug that owns a detail page (for generateStaticParams).
 *  Services with a `customHref` (e.g. UniERP → /erp/overview) are excluded —
 *  they link elsewhere and have no /services/{slug} page of their own. */
export async function fetchAllServiceSlugs(): Promise<string[]> {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({ collection: "services", limit: 0 });
    return result.docs
      .map((d) => d as unknown as Record<string, unknown>)
      .filter((d) => !d.customHref && d.slug)
      .map((d) => d.slug as string);
  } catch {
    return [];
  }
}
