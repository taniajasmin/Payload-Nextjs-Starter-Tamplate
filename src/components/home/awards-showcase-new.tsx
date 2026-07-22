"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────── */

interface AwardsShowcaseProps {
  badge?: string;
  heading?: string;
  subtext?: string;
  awards?: unknown[];
}

/* ─── Component ─────────────────────────────────────────────────── */

export default function AwardsShowcaseNew({
  badge = "Awards & Recognition",
  heading = "Recognized Excellence in Distribution",
  subtext = "Industry recognition from leading global technology brands validates our commitment to distribution excellence and enduring partnerships.",
}: AwardsShowcaseProps = {}) {
  return (
    <section
      id="awards-showcase"
      className="relative overflow-hidden bg-background"
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* ── Section identifier bar ──────────────────────────── */}
        <div className="mb-8 flex items-center gap-4 border-b pb-4">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Industry Recognition
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            <Trophy className="h-3.5 w-3.5" />
            {badge}
          </span>
        </div>

        {/* ── Heading ────────────────────────────────────────── */}
        <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
          {badge}
        </span>

        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {heading}
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {subtext}
        </p>

        {/* ── Award cards ────────────────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <HiksemiCard />
          <HikvisionCard />
        </div>
      </div>
    </section>
  );
}

/* ─── Card 1: HIKSEMi (featured) ────────────────────────────────── */

function HiksemiCard() {
  return (
    <article className="overflow-hidden border border-border bg-card lg:col-span-7">
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Award ceremony photo */}
        <div className="relative aspect-[4/5] md:col-span-2 md:aspect-auto">
          <Image
            src="/assets/images/company-insights/Award.jpg"
            alt="Simal Technologies team accepting the HIKSEMi Best Distribution Partner 2025 award at the MEA National Distributor Summit"
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col p-8 md:col-span-3 md:p-10">
          <Trophy
            className="h-7 w-7 text-primary"
            fill="currentColor"
          />

          <div className="mt-4 text-xs font-bold uppercase tracking-wider text-primary">
            HIKSEMi · 2025
          </div>
          <h3 className="mt-2 text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">
            Best Distribution Partner 2025
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Recognized at the MEA National Distributor Summit for outstanding
            performance across the Middle East and Africa region.
          </p>

          <div className="mt-5 space-y-1.5">
            {[
              "MEA National Distributor Summit honoree",
              "Trusted distribution partner across the Middle East & Africa",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="h-1 w-1 shrink-0 bg-primary" />
                <span className="text-xs font-medium text-foreground">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─── Card 2: HikVision (dark, multi-year) ──────────────────────── */

function HikvisionCard() {
  return (
    <article className="flex h-full flex-col border border-border bg-card p-8 text-foreground md:p-10 lg:col-span-5">
      {/* Logo tile + multi-year badge */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex h-[6.3rem] w-[16.2rem] items-center justify-center bg-white p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/brands/hikvision/logo_7_HIKVISION_Hikvision-Logo-01_f6dca83b30.png"
            alt="HikVision logo"
            className="max-h-[4.5rem] max-w-full object-contain"
          />
        </div>
        <span className="inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/30">
          Multi-Year
        </span>
      </div>

      <div className="text-xs font-bold uppercase tracking-wider text-primary">
        HikVision · Strategic Partner
      </div>
      <h3 className="mt-2 text-xl font-extrabold leading-[1.1] tracking-tight">
        Best Distributor Partner
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Multi-year recognition for outstanding regional distribution
        performance and channel excellence across the security &amp;
        surveillance portfolio.
      </p>

      <div className="mt-5 space-y-1.5">
        {[
          "Top regional distributor across MEA & CIS",
          "Consistent year-over-year growth & channel enablement",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <span className="h-1 w-1 shrink-0 bg-primary" />
            <span className="text-xs font-medium">
              {item}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-8">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View All Awards
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
