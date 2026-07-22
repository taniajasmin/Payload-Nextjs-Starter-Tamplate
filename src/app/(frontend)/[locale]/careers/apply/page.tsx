import type { Metadata } from "next";
import { ApplyForm } from "@/components/careers/apply-form";
import { CareersHeroSection } from "@/components/careers/careers-sections";
import { UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Apply Now — Simal Technologies | Job Application",
  description:
    "Submit your job application to Simal Technologies. Upload your CV and apply for open positions or submit a general application for future opportunities.",
  alternates: {
    canonical: "https://www.simalme.com/careers/apply",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/careers/apply",
    title: "Apply Now — Simal Technologies",
    description: "Submit your job application to Simal Technologies.",
  },
};

export default function ApplyPage() {
  return (
    <div className="flex flex-col">
      <CareersHeroSection
        badge="Apply Now"
        badgeIcon={<UserCheck className="w-4 h-4" />}
        title="Submit Your Application"
        subtitle="Submit your application to join the Simal Technologies team. You can apply for a specific position or submit a general application for future opportunities."
      />

      <ApplyForm />
    </div>
  );
}
