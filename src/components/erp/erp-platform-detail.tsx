"use client";

import { createElement } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  Quote,
  Check,
} from "lucide-react";
import { RichTextRenderer } from "@/components/erp/rich-text-renderer";
import { iconNameToComponent } from "@/components/layout/navigation-data";
import { Eyebrow } from "@/components/ui/eyebrow";

/* ------------------------------------------------------------------
   Types
   ------------------------------------------------------------------ */

interface MediaDoc {
  url?: string;
  alt?: string;
}

export interface ErpPlatformDoc {
  id?: string;
  heroBackgroundImage?: MediaDoc | null;
  hero?: {
    headline?: string;
    subHeadline?: string;
    ctaLabel?: string;
    ctaLink?: string;
    secondaryCtaLabel?: string;
    secondaryCtaLink?: string;
  };
  overviewEyebrow?: string;
  overviewHeading?: string;
  overviewDescription?: unknown;
  keyStats?: Array<{ id?: string; value: string; label: string }>;
  partnershipEyebrow?: string;
  partnershipHeading?: string;
  partnershipDescription?: unknown;
  partnershipHighlights?: Array<{ id?: string; icon?: string; title: string; description?: string }>;
  technologyEyebrow?: string;
  technologyHeading?: string;
  technologyDescription?: unknown;
  techStack?: Array<{ id?: string; name: string; description?: string; icon?: string }>;
  differentiatorsEyebrow?: string;
  differentiatorsHeading?: string;
  differentiators?: Array<{ id?: string; icon?: string; title: string; description?: string }>;
  comparisonEyebrow?: string;
  comparisonHeading?: string;
  comparisonDescription?: string;
  comparisonColumns?: Array<{ id?: string; name: string }>;
  comparisonRows?: Array<{
    id?: string;
    feature: string;
    valueA?: string;
    valueB?: string;
    valueC?: string;
  }>;
  audienceEyebrow?: string;
  audienceHeading?: string;
  audienceDescription?: string;
  audience?: Array<{ id?: string; icon?: string; title: string; description?: string }>;
  modulesEyebrow?: string;
  modulesHeading?: string;
  modulesDescription?: string;
  coreModules?: Array<{
    id?: string;
    name: string;
    description?: string;
    icon?: string;
    features?: Array<{ id?: string; name: string; description?: string }>;
    screenshot?: MediaDoc | null;
    link?: string;
  }>;
  industriesEyebrow?: string;
  industriesHeading?: string;
  industriesDescription?: string;
  implementationEyebrow?: string;
  implementationHeading?: string;
  implementationDescription?: string;
  implementationSteps?: Array<{
    id?: string;
    stepNumber: number;
    title: string;
    description?: string;
    icon?: string;
    duration?: string;
  }>;
  pricingEyebrow?: string;
  pricingHeading?: string;
  pricingDescription?: string;
  pricingTiers?: Array<{
    id?: string;
    tierName: string;
    price?: string;
    description?: string;
    features?: Array<{ id?: string; feature: string }>;
    ctaLabel?: string;
    ctaLink?: string;
    highlighted?: boolean;
  }>;
  pricingDisclaimer?: string;
  caseStudiesEyebrow?: string;
  caseStudiesHeading?: string;
  featuredCaseStudies?: Array<{
    id?: string;
    clientName: string;
    industry?: string;
    background?: string;
    challenge?: string;
    solution?: string;
    results?: Array<{ id?: string; value: string; label: string }>;
    testimonialQuote?: string;
    testimonialAuthor?: string;
    testimonialRole?: string;
  }>;
  testimonialsEyebrow?: string;
  testimonialsHeading?: string;
  customerLogos?: Array<{ id?: string; logo?: MediaDoc | null; companyName?: string }>;
  ctaEyebrow?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  cta?: {
    phoneLabel?: string;
    phoneNumber?: string;
    whatsappLabel?: string;
    whatsappNumber?: string;
    emailLabel?: string;
    emailAddress?: string;
    demoLinkLabel?: string;
    demoLinkUrl?: string;
  };
  meta?: {
    title?: string;
    description?: string;
    image?: MediaDoc | null;
  };
}

interface ErpPlatformDetailProps {
  data: ErpPlatformDoc;
}

/* ------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------ */

function resolveIcon(iconName?: string) {
  if (!iconName) return null;
  return iconNameToComponent[iconName] ?? null;
}

/* ------------------------------------------------------------------
   Reusable partials
   ------------------------------------------------------------------ */

function IdentifierBar({
  label,
  badge,
  tone,
}: {
  label: string;
  badge?: string;
  tone?: "default" | "light";
}) {
  const isLight = tone === "light";
  return (
    <div className={`mb-8 flex items-center gap-4 border-b pb-4 ${isLight ? "border-white/10" : ""}`}>
      <span
        className={`text-xs font-medium uppercase tracking-widest ${isLight ? "text-slate-400" : "text-muted-foreground"}`}
      >
        {label}
      </span>
      {badge && (
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
          {badge}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function ErpPlatformDetail({ data }: ErpPlatformDetailProps) {
  const hero = data.hero;
  const bgImage =
    data.heroBackgroundImage?.url || "/assets/images/homepage/business-pillars.avif";

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-slate-950 py-28 md:py-36">
        <Image
          src={bgImage}
          alt={data.heroBackgroundImage?.alt ?? ""}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-slate-950/80" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <IdentifierBar label="Software & ERP" badge="UniERP Platform" tone="light" />

          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3" />
              </li>
              <li>
                <span className="font-semibold text-white/70">ERP Platform</span>
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
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

            <div className="mt-8 flex flex-wrap gap-4">
              {hero?.ctaLabel && hero?.ctaLink && (
                <Link
                  href={hero.ctaLink}
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {hero.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {hero?.secondaryCtaLabel && hero?.secondaryCtaLink && (
                <Link
                  href={hero.secondaryCtaLink}
                  className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {hero.secondaryCtaLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      {data.overviewDescription != null && (
        <section className="relative overflow-hidden bg-background">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <IdentifierBar label="Platform Overview" badge="UniERP" />

            {data.overviewEyebrow && (
              <Eyebrow className="mb-3 block">{data.overviewEyebrow}</Eyebrow>
            )}
            {data.overviewHeading && (
              <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {data.overviewHeading}
              </h2>
            )}

            <div className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground rich-text-content">
              <RichTextRenderer data={data.overviewDescription} />
            </div>

            {(data.keyStats?.length ?? 0) > 0 && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {data.keyStats!.map((stat, i) => (
                  <div
                    key={stat.id ?? i}
                    className="border border-border bg-card p-8 text-center"
                  >
                    <div className="text-2xl font-extrabold tabular-nums leading-none text-primary">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Comparison Table ── */}
      {((data.comparisonRows?.length ?? 0) > 0 || data.comparisonHeading) && (
        <section className="relative overflow-hidden bg-muted">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <IdentifierBar label="The UniERP Advantage" badge="Comparison" />

            {data.comparisonEyebrow && (
              <Eyebrow className="mb-3 block">{data.comparisonEyebrow}</Eyebrow>
            )}
            {data.comparisonHeading && (
              <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {data.comparisonHeading}
              </h2>
            )}
            {data.comparisonDescription && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {data.comparisonDescription}
              </p>
            )}

            <div className="mt-10 overflow-x-auto border border-border bg-card">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/60">
                    <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Feature
                    </th>
                    {(data.comparisonColumns ?? []).map((col, i) => (
                      <th
                        key={col.id ?? i}
                        className={`p-4 text-left text-xs font-extrabold tracking-tight ${
                          i === 2 ? "bg-primary/10 text-primary" : "text-foreground"
                        }`}
                      >
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(data.comparisonRows ?? []).map((row, i) => (
                    <tr key={row.id ?? i} className="border-b border-border last:border-b-0">
                      <td className="p-4 font-semibold text-foreground">{row.feature}</td>
                      <td className="p-4 text-muted-foreground">{row.valueA ?? "—"}</td>
                      <td className="p-4 text-muted-foreground">{row.valueB ?? "—"}</td>
                      <td className="p-4 bg-primary/5">
                        <span className="inline-flex items-center gap-2 font-semibold text-primary">
                          {row.valueC && (
                            <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          )}
                          {row.valueC ?? "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── Partnership ── */}
      {(data.partnershipDescription || (data.partnershipHighlights?.length ?? 0) > 0) && (
        <section className="relative overflow-hidden bg-muted">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <IdentifierBar label="Partnership" badge="Simal + UniSoft" />

            {data.partnershipEyebrow && (
              <Eyebrow className="mb-3 block">{data.partnershipEyebrow}</Eyebrow>
            )}
            {data.partnershipHeading && (
              <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {data.partnershipHeading}
              </h2>
            )}

            {data.partnershipDescription != null && (
              <div className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground rich-text-content">
                <RichTextRenderer data={data.partnershipDescription} />
              </div>
            )}

            {(data.partnershipHighlights?.length ?? 0) > 0 && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {data.partnershipHighlights!.map((item, i) => {
                  const IconComp = resolveIcon(item.icon);
                  return (
                    <div
                      key={item.id ?? i}
                      className="flex h-full flex-col border border-border bg-card p-8"
                    >
                      {IconComp && (
                        <div className="mb-4 inline-flex items-center justify-center h-10 w-10 bg-primary/10">
                          {createElement(IconComp, {
                            className: "h-5 w-5 text-primary",
                          })}
                        </div>
                      )}
                      <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Technology ── */}
      {(data.technologyDescription || (data.techStack?.length ?? 0) > 0) && (
        <section className="relative overflow-hidden bg-background">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <IdentifierBar label="Technology" badge="Foundation" />

            {data.technologyEyebrow && (
              <Eyebrow className="mb-3 block">{data.technologyEyebrow}</Eyebrow>
            )}
            {data.technologyHeading && (
              <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {data.technologyHeading}
              </h2>
            )}

            {data.technologyDescription != null && (
              <div className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground rich-text-content">
                <RichTextRenderer data={data.technologyDescription} />
              </div>
            )}

            {(data.techStack?.length ?? 0) > 0 && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {data.techStack!.map((tech, i) => {
                  const TechIcon = resolveIcon(tech.icon);
                  return (
                    <div
                      key={tech.id ?? i}
                      className="flex h-full flex-col border border-border bg-card p-8"
                    >
                      {TechIcon && (
                        <div className="mb-4 inline-flex items-center justify-center h-10 w-10 bg-primary/10">
                          {createElement(TechIcon, {
                            className: "h-5 w-5 text-primary",
                          })}
                        </div>
                      )}
                      <h3 className="text-base font-extrabold leading-snug text-foreground">
                        {tech.name}
                      </h3>
                      {tech.description && (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {tech.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Target Audience / Who Is UniERP For? ── */}
      {((data.audience?.length ?? 0) > 0 || data.audienceHeading) && (
        <section className="relative overflow-hidden bg-muted">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <IdentifierBar label="Who Is UniERP For?" badge="Audience" />

            {data.audienceEyebrow && (
              <Eyebrow className="mb-3 block">{data.audienceEyebrow}</Eyebrow>
            )}
            {data.audienceHeading && (
              <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {data.audienceHeading}
              </h2>
            )}
            {data.audienceDescription && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {data.audienceDescription}
              </p>
            )}

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(data.audience ?? []).map((item, i) => {
                const IconComp = resolveIcon(item.icon);
                return (
                  <div
                    key={item.id ?? i}
                    className="flex h-full flex-col border border-border bg-card p-8"
                  >
                    {IconComp && (
                      <div className="mb-4 inline-flex items-center justify-center h-10 w-10 bg-primary/10">
                        {createElement(IconComp, {
                          className: "h-5 w-5 text-primary",
                        })}
                      </div>
                    )}
                    <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Key Differentiators ── */}
      {(data.differentiators?.length ?? 0) > 0 && (
        <section className="relative overflow-hidden bg-slate-950">
          <div className="pointer-events-none absolute inset-0 bg-slate-950/80" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <IdentifierBar label="Why UniERP" badge="Differentiators" tone="light" />

            {data.differentiatorsEyebrow && (
              <Eyebrow className="mb-3 block" tone="light">
                {data.differentiatorsEyebrow}
              </Eyebrow>
            )}
            {data.differentiatorsHeading && (
              <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {data.differentiatorsHeading}
              </h2>
            )}

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {data.differentiators!.map((item, i) => {
                const DiffIcon = resolveIcon(item.icon);
                return (
                  <div
                    key={item.id ?? i}
                    className="flex h-full flex-col border border-white/10 bg-white/5 p-8"
                  >
                    {DiffIcon && (
                      <div className="mb-4 inline-flex items-center justify-center h-10 w-10 bg-white/10">
                        {createElement(DiffIcon, {
                          className: "h-5 w-5 text-primary",
                        })}
                      </div>
                    )}
                    <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-white">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {item.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Core Modules ── */}
      {(data.coreModules?.length ?? 0) > 0 && (
        <section className="relative overflow-hidden bg-background">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <IdentifierBar label="Core Modules" badge="6 Modules" />

            {data.modulesEyebrow && (
              <Eyebrow className="mb-3 block">{data.modulesEyebrow}</Eyebrow>
            )}
            {data.modulesHeading && (
              <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {data.modulesHeading}
              </h2>
            )}
            {data.modulesDescription && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {data.modulesDescription}
              </p>
            )}

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {data.coreModules!.map((mod, i) => {
                const ModIcon = resolveIcon(mod.icon);
                return (
                  <div
                    key={mod.id ?? i}
                    className="flex flex-col border border-border bg-card overflow-hidden"
                  >
                    <div className="p-8 md:p-10">
                      <div className="flex items-center gap-3 mb-4">
                        {ModIcon && (
                          <div className="inline-flex items-center justify-center h-10 w-10 bg-primary/10">
                            {createElement(ModIcon, {
                              className: "h-5 w-5 text-primary",
                            })}
                          </div>
                        )}
                        <h3 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                          {mod.name}
                        </h3>
                      </div>
                      {mod.description && (
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {mod.description}
                        </p>
                      )}
                      {(mod.features?.length ?? 0) > 0 && (
                        <div className="mt-5 space-y-1.5">
                          {mod.features!.map((feat, j) => (
                            <div key={feat.id ?? j} className="flex items-center gap-2">
                              <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                              <span className="text-sm text-muted-foreground">
                                {feat.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      {mod.link && (
                        <Link
                          href={mod.link}
                          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                        >
                          Learn more
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                    {mod.screenshot?.url && (
                      <div className="relative aspect-video w-full border-t border-border">
                        <Image
                          src={mod.screenshot.url}
                          alt={mod.screenshot.alt ?? mod.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Industry Solutions ── */}
      {(data.industriesHeading || data.industriesDescription) && (
        <section className="relative overflow-hidden bg-muted">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <IdentifierBar label="Industries" badge="8+ Verticals" />

            {data.industriesEyebrow && (
              <Eyebrow className="mb-3 block">{data.industriesEyebrow}</Eyebrow>
            )}
            {data.industriesHeading && (
              <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {data.industriesHeading}
              </h2>
            )}
            {data.industriesDescription && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {data.industriesDescription}
              </p>
            )}

            <div className="mt-8">
              <Link
                href="/erp/industries"
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Explore Industry Solutions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Implementation ── */}
      {(data.implementationSteps?.length ?? 0) > 0 && (
        <section className="relative overflow-hidden bg-background">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <IdentifierBar label="Process" badge="Implementation" />

            {data.implementationEyebrow && (
              <Eyebrow className="mb-3 block">{data.implementationEyebrow}</Eyebrow>
            )}
            {data.implementationHeading && (
              <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {data.implementationHeading}
              </h2>
            )}
            {data.implementationDescription && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {data.implementationDescription}
              </p>
            )}

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {data.implementationSteps!
                .sort((a, b) => a.stepNumber - b.stepNumber)
                .map((step, i) => {
                  const StepIcon = resolveIcon(step.icon);
                  return (
                    <div
                      key={step.id ?? i}
                      className="relative flex h-full flex-col border border-border bg-card p-8"
                    >
                      <span className="absolute right-4 top-4 text-4xl font-extrabold tabular-nums leading-none text-primary/10">
                        {String(step.stepNumber).padStart(2, "0")}
                      </span>
                      <div className="relative z-10">
                        {StepIcon && (
                          <div className="mb-4 inline-flex items-center justify-center h-10 w-10 bg-primary/10">
                            {createElement(StepIcon, {
                              className: "h-5 w-5 text-primary",
                            })}
                          </div>
                        )}
                        <h3 className="text-base font-extrabold leading-snug text-foreground">
                          {step.title}
                        </h3>
                        {step.description && (
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {step.description}
                          </p>
                        )}
                        {step.duration && (
                          <span className="mt-3 inline-block text-[10px] font-bold uppercase tracking-wider text-primary">
                            {step.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* ── Pricing ── */}
      {(data.pricingTiers?.length ?? 0) > 0 && (
        <section className="relative overflow-hidden bg-muted">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <IdentifierBar label="Pricing" badge="Packages" />

            {data.pricingEyebrow && (
              <Eyebrow className="mb-3 block">{data.pricingEyebrow}</Eyebrow>
            )}
            {data.pricingHeading && (
              <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {data.pricingHeading}
              </h2>
            )}
            {data.pricingDescription && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {data.pricingDescription}
              </p>
            )}

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {data.pricingTiers!.map((tier, i) => (
                <div
                  key={tier.id ?? i}
                  className={`flex h-full flex-col border p-8 md:p-10 ${
                    tier.highlighted
                      ? "border-primary bg-card ring-2 ring-primary"
                      : "border-border bg-card"
                  }`}
                >
                  {tier.highlighted && (
                    <span className="mb-4 self-start text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1">
                      Recommended
                    </span>
                  )}
                  <h3 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                    {tier.tierName}
                  </h3>
                  {tier.price && (
                    <div className="mt-3 text-2xl font-extrabold tabular-nums leading-none text-primary">
                      {tier.price}
                    </div>
                  )}
                  {tier.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {tier.description}
                    </p>
                  )}
                  {(tier.features?.length ?? 0) > 0 && (
                    <ul className="mt-6 space-y-2.5 flex-1">
                      {tier.features!.map((feat, j) => (
                        <li key={feat.id ?? j} className="flex items-start gap-2">
                          <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                          <span className="text-sm text-muted-foreground">
                            {feat.feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {tier.ctaLabel && tier.ctaLink && (
                    <Link
                      href={tier.ctaLink}
                      className={`mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition-colors ${
                        tier.highlighted
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      {tier.ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {data.pricingDisclaimer && (
              <p className="mt-6 text-center text-xs text-muted-foreground">
                {data.pricingDisclaimer}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ── Case Studies ── */}
      {(data.featuredCaseStudies?.length ?? 0) > 0 && (
        <section className="relative overflow-hidden bg-background">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <IdentifierBar label="Success Stories" badge="Case Studies" />

            {data.caseStudiesEyebrow && (
              <Eyebrow className="mb-3 block">{data.caseStudiesEyebrow}</Eyebrow>
            )}
            {data.caseStudiesHeading && (
              <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {data.caseStudiesHeading}
              </h2>
            )}

            <div className="mt-10 space-y-10">
              {data.featuredCaseStudies!.map((cs, i) => (
                <div key={cs.id ?? i} className="border border-border bg-card">
                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <h3 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                        {cs.clientName}
                      </h3>
                      {cs.industry && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5">
                          {cs.industry}
                        </span>
                      )}
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {cs.challenge && (
                        <div className="border border-border p-6">
                          <h4 className="text-sm font-bold uppercase tracking-widest text-primary">
                            The Challenge
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {cs.challenge}
                          </p>
                        </div>
                      )}
                      {cs.solution && (
                        <div className="border border-border p-6">
                          <h4 className="text-sm font-bold uppercase tracking-widest text-primary">
                            The Solution
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {cs.solution}
                          </p>
                        </div>
                      )}
                    </div>

                    {(cs.results?.length ?? 0) > 0 && (
                      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {cs.results!.map((r, j) => (
                          <div
                            key={r.id ?? j}
                            className="border border-border p-6 text-center"
                          >
                            <div className="text-xl font-extrabold tabular-nums leading-none text-primary">
                              {r.value}
                            </div>
                            <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              {r.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {cs.testimonialQuote && (
                      <figure className="mt-6 relative border border-border p-6">
                        <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/10" />
                        <blockquote className="relative">
                          <p className="text-sm font-medium leading-relaxed italic text-foreground">
                            &ldquo;{cs.testimonialQuote}&rdquo;
                          </p>
                        </blockquote>
                        <figcaption className="mt-4 flex items-center gap-3">
                          <span className="inline-block h-0.5 w-6 bg-primary" />
                          <span className="text-sm font-semibold text-foreground">
                            {cs.testimonialAuthor}
                            {cs.testimonialRole && (
                              <span className="font-normal text-muted-foreground">
                                {" "}
                                — {cs.testimonialRole}
                              </span>
                            )}
                          </span>
                        </figcaption>
                      </figure>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials / Customer Logos ── */}
      {(data.customerLogos?.length ?? 0) > 0 && (
        <section className="relative overflow-hidden bg-muted">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <IdentifierBar label="Trusted By" badge="Clients" />

            {data.testimonialsEyebrow && (
              <Eyebrow className="mb-3 block">{data.testimonialsEyebrow}</Eyebrow>
            )}
            {data.testimonialsHeading && (
              <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {data.testimonialsHeading}
              </h2>
            )}

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {data.customerLogos!.map((logo, i) => (
                <div
                  key={logo.id ?? i}
                  className="flex flex-col items-center justify-center border border-border bg-card p-8"
                >
                  {logo.logo?.url ? (
                    <div className="relative h-16 w-full">
                      <Image
                        src={logo.logo.url}
                        alt={logo.logo.alt ?? logo.companyName ?? ""}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="text-sm font-semibold text-muted-foreground">
                      {logo.companyName}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      {data.cta && (
        <section className="relative overflow-hidden bg-slate-950">
          <div className="pointer-events-none absolute inset-0 bg-slate-950/80" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <IdentifierBar label="Get Started" badge="Contact" tone="light" />

            <div className="mx-auto max-w-2xl text-center">
              {data.ctaEyebrow && (
                <Eyebrow className="mb-3" tone="light">
                  {data.ctaEyebrow}
                </Eyebrow>
              )}
              {data.ctaHeading && (
                <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {data.ctaHeading}
                </h2>
              )}
              {data.ctaDescription && (
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {data.ctaDescription}
                </p>
              )}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                {data.cta.phoneNumber && (
                  <a
                    href={`tel:${data.cta.phoneNumber}`}
                    className="inline-flex items-center gap-2 text-white transition-colors hover:text-primary"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">
                      {data.cta.phoneLabel || "Call"}: {data.cta.phoneNumber}
                    </span>
                  </a>
                )}
                {data.cta.emailAddress && (
                  <a
                    href={`mailto:${data.cta.emailAddress}`}
                    className="inline-flex items-center gap-2 text-white transition-colors hover:text-primary"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">
                      {data.cta.emailLabel || "Email"}: {data.cta.emailAddress}
                    </span>
                  </a>
                )}
                {data.cta.whatsappNumber && (
                  <a
                    href={`https://wa.me/${data.cta.whatsappNumber.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white transition-colors hover:text-primary"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">
                      {data.cta.whatsappLabel || "WhatsApp"}: {data.cta.whatsappNumber}
                    </span>
                  </a>
                )}
                {data.cta.demoLinkLabel && data.cta.demoLinkUrl && (
                  <Link
                    href={data.cta.demoLinkUrl}
                    className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {data.cta.demoLinkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Back link ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
