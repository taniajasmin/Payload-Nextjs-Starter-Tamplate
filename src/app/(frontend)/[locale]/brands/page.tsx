import type { Metadata } from "next";
import { getCachedPayload } from "@/lib/get-payload";

import { fetchGlobal } from "@/lib/fetch-global";
import { allBrands } from "@/lib/brand-data";
import type { BrandPageData } from "@/lib/brand-data";
import { BrandsPageContent } from "./brands-page-content";

export const metadata: Metadata = {
  title: "Our Brands — Authorized Hardware Partners | Simal Technologies",
  description:
    "Simal Technologies Middle East — authorized distributor for 20+ world-class IT brands across the Middle East, Africa, CIS, and GCC. Crucial, UGREEN, HIKVISION, Dell, HP, Lenovo, Samsung, and more.",
  keywords: [
    "Simal Technologies brands Dubai",
    "authorized IT distributor brands UAE",
    "Simal brand partners",
    "IT brands distribution Middle East",
    "Crucial distributor",
    "UGREEN distributor",
    "HIKVISION distributor",
    "Dell distributor UAE",
  ],
  alternates: {
    canonical: "https://www.simalme.com/brands",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/brands",
    title: "Our Brands — Authorized Hardware Partners | Simal Technologies",
    description:
      "Authorized distributor for 20+ world-class IT brands across the Middle East, Africa, CIS, and GCC.",
    images: [
      {
        url: "https://www.simalme.com/assets/og/brands-og.jpg",
        width: 1200,
        height: 630,
        alt: "Simal Technologies Authorized Brand Partners",
      },
    ],
  },
};

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string | string[] }>;
}

export default async function BrandsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { tab } = await searchParams;
  const initialTab: "brands" | "categories" =
    (Array.isArray(tab) ? tab[0] : tab) === "categories"
      ? "categories"
      : "brands";

  // Fetch page-level CMS content (hero, section headers, features, awards, CTA)
  const pageData = await fetchGlobal<Record<string, unknown>>(
    "brands-page",
    locale,
  );

  // Fetch individual brand cards from the Brands collection
  let brands: BrandPageData[] = allBrands;

  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "brands",
      depth: 2,
      locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
      limit: 0,
    });

    if (result.docs.length > 0) {
      brands = result.docs as unknown as BrandPageData[];
    }
  } catch {
    // CMS not available — use static fallback
  }

  return (
    <BrandsPageContent
      initialData={pageData}
      brands={brands}
      initialTab={initialTab}
    />
  );
}
