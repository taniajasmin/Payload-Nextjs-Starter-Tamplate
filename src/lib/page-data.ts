import { getCachedPayload } from "@/lib/get-payload";

export interface PageData {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: unknown;
  meta?: {
    title?: string;
    description?: string;
    image?: {
      url?: string;
      alt?: string;
    };
  };
  publishedAt?: string;
  status?: string;
}

export async function getPageBySlug(slug: string): Promise<PageData | null> {
  try {
    const payload = await getCachedPayload();

    const result = await payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: "published",
        },
      },
      limit: 1,
    });

    return (result.docs[0] as unknown as PageData) || null;
  } catch {
    return null;
  }
}
