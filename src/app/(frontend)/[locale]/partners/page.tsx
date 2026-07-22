import type { Metadata } from "next";
import { PartnersPageContent } from "@/components/partners/partners-page-content";

export const metadata: Metadata = {
  title: "Partner Program — Become an Authorized Simal Technologies Reseller | UAE, GCC, Bangladesh",
  description:
    "Join Simal Technologies' partner ecosystem. Three tiers: Authorized, Premier, Elite. Access 22+ global IT brands, UniERP solutions, marketing support, training & certification. Competitive margins.",
  keywords: [
    "Simal Technologies partner program",
    "authorized reseller UAE",
    "IT distributor partner GCC",
    "Premier Partner Simal",
    "Elite Partner IT distributor",
    "UniERP reseller rights",
    "become IT reseller Bangladesh",
  ],
  alternates: {
    canonical: "https://www.simalme.com/partners",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/partners",
    title:
      "Partner Program — Become an Authorized Simal Technologies Reseller | UAE, GCC, Bangladesh",
    description:
      "Join Simal Technologies' partner ecosystem. Three tiers: Authorized, Premier, Elite. Access 22+ global IT brands, UniERP solutions, marketing support, training & certification.",
    images: [
      {
        url: "https://www.simalme.com/assets/og/partners.jpg",
        width: 1200,
        height: 630,
        alt: "Simal Technologies Partner Program",
      },
    ],
  },
};

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  // Locale is acknowledged for routing; page content is sourced from docs and
  // not yet localized per-locale. Render the same structured content for now.
  void locale;
  return <PartnersPageContent />;
}
