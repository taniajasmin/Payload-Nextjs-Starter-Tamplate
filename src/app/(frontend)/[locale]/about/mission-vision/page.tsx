import type { Metadata } from "next";
import { AboutMissionVisionPage } from "@/components/about/about-mission-vision-page";

export const metadata: Metadata = {
  title: "Mission, Vision & Values — Simal Technologies",
  description:
    "The mission, vision, and core values that guide Simal Technologies Middle East LLC — premier IT distributor in Dubai, UAE.",
  alternates: {
    canonical: "https://www.simalme.com/about/mission-vision",
  },
};

export default function MissionVisionPage() {
  return <AboutMissionVisionPage />;
}
