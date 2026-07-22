"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Wrench, Sparkles } from "lucide-react";
import { useLivePreview } from "@/hooks/use-live-preview";
import { mediaUrl } from "@/lib/media-url";
import { SectionContainer } from "@/components/ui/section-container";
import {
  iconNameToComponent,
  colorNameToTheme,
} from "@/components/layout/navigation-data";
import { serviceHref, type ServiceSummary } from "@/lib/services-config";

interface Props {
  initialGlobal: Record<string, unknown>;
  initialServices: ServiceSummary[];
}

const FAMILY_GROUPS: Array<{
  family: string;
  label: string;
  description: string;
}> = [
  {
    family: "it-services",
    label: "Professional IT Services",
    description:
      "Infrastructure, security and maintenance — delivered by certified engineers across the Middle East.",
  },
];

export function ServicesHubClient({ initialGlobal, initialServices }: Props) {
  const global = useLivePreview(initialGlobal);

  const heroBackgroundImage = global.heroBackgroundImage as
    | { url?: string }
    | undefined;
  const hero = global.hero as {
    headline?: string;
    subHeadline?: string;
    primaryCtaLabel?: string;
    primaryCtaLink?: string;
    secondaryCtaLabel?: string;
    secondaryCtaLink?: string;
  } | undefined;
  const intro = (global.intro as string) || undefined;

  const heroHeadline = hero?.headline || "Software";
  const heroSubHeadline =
    hero?.subHeadline ||
    "Beyond IT hardware distribution, Simal Technologies delivers end-to-end professional IT services — one partner for products, implementation and ongoing support.";

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden bg-slate-950">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-[1px] scale-105"
          style={{
            backgroundImage: `url(${mediaUrl(
              heroBackgroundImage?.url || "/assets/images/homepage/hello.avif",
            )})`,
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-slate-950/60" />

        <div className="container-primary relative z-10">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              <Wrench className="mr-2 inline-block h-4 w-4" />
              Professional IT Services
            </span>
            <h1 className="text-[length:var(--font-hero-heading)] font-extrabold tracking-tighter leading-none mb-8 text-white">
              {heroHeadline}
            </h1>
            <p className="text-[length:var(--font-body)] text-white/90 leading-relaxed max-w-xl">
              {heroSubHeadline}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              {hero?.primaryCtaLabel ? (
                <Link
                  href={hero.primaryCtaLink || "/contact"}
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {hero.primaryCtaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {hero?.secondaryCtaLabel ? (
                <Link
                  href={hero.secondaryCtaLink || "/contact"}
                  className="inline-flex items-center gap-2 border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {hero.secondaryCtaLabel}
                </Link>
              ) : (
                <Link
                  href="#services-list"
                  className="inline-flex items-center gap-2 border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Sparkles className="w-4 h-4" />
                  Explore Services
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {intro && (
        <div className="container-primary py-12 md:py-16">
          <p
            className="mx-auto max-w-3xl text-center text-[length:var(--font-body)] text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: intro }}
          />
        </div>
      )}

      {/* Service groups */}
      {FAMILY_GROUPS.map((group) => {
        const items = initialServices.filter((s) => s.family === group.family);
        if (items.length === 0) return null;
        return (
          <SectionContainer
            key={group.family}
            id="services-list"
            variant={group.family === "it-services" ? "default" : "muted"}
          >
            <div className="mb-8 sm:mb-10 max-w-2xl">
              <h2 className="text-[length:var(--font-heading)] font-extrabold tracking-tight text-foreground">
                {group.label}
              </h2>
              <p className="mt-2 text-[length:var(--font-body)] text-muted-foreground">
                {group.description}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {items.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </SectionContainer>
        );
      })}

      {initialServices.length === 0 && (
        <SectionContainer>
          <p className="text-center text-muted-foreground">
            Service pages coming soon. Please check back shortly.
          </p>
        </SectionContainer>
      )}
    </div>
  );
}

function ServiceCard({ service }: { service: ServiceSummary }) {
  const Icon = iconNameToComponent[service.icon || ""] ?? ArrowRight;
  const href = serviceHref(service);

  return (
    <Link
      href={href}
      className="group flex h-full flex-col border border-border bg-card p-6 transition-colors hover:border-primary/50"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 flex h-12 w-12 items-center justify-center bg-primary text-primary-foreground">
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {service.title}
          </h3>
        </div>
      </div>
      {service.tagline && (
        <p className="mt-4 text-[length:var(--font-body)] text-muted-foreground leading-relaxed line-clamp-3">
          {service.tagline}
        </p>
      )}
      <div className="mt-5 flex items-center gap-1 text-primary font-semibold text-[length:var(--font-body)]">
        Learn more
        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
