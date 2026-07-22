import type { Metadata } from "next";
import { getCachedPayload } from "@/lib/get-payload";

import { CareersSubNav } from "@/components/careers/careers-sub-nav";
import {
  CareersHeroSection,
  ApplicationCTA,
} from "@/components/careers/careers-sections";
import { JobFilter } from "@/components/careers/job-filter";
import { Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Current Openings — Simal Technologies | Job Opportunities Dubai, UAE",
  description:
    "Browse current job openings at Simal Technologies. IT distribution, sales, technical support, logistics, and marketing positions available in Dubai, UAE.",
  alternates: {
    canonical: "https://www.simalme.com/careers/openings",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/careers/openings",
    title: "Current Openings — Simal Technologies",
    description: "Browse current job openings at Simal Technologies in Dubai, UAE.",
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

/* ------------------------------------------------------------------
   Fallback hardcoded data — used when CMS is unavailable
   ------------------------------------------------------------------ */
const fallbackJobOpenings = [
  {
    id: "fallback-1",
    title: "Senior Account Manager — IT Distribution",
    slug: "senior-account-manager",
    department: "Sales & Business Development",
    location: "Dubai, UAE",
    type: "full-time",
    status: "open",
    description: "Manage key B2B accounts across the GCC region, drive revenue growth, and build lasting partnerships with resellers and system integrators.",
    requirements: [
      "5+ years B2B sales experience in IT distribution or technology sector",
      "Strong network of contacts in UAE/GCC IT market",
      "Experience managing multi-brand product portfolios",
      "Excellent negotiation and relationship management skills",
      "Bachelor's degree in Business, Marketing, or related field",
    ],
  },
  {
    id: "fallback-2",
    title: "Product Specialist — Storage & Memory",
    slug: "product-specialist",
    department: "Product Management",
    location: "Dubai, UAE",
    type: "full-time",
    status: "open",
    description: "Own the storage and memory product category, manage vendor relationships with Crucial, Kingston, Samsung, WD, and SanDisk, and develop go-to-market strategies.",
    requirements: [
      "3+ years in product management or product specialist role",
      "Deep knowledge of SSD, RAM, and storage technologies",
      "Vendor relationship management experience",
      "Analytical skills for market research and pricing strategy",
      "Bachelor's degree in IT, Engineering, or related field",
    ],
  },
  {
    id: "fallback-3",
    title: "Technical Support Engineer",
    slug: "technical-support",
    department: "Technical Support",
    location: "Dubai, UAE",
    type: "full-time",
    status: "open",
    description: "Provide technical support for enterprise IT solutions including firewalls, NAS storage, surveillance systems, and AV solutions.",
    requirements: [
      "2+ years technical support experience",
      "Certifications in Sophos, Synology, or HIKVISION preferred",
      "Networking fundamentals (TCP/IP, VLANs, VPNs)",
      "Excellent problem-solving and communication skills",
      "Bachelor's degree in IT, Computer Science, or related field",
    ],
  },
  {
    id: "fallback-4",
    title: "Warehouse & Logistics Coordinator",
    slug: "warehouse-coordinator",
    department: "Warehouse & Logistics",
    location: "Dubai, UAE",
    type: "full-time",
    status: "open",
    description: "Coordinate warehouse operations, manage inventory, process shipments, and ensure timely delivery across the Middle East and Africa.",
    requirements: [
      "2+ years warehouse or logistics experience",
      "Experience with inventory management systems",
      "Knowledge of UAE customs and import/export procedures",
      "Strong organizational and time management skills",
      "Forklift license preferred",
    ],
  },
  {
    id: "fallback-5",
    title: "Digital Marketing Specialist",
    slug: "digital-marketing",
    department: "Marketing",
    location: "Dubai, UAE",
    type: "full-time",
    status: "open",
    description: "Drive digital marketing initiatives including SEO, social media, email campaigns, and content creation for Simal Technologies' brand presence.",
    requirements: [
      "3+ years digital marketing experience, preferably in B2B IT",
      "Proficiency in Google Analytics, Google Ads, and social media platforms",
      "Experience with email marketing tools (Mailchimp, HubSpot)",
      "Strong content creation and copywriting skills",
      "Bachelor's degree in Marketing, Communications, or related field",
    ],
  },
  {
    id: "fallback-6",
    title: "B2B Sales Executive",
    slug: "b2b-sales",
    department: "Sales & Business Development",
    location: "Dubai, UAE",
    type: "full-time",
    status: "open",
    description: "Generate new business leads, manage the sales pipeline, and close B2B deals for IT hardware distribution across the UAE market.",
    requirements: [
      "2+ years B2B sales experience in IT or electronics",
      "Proven track record of meeting sales targets",
      "Strong cold-calling and prospecting skills",
      "CRM experience (HubSpot, Salesforce)",
      "Bachelor's degree preferred",
    ],
  },
];

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function OpeningsPage({ params }: Props) {
  const { locale } = await params;

  let jobOpenings = fallbackJobOpenings;

  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "careers",
      where: {
        status: { equals: "open" },
      },
      limit: 100,
      sort: "title",
      locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
    });

    if (result.docs.length > 0) {
      jobOpenings = (result.docs as unknown as Record<string, unknown>[]).map((doc) => ({
        id: String(doc.id ?? ""),
        title: (doc.title as string) || "",
        slug: (doc.slug as string) || "",
        department: (doc.department as string) || "",
        location: (doc.location as string) || "Dubai, UAE",
        type: (doc.type as string) || "full-time",
        status: (doc.status as string) || "open",
        description: extractTextFromLexical(doc.description),
        requirements: extractParagraphs(doc.requirements),
      }));
    }
  } catch {
    // CMS unavailable — use fallback
  }

  const departments = [...new Set(jobOpenings.map((j) => j.department))].filter(Boolean);

  return (
    <div className="flex flex-col">
      <CareersHeroSection
        badge="Open Positions"
        badgeIcon={<Briefcase className="w-4 h-4" />}
        title="Current Openings"
        subtitle={`${jobOpenings.length} open position${jobOpenings.length !== 1 ? "s" : ""} across ${departments.length} department${departments.length !== 1 ? "s" : ""}. Find the role that fits your skills and ambitions.`}
      />

      <CareersSubNav />

      {/* Department Filter + Job Listings */}
      <section className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Badge */}
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Browse Jobs
          </span>

          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Find Your{" "}
            <span className="text-primary">Next Role</span>
          </h2>

          <div className="mt-10">
            <JobFilter jobOpenings={jobOpenings} departments={departments} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <ApplicationCTA
        heading="Don't See the Right Role?"
        subtitle="We're always looking for talented people. Submit a general application and we'll keep you in mind for future openings."
        primaryCta={{ href: "/careers/apply", label: "Submit General Application" }}
      />
    </div>
  );
}
