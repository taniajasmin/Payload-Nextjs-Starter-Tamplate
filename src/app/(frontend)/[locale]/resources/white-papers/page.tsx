import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Download, Sparkles } from "lucide-react";
import { WHITE_PAPERS, TOPIC_META } from "./white-papers-data";

export const metadata: Metadata = {
  title: "White Papers — IT Infrastructure, ERP & Security Research | Simal Technologies UAE",
  description:
    "Download in-depth white papers on enterprise storage, digital transformation, network security, B2B IT distribution and UniERP architecture. Research-backed insights for IT decision-makers.",
  alternates: {
    canonical: "https://www.simalme.com/company/white-papers",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/company/white-papers",
    title: "White Papers — Simal Technologies",
    description:
      "In-depth white papers on enterprise storage, digital transformation, network security, B2B IT distribution and UniERP architecture.",
    images: [
      {
        url: "https://www.simalme.com/assets/og/white-papers.jpg",
        width: 1200,
        height: 630,
        alt: "Simal Technologies White Papers",
      },
    ],
  },
};

export default function WhitePapersPage() {
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
                <span className="font-semibold text-white/70">White Papers</span>
              </li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left: text */}
            <div className="max-w-2xl">
              <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                White Papers
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-white">
                White Papers
              </h1>
              <p className="mt-4 text-base text-white/70 leading-relaxed">
                In-depth research and technical guidance on enterprise storage,
                digital transformation, network security, B2B IT distribution, and
                ERP architecture — built for IT decision-makers across the UAE,
                GCC, MENA, and CIS.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="#papers"
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Browse Papers
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
            <div className="hidden lg:flex justify-center">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ── White Papers Grid ── */}
      <section id="papers" className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 " />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Section identifier bar */}
          <div className="mb-8 flex items-center gap-4 border-b pb-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Resources
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              White Papers
            </span>
          </div>

          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Research Library
          </span>
          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-3">
            White Paper Library
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-10">
            Research-backed guidance for IT leaders — download the papers most
            relevant to your infrastructure and growth goals.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHITE_PAPERS.map((paper) => {
              const meta = TOPIC_META[paper.topic];
              const Icon = meta.icon;
              return (
                <article
                  key={paper.title}
                  className="flex flex-col border border-border bg-card p-6 transition-colors hover:border-primary/50"
                >
                  {/* Icon + category badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="inline-flex items-center justify-center w-11 h-11 bg-primary">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {paper.topic}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground mb-2">
                    {paper.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {paper.excerpt}
                  </p>

                  {/* Meta + Download */}
                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {paper.pages} · {paper.readTime}
                    </span>
                    <Link
                      href={`/company/white-papers/${paper.slug}`}
                      className="inline-flex items-center gap-1.5 bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
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
            Want a tailored perspective?
          </h2>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Speak with our solutions team about research and recommendations built
            around your organization&apos;s infrastructure and growth goals.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Talk to an Expert
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/company/case-studies"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              See Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------
   Hero illustration — flat, on-brand: a document with floating topic
   chips over a soft light-blue field.
   ------------------------------------------------------------------ */
function HeroIllustration() {
  return (
    <svg
      className="w-full max-w-[320px] h-auto"
      viewBox="0 0 440 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of a white paper with floating research icons"
    >
      {/* Soft background blobs */}
      <ellipse cx="220" cy="170" rx="180" ry="130" fill="#B0DDE4" opacity="0.18" />
      <circle cx="220" cy="160" r="110" fill="#286FB4" opacity="0.06" />

      {/* Main document */}
      <g filter="url(#docShadow)">
        <rect x="120" y="70" width="180" height="220" rx="0" fill="#ffffff" stroke="#DBE6F0" strokeWidth="1.5" />
      </g>
      {/* Document header band */}
      <rect x="120" y="70" width="180" height="40" rx="0" fill="#286FB4" />
      <rect x="120" y="96" width="180" height="14" fill="#286FB4" />
      <circle cx="140" cy="90" r="5" fill="#ffffff" opacity="0.9" />
      <rect x="152" y="86" width="60" height="8" rx="0" fill="#ffffff" opacity="0.85" />

      {/* Text lines */}
      <rect x="140" y="132" width="140" height="8" rx="0" fill="#286FB4" opacity="0.55" />
      <rect x="140" y="152" width="120" height="6" rx="0" fill="#94A3B8" opacity="0.5" />
      <rect x="140" y="168" width="140" height="6" rx="0" fill="#94A3B8" opacity="0.5" />
      <rect x="140" y="184" width="100" height="6" rx="0" fill="#94A3B8" opacity="0.5" />
      <rect x="140" y="206" width="120" height="6" rx="0" fill="#94A3B8" opacity="0.4" />
      <rect x="140" y="222" width="80" height="6" rx="0" fill="#94A3B8" opacity="0.4" />

      {/* Check badge on document */}
      <circle cx="282" cy="252" r="18" fill="#10B981" />
      <path d="M274 252 l5 6 l10 -12" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Floating chip: shield (Security / pink) */}
      <g>
        <rect x="300" y="60" width="64" height="64" rx="0" fill="#ffffff" stroke="#FCE0E8" strokeWidth="1.5" />
        <rect x="300" y="60" width="64" height="64" rx="0" fill="#DF4C73" opacity="0.12" />
        <path d="M332 74 l12 5 v9 c0 8 -5 13 -12 16 c-7 -3 -12 -8 -12 -16 v-9 z" fill="#DF4C73" />
        <path d="M327 92 l4 4 l7 -8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Floating chip: refresh (Digital Transformation / cyan) */}
      <g>
        <rect x="60" y="120" width="60" height="60" rx="0" fill="#ffffff" stroke="#CFF1F6" strokeWidth="1.5" />
        <rect x="60" y="120" width="60" height="60" rx="0" fill="#06B6D4" opacity="0.12" />
        <path d="M104 142 a12 12 0 1 0 3 8" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M107 138 l1 7 l7 -1" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Floating chip: layers (ERP / purple) */}
      <g>
        <rect x="300" y="210" width="62" height="62" rx="0" fill="#ffffff" stroke="#ECE3FB" strokeWidth="1.5" />
        <rect x="300" y="210" width="62" height="62" rx="0" fill="#8B5CF6" opacity="0.12" />
        <path d="M331 226 l16 8 l-16 8 l-16 -8 z" fill="#8B5CF6" />
        <path d="M315 242 l16 8 l16 -8" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M315 250 l16 8 l16 -8" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
      </g>

      {/* Decorative dots */}
      <circle cx="70" cy="70" r="4" fill="#286FB4" opacity="0.4" />
      <circle cx="380" cy="150" r="3" fill="#DF4C73" opacity="0.4" />
      <circle cx="90" cy="250" r="3.5" fill="#B0DDE4" />

      <defs>
        <filter id="docShadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#286FB4" floodOpacity="0.12" />
        </filter>
      </defs>
    </svg>
  );
}
