import type { Metadata } from "next";
import { fetchGlobal } from "@/lib/fetch-global";
import { fetchProductsByCategory } from "@/lib/fetch-products";
import { GamingPageClient } from "./gaming-client-wrapper";

export const metadata: Metadata = {
  title: "Gaming Catalog — GPUs, Monitors, SSDs, Motherboards | Simal Technologies Dubai",
  description: "Complete gaming hardware catalog: ARKTEK graphics cards, KOORUI gaming monitors, MSI motherboards, Crucial high-speed SSDs. Authorized distributor with full manufacturer warranty across Middle East, Africa, CIS & GCC.",
  keywords: ["gaming hardware catalog Dubai", "gaming GPU UAE", "ARKTEK graphics card distributor", "KOORUI gaming monitor wholesale", "gaming SSD Middle East", "RTX 3060 Dubai distributor", "MSI motherboard UAE", "gaming PC components"],
  alternates: { canonical: "https://www.simalme.com/hardware/gaming" },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/hardware/gaming",
    title: "Gaming Catalog — GPUs, Monitors, SSDs, Motherboards | Simal Technologies",
    description: "Complete gaming hardware catalog from authorized distributor. ARKTEK GPUs, KOORUI monitors, MSI motherboards, Crucial SSDs with full warranty.",
    images: [{ url: "https://www.simalme.com/assets/og/gaming-og.jpg", width: 1200, height: 630, alt: "Simal Technologies Gaming Catalog" }],
  },
};

export default async function GamingPage() {
  const [cmsData, products] = await Promise.all([
    fetchGlobal("gaming-page"),
    fetchProductsByCategory("gaming"),
  ]);

  return <GamingPageClient initialData={cmsData} products={products} />;
}
