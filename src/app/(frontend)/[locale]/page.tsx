import { unstable_cache } from "next/cache";
import { getCachedPayload } from "@/lib/get-payload";
import { fetchServices, type ServiceSummary } from "@/lib/fetch-services";
import { FALLBACK_SERVICES } from "@/lib/services-fallback";

import { HomePage as HomeView } from "@/components/home/home-page";

interface Props {
  params: Promise<{ locale: string }>;
}

/**
 * Fetch homepage data with cross-request caching. Mirrors the pattern used
 * for layout globals — the Payload DB is not hit on every render.
 */
const fetchHomepageData = unstable_cache(
  async (locale: string) => {
    const payload = await getCachedPayload();

    const [homepageResult, blogPostsResult, testimonialsResult, awardsResult] =
      await Promise.all([
        payload.findGlobal({
          slug: "homepage",
          depth: 2,
          locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
          draft: false,
          overrideAccess: true,
        }),
        payload.find({
          collection: "blog-posts",
          limit: 9,
          sort: "-publishedAt",
          locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
          draft: false,
          overrideAccess: true,
          where: { status: { equals: "published" } },
        }),
        payload.find({
          collection: "testimonials",
          limit: 9,
          sort: "order",
          locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
          draft: false,
          overrideAccess: true,
          where: { active: { equals: true } },
        }),
        payload.find({
          collection: "awards",
          limit: 9,
          sort: "order",
          locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
          draft: false,
          overrideAccess: true,
          where: { active: { equals: true } },
        }),
      ]);

    // Services fetched via the existing helper which handles missing tables gracefully.
    const services = await fetchServices(locale);

    return {
      homepageData: homepageResult as unknown as Record<string, unknown>,
      blogPosts: blogPostsResult.docs,
      testimonials: testimonialsResult.docs,
      awards: awardsResult.docs,
      services,
    };
  },
  ["homepage-data"],
  { revalidate: 60, tags: ["homepage"] },
);

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  let homepageData: Record<string, unknown> = {};
  let blogPosts: unknown[] = [];
  let testimonials: unknown[] = [];
  let awards: unknown[] = [];
  let services: ServiceSummary[] = [];

  try {
    const data = await fetchHomepageData(locale);
    homepageData = data.homepageData;
    blogPosts = data.blogPosts;
    testimonials = data.testimonials;
    awards = data.awards;
    const allServices =
      data.services.length > 0 ? data.services : FALLBACK_SERVICES;
    // Mirror the uslbd.com "Our Services" grid — show the full set (up to 12)
    // rather than a 3-card teaser.
    services = allServices.slice(0, 12);
  } catch {
    // Payload CMS database is not available during static generation or
    // tables do not exist yet. Components render with documented fallbacks.
    services = FALLBACK_SERVICES.slice(0, 12);
  }

  return (
    <HomeView
      initialHomepageData={homepageData}
      awards={awards}
      blogPosts={blogPosts}
      testimonials={testimonials}
      services={services}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"}
    />
  );
}
