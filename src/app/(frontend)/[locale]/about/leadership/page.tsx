import type { Metadata } from "next";
import { AboutLeadershipPage } from "@/components/about/about-leadership-page";

export const metadata: Metadata = {
  title: "Leadership Team — Simal Technologies",
  description:
    "Meet the chairman, managing director, and executive leadership behind Simal Technologies Middle East LLC.",
  alternates: {
    canonical: "https://www.simalme.com/about/leadership",
  },
};

export default function LeadershipPage() {
  return <AboutLeadershipPage />;
}
