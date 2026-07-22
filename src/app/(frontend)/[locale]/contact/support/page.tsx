import type { Metadata } from "next";
import { SupportRequestPageContent } from "./support-request-page-content";

export const metadata: Metadata = {
  title: "Technical Support & RMA Request — IT Hardware Support | Simal Technologies",
  description:
    "Submit a technical support or warranty/RMA request to Simal Technologies. For IT hardware purchased from Simal: SSDs, RAM, GPUs, monitors, networking & accessories. Response within 4 business hours.",
  keywords: [
    "IT hardware support",
    "RMA request Dubai",
    "warranty claim IT hardware",
    "technical support Simal",
    "product return UAE",
  ],
  alternates: {
    canonical: "https://www.simalme.com/contact/support",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/contact/support",
    title: "Technical Support & RMA Request | Simal Technologies",
    description:
      "Submit a technical support or warranty/RMA request for IT hardware purchased from Simal Technologies. Response within 4 business hours.",
    images: [
      {
        url: "https://www.simalme.com/assets/og/support-request-og.jpg",
        width: 1200,
        height: 630,
        alt: "Technical Support — Simal Technologies",
      },
    ],
  },
};

export default function SupportRequestPage() {
  return <SupportRequestPageContent />;
}
