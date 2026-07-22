"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  Award,
  Package,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";

/* ═══════════════════════════════════════════════════════════════
   About Simal Technologies — Enterprise Two-Column Layout
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER HOOK
   ═══════════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

interface AboutSimalProps {
  badge?: string;
  heading?: string;
  subtext?: string;
}

/* ═══════════════════════════════════════════════════════════════
   CONTENT
   ═══════════════════════════════════════════════════════════════ */

const STATS = [
  { value: 20, suffix: "+", label: "Years in UAE", icon: Globe },
  { value: 20, suffix: "+", label: "Global Brands", icon: Award },
  { value: 76, suffix: "+", label: "Core Products", icon: Package },
];

const BUSINESS_MODELS = [
  {
    title: "IT Distribution",
    desc: "Authorized distributor for Crucial, UGREEN, HIKVISION, ARKTEK, TEAMGROUP, Dell, HP, Lenovo, Honeywell, Samsung, and more.",
  },
  {
    title: "Software & ERP Solutions",
    desc: "Full-range UniERP system based on Odoo 19 CE, powered by UniSoft Systems Limited — 40+ engineers, 150+ projects, 98% on-time delivery.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   STAT CARD
   ═══════════════════════════════════════════════════════════════ */

function StatCard({
  value,
  suffix,
  label,
  icon: Icon,
  index,
  enabled,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  index: number;
  enabled: boolean;
}) {
  const count = useCountUp(value, 2000, enabled);

  return (
    <div
      className="wow animate__fadeInUp flex items-center gap-5 border border-border bg-card p-7"
      data-wow-duration="0.6s"
      data-wow-delay={`${index * 0.1}s`}
    >
      {/* Icon */}
      <div className="flex shrink-0 items-center justify-center bg-primary p-3">
        <span className="flex text-primary-foreground"><Icon size={36} strokeWidth={1.2} /></span>
      </div>

      {/* Number + Label */}
      <div>
        <span className="block text-[34px] font-extrabold leading-none text-foreground">
          {count}
          {suffix}
        </span>
        <p className="mt-1 text-[15px] font-medium text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function AboutSimalNew({
  badge = "About Simal Technologies",
  heading = "Powering the Middle East's",
  subtext,
}: AboutSimalProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  const displaySubtext =
    subtext ||
    "Headquartered in Dubai, UAE, Simal Technologies Middle East LLC is a premier IT distributor delivering enterprise-grade hardware, accessories, and ERP software across the Middle East, Africa, CIS, and GCC regions. With 20+ years of excellence, we bridge global innovation with regional enterprise needs.";

  /* Split heading: last two words become accent */
  const words = heading.trim().split(/\s+/);
  const accented = words.length >= 2 ? words.splice(-2).join(" ") : "";
  const leadText = words.join(" ");

  /* Intersection Observer for counters */
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
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <SectionContainer
      id="about-simal"
      variant="default"
      className="relative overflow-hidden bg-muted"
    >
      {/* ── Subtle dot pattern overlay ─────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">
        {/* ═══════════════════════════════════════════════════════════
            TWO-COLUMN LAYOUT
            ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── LEFT COLUMN: Text Content ────────────────────────── */}
          <div>
            {/* Section label */}
            <span
              className="wow animate__fadeInUp mb-4 inline-block border-l-2 border-primary pl-3 py-1 text-[13px] font-bold uppercase tracking-[0.1em] text-primary"
              data-wow-duration="0.6s"
            >
              {badge}
            </span>

            {/* Heading */}
            <h2
              className="wow animate__fadeInUp mb-5 text-[32px] font-extrabold leading-tight text-foreground"
              data-wow-duration="0.6s"
              data-wow-delay="0.1s"
            >
              {leadText}{" "}
              {accented ? (
                <span className="relative inline-block text-primary">
                  {accented}
                  <span className="absolute bottom-1 left-0 h-[6px] w-full bg-primary opacity-30" />
                </span>
              ) : null}
            </h2>

            {/* Description */}
            <p
              className="wow animate__fadeInUp mb-6 max-w-xl text-[16px] leading-relaxed text-muted-foreground"
              data-wow-duration="0.6s"
              data-wow-delay="0.2s"
            >
              {displaySubtext}
            </p>

            {/* Dual Business Model — two compact bullet rows */}
            <div
              className="wow animate__fadeInUp mb-8 space-y-3"
              data-wow-duration="0.6s"
              data-wow-delay="0.3s"
            >
              {BUSINESS_MODELS.map((bm) => (
                <div key={bm.title} className="flex items-start gap-3">
                  <div className="mt-0.5 flex shrink-0 items-center justify-center bg-primary p-1">
                    <CheckCircle2 size={16} className="text-primary-foreground" />
                  </div>
                  <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                    <strong className="text-foreground">{bm.title}:</strong>{" "}
                    {bm.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Location badge + CTAs */}
            <div
              className="wow animate__fadeInUp flex flex-wrap items-center gap-4"
              data-wow-duration="0.6s"
              data-wow-delay="0.4s"
            >
              {/* Primary CTA — Learn About Us */}
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 bg-primary px-7 py-3.5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Learn About Us
                <ArrowRight size={17} />
              </Link>

              {/* Secondary CTA — Explore ERP */}
              <Link
                href="/erp/overview"
                className="inline-flex items-center gap-2 border-2 border-primary px-6 py-3.5 text-[15px] font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Explore ERP Solutions
              </Link>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-[14px] text-muted-foreground">
                <MapPin size={15} className="text-primary" />
                <span>Dubai, UAE — MEA · CIS · GCC</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Image ──────────────────────────────── */}
          <div
            className="wow animate__fadeInRight relative flex justify-center lg:justify-end"
            data-wow-duration="0.8s"
            data-wow-delay="0.2s"
          >
            {/* Decorative background behind image */}
            <div className="absolute h-[380px] w-[380px] bg-primary/5 blur-[80px]" />

            <div className="relative">
              {/* Main illustration */}
              <div className="relative overflow-hidden">
                <Image
                  src="/assets/images/illustrations/helping-a-partner.svg"
                  alt="Simal Technologies — IT Distribution & ERP Solutions"
                  width={520}
                  height={400}
                  className="relative z-10 h-auto w-full max-w-[520px]"
                  priority
                />
              </div>

              {/* Floating stat badge — top right */}
              <div className="absolute -right-3 -top-3 z-20 border border-border bg-card px-5 py-3">
                <div className="flex items-center gap-2">
                  <Award size={20} className="text-primary" fill="currentColor" />
                  <div>
                    <span className="block text-[20px] font-extrabold leading-none text-foreground">
                      20+
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Years in UAE
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating stat badge — bottom left */}
              <div className="absolute -bottom-2 -left-3 z-20 border border-border bg-card px-5 py-3">
                <div className="flex items-center gap-2">
                  <Globe size={20} className="text-primary" />
                  <div>
                    <span className="block text-[20px] font-extrabold leading-none text-foreground">
                      20+
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Global Brands
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            STATS ROW
            ═══════════════════════════════════════════════════════════ */}
        <div
          ref={statsRef}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
              index={i}
              enabled={statsInView}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
