import type { Metadata } from "next";
import { AboutCsrPage } from "@/components/about/about-csr-page";

export const metadata: Metadata = {
  title: "CSR & Sustainability — Simal Technologies",
  description:
    "Simal Technologies corporate social responsibility: education access, environmental stewardship, healthcare support, and inclusive employment across the UAE and Bangladesh.",
  alternates: {
    canonical: "https://www.simalme.com/about/csr",
  },
};

export default function CSRPage() {
  return <AboutCsrPage />;
}
