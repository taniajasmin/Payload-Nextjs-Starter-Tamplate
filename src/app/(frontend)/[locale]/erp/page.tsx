import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { getCachedPayload } from "@/lib/get-payload";
import { ErpPlatformDetail } from "@/components/erp/erp-platform-detail";
import type { ErpPlatformDoc } from "@/components/erp/erp-platform-detail";

interface Props {
  params: Promise<{ locale: string }>;
}

const fetchErpPage = unstable_cache(
  async (locale: string) => {
    const payload = await getCachedPayload();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (payload.findGlobal as any)({
      slug: "erp-page",
      depth: 2,
      locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
      draft: false,
      overrideAccess: true,
    });
    return result as unknown as ErpPlatformDoc;
  },
  ["erp-page"],
  { revalidate: 60, tags: ["erp-page"] },
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  try {
    const page = await fetchErpPage(locale);

    return {
      title: page.meta?.title || page.hero?.headline || "UniERP Platform",
      description: page.meta?.description || "",
      openGraph: page.meta?.image?.url
        ? { images: [{ url: page.meta.image.url }] }
        : undefined,
    };
  } catch {
    return { title: "UniERP Platform" };
  }
}

export default async function ErpOverviewPage({ params }: Props) {
  const { locale } = await params;

  let page: ErpPlatformDoc | null = null;

  try {
    page = await fetchErpPage(locale);
  } catch {
    // Payload not available during static generation
  }

  if (!page) notFound();

  return <ErpPlatformDetail data={page} />;
}
