import { unstable_cache } from "next/cache";
import { getCachedPayload } from "@/lib/get-payload";
import { BlocksRenderer } from "@/components/blocks/renderer";
import type { LayoutBlock } from "@/components/blocks/renderer";

interface Props {
  params: Promise<{ locale: string }>;
}

interface PageDoc {
  id: string;
  slug?: string;
  title?: string;
  layout?: LayoutBlock[];
}

/**
 * Fetch the homepage (a Pages collection entry with slug "home").
 */
const fetchHomepage = unstable_cache(
  async (locale: string) => {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "pages",
      where: {
        slug: { equals: "home" },
        status: { equals: "published" },
      },
      limit: 1,
      locale: locale as "en" | undefined,
      draft: false,
      overrideAccess: true,
    });
    return (result.docs[0] as unknown as PageDoc) || null;
  },
  ["homepage"],
  { revalidate: 60, tags: ["homepage"] },
);

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  let page: PageDoc | null = null;

  try {
    page = await fetchHomepage(locale);
  } catch {
    // Payload not available — render empty shell
  }

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Welcome</h1>
          <p className="mt-2 text-muted-foreground">
            Create a page with slug &quot;home&quot; in the admin panel to get started.
          </p>
        </div>
      </div>
    );
  }

  return <BlocksRenderer layout={page.layout || []} />;
}
