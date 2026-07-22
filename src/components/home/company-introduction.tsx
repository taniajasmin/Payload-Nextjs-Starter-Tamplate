"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  Building2,
  CalendarClock,
  Cpu,
  Globe2,
  MapPin,
  Package,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Count-up hook ──────────────────────────────────────────────── */

function useCountUp(end: number, dur: number, go: boolean): number {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    let st: number | null = null;
    let raf: number;
    const tick = (ts: number) => {
      if (!st) st = ts;
      const p = Math.min((ts - st) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, dur, go]);
  return n;
}

/* ─── Types ─────────────────────────────────────────────────────── */

type IconType = React.ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

type Stat = {
  icon: IconType;
  label: string;
  sub: string;
} & ({ value: number; suffix?: string; prefix?: string } | { display: string });

function isNumeric(
  stat: Stat,
): stat is Stat & { value: number; suffix?: string; prefix?: string } {
  return "value" in stat;
}

interface CompanyIntroductionProps {
  badge?: string;
  heading?: string;
  accent?: string;
  intro?: string;
  closing?: string;
}

/* ─── Data ──────────────────────────────────────────────────────── */

const STATS: Stat[] = [
  {
    icon: CalendarClock,
    label: "Years",
    sub: "Of IT distribution experience (founded 2002)",
    value: 20,
    suffix: "+",
  },
  {
    icon: Users,
    label: "Employees",
    sub: "Across all business divisions",
    value: 300,
    suffix: "+",
  },
  {
    icon: Globe2,
    label: "Global Brands",
    sub: "As authorized distributor",
    value: 20,
    suffix: "+",
  },
  {
    icon: Package,
    label: "Products",
    sub: "Across 5 major categories",
    value: 76,
    suffix: "+",
  },
  {
    icon: TrendingUp,
    label: "Annual Revenue",
    sub: "With consistent growth trajectory",
    display: "$1.97M",
  },
  {
    icon: Award,
    label: "HIKSEMi 2025",
    sub: "Best Distribution Partner award winner",
    display: "Winner",
  },
];

const PILLARS = [
  {
    icon: Building2,
    tag: "Established",
    title: "IT Distribution",
    desc: "Authorized distributor for Crucial, UGREEN, HIKVISION, ARKTEK, TEAMGROUP, Dell, HP, Lenovo, Honeywell, Samsung, and more.",
  },
  {
    icon: Cpu,
    tag: "New",
    title: "Software & ERP Solutions",
    desc: "Full-range UniERP system based on Odoo 19 CE, powered by UniSoft Systems Limited — 40+ engineers, 150+ projects delivered, 98% on-time delivery.",
  },
];

const KEY_FACTS = [
  "Headquartered in Dubai, UAE",
  "Part of the TwinMOS Group",
  "Serving MEA · CIS · GCC regions",
  "JAFZA duty-free stocked inventory",
  "Authorized distributor for 20+ global OEMs",
  "ISO certified operations",
];

/* ─── StatTile ──────────────────────────────────────────────────── */

function StatTile({
  stat,
  enabled,
  index,
  total,
}: {
  stat: Stat;
  enabled: boolean;
  index: number;
  total: number;
}) {
  const Icon = stat.icon;
  const numeric = isNumeric(stat);
  const count = useCountUp(numeric ? stat.value : 0, 2000, enabled && numeric);
  const display = numeric
    ? `${stat.prefix ?? ""}${count}${stat.suffix ?? ""}`
    : stat.display;

  return (
    <div
      className={cn(
        "flex flex-col px-4",
        index > 0 && "border-l",
        index === 0 && "pl-0",
        index === total - 1 && "pr-0",
      )}
    >
      <span className="mb-1 text-primary">
        <Icon size={16} strokeWidth={1.6} />
      </span>
      <span className="text-2xl font-extrabold tabular-nums leading-none text-foreground">
        {display}
      </span>
      <span className="mt-1 text-xs font-medium text-muted-foreground">
        {stat.label}
      </span>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────── */

export default function CompanyIntroduction({
  badge = "Company Introduction",
  heading = "Trusted IT Distribution Excellence",
  accent = "— 20+ Years in the UAE",
  intro,
  closing,
}: CompanyIntroductionProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  const displayIntro =
    intro ||
    "Simal Technologies Middle East LLC is a premier IT distributor headquartered in Dubai, UAE, delivering enterprise-grade hardware, accessories, and software solutions across the Middle East, Africa, CIS, and GCC regions.";

  const displayClosing =
    closing ||
    "As part of the TwinMOS Group, we combine deep regional expertise with international brand partnerships to deliver innovative technology products backed by excellent customer support.";

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="company-introduction"
      className="relative overflow-hidden bg-background"
    >
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <Image
          src="/assets/images/homepage/about-new.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* Subtle top-to-bottom fade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* ── Section identifier bar ──────────────────────────── */}
        <div className="mb-8 flex items-center gap-4 border-b pb-4">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            About Simal
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            {badge}
          </span>
        </div>

        {/* ── Main content ──────────────────────────────────── */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Identity */}
          <div>
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              {badge}
            </span>

            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {heading}{" "}
              <span className="text-primary">{accent}</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {displayIntro}
            </p>

            {/* Business pillars — clean bordered style */}
            <div className="mt-6 grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-0">
              {PILLARS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className={cn(
                      "border-l-2 border-primary/30 py-2 pl-4",
                      i === 0 && "sm:border-r sm:border-primary/10 sm:pr-4",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={15} strokeWidth={1.6} className="shrink-0 text-primary" />
                      <h3 className="text-sm font-bold text-foreground">
                        {p.title}
                      </h3>
                      <span
                        className={cn(
                          "inline-block text-[10px] font-bold uppercase tracking-wider",
                          p.tag === "Established"
                            ? "text-emerald-600"
                            : "text-amber-600",
                        )}
                      >
                        {p.tag}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {displayClosing}
            </p>

            {/* CTAs */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Learn About Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/erp/overview"
                className="inline-flex items-center gap-2 border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Explore ERP Solutions
              </Link>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin size={13} className="text-primary" />
                <span>Dubai, UAE · MEA · CIS · GCC</span>
              </div>
            </div>
          </div>

          {/* Right: Enterprise visual */}
          <div className="relative border-l pl-8 lg:pl-10">
            {/* Section label */}
            <div className="mb-6 flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <span className="text-xs uppercase tracking-widest">
                Key Facts
              </span>
            </div>

            {/* Image — clean, no rounded corners */}
            <div className="relative overflow-hidden border border-border">
              <Image
                src="/assets/images/homepage/about-new.jpg"
                alt="Simal Technologies — Dubai-headquartered IT distributor"
                width={720}
                height={420}
                className="h-[260px] w-full object-cover md:h-[300px]"
                priority
              />
            </div>

            {/* Key facts list */}
            <div className="mt-6 space-y-0">
              {KEY_FACTS.map((fact) => (
                <div
                  key={fact}
                  className="flex items-center gap-2.5 border-b border-border/60 py-2.5"
                >
                  <span className="h-1 w-1 shrink-0 bg-primary" />
                  <span className="text-xs font-medium text-foreground">
                    {fact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stats bar ──────────────────────────────────────── */}
        <div
          ref={statsRef}
          className="mt-14 grid grid-cols-2 border-t pt-6 sm:grid-cols-3 md:grid-cols-6"
        >
          {STATS.map((stat, i) => (
            <StatTile
              key={stat.label}
              stat={stat}
              enabled={statsInView}
              index={i}
              total={STATS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
