import type { Metadata } from "next";
import { fetchGlobal } from "@/lib/fetch-global";
import { fetchProductsByCategory } from "@/lib/fetch-products";
import { MonitorsPageClient } from "./monitors-client-wrapper";

export const metadata: Metadata = {
  title: "Monitors Catalog — Gaming, Professional, FHD Displays | Simal Technologies Dubai",
  description: "Complete monitors catalog: KOORUI gaming monitors, Aiwa professional displays. Curved ultrawide, FHD, and slim LED monitors from authorized distributor with full manufacturer warranty.",
  keywords: ["monitors catalog Dubai", "KOORUI gaming monitor UAE", "Aiwa monitor distributor", "curved monitor wholesale", "FHD display supplier", "gaming monitor Middle East", "ultrawide monitor distributor"],
  alternates: { canonical: "https://www.simalme.com/hardware/monitors" },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/hardware/monitors",
    title: "Monitors Catalog — Gaming, Professional, FHD Displays | Simal Technologies",
    description: "Complete monitors catalog from authorized distributor. KOORUI gaming and Aiwa professional displays with full warranty.",
    images: [{ url: "https://www.simalme.com/assets/og/monitors-og.jpg", width: 1200, height: 630, alt: "Simal Technologies Monitors Catalog" }],
  },
};

export default async function MonitorsPage() {
  const [cmsData, products] = await Promise.all([
    fetchGlobal("monitors-page"),
    fetchProductsByCategory("monitors"),
  ]);

  return <MonitorsPageClient initialData={cmsData} products={products} />;
}
