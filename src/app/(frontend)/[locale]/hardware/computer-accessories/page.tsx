import type { Metadata } from "next";
import { fetchGlobal } from "@/lib/fetch-global";
import { fetchProductsByCategory } from "@/lib/fetch-products";
import { ComputerAccessoriesPageClient } from "./computer-accessories-client-wrapper";

export const metadata: Metadata = {
  title: "Computer Accessories Catalog — Hubs, Cables, Surge Protectors | Simal Technologies Dubai",
  description: "Complete computer accessories catalog: UGREEN USB-C hubs, docking stations, HDMI cables, Ethernet cables, DisplayPort cables, Honeywell surge protectors, extension cords, and travel adapters. Authorized distributor with full manufacturer warranty.",
  keywords: ["computer accessories catalog", "UGREEN hub Dubai", "USB-C docking station UAE", "HDMI cable distributor", "Ethernet cable wholesale", "Honeywell surge protector Dubai", "extension cord Middle East", "travel adapter distributor"],
  alternates: { canonical: "https://www.simalme.com/hardware/computer-accessories" },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/hardware/computer-accessories",
    title: "Computer Accessories Catalog — Hubs, Cables, Surge Protectors | Simal Technologies",
    description: "Complete computer accessories catalog from authorized distributor. UGREEN hubs, cables, docking stations and Honeywell surge protectors with full warranty.",
    images: [{ url: "https://www.simalme.com/assets/og/computer-accessories-og.jpg", width: 1200, height: 630, alt: "Simal Technologies Computer Accessories Catalog" }],
  },
};

export default async function ComputerAccessoriesPage() {
  const [cmsData, products] = await Promise.all([
    fetchGlobal("computer-accessories-page"),
    fetchProductsByCategory("computer-accessories"),
  ]);

  return <ComputerAccessoriesPageClient initialData={cmsData} products={products} />;
}
