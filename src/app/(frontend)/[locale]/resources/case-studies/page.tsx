import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import CaseStudiesGrid from "./case-studies-grid";
import { CASE_STUDIES } from "./case-studies-data";

export const metadata: Metadata = {
  title: "Case Studies — IT Distribution & ERP Success Stories | Simal Technologies UAE",
  description:
    "Real-world case studies: IT reseller growth, system integrator transformation, government procurement, manufacturing ERP, retail, healthcare, education & logistics. Results with measurable metrics.",
  alternates: {
    canonical: "https://www.simalme.com/company/case-studies",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/company/case-studies",
    title: "Case Studies — Simal Technologies",
    description:
      "Real-world case studies across IT distribution, ERP, government, manufacturing, retail, healthcare, education & logistics.",
    images: [
      {
        url: "https://www.simalme.com/assets/og/case-studies.jpg",
        width: 1200,
        height: 630,
        alt: "Simal Technologies Case Studies",
      },
    ],
  },
};

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative w-full py-28 md:py-36 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-slate-950/80" />

        <div className="container-primary relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-white/50">
              <li>
                <Link href="/resources" className="transition-colors hover:text-primary">
                  Resources
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3 h-3" />
              </li>
              <li>
                <span className="font-semibold text-white/70">Case Studies</span>
              </li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
            {/* Left: text */}
            <div className="max-w-3xl lg:col-span-3">
              <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                Case Studies
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-white">
                Case Studies
              </h1>
              <p className="mt-4 text-base text-white/70 leading-relaxed">
                Real-world success stories showing how Simal Technologies delivers IT
                distribution, enterprise software, and ERP solutions across the Middle
                East, Africa, CIS, and GCC — with measurable, proven results.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="#stories"
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Browse Stories
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Talk to an Expert
                </Link>
              </div>
            </div>

            {/* Right: illustration */}
            <div className="hidden lg:flex justify-center lg:col-span-2">
              <CaseStudyIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ── Case Studies Grid ── */}
      <section id="stories" className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 " />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Section identifier bar */}
          <div className="mb-8 flex items-center gap-4 border-b pb-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Resources
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Case Studies
            </span>
          </div>

          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Success Stories
          </span>
          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-3">
            Success Stories
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-10">
            Filter by industry or service to see the outcomes we&apos;ve delivered —
            from IT reseller growth and government procurement to manufacturing, retail,
            healthcare, education, and logistics ERP transformations.
          </p>

          <CaseStudiesGrid studies={CASE_STUDIES} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 " />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-3xl text-center">
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Get Started
          </span>
          <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
            Your success story starts here
          </h2>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Join the businesses across the Middle East, Africa, CIS, and GCC that trust
            Simal Technologies for IT distribution, infrastructure, and ERP — backed by
            two decades of proven delivery.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/company/white-papers"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Explore White Papers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------
   Hero illustration — flat, on-brand: a results report with an
   upward bar chart, an award medal, and a check badge, plus floating
   chips (trending up / target).
   ------------------------------------------------------------------ */
function CaseStudyIllustration() {
  return (
    <svg
      className="w-full max-w-[280px] h-auto"
      viewBox="0 0 440 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of a results report with an upward chart and an award medal"
    >
      {/* Soft background blobs */}
      <ellipse cx="220" cy="170" rx="180" ry="130" fill="#B0DDE4" opacity="0.18" />
      <circle cx="220" cy="160" r="110" fill="#286FB4" opacity="0.06" />

      {/* Main report card */}
      <g filter="url(#cardShadow)">
        <rect x="116" y="66" width="180" height="200" rx="0" fill="#ffffff" stroke="#DBE6F0" strokeWidth="1.5" />
      </g>
      {/* Card header band */}
      <rect x="116" y="66" width="180" height="36" rx="0" fill="#286FB4" />
      <rect x="116" y="90" width="180" height="12" fill="#286FB4" />
      <rect x="130" y="78" width="70" height="9" rx="0" fill="#ffffff" opacity="0.9" />
      <circle cx="282" cy="84" r="5" fill="#ffffff" opacity="0.85" />

      {/* Bar chart (increasing) */}
      <rect x="138" y="186" width="22" height="34" rx="0" fill="#B0DDE4" />
      <rect x="166" y="170" width="22" height="50" rx="0" fill="#5AABD6" />
      <rect x="194" y="150" width="22" height="70" rx="0" fill="#3A85C8" />
      <rect x="222" y="128" width="22" height="92" rx="0" fill="#286FB4" />
      <rect x="250" y="108" width="22" height="112" rx="0" fill="#1D5A96" />

      {/* Trend line + arrow over bars */}
      <path d="M150 196 L178 178 L206 158 L234 138 L262 118" stroke="#DF4C73" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M254 114 l9 4 l-4 -9" stroke="#DF4C73" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Baseline */}
      <rect x="134" y="222" width="146" height="3" rx="0" fill="#E2F0F9" />

      {/* Award medal (amber) */}
      <g>
        <circle cx="300" cy="88" r="26" fill="#ffffff" stroke="#FCE8C8" strokeWidth="1.5" />
        <circle cx="300" cy="88" r="20" fill="#F59E0B" />
        <path d="M300 76 l3.2 6.6 l7.2 1 l-5.2 5.1 l1.2 7.2 l-6.4-3.4 l-6.4 3.4 l1.2-7.2 l-5.2-5.1 l7.2-1 z" fill="#ffffff" />
        <path d="M292 112 l8 16 l8 -16" fill="#F59E0B" />
      </g>

      {/* Check badge (green) */}
      <circle cx="138" cy="244" r="18" fill="#10B981" />
      <path d="M130 244 l5 6 l10 -12" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Floating chip: trending up (pink) */}
      <g>
        <rect x="56" y="120" width="60" height="60" rx="0" fill="#ffffff" stroke="#FCE0E8" strokeWidth="1.5" />
        <rect x="56" y="120" width="60" height="60" rx="0" fill="#DF4C73" opacity="0.12" />
        <path d="M70 168 l10 -12 l8 6 l12 -16" stroke="#DF4C73" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M94 146 l6 -2 l-1 7" stroke="#DF4C73" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Decorative dots */}
      <circle cx="80" cy="80" r="4" fill="#286FB4" opacity="0.4" />
      <circle cx="372" cy="150" r="3" fill="#10B981" opacity="0.5" />
      <circle cx="96" cy="250" r="3.5" fill="#B0DDE4" />

      <defs>
        <filter id="cardShadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#286FB4" floodOpacity="0.12" />
        </filter>
      </defs>
    </svg>
  );
}
