import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCachedPayload } from "@/lib/get-payload";

import { PageLivePreview } from "@/components/page-live-preview";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

interface PageDoc {
  id: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: unknown;
  meta?: { title?: string; description?: string; image?: { url?: string; alt?: string } };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "pages",
      where: { slug: { equals: `erp/${slug}` }, status: { equals: "published" } },
      limit: 1,
      locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
    });

    const page = result.docs[0] as unknown as PageDoc | undefined;
    if (!page) return { title: "Page Not Found" };

    return {
      title: page.meta?.title || page.title || "",
      description: page.meta?.description || "",
      openGraph: page.meta?.image?.url ? { images: [{ url: page.meta.image.url }] } : undefined,
    };
  } catch {
    return { title: "Page Not Found" };
  }
}

export default async function ErpSubPage({ params }: Props) {
  const { slug, locale } = await params;

  let page: PageDoc | null = null;

  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "pages",
      where: { slug: { equals: `erp/${slug}` }, status: { equals: "published" } },
      limit: 1,
      locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
    });
    page = result.docs[0] as unknown as PageDoc | null;
  } catch {
    // Payload not available during static generation
  }

  if (!page) notFound();

  return <PageLivePreview initialData={page} />;
}
