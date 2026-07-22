import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Download,
  Eye,
  FileText,
} from "lucide-react";
import { getWhitePaper, getAllSlugs, TOPIC_META } from "../white-papers-data";
import DownloadForm from "./download-form";

/* ------------------------------------------------------------------
   Static params
   ------------------------------------------------------------------ */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
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
  const paper = getWhitePaper(slug);
  if (!paper) return {};

  return {
    title: `${paper.title} — White Paper | Simal Technologies`,
    description: paper.excerpt,
    alternates: {
      canonical: `https://www.simalme.com/company/white-papers/${paper.slug}`,
    },
  };
}

/* ------------------------------------------------------------------
   Page
   ------------------------------------------------------------------ */
export default async function WhitePaperDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getWhitePaper(slug);
  if (!paper) notFound();

  const meta = TOPIC_META[paper.topic];
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
                <Link href="/company/white-papers" className="transition-colors hover:text-primary">
                  White Papers
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3 h-3" />
              </li>
              <li>
                <span className="font-semibold text-white/70 line-clamp-1">{paper.title}</span>
              </li>
            </ol>
          </nav>

          <div className="max-w-[1075px]">
            {/* Topic icon + label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex items-center justify-center w-11 h-11 bg-primary">
                <Icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                {paper.topic}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-white">
              {paper.title}
            </h1>
            <p className="mt-5 text-base text-white/70 leading-relaxed">
              {paper.excerpt}
            </p>

            {/* Metadata row */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                {paper.pages}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {paper.readTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wide">{paper.date}</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href="#download"
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Download className="w-4 h-4" />
                Download White Paper
              </a>
              <a
                href="#overview"
                className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Eye className="w-4 h-4" />
                Preview Contents
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body: content + sticky form sidebar ── */}
      <section className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 " />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-12 items-start">
            {/* Main column */}
            <div className="min-w-0 space-y-12">
              {/* Overview */}
              <div id="overview" className="scroll-mt-24">
                <SectionHeading>Overview</SectionHeading>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {paper.description}
                </p>
              </div>

              {/* Topics Covered + Target Audience */}
              <div className="grid sm:grid-cols-2 gap-8">
                {/* Topics */}
                <div className="border border-border bg-card p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-primary mb-4">
                    Topics Covered
                  </h3>
                  <ul className="space-y-3">
                    {paper.topicsCovered.map((topic) => (
                      <li key={topic} className="flex items-start gap-2.5">
                        <span className="mt-0.5 shrink-0">
                          <Check className="w-4 h-4 text-primary" strokeWidth={1.6} />
                        </span>
                        <span className="text-sm text-muted-foreground leading-snug">
                          {topic}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Audience */}
                <div className="border border-border bg-card p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-primary mb-4">
                    Target Audience
                  </h3>
                  <ul className="space-y-3">
                    {paper.targetAudience.map((audience) => (
                      <li key={audience} className="flex items-start gap-2.5">
                        <span className="mt-1.5 inline-block flex-none w-2 h-2 bg-primary" />
                        <span className="text-sm text-muted-foreground leading-snug">
                          {audience}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* What You'll Learn */}
              <div>
                <SectionHeading>What You&apos;ll Learn</SectionHeading>
                <div className="mt-5 grid sm:grid-cols-2 gap-5">
                  {paper.whatYouLearn.map((item) => {
                    const LearnIcon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="border border-border bg-card p-5 transition-colors hover:border-primary/50"
                      >
                        <div className="inline-flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground mb-3">
                          <LearnIcon className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-extrabold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Back link */}
              <div>
                <Link
                  href="/company/white-papers"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to all white papers
                </Link>
              </div>
            </div>

            {/* Sticky form sidebar */}
            <aside id="download" className="scroll-mt-24 lg:sticky lg:top-24">
              <DownloadForm paperTitle={paper.title} />
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------
   Section heading — small label + bold title, consistent rhythm.
   ------------------------------------------------------------------ */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <span className="block text-xs font-bold uppercase tracking-wide text-primary mb-1.5">
        White Paper
      </span>
      <h2 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">{children}</h2>
    </div>
  );
}
