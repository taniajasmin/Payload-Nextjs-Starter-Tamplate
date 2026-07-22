import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import {
  fetchAllServiceSlugs,
  fetchServiceBySlug,
} from "@/lib/fetch-services";
import { SERVICE_FALLBACKS } from "@/lib/services-fallback";
import { ServicePageClient } from "@/components/services/service-page-client";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

const getServiceBySlug = cache((slug: string, locale: string) =>
  fetchServiceBySlug(slug, locale),
);

export async function generateStaticParams() {
  const slugs = await fetchAllServiceSlugs();
  const all = Array.from(new Set([...slugs, ...Object.keys(SERVICE_FALLBACKS)]));
  return all.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = (await getServiceBySlug(slug, locale)) ?? SERVICE_FALLBACKS[slug];
  if (!service) return { title: "Solution Not Found" };

  return {
    title: service.meta?.title || `${service.title} — Simal Technologies`,
    description:
      service.meta?.description || service.tagline || service.title,
    alternates: {
      canonical: `https://www.simalme.com/solutions/${service.slug}`,
    },
    openGraph: {
      title:
        service.meta?.title || `${service.title} — Simal Technologies`,
      description:
        service.meta?.description || service.tagline || service.title,
      images: service.meta?.image?.url
        ? [{ url: service.meta.image.url }]
        : undefined,
    },
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const cmsService = await getServiceBySlug(slug, locale);

  const fallback = SERVICE_FALLBACKS[slug];
  let service: typeof cmsService;

  /** Truthy AND non-empty (for arrays the CMS returns as []). */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const has = <T,>(v: T[] | null | undefined): v is T[] =>
    Array.isArray(v) && v.length > 0;

  if (cmsService) {
    service = {
      ...cmsService,
      // Prefer the fallback overview/features/benefits when they are richer
      // (the seed content is the source of truth; CMS may have shorter stubs).
      overview:
        (fallback?.overview && fallback.overview.length > (cmsService.overview?.length ?? 0))
          ? fallback.overview
          : cmsService.overview,
      features: has(cmsService.features) ? cmsService.features : fallback?.features,
      benefits: has(cmsService.benefits) ? cmsService.benefits : fallback?.benefits,
      heroBackgroundImage: cmsService.heroBackgroundImage ?? fallback?.heroBackgroundImage,
      heroStats: has(cmsService.heroStats) ? cmsService.heroStats : fallback?.heroStats,
      processSteps: has(cmsService.processSteps) ? cmsService.processSteps : fallback?.processSteps,
      useCases: has(cmsService.useCases) ? cmsService.useCases : fallback?.useCases,
      subCategories: has(cmsService.subCategories) ? cmsService.subCategories : fallback?.subCategories,
      brands: has(cmsService.brands) ? cmsService.brands : fallback?.brands,
      relatedServices: has(cmsService.relatedServices) ? cmsService.relatedServices : fallback?.relatedServices,
      ctaSection: cmsService.ctaSection ?? fallback?.ctaSection,
    };
  } else {
    service = fallback ?? null;
  }

  if (!service) {
    notFound();
  }

  return <ServicePageClient initialData={service} />;
}
