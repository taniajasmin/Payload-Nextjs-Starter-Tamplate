import type { Metadata } from "next";
import { getCachedPayload } from "@/lib/get-payload";

import { CareersSubNav } from "@/components/careers/careers-sub-nav";
import {
  CareersHeroSection,
  JobDetailContent,
  ApplicationCTA,
} from "@/components/careers/careers-sections";
import { Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Job Detail — Simal Technologies",
  description: "View job details and apply at Simal Technologies.",
  alternates: {
    canonical: "https://www.simalme.com/careers/openings",
  },
};

/* ------------------------------------------------------------------
   Helpers to extract plain text from Payload rich-text (Lexical)
   ------------------------------------------------------------------ */
type LexicalNode = {
  type?: string;
  text?: string;
  children?: LexicalNode[];
  root?: LexicalNode;
};

function extractTextFromLexical(data: unknown): string {
  if (!data) return "";
  if (typeof data === "string") return data;
  if (Array.isArray(data)) return data.map(extractTextFromLexical).join("");
  const node = data as LexicalNode;
  if (node.type === "text") return node.text || "";
  if (node.children) return node.children.map(extractTextFromLexical).join("");
  if (node.root?.children) return node.root.children.map(extractTextFromLexical).join("\n");
  return "";
}

function extractParagraphs(data: unknown): string[] {
  if (!data || typeof data === "string" || Array.isArray(data)) return [];
  const node = data as LexicalNode;
  const root = node.root || node;
  const children = root.children || [];
  return children
    .map((child) => {
      if (child.type === "paragraph" || child.type === "listitem") {
        return (child.children || []).map((c) => c.text || "").join("");
      }
      if (child.type === "list") {
        return (child.children || []).map((li) =>
          (li.children || []).map((c) => c.text || "").join("")
        );
      }
      return "";
    })
    .flat()
    .filter((s: string) => s.trim().length > 0);
}

interface JobDetailPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug, locale } = await params;

  let jobData: {
    title?: string;
    department?: string;
    location?: string;
    type?: string;
    description?: string;
    requirements?: string[];
  } = {};

  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "careers",
      where: {
        slug: { equals: slug },
      },
      limit: 1,
      locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
    });

    if (result.docs.length > 0) {
      const doc = result.docs[0] as {
        title?: string;
        department?: string;
        location?: string;
        type?: string;
        description?: unknown;
        requirements?: unknown;
      };
      jobData = {
        title: doc.title || "",
        department: doc.department || "",
        location: doc.location || "Dubai, UAE",
        type: doc.type || "full-time",
        description: extractTextFromLexical(doc.description),
        requirements: extractParagraphs(doc.requirements),
      };
    }
  } catch {
    // CMS unavailable — use placeholder data
  }

  const displayTitle = jobData.title || slug.replace(/-/g, " ");

  return (
    <div className="flex flex-col">
      <CareersHeroSection
        badge="Job Detail"
        badgeIcon={<Briefcase className="w-4 h-4" />}
        title={displayTitle}
        subtitle={
          jobData.description
            ? jobData.description.slice(0, 160) + (jobData.description.length > 160 ? "..." : "")
            : "Join our team and make an impact in IT distribution across the Middle East, Africa, and CIS."
        }
        breadcrumb={{ label: "Openings", href: "/careers/openings", current: displayTitle }}
      />

      <CareersSubNav />

      {/* Job Content */}
      <section className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl mx-auto">
            <JobDetailContent
              slug={slug}
              title={displayTitle}
              department={jobData.department}
              location={jobData.location}
              type={jobData.type}
              description={jobData.description}
              requirements={jobData.requirements}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <ApplicationCTA
        heading="Interested?"
        subtitle="Apply now or browse other open positions."
        primaryCta={{ href: "/careers/apply", label: "Apply Now" }}
        secondaryCta={{ href: "/careers/openings", label: "All Openings" }}
      />
    </div>
  );
}
