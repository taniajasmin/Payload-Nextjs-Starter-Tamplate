import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCachedPayload } from "@/lib/get-payload";
import { getBrandBySlug, getBrandSlugs, cmsToBrandPageData } from "@/lib/brand-data";
import { BRAND_LOGOS } from "@/lib/product-config";
import { mediaUrl } from "@/lib/media-url";
import { BrandPageRenderer } from "@/components/brands/brand-page-renderer";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export function generateStaticParams() {
  return getBrandSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const staticBrand = getBrandBySlug(slug);

  // Try CMS for SEO fields
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "brands",
      where: { slug: { equals: slug } },
      locale: locale as "en" | "ar" | "fr" | "ru" | "all" | undefined,
      depth: 0,
      limit: 1,
    });
    const cms = result.docs[0] as unknown as Record<string, unknown> | undefined;
    if (cms) {
      return {
        title: (cms.seoTitle as string) || staticBrand?.seoTitle || undefined,
        description:
          (cms.seoDescription as string) ||
          staticBrand?.seoDescription ||
          undefined,
        keywords:
          (cms.seoKeywords as string) || staticBrand?.seoKeywords || undefined,
      };
    }
  } catch {
    // CMS unavailable — fall through to static
  }

  if (!staticBrand) return {};
  return {
    title: staticBrand.seoTitle,
    description: staticBrand.seoDescription,
    keywords: staticBrand.seoKeywords,
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug, locale } = await params;
  const staticBrand = getBrandBySlug(slug);

  // Try CMS first
  let brand = staticBrand ?? null;
  let logoSrc: string | null = BRAND_LOGOS[slug] ?? null;

  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "brands",
      where: { slug: { equals: slug } },
      locale: locale as "en" | "ar" | "fr" | "ru" | "all" | undefined,
      depth: 2,
      limit: 1,
    });

    if (result.docs[0]) {
      brand = cmsToBrandPageData(
        result.docs[0] as unknown as Record<string, unknown>,
      );

      // CMS logo overrides static
      const cmsLogo = (result.docs[0] as unknown as Record<string, unknown>).logo as
        | { url?: string }
        | undefined;
      if (cmsLogo?.url) {
        logoSrc = mediaUrl(cmsLogo.url);
      }
    }
  } catch {
    // CMS unavailable — use static
  }

  if (!brand) notFound();

  return <BrandPageRenderer brand={brand} logoSrc={logoSrc} />;
}
