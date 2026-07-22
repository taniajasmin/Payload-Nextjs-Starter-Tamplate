import type { Metadata } from "next";
import { AboutAllSections } from "@/components/about/about-all-sections";

export const metadata: Metadata = {
  title: "About Simal Technologies — Premier IT Distributor in Dubai, UAE",
  description:
    "Learn about Simal Technologies Middle East LLC — founded 2002, 20+ years of IT distribution excellence. Authorized distributor for 20+ global brands across Middle East, Africa, CIS & GCC.",
  alternates: {
    canonical: "https://www.simalme.com/about",
  },
};

export default function AboutPage() {
  return <AboutAllSections />;
}
