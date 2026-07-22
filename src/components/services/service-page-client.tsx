"use client";

import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Building2,
  Check,
  ChevronRight,
  Cloud,
  FileCheck,
  Globe,
  Headphones,
  House,
  Lock,
  Mail,
  Monitor,
  PenTool,
  Phone,
  Search,
  Server,
  Shield,
  ShieldAlert,
  Sparkles,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { useLivePreview } from "@/hooks/use-live-preview";
import {
  iconNameToComponent,
} from "@/components/layout/navigation-data";
import { mediaUrl } from "@/lib/media-url";
import type { ServiceDetail } from "@/lib/services-config";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface Props {
  initialData: ServiceDetail;
}

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const FAMILY_LABEL: Record<string, string> = {
  "it-services": "Professional IT Services",
  "software-erp": "Software & ERP",
};

/** Fallback hero stats when CMS returns none — mirrors the body stats row. */
const DEFAULT_HERO_STATS = [
  {
    value: "20+",
    label: "Years in the UAE",
    description: "Trusted partner since 2002 across the Middle East.",
  },
  {
    value: "300+",
    label: "Experts across divisions",
    description: "Certified engineers, consultants & support staff.",
  },
  {
    value: "24/7",
    label: "Monitoring & support",
    description: "Round-the-clock SOC and helpdesk coverage.",
  },
  {
    value: "SLA",
    label: "Backed response times",
    description: "Guaranteed uptime with contractual SLAs.",
  },
];

/** Icons for the 4 stat cards. */
const HERO_STAT_ICONS: LucideIcon[] = [Award, Users, Headphones, FileCheck];

/* Per-step icon map for process steps — falls back to Check. */
const STEP_ICON_MAP: Record<string, LucideIcon> = {
  search: Search,
  penTool: PenTool,
  wrench: Wrench,
  activity: Activity,
  shield: Shield,
  lock: Lock,
  globe: Globe,
  server: Server,
  monitor: Monitor,
  zap: Zap,
  alertTriangle: AlertTriangle,
  barChart3: BarChart3,
  building2: Building2,
  fileCheck: FileCheck,
  cloud: Cloud,
  shieldAlert: ShieldAlert,
  award: Award,
  users: Users,
  headphones: Headphones,
  phone: Phone,
  mail: Mail,
};

function resolveIcon(iconName?: string): LucideIcon {
  if (!iconName) return Check;
  const key = iconName.charAt(0).toLowerCase() + iconName.slice(1);
  return STEP_ICON_MAP[key] ?? Check;
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

/** Section header with enterprise styling. */
function SectionHeader({
  badge,
  heading,
  subtext,
  className = "",
}: {
  badge?: string;
  heading: string;
  subtext?: string;
  className?: string;
}) {
  return (
    <div className={`mb-8 max-w-2xl ${className}`}>
      {badge && (
        <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
          {badge}
        </span>
      )}
      <h2 className="text-[length:var(--font-heading)] font-extrabold tracking-tight text-foreground">
        {heading}
      </h2>
      {subtext && (
        <p className="mt-2 text-[length:var(--font-body)] text-muted-foreground">
          {subtext}
        </p>
      )}
    </div>
  );
}

/** Single feature card for the sidebar / sub-category list. */
function FeatureCard({
  title,
  description,
  icon: IconProp,
}: {
  title: string;
  description?: string;
  accent?: unknown;
  icon?: LucideIcon;
}) {
  const IconComp = IconProp ?? Check;
  return (
    <div className="group flex items-start gap-3 border border-border bg-card p-4 transition-colors hover:border-primary/50 cursor-default">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-primary-foreground">
        <IconComp className="w-4 h-4" />
      </span>
      <div className="min-w-0">
        <h3 className="font-semibold text-foreground text-[length:var(--font-heading)] transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>
        {description && (
          <p className="mt-0.5 text-[length:var(--font-body)] text-muted-foreground leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-out group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/** Numbered benefit card */
function BenefitCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description?: string;
  accent?: unknown;
}) {
  return (
    <div className="flex items-start gap-4 border border-border bg-card p-5 transition-colors hover:border-primary/50">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center text-[length:var(--font-badge)] font-bold text-primary-foreground bg-primary">
        {number}
      </span>
      <div className="min-w-0">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="mt-1 text-[length:var(--font-body)] text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function ServicePageClient({ initialData }: Props) {
  const data = useLivePreview(
    initialData as unknown as Record<string, unknown>,
  ) as unknown as ServiceDetail;

  const hero = data.hero || {};
  const headline = hero.headline || data.title;
  const subHeadline = hero.subHeadline || data.tagline || "";
  const familyLabel = FAMILY_LABEL[data.family] || "Services";
  const heroBackgroundUrl = data.heroBackgroundImage?.url;

  const Icon = iconNameToComponent[data.icon || ""] ?? ArrowRight;

  const heroStats = data.heroStats && data.heroStats.length > 0
    ? data.heroStats
    : DEFAULT_HERO_STATS;

  const hasCtaSection = !!data.ctaSection;
  const hasBrands = !!(data.brands && data.brands.length > 0);
  const hasRelated = !!(data.relatedServices && data.relatedServices.length > 0);

  return (
    <div className="flex flex-col bg-background">
      {/* ================================================================ */}
      {/* Hero                                                                */}
      {/* ================================================================ */}
      <section className="relative w-full overflow-hidden bg-slate-950">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-[1px] scale-105"
          style={{
            backgroundImage: `url(${mediaUrl(
              heroBackgroundUrl || "/assets/images/homepage/hello.avif",
            )})`,
          }}
          aria-hidden="true"
        />
        {/* Dot grid pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.06) 1.2px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>

        <div className="container-primary relative z-10 pt-6 pb-16 lg:pt-8 lg:pb-24">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-10 lg:mb-16">
            <ol className="flex items-center flex-wrap gap-1.5 text-[length:var(--font-body)]">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-white"
                >
                  <House className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
              </li>
              <li aria-hidden="true" className="inline-flex items-center">
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </li>
              <li className="inline-flex items-center">
                <Link
                  href="/solutions"
                  className="inline-flex items-center text-white/70 transition-colors hover:text-white"
                >
                  Solutions
                </Link>
              </li>
              <li aria-hidden="true" className="inline-flex items-center">
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </li>
              <li className="inline-flex items-center min-w-0">
                <span className="text-white font-medium truncate max-w-[12rem] sm:max-w-xs">
                  {data.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Hero content — 2-col grid: text+CTAs (left) / compact stats (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left — Text + CTAs */}
            <div>
              <span className="inline-flex items-center gap-2 text-white/60 text-base font-semibold uppercase tracking-wider mb-4">
                <Icon className="w-4 h-4 text-primary" />
                {familyLabel}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.05]">
                {headline}
              </h1>

              {subHeadline && (
                <p className="text-[17px] text-slate-300 leading-[1.7] max-w-lg mt-4">
                  {subHeadline}
                </p>
              )}

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-6">
                {hero.primaryCtaLabel ? (
                  <Link
                    href={hero.primaryCtaLink || "/contact"}
                    className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {hero.primaryCtaLabel}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                ) : (
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Get in Touch
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
                {hero.secondaryCtaLabel ? (
                  <Link
                    href={hero.secondaryCtaLink || "/contact"}
                    className="inline-flex items-center gap-2 border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    {hero.secondaryCtaLabel}
                  </Link>
                ) : (
                  <Link
                    href="/solutions"
                    className="inline-flex items-center gap-2 border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    <Sparkles className="w-4 h-4" />
                    All Solutions
                  </Link>
                )}
              </div>
            </div>

            {/* Right — Compact stats (2x2 grid, value+label only) */}
            <div className="grid grid-cols-2 gap-3">
              {heroStats.map((stat, idx) => {
                const StatIcon = HERO_STAT_ICONS[idx] ?? Award;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 border border-white/10 bg-white/5 py-3 px-4 backdrop-blur"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                      <StatIcon className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xl font-extrabold leading-tight text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs font-medium text-white/60">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom border accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border" />
      </section>

      {/* Two-column body: overview (left) + "What's included" vertical cards (right) */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container-primary">
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-12">
            {/* Overview — main column */}
            {data.overview && (
              <div className="border border-border bg-card p-6 md:p-8">
                <div className="mb-5 h-1 w-10 bg-primary" />
                <div
                  className="text-[length:var(--font-body)] text-muted-foreground leading-relaxed
                    [&_a]:text-primary [&_a]:underline
                    [&_strong]:text-foreground [&_strong]:font-semibold
                    [&_h2]:text-[1.3rem] [&_h2]:font-extrabold [&_h2]:text-foreground [&_h2]:mt-7 [&_h2]:mb-3
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ul]:space-y-2
                    [&_li]:marker:text-primary"
                  dangerouslySetInnerHTML={{ __html: data.overview }}
                />
              </div>
            )}

            {/* Sidebar — "What's included" vertical cards */}
            {data.features && data.features.length > 0 && (
              <aside>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block h-1 w-8 bg-primary" />
                  <h2 className="text-[length:var(--font-heading)] font-extrabold tracking-tight text-foreground">
                    What&apos;s included
                  </h2>
                </div>
                <div className="space-y-3">
                  {data.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="group flex items-start gap-4 border border-border border-l-[3px] border-l-primary bg-card p-4 transition-colors hover:border-primary/50 cursor-default"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                        <Check className="w-5 h-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground text-[length:var(--font-heading)] transition-colors duration-300 group-hover:text-primary">
                          {feature.title}
                        </h3>
                        {feature.description && (
                          <p className="mt-1 text-[length:var(--font-body)] text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* Stats — service-specific highlights with icons */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container-primary">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {heroStats.map((stat, idx) => {
              const StatIcon = HERO_STAT_ICONS[idx] ?? Award;
              return (
                <div
                  key={stat.label}
                  className="group flex items-start gap-4 border border-border bg-card p-5 transition-colors hover:border-primary/50"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                    <StatIcon className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[length:var(--font-heading)] font-extrabold tracking-tight text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-foreground mt-0.5">
                      {stat.label}
                    </div>
                    {stat.description && (
                      <div className="mt-1 text-[length:var(--font-body)] text-muted-foreground leading-snug">
                        {stat.description}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Process Steps — "How we deliver"                                 */}
      {/* ================================================================ */}
      {data.processSteps && data.processSteps.length > 0 && (
        <section className="py-12 md:py-16 bg-background">
          <div className="container-primary">
            <SectionHeader
              badge="Our Process"
              heading="How we deliver"
              subtext="A proven four-stage approach to firewall deployment — from assessment to ongoing management."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.processSteps.map((step, idx) => {
                const StepIcon = resolveIcon(step.icon);
                return (
                  <div
                    key={idx}
                    className="group relative border border-border border-l-[3px] border-l-primary bg-card p-6 transition-colors hover:border-primary/50"
                  >
                    <span className="flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground mb-4">
                      <StepIcon className="w-5 h-5" />
                    </span>
                    <h3 className="font-semibold text-foreground text-[length:var(--font-heading)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[length:var(--font-body)] text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/* Features — "What's included" (shown when NOT already in sidebar) */}
      {/* ================================================================ */}
      {data.features && data.features.length > 0 && data.subCategories && data.subCategories.length > 0 && (
        <section className="pb-12 md:pb-16 bg-muted">
          <div className="container-primary">
            <SectionHeader
              badge="What's Included"
              heading="Everything you get"
              subtext="Comprehensive firewall services covering the full security lifecycle."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group flex items-start gap-3 border border-border bg-card p-5 transition-colors hover:border-primary/50"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                    {resolveIcon(feature.icon) ? (
                      (() => {
                        const FIcon = resolveIcon(feature.icon);
                        return <FIcon className="w-4 h-4" />;
                      })()
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-[length:var(--font-heading)] transition-colors duration-300 group-hover:text-primary">
                      {feature.title}
                    </h3>
                    {feature.description && (
                      <p className="mt-0.5 text-[length:var(--font-body)] text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/* Use Cases — "Where it matters most"                              */}
      {/* ================================================================ */}
      {data.useCases && data.useCases.length > 0 && (
        <section className="py-12 md:py-16 bg-background">
          <div className="container-primary">
            <SectionHeader
              badge="Use Cases"
              heading="Where it matters most"
              subtext="Firewall solutions deployed across industries and scenarios, each tuned to specific requirements."
            />

            <div className="grid sm:grid-cols-2 gap-4">
              {data.useCases.map((uc, idx) => {
                const UcIcon = resolveIcon(uc.icon);
                return (
                  <div
                    key={idx}
                    className="group flex items-start gap-4 border border-border bg-card p-6 transition-colors hover:border-primary/50"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                      <UcIcon className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground text-[length:var(--font-heading)] transition-colors duration-300 group-hover:text-primary">
                        {uc.title}
                      </h3>
                      <p className="mt-1.5 text-[length:var(--font-body)] text-muted-foreground leading-relaxed">
                        {uc.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/* Brands — Partner logos                                           */}
      {/* ================================================================ */}
      {hasBrands && (
        <section className="py-12 md:py-16 bg-muted">
          <div className="container-primary">
            <SectionHeader
              badge="Trusted Partners"
              heading="Security brands we work with"
              subtext="Authorized distributor and partner for the world's leading cybersecurity vendors."
            />

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {data.brands!.map((brand) => (
                <li
                  key={brand.name}
                  className="group relative flex items-center justify-center h-44 border border-border bg-card p-5 transition-colors hover:border-primary/50"
                >
                  <span className="text-[length:var(--font-heading)] font-bold text-foreground text-center leading-tight">
                    {brand.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/* Benefits — "Why it matters"                                      */}
      {/* ================================================================ */}
      {data.benefits && data.benefits.length > 0 && (
        <section className="py-12 md:py-16 bg-background">
          <div className="container-primary">
            <SectionHeader
              badge="Business Impact"
              heading="Why it matters"
              subtext="The measurable business outcomes you can expect from our firewall solutions."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.benefits.map((benefit, idx) => (
                <BenefitCard
                  key={idx}
                  number={String(idx + 1).padStart(2, "0")}
                  title={benefit.title || ""}
                  description={benefit.description}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/* Related Services                                                 */}
      {/* ================================================================ */}
      {hasRelated && (
        <section className="py-12 md:py-16 bg-muted">
          <div className="container-primary">
            <SectionHeader
              badge="Explore More"
              heading="Related services"
              subtext="Other IT services that complement your firewall deployment."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.relatedServices!.map((rel) => (
                <Link
                  key={rel.href}
                  href={rel.href}
                  className="group flex flex-col gap-3 border border-border bg-card p-6 transition-colors hover:border-primary/50"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground text-[length:var(--font-heading)] transition-colors duration-300 group-hover:text-primary">
                      {rel.name}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  {rel.description && (
                    <p className="text-[length:var(--font-body)] text-muted-foreground leading-relaxed">
                      {rel.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/* Call-to-Action Section                                           */}
      {/* ================================================================ */}
      {hasCtaSection && (
        <section className="py-16 md:py-24 relative overflow-hidden bg-slate-950">
          {/* Dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="container-primary relative z-10 text-center">
            <span className="mb-6 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Get Started
            </span>

            <h2 className="text-[length:var(--font-heading)] font-extrabold tracking-tight text-white max-w-2xl mx-auto">
              {data.ctaSection!.heading}
            </h2>
            <p className="mt-4 text-[length:var(--font-body)] text-white/70 leading-relaxed max-w-xl mx-auto">
              {data.ctaSection!.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              {data.ctaSection!.primaryLabel && (
                <Link
                  href={data.ctaSection!.primaryLink || "/contact"}
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {data.ctaSection!.primaryLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {data.ctaSection!.secondaryLabel && (
                <Link
                  href={data.ctaSection!.secondaryLink || "/contact"}
                  className="inline-flex items-center gap-2 border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {data.ctaSection!.secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
