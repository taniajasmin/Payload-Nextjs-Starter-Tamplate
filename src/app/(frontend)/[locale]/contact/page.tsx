import type { Metadata } from "next";
import { fetchGlobal } from "@/lib/fetch-global";
import { ContactPageContent } from "./contact-page-content";

export const metadata: Metadata = {
  title: "Contact Simal Technologies — IT Distributor in Dubai, UAE | Phone, Email, WhatsApp",
  description:
    "Get in touch with Simal Technologies Middle East LLC. Phone: +971 4 393 0507. Email: info@simalme.com. WhatsApp: +971 54 308 8655. Office in Bur Dubai near Jumeirah. IT hardware distribution & ERP solutions.",
  keywords: [
    "contact Simal Technologies",
    "IT distributor contact Dubai",
    "IT support UAE",
    "Simal Technologies phone",
    "IT solutions inquiry",
    "IT hardware sales inquiry",
    "B2B IT distributor UAE",
    "Simal Technologies office Dubai",
    "WhatsApp IT distributor",
  ],
  alternates: {
    canonical: "https://www.simalme.com/contact",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/contact",
    title: "Contact Simal Technologies — IT Distributor in Dubai, UAE",
    description:
      "Get in touch with Simal Technologies for IT distribution, solutions, and support. Phone, WhatsApp, email, and office locations in Dubai.",
    images: [
      {
        url: "https://www.simalme.com/assets/og/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Simal Technologies",
      },
    ],
  },
};

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const pageData = await fetchGlobal<Record<string, unknown>>(
    "contact-page",
    locale,
  );
  return <ContactPageContent initialData={pageData} />;
}
