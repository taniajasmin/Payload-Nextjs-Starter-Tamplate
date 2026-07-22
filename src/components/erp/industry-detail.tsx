import { createElement } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  Quote,
  Check,
  AlertTriangle,
  Lightbulb,
  Building2,
  Target,
  Wrench,
  TrendingUp,
  Sparkles,
  Award,
  Gauge,
  ShieldCheck,
  Users,
  Workflow,
  Rocket,
} from "lucide-react";
import { RichTextRenderer } from "@/components/erp/rich-text-renderer";
import { iconNameToComponent, colorNameToTheme } from "@/components/layout/navigation-data";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Types
   ------------------------------------------------------------------ */

export interface IndustryDoc {
  id?: string;
  title: string;
  slug: string;
  tagline?: string;
  icon?: string;
  iconColor?: string;
  heroBackgroundImage?: { url?: string; alt?: string } | null;
  hero?: {
    headline?: string;
    subHeadline?: string;
    ctaLabel?: string;
    ctaLink?: string;
  };
  overviewDescription?: unknown;
  industryChallenges?: Array<{ id?: string; challenge: string; solution?: string }>;
  subSectors?: Array<{
    id?: string;
    name: string;
    institutionTypes?: string;
    painPoints?: Array<{ id?: string; point?: string }>;
    erpSolutions?: Array<{ id?: string; solution?: string }>;
  }>;
  moduleGroups?: Array<{
    id?: string;
    groupName: string;
    icon?: string;
    features?: Array<{ id?: string; featureName: string; description?: string; businessImpact?: string }>;
  }>;
  benefits?: Array<{ id?: string; title: string; description?: string; icon?: string }>;
  caseStudy?: {
    clientName?: string;
    background?: string;
    challenge?: string;
    solution?: string;
    results?: Array<{ id?: string; value?: string; label?: string }>;
    testimonialQuote?: string;
    testimonialAuthor?: string;
    testimonialRole?: string;
  };
  cta?: {
    phoneLabel?: string;
    phoneNumber?: string;
    emailLabel?: string;
    emailAddress?: string;
    demoLinkLabel?: string;
    demoLinkUrl?: string;
  };
}

interface IndustryDetailProps {
  industry: IndustryDoc;
}

/* ------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------ */

function resolveIcon(iconName?: string) {
  if (!iconName) return null;
  return iconNameToComponent[iconName] ?? null;
}

function resolveIconColors(colorName?: string) {
  if (!colorName) return { bg: "bg-primary/10", icon: "text-primary" };
  return (
    colorNameToTheme[colorName] ?? {
      bg: "bg-primary/10",
      icon: "text-primary",
    }
  );
}

const BENEFIT_FALLBACK_ICONS = [
  Gauge,
  ShieldCheck,
  Workflow,
  Users,
  Rocket,
  Award,
  TrendingUp,
  Sparkles,
];

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function IndustryDetail({ industry }: IndustryDetailProps) {
  const hero = industry.hero;
  const iconComp = resolveIcon(industry.icon);
  const iconColors = resolveIconColors(industry.iconColor);
  const bgImage =
    industry.heroBackgroundImage?.url || "/assets/images/homepage/business-pillars.avif";

  return (
    <div className="flex flex-col">
      {/* ── Hero (dark island) ── */}
      <section className="relative overflow-hidden bg-slate-950 py-28 md:py-36">
        <Image
          src={bgImage}
          alt={industry.heroBackgroundImage?.alt ?? ""}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/70 to-primary/25" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
              <li>
                <Link href="/erp" className="transition-colors hover:text-primary">
                  ERP
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3" />
              </li>
              <li>
                <Link href="/erp/industries" className="transition-colors hover:text-primary">
                  Industries
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3" />
              </li>
              <li>
                <span className="font-semibold text-white/70 line-clamp-1">
                  {industry.title}
                </span>
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            {/* Badge */}
            <div className="mb-5 flex items-center gap-3">
              {iconComp && (
                <div className={cn("inline-flex h-11 w-11 items-center justify-center", iconColors.bg)}>
                  {createElement(iconComp, { className: cn("h-5 w-5", iconColors.icon) })}
                </div>
              )}
              <Eyebrow tone="light">{industry.title}</Eyebrow>
            </div>

            {hero?.headline && (
              <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {hero.headline}
              </h1>
            )}
            {hero?.subHeadline && (
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300">
                {hero.subHeadline}
              </p>
            )}

            {hero?.ctaLabel && hero?.ctaLink && (
              <div className="mt-8">
                <Link
                  href={hero.ctaLink}
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {hero.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      {industry.overviewDescription != null && (
        <section className="relative overflow-hidden bg-background">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <Eyebrow className="mb-4">Industry Overview</Eyebrow>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              UniERP for{" "}
              <span className="text-primary">{industry.title}</span>
            </h2>

            <div className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground rich-text-content">
              <RichTextRenderer data={industry.overviewDescription} />
            </div>
          </div>
        </section>
      )}

      {/* ── Industry Challenges ── */}
      {(industry.industryChallenges?.length ?? 0) > 0 && (
        <section id="challenges" className="relative overflow-hidden bg-muted">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <Eyebrow className="mb-4">Pain Points</Eyebrow>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Addressing Key Industry{" "}
              <span className="text-primary">Pain Points</span>
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {industry.industryChallenges!.map((item, i) => (
                <article
                  key={item.id ?? i}
                  className="flex h-full flex-col border border-border bg-card p-8 md:p-10"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center bg-primary/10">
                    <AlertTriangle className="h-5 w-5 text-primary" strokeWidth={1.6} />
                  </div>
                  <h3 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                    {item.challenge}
                  </h3>
                  {item.solution && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.solution}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Sub-sectors ── */}
      {(industry.subSectors?.length ?? 0) > 0 && (
        <section id="sub-sectors" className="relative overflow-hidden bg-background">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <Eyebrow className="mb-4">Institutions</Eyebrow>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Institutions <span className="text-primary">We Serve</span>
            </h2>

            <div className="mt-10 space-y-6">
              {industry.subSectors!.map((sector, i) => (
                <article
                  key={sector.id ?? i}
                  className="flex flex-col border border-border bg-card p-8 md:p-10"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-2xl">
                      <h3 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                        {sector.name}
                      </h3>
                      {sector.institutionTypes && (
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {sector.institutionTypes}
                        </p>
                      )}
                    </div>
                  </div>

                  {(sector.painPoints?.length ?? 0) > 0 || (sector.erpSolutions?.length ?? 0) > 0 ? (
                    <div className="mt-8 grid gap-8 border-t border-border pt-8 md:grid-cols-2">
                      {(sector.painPoints?.length ?? 0) > 0 && (
                        <div>
                          <h4 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground">
                            <AlertTriangle className="h-3.5 w-3.5 text-primary" strokeWidth={1.8} />
                            Pain Points
                          </h4>
                          <div className="space-y-0">
                            {sector.painPoints!.map((pp, j) => (
                              <div
                                key={pp.id ?? j}
                                className="flex items-center gap-2.5 border-b border-border/60 py-2.5"
                              >
                                <span className="h-1 w-1 shrink-0 bg-primary" />
                                <span className="text-sm font-medium text-foreground">
                                  {pp.point}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {(sector.erpSolutions?.length ?? 0) > 0 && (
                        <div>
                          <h4 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground">
                            <Lightbulb className="h-3.5 w-3.5 text-primary" strokeWidth={1.8} />
                            UniERP Solutions
                          </h4>
                          <div className="space-y-0">
                            {sector.erpSolutions!.map((sol, j) => (
                              <div
                                key={sol.id ?? j}
                                className="flex items-center gap-2.5 border-b border-border/60 py-2.5"
                              >
                                <Check className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} />
                                <span className="text-sm font-medium text-foreground">
                                  {sol.solution}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Core Modules (dark island) ── */}
      {(industry.moduleGroups?.length ?? 0) > 0 && (
        <section id="modules" className="relative overflow-hidden bg-slate-950">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-primary/15" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <Eyebrow className="mb-4" tone="light">
              Core Modules
            </Eyebrow>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Configured for{" "}
              <span className="text-primary">Your Industry</span>
            </h2>

            <div className="mt-10 space-y-12">
              {industry.moduleGroups!.map((group, i) => {
                const GroupIcon = resolveIcon(group.icon);
                return (
                  <div key={group.id ?? i}>
                    <div className="mb-6 flex items-center gap-3">
                      {GroupIcon && (
                        <div className="inline-flex h-10 w-10 items-center justify-center border border-white/20 bg-white/5">
                          {createElement(GroupIcon, { className: "h-5 w-5 text-white" })}
                        </div>
                      )}
                      <h3 className="text-xl font-extrabold leading-[1.1] tracking-tight text-white">
                        {group.groupName}
                      </h3>
                    </div>
                    {(group.features?.length ?? 0) > 0 && (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {group.features!.map((feat, j) => (
                          <article
                            key={feat.id ?? j}
                            className="flex h-full flex-col border border-white/15 bg-white/5 p-8"
                          >
                            <div className="mb-4 inline-flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5">
                              <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.6} />
                            </div>
                            <h4 className="text-base font-bold leading-snug text-white">
                              {feat.featureName}
                            </h4>
                            {feat.description && (
                              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                {feat.description}
                              </p>
                            )}
                            {feat.businessImpact && (
                              <span className="mt-4 inline-block text-[10px] font-bold uppercase tracking-wider text-primary">
                                {feat.businessImpact}
                              </span>
                            )}
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Benefits ── */}
      {(industry.benefits?.length ?? 0) > 0 && (
        <section id="benefits" className="relative overflow-hidden bg-background">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <Eyebrow className="mb-4">Why UniERP</Eyebrow>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Why Choose UniERP for{" "}
              <span className="text-primary">Your Industry</span>
            </h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {industry.benefits!.map((benefit, i) => {
                const BenefitIcon =
                  resolveIcon(benefit.icon) ??
                  BENEFIT_FALLBACK_ICONS[i % BENEFIT_FALLBACK_ICONS.length];
                return (
                  <article
                    key={benefit.id ?? i}
                    className="flex h-full flex-col border border-border bg-card p-8 md:p-10"
                  >
                    <div
                      className={cn(
                        "mb-4 inline-flex h-10 w-10 items-center justify-center",
                        iconColors.bg,
                      )}
                    >
                      {createElement(BenefitIcon, {
                        className: cn("h-5 w-5", iconColors.icon),
                      })}
                    </div>
                    <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground">
                      {benefit.title}
                    </h3>
                    {benefit.description && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {benefit.description}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Case Study ── */}
      {industry.caseStudy && (
        <section id="case-study" className="relative overflow-hidden bg-muted">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <Eyebrow className="mb-4">Success Story</Eyebrow>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {industry.caseStudy.clientName || "Client Success Story"}
            </h2>

            <div className="mt-10 max-w-4xl space-y-6">
              {industry.caseStudy.background && (
                <div className="border border-border bg-card p-8 md:p-10">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                    <Building2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                    Client Background
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {industry.caseStudy.background}
                  </p>
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                {industry.caseStudy.challenge && (
                  <div className="border border-border bg-card p-8 md:p-10">
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                      <Target className="h-3.5 w-3.5" strokeWidth={1.8} />
                      The Challenge
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {industry.caseStudy.challenge}
                    </p>
                  </div>
                )}
                {industry.caseStudy.solution && (
                  <div className="border border-border bg-card p-8 md:p-10">
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                      <Wrench className="h-3.5 w-3.5" strokeWidth={1.8} />
                      The Solution
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {industry.caseStudy.solution}
                    </p>
                  </div>
                )}
              </div>

              {(industry.caseStudy.results?.length ?? 0) > 0 && (
                <div className="border-t border-border pt-8">
                  <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                    <TrendingUp className="h-3.5 w-3.5" strokeWidth={1.8} />
                    Measurable Results
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4">
                    {industry.caseStudy.results!.map((r, i) => (
                      <div
                        key={r.id ?? i}
                        className={cn(
                          "flex flex-col px-4 py-2",
                          i > 0 && "border-l border-border",
                          i === 0 && "pl-0",
                        )}
                      >
                        <span className="text-2xl font-extrabold tabular-nums leading-none text-foreground">
                          {r.value}
                        </span>
                        <span className="mt-1 text-xs font-medium text-muted-foreground">
                          {r.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {industry.caseStudy.testimonialQuote && (
                <figure className="relative border border-border bg-card p-8 md:p-10">
                  <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/15" />
                  <blockquote className="relative max-w-3xl">
                    <p className="text-base font-medium leading-relaxed italic text-foreground md:text-lg">
                      &ldquo;{industry.caseStudy.testimonialQuote}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="inline-block h-0.5 w-8 bg-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      {industry.caseStudy.testimonialAuthor}
                      {industry.caseStudy.testimonialRole && (
                        <span className="font-normal text-muted-foreground">
                          {" "}
                          — {industry.caseStudy.testimonialRole}
                        </span>
                      )}
                    </span>
                  </figcaption>
                </figure>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA (dark island) ── */}
      {industry.cta && (
        <section id="get-started" className="relative overflow-hidden bg-black">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-primary/20" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow className="mb-4" tone="light">
                Get Started
              </Eyebrow>
              <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to Transform{" "}
                <span className="text-primary">Your Operations?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
                Speak with our industry specialists to see how UniERP can be configured for your needs.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                {industry.cta.demoLinkLabel && industry.cta.demoLinkUrl && (
                  <Link
                    href={industry.cta.demoLinkUrl}
                    className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {industry.cta.demoLinkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
                {industry.cta.phoneNumber && (
                  <a
                    href={`tel:${industry.cta.phoneNumber}`}
                    className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" />
                    {industry.cta.phoneLabel || "Call"}: {industry.cta.phoneNumber}
                  </a>
                )}
                {industry.cta.emailAddress && (
                  <a
                    href={`mailto:${industry.cta.emailAddress}`}
                    className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <Mail className="h-4 w-4" />
                    {industry.cta.emailLabel || "Email"}: {industry.cta.emailAddress}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Back link ── */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/erp/industries"
            className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to all industries
          </Link>
        </div>
      </div>
    </div>
  );
}
