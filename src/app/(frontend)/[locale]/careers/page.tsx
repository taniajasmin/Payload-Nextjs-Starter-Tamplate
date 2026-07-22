import type { Metadata } from "next";
import { CareersSubNav } from "@/components/careers/careers-sub-nav";
import {
  CareersHeroSection,
  DepartmentsSection,
  WhyJoinSection,
  ApplicationCTA,
} from "@/components/careers/careers-sections";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers — Simal Technologies | Join Our Team Dubai, UAE",
  description:
    "Explore career opportunities at Simal Technologies Middle East LLC. Join a growing IT distribution company with 20+ years of excellence across the Middle East, Africa, and CIS. Dubai, UAE.",
  keywords: [
    "jobs at Simal Technologies",
    "IT distribution careers Dubai",
    "IT jobs UAE",
    "Simal Technologies careers",
  ],
  alternates: {
    canonical: "https://www.simalme.com/careers",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/careers",
    title: "Careers — Simal Technologies",
    description: "Join our team and build your career in IT distribution.",
    images: [
      {
        url: "https://www.simalme.com/assets/og/careers-og.jpg",
        width: 1200,
        height: 630,
        alt: "Careers at Simal Technologies",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Careers — Simal Technologies",
  url: "https://www.simalme.com/careers",
  description: "Explore career opportunities at Simal Technologies Middle East LLC.",
  mainEntity: {
    "@type": "Organization",
    name: "Simal Technologies Middle East LLC",
    url: "https://www.simalme.com",
  },
};

const departments = [
  { name: "Sales & Business Development", openings: 2, description: "Drive revenue growth across the Middle East, Africa, and CIS regions." },
  { name: "Product Management", openings: 1, description: "Manage product portfolios and brand relationships for our 20+ global partners." },
  { name: "Technical Support", openings: 1, description: "Provide expert-level technical assistance for enterprise IT solutions." },
  { name: "Warehouse & Logistics", openings: 1, description: "Ensure efficient inventory management and timely delivery across the region." },
  { name: "Marketing", openings: 1, description: "Build brand awareness and support partner marketing initiatives." },
  { name: "Finance & Administration", openings: 0, description: "Support financial operations and regulatory compliance." },
];

const whyJoin = [
  {
    title: "Industry Leader",
    description: "Work with a 20+ year established IT distribution company trusted by 20+ global brands.",
  },
  {
    title: "Global Brands",
    description: "Gain hands-on experience with products from Crucial, Samsung, Dell, HP, HIKVISION, and 16+ more brands.",
  },
  {
    title: "Regional Impact",
    description: "Make an impact across the Middle East, Africa, and CIS — three of the world's fastest-growing IT markets.",
  },
  {
    title: "Growth & Learning",
    description: "Continuous training, product certifications, and career development opportunities in a rapidly expanding organization.",
  },
  {
    title: "Diverse Team",
    description: "Work alongside 300+ professionals across multiple divisions — from IT distribution to software solutions.",
  },
  {
    title: "Competitive Benefits",
    description: "Competitive salary, health insurance, visa sponsorship, annual leave, and performance-based incentives.",
  },
];

export default function CareersPage() {
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <CareersHeroSection
        badge="Careers"
        badgeIcon={<Sparkles className="w-4 h-4" />}
        title="Build Your Career at Simal Technologies"
        subtitle="Join a growing team of 300+ professionals driving IT distribution excellence across the Middle East, Africa, and CIS. We're looking for passionate people who want to make an impact."
        description="Explore open positions across 6 departments — from sales and product management to technical support and marketing."
        primaryCta={{ href: "/careers/openings", label: "View Open Positions" }}
        secondaryCta={{ href: "/careers/apply", label: "Submit Application" }}
      />

      <CareersSubNav />

      {/* Departments */}
      <section className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Badge */}
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Our Teams
          </span>

          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Explore Our{" "}
            <span className="text-primary">Departments</span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Our 300+ professionals are organized across specialized departments, each playing a critical role in our IT distribution ecosystem.
          </p>

          <div className="mt-10">
            <DepartmentsSection departments={departments} />
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="relative overflow-hidden bg-muted">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Badge */}
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Why Us
          </span>

          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Why Join{" "}
            <span className="text-primary">Simal Technologies</span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            We offer more than just a job — we offer a career path in one of the most dynamic sectors of the technology industry.
          </p>

          <div className="mt-10">
            <WhyJoinSection benefits={whyJoin} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <ApplicationCTA
        heading="Ready to Join?"
        subtitle="Explore our open positions or submit a general application. We'd love to hear from you."
        primaryCta={{ href: "/careers/openings", label: "View Open Positions" }}
        secondaryCta={{ href: "/careers/apply", label: "Submit Application" }}
      />
    </div>
  );
}
