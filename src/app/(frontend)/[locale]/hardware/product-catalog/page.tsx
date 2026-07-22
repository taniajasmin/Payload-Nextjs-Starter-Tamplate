import type { Metadata } from "next";
import { fetchGlobal } from "@/lib/fetch-global";
import { fetchAllProducts } from "@/lib/fetch-products";
import { ProductCatalogPageClient } from "./product-catalog-client-wrapper";

export const metadata: Metadata = {
  title:
    "IT Products Showcase — Components, Monitors, Laptops & Gaming | Simal Technologies",
  description:
    "Explore authentic IT hardware from authorized brands — Crucial, UGREEN, HIKVISION, ARKTEK, KOORUI, Dell, HP, Lenovo. Components, accessories, monitors, gaming and laptops, sourced directly with full warranty.",
  keywords: [
    "IT products catalog",
    "buy computer components Dubai",
    "wholesale IT hardware",
    "SSDs UAE",
    "graphics cards distributor",
    "computer accessories Dubai",
  ],
  alternates: {
    canonical: "https://www.simalme.com/hardware/product-catalog",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/hardware/product-catalog",
    title: "Product Catalog — 76+ IT Products | Simal Technologies",
    description:
      "Complete IT hardware catalog from authorized distributor. SSDs, GPUs, RAM, monitors, laptops, accessories.",
    images: [
      {
        url: "https://www.simalme.com/assets/og/product-catalog-og.jpg",
        width: 1200,
        height: 630,
        alt: "Simal Technologies Product Catalog",
      },
    ],
  },
};

export default async function ProductCatalogPage() {
  const [cmsData, products] = await Promise.all([
    fetchGlobal("product-catalog-page"),
    fetchAllProducts(),
  ]);

  return <ProductCatalogPageClient initialData={cmsData} products={products} />;
}
