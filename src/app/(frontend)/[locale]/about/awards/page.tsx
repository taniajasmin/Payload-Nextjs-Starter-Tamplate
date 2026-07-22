import type { Metadata } from "next";
import { AboutAwardsPage } from "@/components/about/about-awards-page";

export const metadata: Metadata = {
  title: "Awards & Achievements — Simal Technologies",
  description:
    "Industry recognition, certifications, and authorized distributor partnerships held by Simal Technologies Middle East LLC.",
  alternates: {
    canonical: "https://www.simalme.com/about/awards",
  },
};

export default function AwardsPage() {
  return <AboutAwardsPage />;
}
