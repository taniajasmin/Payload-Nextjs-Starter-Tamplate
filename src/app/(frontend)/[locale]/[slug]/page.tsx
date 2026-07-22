import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCachedPayload } from "@/lib/get-payload";
import { BlocksRenderer } from "@/components/blocks/renderer";
import type { LayoutBlock } from "@/components/blocks/renderer";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

interface PageDoc {
  id: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  layout?: LayoutBlock[];
  meta?: {
    title?: string;
    description?: string;
    image?: { url?: string; alt?: string };
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "pages",
      where: {
        slug: { equals: slug },
        status: { equals: "published" },
      },
      limit: 1,
      locale: locale as "en" | undefined,
    });

    const page = result.docs[0] as unknown as PageDoc | undefined;

    if (!page) {
      return { title: "Page Not Found" };
    }

    return {
      title: page.meta?.title || page.title || "",
      description: page.meta?.description || "",
      openGraph: page.meta?.image?.url
        ? { images: [{ url: page.meta.image.url }] }
        : undefined,
    };
  } catch {
    return { title: "Page Not Found" };
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug, locale } = await params;

  let page: PageDoc | null = null;

  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "pages",
      where: {
        slug: { equals: slug },
        status: { equals: "published" },
      },
      limit: 1,
      locale: locale as "en" | undefined,
    });

    page = result.docs[0] as unknown as PageDoc | null;
  } catch {
    // Payload not available during static generation
  }

  if (!page) {
    notFound();
  }

  return <BlocksRenderer layout={page.layout || []} />;
}
