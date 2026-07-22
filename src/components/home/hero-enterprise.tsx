"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Globe,
  Headphones,
  MapPin,
  Server,
  Shield,
  Truck,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_FEATURE_PILLS, DEFAULT_STATS } from "./hero-fallback-data";

/* ─── Types ─────────────────────────────────────────────────────── */

interface HeroEnterpriseProps {
  heroContent?: Record<string, unknown>;
  backgroundImage?: { url?: string; alt?: string };
}

/* ─── Slide data ────────────────────────────────────────────────── */

interface SlideItem {
  title: string;
  body: string;
  stat: string;
  statLabel: string;
}

const SLIDES: SlideItem[] = [
  {
    title: "Data Center & Enterprise Storage",
    body: "Servers, NVMe SSDs, NAS/SAN arrays, and enterprise-grade memory from Crucial, HIKVISION, TEAMGROUP, and more — stocked in JAFZA for immediate deployment across the GCC.",
    stat: "20+",
    statLabel: "Storage & Server Vendors",
  },
  {
    title: "Networking & Connectivity",
    body: "Switches, access points, USB-C docks, cables, and AV infrastructure — procured and configured for enterprise campus and branch-office deployments.",
    stat: "500+",
    statLabel: "Networking SKUs",
  },
  {
    title: "End-User Compute & Peripherals",
    body: "Professional monitors, workstation memory, external storage, and accessories — sourced from leading OEMs and delivered to end-user desks across the region.",
    stat: "1K+",
    statLabel: "Compute SKUs In Stock",
  },
  {
    title: "AV & Meeting Room Solutions",
    body: "All-in-one conference cameras, professional displays, and room audio systems for hybrid workplaces — from Nearity, Aiwa, and global OEM partners.",
    stat: "4K",
    statLabel: "Ultra HD Conferencing",
  },
  {
    title: "Pre-Sales & Managed Services",
    body: "Dedicated solutions architects for configuration and compatibility, 24/7 SLA-backed helpdesk, and full manufacturer warranty handling across the Middle East.",
    stat: "24/7",
    statLabel: "SLA-Backed Support",
  },
];

const AUTO_ROTATE_MS = 5000;

/* ─── Component ─────────────────────────────────────────────────── */

export default function HeroEnterprise({
  heroContent,
  backgroundImage,
}: HeroEnterpriseProps) {
  const content = (heroContent ?? {}) as Record<string, unknown>;

  const badge = (content.badge as string) ?? "GCC's Trusted IT Distributor";
  const headline1 = (content.headline1 as string) ?? "Powering Enterprise";
  const headline2 = (content.headline2 as string) ?? "Technology Across";
  const headline3 = (content.headline3 as string) ?? "the Middle East";
  const subheadline =
    (content.subheadline as string) ??
    "Simal Technologies is the premier value-added distributor of certified high-performance IT hardware, supplying enterprises and resellers across the GCC with SLA-backed support and JAFZA-stocked inventory.";

  const featurePills =
    (content.featurePills as Array<{ label: string; icon?: string }>) ??
    DEFAULT_FEATURE_PILLS;

  const stats =
    (content.stats as Array<{
      value: string;
      label: string;
      sub?: string;
      icon?: string;
    }>) ?? DEFAULT_STATS;

  const cta1 = (content.cta1 as { label?: string; link?: string }) ?? {};
  const cta2 = (content.cta2 as { label?: string; link?: string }) ?? {};

  const primaryCta = {
    label: cta1.label ?? "Explore Solutions",
    href: cta1.link ?? "/products",
  };
  const secondaryCta = {
    label: cta2.label ?? "Partner With Us",
    href: cta2.link ?? "/contact",
  };

  const statIcons: Record<string, React.ReactNode> = {
    Globe: <Globe className="h-4 w-4" />,
    ShieldCheck: <Shield className="h-4 w-4" />,
    BadgeCheck: <BadgeCheck className="h-4 w-4" />,
    Truck: <Truck className="h-4 w-4" />,
    Headphones: <Headphones className="h-4 w-4" />,
    Users: <Users className="h-4 w-4" />,
  };

  const defaultIcon = <Server className="h-4 w-4" />;

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (i: number) => setCurrent(((i % SLIDES.length) + SLIDES.length) % SLIDES.length),
    [],
  );
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, AUTO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, next]);

  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Full-bleed background image */}
      <Image
        src={backgroundImage?.url ?? "/assets/images/homepage/hero-bg-3.jpg"}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-slate-950/80" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* ── Corporate header bar ──────────────────────────── */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-medium tracking-wide text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Dubai, United Arab Emirates
            </span>
            <span className="text-white/30 select-none">|</span>
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-primary" />
              Established 2015
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-3.5 w-3.5 text-primary" />
              CITC Compliant
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-primary" />
              JAFZA Stocked
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-primary" />
              ISO Certified
            </span>
          </div>
        </div>

        {/* ── Main content ──────────────────────────────────── */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Identity */}
          <div>
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              {badge}
            </span>

            <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {headline1}{" "}
              <span className="text-primary">
                {headline2}
              </span>{" "}
              {headline3}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/90">
              {subheadline}
            </p>

            {/* Stats — clean horizontal bar */}
            <div className="mt-3 grid grid-cols-2 border-t border-white/20 pt-3 sm:grid-cols-4">
              {stats.slice(0, 4).map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    "flex flex-col px-4",
                    i > 0 && "border-l border-white/20 sm:border-l",
                    i === 0 && "pl-0",
                    i === 3 && "pr-0",
                  )}
                >
                  <span className="mb-1 text-primary">
                    {statIcons[stat.icon ?? ""] ?? defaultIcon}
                  </span>
                  <span className="text-2xl font-extrabold tabular-nums leading-none text-white">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-xs font-medium text-white/80">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Key differentiators */}
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5">
              {[
                "Authorized OEM Warranties",
                "JAFZA Duty-Free Stocked",
                "Same-Day GCC Dispatch",
                "Dedicated Solutions Architects",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 bg-primary" />
                  <span className="text-xs font-medium text-white">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
              {featurePills.slice(0, 4).map((pill) => (
                <span
                  key={pill.label}
                  className="inline-flex items-center gap-1.5 text-xs text-white/70"
                >
                  {pill.icon && statIcons[pill.icon] ? (
                    <span className="text-primary">{statIcons[pill.icon]}</span>
                  ) : (
                    <span className="h-1 w-1 bg-primary/60" />
                  )}
                  {pill.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Slider */}
          <div
            className="relative border-l border-white/20 pl-8 lg:pl-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            role="region"
            aria-roledescription="carousel"
            aria-label="Enterprise capabilities"
          >
            {/* Slide counter */}
            <div className="mb-6 flex items-center gap-4 text-xs font-medium text-white/80">
              <span className="inline-flex items-center gap-1 tabular-nums">
                <span className="text-base font-bold text-white">
                  {String(current + 1).padStart(2, "0")}
                </span>
                <span className="text-white/30">/</span>
                {String(SLIDES.length).padStart(2, "0")}
              </span>
              <span className="text-xs uppercase tracking-widest">
                Solution Pillars
              </span>
            </div>

            {/* Slides */}
            <div className="relative min-h-[240px]">
              {SLIDES.map((slide, i) => (
                <div
                  key={slide.title}
                  aria-hidden={i !== current}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    i === current ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                >
                  <h3 className="text-lg font-bold leading-snug text-white">
                    {slide.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/90">
                    {slide.body}
                  </p>
                  <div className="mt-6 flex items-baseline gap-3 border-t border-white/20 pt-4">
                    <span className="text-3xl font-extrabold tabular-nums tracking-tight text-white">
                      {slide.stat}
                    </span>
                    <span className="text-sm font-medium text-white/80">
                      {slide.statLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Nav */}
            <div className="mt-6 flex items-center gap-3">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={cn(
                    "h-0.5 transition-all",
                    i === current
                      ? "w-8 bg-white"
                      : "w-4 bg-white/30 hover:bg-white/50",
                  )}
                />
              ))}
              <span className="ml-auto text-xs tabular-nums text-white/80">
                {String(current + 1).padStart(2, "0")}/{String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
