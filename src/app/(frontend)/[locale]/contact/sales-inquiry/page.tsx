import type { Metadata } from "next";
import { SalesInquiryPageContent } from "./sales-inquiry-page-content";

export const metadata: Metadata = {
  title: "Sales Inquiry — Request IT Hardware Pricing | Simal Technologies Dubai",
  description:
    "Submit a B2B sales inquiry to Simal Technologies. Get pricing, stock availability, and bulk order quotes for IT hardware: SSDs, RAM, GPUs, monitors, networking, surveillance & accessories. Response within 4 business hours.",
  keywords: [
    "IT hardware sales inquiry",
    "B2B IT distributor Dubai",
    "request IT hardware quote",
    "bulk IT hardware pricing",
    "Simal sales inquiry",
  ],
  alternates: {
    canonical: "https://www.simalme.com/contact/sales-inquiry",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/contact/sales-inquiry",
    title: "Sales Inquiry — Request IT Hardware Pricing | Simal Technologies",
    description:
      "Get pricing, stock availability, and bulk order quotes for IT hardware from Simal Technologies. Response within 4 business hours.",
    images: [
      {
        url: "https://www.simalme.com/assets/og/sales-inquiry-og.jpg",
        width: 1200,
        height: 630,
        alt: "Sales Inquiry — Simal Technologies",
      },
    ],
  },
};

export default function SalesInquiryPage() {
  return <SalesInquiryPageContent />;
}
