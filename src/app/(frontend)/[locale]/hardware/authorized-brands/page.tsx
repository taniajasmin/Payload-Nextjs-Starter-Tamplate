import type { Metadata } from "next";
import { fetchGlobal } from "@/lib/fetch-global";
import { AuthorizedBrandsPageClient } from "./authorized-brands-client";

export const metadata: Metadata = {
  title: "Authorized Brands — 20+ Global IT Brands | Simal Technologies Dubai, UAE",
  description:
    "Officially authorized distributor for Crucial, UGREEN, HIKVISION, ARKTEK, KOORUI, Dell, HP, Lenovo and more. Guaranteed authentic products with full manufacturer warranty.",
  keywords: [
    "authorized IT brands Dubai",
    "Crucial distributor UAE",
    "UGREEN distributor",
    "HIKVISION authorized distributor",
    "Dell HP Lenovo distributor Middle East",
  ],
  alternates: {
    canonical: "https://www.simalme.com/hardware/authorized-brands",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/hardware/authorized-brands",
    title: "Authorized Brands — 20+ Global IT Brands | Simal Technologies",
    description:
      "Officially authorized distributor for 20+ global IT brands. Guaranteed authentic products with full manufacturer warranty.",
    images: [
      {
        url: "https://www.simalme.com/assets/og/authorized-brands-og.jpg",
        width: 1200,
        height: 630,
        alt: "Simal Technologies Authorized Brands",
      },
    ],
  },
};

export default async function AuthorizedBrandsPage() {
  const cmsData = await fetchGlobal("authorized-brands-page");

  return <AuthorizedBrandsPageClient initialData={cmsData} />;
}
