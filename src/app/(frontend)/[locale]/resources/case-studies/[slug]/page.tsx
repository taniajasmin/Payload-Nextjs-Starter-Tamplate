import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  MapPin,
  Quote,
  Sparkles,
  Wrench,
} from "lucide-react";
import {
  getCaseStudy,
  getAllCaseStudySlugs,
  INDUSTRY_META,
} from "../case-studies-data";

/* ------------------------------------------------------------------
   Static params
   ------------------------------------------------------------------ */
export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

/* ------------------------------------------------------------------
   Metadata
   ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: `${study.title} — Case Study | Simal Technologies`,
    description: study.summary,
    alternates: {
      canonical: `https://www.simalme.com/company/case-studies/${study.slug}`,
    },
  };
}

/* ------------------------------------------------------------------
   Page
   ------------------------------------------------------------------ */
export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const meta = INDUSTRY_META[study.industry];
  const Icon = meta.icon;

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative w-full py-28 md:py-36 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-slate-950/80" />

        <div className="container-primary relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
              <li>
                <Link href="/company/case-studies" className="transition-colors hover:text-primary">
                  Case Studies
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3 h-3" />
              </li>
              <li>
                <span className="font-semibold text-white/70 line-clamp-1">{study.title}</span>
              </li>
            </ol>
          </nav>

          <div className="max-w-[1075px]">
            {/* Industry icon + label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex items-center justify-center w-11 h-11 bg-primary">
                <Icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                {study.industry} · {study.service}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-white">
              {study.title}
            </h1>
            <p className="mt-5 text-base text-white/70 leading-relaxed">
              {study.summary}
            </p>

            {/* Metadata row */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {study.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {study.timeline}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wide">{study.client.split(",")[0]}</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href="#story"
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Read the Story
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Wrench className="w-4 h-4" />
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body: content + sticky sidebar ── */}
      <section id="story" className="relative overflow-hidden bg-background scroll-mt-24">
        <div className="pointer-events-none absolute inset-0 " />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-12 items-start">
            {/* Main column */}
            <div className="min-w-0 space-y-12">
              {/* Client Background */}
              <div>
                <SectionHeading>Client Background</SectionHeading>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {study.background}
                </p>
              </div>

              {/* The Challenge */}
              <div>
                <SectionHeading>The Challenge</SectionHeading>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {study.challenge}
                </p>
              </div>

              {/* The Simal Solution */}
              <div>
                <SectionHeading>The Simal Solution</SectionHeading>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {study.solution}
                </p>
                <div className="mt-5 border border-border bg-card p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-primary mb-4">
                    What We Delivered
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {study.solutionHighlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-0.5 shrink-0">
                          <Check className="w-4 h-4 text-primary" strokeWidth={1.6} />
                        </span>
                        <span className="text-sm text-muted-foreground leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Implementation */}
              <div>
                <SectionHeading>Implementation</SectionHeading>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {study.implementation}
                </p>
                {study.implementationPhases && study.implementationPhases.length > 0 && (
                  <div className="mt-5 border border-border bg-card p-6">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-primary mb-4">
                      Rollout Phases
                    </h3>
                    <ul className="space-y-3">
                      {study.implementationPhases.map((phase, i) => (
                        <li key={phase} className="flex items-start gap-3">
                          <span className="inline-flex flex-none items-center justify-center w-6 h-6 bg-primary text-xs font-bold text-primary-foreground">
                            {i + 1}
                          </span>
                          <span className="text-sm text-muted-foreground leading-snug pt-0.5">
                            {phase}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Results */}
              <div>
                <SectionHeading>Results</SectionHeading>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Measurable, before-and-after outcomes from the engagement:
                </p>
                <div className="mt-5 grid sm:grid-cols-2 gap-4">
                  {study.results.map((r) => (
                    <div
                      key={r.label}
                      className="border border-border bg-card p-5"
                    >
                      <div className="text-xl md:text-2xl font-extrabold text-primary leading-tight">
                        {r.value}
                      </div>
                      <div className="mt-1 text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Testimonial */}
              <div>
                <SectionHeading>Client Testimonial</SectionHeading>
                <figure className="mt-5 relative border border-border bg-muted p-6 md:p-8">
                  <Quote className="absolute top-5 right-5 w-10 h-10 text-primary/10" />
                  <blockquote className="relative">
                    <p className="text-sm md:text-base font-medium text-foreground leading-relaxed italic">
                      &ldquo;{study.testimonial}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span className="inline-block w-8 h-0.5 bg-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      {study.testimonialAuthor}
                    </span>
                  </figcaption>
                </figure>
              </div>

              {/* Back link */}
              <div>
                <Link
                  href="/company/case-studies"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to all case studies
                </Link>
              </div>
            </div>

            {/* Sticky sidebar */}
            <aside className="lg:sticky lg:top-24 space-y-6">
              {/* Results at a glance */}
              <div className="border border-border bg-card p-6 md:p-8">
                <h2 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground mb-1">
                  Results at a Glance
                </h2>
                <p className="text-xs text-muted-foreground mb-5">
                  The headline numbers from this engagement.
                </p>
                <div className="space-y-3">
                  {study.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="bg-muted px-4 py-3.5"
                    >
                      <div className="text-2xl font-extrabold text-primary leading-tight">
                        {m.value}
                      </div>
                      <div className="mt-0.5 text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Meta facts */}
                <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-5 text-xs">
                  <div>
                    <dt className="text-muted-foreground uppercase tracking-wide">Industry</dt>
                    <dd className="text-foreground font-semibold">{study.industry}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground uppercase tracking-wide">Service</dt>
                    <dd className="text-foreground font-semibold">{study.service}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground uppercase tracking-wide">Location</dt>
                    <dd className="text-foreground font-semibold">{study.location}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground uppercase tracking-wide">Timeline</dt>
                    <dd className="text-foreground font-semibold">{study.timeline}</dd>
                  </div>
                </dl>
              </div>

              {/* CTA */}
              <div className="bg-primary p-6 md:p-8 text-primary-foreground">
                <div className="inline-flex items-center justify-center w-11 h-11 bg-white/15 mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-extrabold leading-[1.1] tracking-tight mb-2">
                  Want similar results?
                </h2>
                <p className="text-sm text-primary-foreground/85 leading-relaxed mb-5">
                  Talk to our team about how Simal can deliver the same measurable outcomes for your organization.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/90"
                >
                  Start a Conversation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------
   Section heading — small label + bold title
   ------------------------------------------------------------------ */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <span className="block text-xs font-bold uppercase tracking-wide text-primary mb-1.5">
        Case Study
      </span>
      <h2 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">{children}</h2>
    </div>
  );
}
