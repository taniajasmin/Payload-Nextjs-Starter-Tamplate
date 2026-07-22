"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2, Server, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─────────────────────────────────────────────────────── */

interface SolutionsHighlightProps {
  badge?: string;
  heading?: string;
  subtext?: string;
}

interface PillarCardSpec {
  icon: LucideIcon;
  eyebrow: string;
  headline: string;
  description: string;
  listLabel: string;
  items: string[];
  cta: { label: string; href: string };
  tone: "light" | "dark";
}

/* ─── Pillar content ────────────────────────────────────────────── */

const PILLARS: PillarCardSpec[] = [
  {
    icon: Server,
    eyebrow: "IT Distribution",
    headline: "Enterprise IT Hardware Distribution",
    description:
      "Authorized distributor for 20+ global brands. 76+ products across computer components, accessories, monitors, gaming, and laptops. B2B inquiry-based model with personalized pricing and dedicated account support.",
    listLabel: "Key Services",
    items: [
      "Annual Maintenance Contracts (AMC)",
      "AV & Meeting Room Solutions",
      "Cloud Security",
      "Data Recovery & Storage",
      "Firewall Solutions",
    ],
    cta: { label: "Explore IT Solutions", href: "/hardware" },
    tone: "light",
  },
  {
    icon: Code2,
    eyebrow: "Software & ERP",
    headline: "Enterprise Software & ERP Solutions",
    description:
      "Full-range UniERP system built on Odoo 19 Community Edition. Powered by UniSoft Systems Limited — 40+ software engineers, 150+ projects, 98% on-time delivery. NBR-approved UniVAT system.",
    listLabel: "Key Modules",
    items: [
      "Finance & Accounting",
      "HR & Payroll",
      "Sales & CRM",
      "Inventory & Supply Chain",
      "Manufacturing",
      "Project Management",
    ],
    cta: { label: "Discover UniERP", href: "/erp/overview" },
    tone: "dark",
  },
];

/* ─── Component ─────────────────────────────────────────────────── */

export default function SolutionsHighlightNew({
  badge = "Two Pillars",
  heading = "Two Pillars of Our Business",
  subtext = "From hardware distribution to enterprise software — Simal's dual business model covers the full technology stack.",
}: SolutionsHighlightProps) {
  return (
    <section
      id="solutions-highlight"
      className="relative overflow-hidden bg-slate-950"
    >
      {/* Background image */}
      <Image
        src="/assets/images/homepage/business-pillars.avif"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-slate-950/80" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* ── Section identifier bar ──────────────────────────── */}
        <div className="mb-8 flex items-center gap-4 border-b border-white/10 pb-4">
          <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Business Pillars
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            {badge}
          </span>
        </div>

        {/* ── Heading ────────────────────────────────────────── */}
        <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
          {badge}
        </span>

        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
          {heading}
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
          {subtext}
        </p>

        {/* ── Pillar cards ───────────────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.eyebrow} spec={pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pillar card ───────────────────────────────────────────────── */

function PillarCard({ spec }: { spec: PillarCardSpec }) {
  const Icon = spec.icon;
  const isDark = spec.tone === "dark";

  return (
    <div
      className={cn(
        "flex h-full flex-col border p-8 md:p-10",
        isDark
          ? "border-border bg-card"
          : "border-border bg-card",
      )}
    >
      {/* Icon + Eyebrow row */}
      <div className="flex items-center gap-3 mb-5">
        <Icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          {spec.eyebrow}
        </span>
      </div>

      {/* Headline */}
      <h3 className="text-2xl font-extrabold leading-[1.1] tracking-tight text-foreground">
        {spec.headline}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {spec.description}
      </p>

      {/* Divider */}
      <div className="my-6 h-px w-full bg-border" />

      {/* Items list */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {spec.listLabel}
        </span>
        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
          {spec.items.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="h-1 w-1 shrink-0 bg-primary" />
              <span className="text-xs font-medium text-foreground">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto pt-8">
        <Link
          href={spec.cta.href}
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors",
            isDark
              ? "bg-foreground text-background hover:bg-foreground/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          {spec.cta.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
