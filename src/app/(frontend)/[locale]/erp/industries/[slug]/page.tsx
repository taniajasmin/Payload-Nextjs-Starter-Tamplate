import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCachedPayload } from "@/lib/get-payload";

import { IndustryDetail, type IndustryDoc } from "@/components/erp/industry-detail";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

/* ------------------------------------------------------------------
   Static params
   ------------------------------------------------------------------ */

export async function generateStaticParams() {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: "erp-industries" as any,
      where: { status: { equals: "published" } },
      limit: 0,
      draft: false,
      overrideAccess: true,
    });
    return result.docs.map((doc) => ({
      slug: (doc as unknown as { slug: string }).slug,
    }));
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------
   Metadata
   ------------------------------------------------------------------ */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "erp-industries" as any,
      where: { slug: { equals: slug }, status: { equals: "published" } },
      limit: 1,
      locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
      draft: false,
      overrideAccess: true,
    });

    const doc = result.docs[0] as unknown as IndustryDoc | undefined;
    if (!doc) return { title: "Industry Not Found" };

    const meta = doc as unknown as {
      meta?: { title?: string; description?: string; image?: { url?: string; alt?: string } };
    };

    return {
      title: meta.meta?.title || doc.title || "Industry",
      description: meta.meta?.description || doc.tagline || "",
      openGraph: meta.meta?.image?.url
        ? { images: [{ url: meta.meta.image.url }] }
        : undefined,
    };
  } catch {
    return { title: "Industry Not Found" };
  }
}

/* ------------------------------------------------------------------
   Page
   ------------------------------------------------------------------ */

export default async function ErpIndustryPage({ params }: Props) {
  const { slug, locale } = await params;

  let doc: IndustryDoc | null = null;

  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "erp-industries" as any,
      where: { slug: { equals: slug }, status: { equals: "published" } },
      limit: 1,
      locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
      draft: false,
      overrideAccess: true,
    });
    doc = result.docs[0] as unknown as IndustryDoc | null;
  } catch {
    // Payload not available during static generation
  }

  if (!doc) notFound();

  return <IndustryDetail industry={doc} />;
}
