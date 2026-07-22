import type { Metadata } from "next";
import { fetchGlobal } from "@/lib/fetch-global";
import { fetchProductsByCategory } from "@/lib/fetch-products";
import { LaptopsPageClient } from "./laptops-client-wrapper";

export const metadata: Metadata = {
  title:
    "Laptops Catalog — Dell, HP, Lenovo Enterprise Laptops | Simal Technologies Dubai",
  description:
    "Complete enterprise laptop catalog: Dell 15 Laptop, HP OmniBook 5, Lenovo IdeaPad Slim 3. Authorized distributor for business, education, and professional use with full manufacturer warranty.",
  keywords: [
    "laptops catalog Dubai",
    "Dell laptop UAE distributor",
    "HP laptop wholesale",
    "Lenovo IdeaPad distributor",
    "business laptop Middle East",
    "enterprise laptop supplier GCC",
    "corporate laptop procurement",
  ],
  alternates: {
    canonical: "https://www.simalme.com/hardware/laptops",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/hardware/laptops",
    title:
      "Laptops Catalog — Dell, HP, Lenovo Enterprise Laptops | Simal Technologies",
    description:
      "Complete enterprise laptop catalog from authorized distributor. Dell, HP, and Lenovo laptops with full warranty.",
    images: [
      {
        url: "https://www.simalme.com/assets/og/laptops-og.jpg",
        width: 1200,
        height: 630,
        alt: "Simal Technologies Laptops Catalog",
      },
    ],
  },
};

export default async function LaptopsPage() {
  const [cmsData, products] = await Promise.all([
    fetchGlobal("laptops-page"),
    fetchProductsByCategory("laptops"),
  ]);

  return <LaptopsPageClient initialData={cmsData} products={products} />;
}
