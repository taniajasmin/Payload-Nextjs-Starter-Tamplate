import type { Metadata } from "next";
import { fetchGlobal } from "@/lib/fetch-global";
import { fetchProductsByCategory } from "@/lib/fetch-products";
import { ComputerComponentsPageClient } from "./computer-components-client-wrapper";

export const metadata: Metadata = {
  title:
    "Computer Components Catalog — SSDs, RAM, Graphics Cards | Simal Technologies Dubai",
  description:
    "Complete computer components catalog: Crucial SSDs, HIKVISION SSDs, DDR5 RAM, ARKTEK graphics cards, portable SSDs from Samsung, Kingston, SanDisk, WD, and Toshiba. Authorized distributor with full manufacturer warranty.",
  keywords: [
    "computer components catalog",
    "buy SSD Dubai",
    "DDR5 RAM distributor",
    "NVMe SSD wholesale UAE",
    "graphics cards Middle East",
    "portable SSD distributor",
    "Crucial SSD Dubai",
    "HIKVISION SSD UAE",
  ],
  alternates: {
    canonical: "https://www.simalme.com/hardware/computer-components",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/hardware/computer-components",
    title:
      "Computer Components Catalog — SSDs, RAM, Graphics Cards | Simal Technologies",
    description:
      "Complete computer components catalog from authorized distributor. SSDs, RAM, graphics cards, and storage from Crucial, HIKVISION, ARKTEK, Samsung, Kingston, WD, and more.",
    images: [
      {
        url: "https://www.simalme.com/assets/og/computer-components-og.jpg",
        width: 1200,
        height: 630,
        alt: "Simal Technologies Computer Components Catalog",
      },
    ],
  },
};

export default async function ComputerComponentsPage() {
  const [cmsData, products] = await Promise.all([
    fetchGlobal("computer-components-page"),
    fetchProductsByCategory("computer-components"),
  ]);

  return <ComputerComponentsPageClient initialData={cmsData} products={products} />;
}
