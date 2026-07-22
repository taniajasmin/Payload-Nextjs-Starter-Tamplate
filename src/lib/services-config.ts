/**
 * Client-safe types + helpers for the `services` collection.
 *
 * This module is deliberately free of any Node/Payload imports so it can be
 * imported from Client Components. The server-side Payload fetching lives in
 * `fetch-services.ts` (which imports `payload.config.ts` → `sharp`, etc. and
 * must never reach the browser bundle).
 *
 * Mirrors the product split: `product-config.ts` (client) vs `fetch-products.ts`
 * (server).
 */

/**
 * Lightweight, serializable view of a `services` document used by the
 * /solutions hub, the [slug] detail page and the in-page sub-nav.
 */
export interface ServiceSummary {
  id: string;
  title: string;
  slug: string;
  family: "it-services" | "software-erp" | string;
  tagline?: string;
  icon?: string;
  iconColor?: string;
  /** When set, link here instead of /solutions/{slug}. */
  customHref?: string;
}

export interface ServiceDetail extends ServiceSummary {
  heroBackgroundImage?: { url?: string; alt?: string };
  hero?: {
    headline?: string;
    subHeadline?: string;
    primaryCtaLabel?: string;
    primaryCtaLink?: string;
    secondaryCtaLabel?: string;
    secondaryCtaLink?: string;
  };
  overview?: string;
  features?: Array<{ title?: string; description?: string; icon?: string }>;
  benefits?: Array<{ title?: string; description?: string }>;
  subCategories?: Array<{ title?: string; description?: string; icon?: string }>;
  useCases?: Array<{ title?: string; description?: string; icon?: string }>;
  processSteps?: Array<{ title?: string; description?: string; icon?: string }>;
  heroStats?: Array<{ value: string; label: string; description?: string }>;
  brands?: Array<{ name: string; slug?: string; logo?: { url?: string }; description?: string }>;
  relatedServices?: Array<{ name: string; description?: string; href: string }>;
  ctaSection?: {
    heading?: string;
    description?: string;
    primaryLabel?: string;
    primaryLink?: string;
    secondaryLabel?: string;
    secondaryLink?: string;
  };
  meta?: { title?: string; description?: string; image?: { url?: string } };
}

/** Resolve the link for a service — customHref wins, else /solutions/{slug}. */
export function serviceHref(s: { customHref?: string; slug: string }): string {
  return s.customHref || `/solutions/${s.slug}`;
}
