"use client";

import React, { useRef } from "react";
import { RefreshCw, Users, Sliders, ArrowRight, CalendarCheck, UserCheck, Crown } from "lucide-react";
import { BlurToFocus } from "@/components/home/effects/blur-to-focus";
import { StaggeredTextReveal } from "@/components/home/ui/staggered-text-reveal";

/* ─── Types ─────────────────────────────────────────────────────── */

interface WhyChooseUsStatsProps {
  badge?: string;
  heading?: string;
  subtext?: string;
}

/* ─── Defaults ──────────────────────────────────────────────────── */

const DEFAULT_BADGE = "Why Choose Us";
const DEFAULT_HEADING =
  "Your Trusted Partner in Quality, Performance, and Reliable Storage Solutions";
const DEFAULT_SUBTEXT =
  "We deliver high-quality memory, storage, and SSD solutions, combining performance, reliability, and innovation to meet your technology needs.";

/* ─── Pillar cards data ─────────────────────────────────────────── */

const PILLARS = [
  {
    icon: RefreshCw,
    title: "Seamless Process",
    description:
      "From consultation to delivery, we ensure a smooth, efficient workflow to meet your technology requirements.",
    tag: "end-to-end",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description:
      "Our experienced team is committed to providing personalized support and innovative solutions for your business.",
    tag: "expert support",
  },
  {
    icon: Sliders,
    title: "Custom Solutions",
    description:
      "We offer tailored storage and memory solutions that align with your unique business goals and technical needs.",
    tag: "tailored for you",
  },
];

/* ─── Stats data ────────────────────────────────────────────────── */

const STATS = [
  {
    value: "23+",
    label: "Years Of Experience",
    sublabel: "In The Industry",
    icon: CalendarCheck,
    footnote: "Since 2002",
  },
  {
    value: "1,900+",
    label: "Clients Served",
    sublabel: "Since 2002",
    icon: UserCheck,
    footnote: "Trusted globally",
  },
  {
    value: "17",
    label: "Brands Owned",
    sublabel: "Premium Portfolio",
    icon: Crown,
    footnote: "Leading manufacturers",
  },
];

/* ─── Component ─────────────────────────────────────────────────── */

export default function WhyChooseUsStatsNew({
  badge,
  heading,
  subtext,
}: WhyChooseUsStatsProps) {
  const containerRef = useRef<HTMLElement>(null);

  const displayBadge = badge || DEFAULT_BADGE;
  const displayHeading = heading || DEFAULT_HEADING;
  const displaySubtext = subtext || DEFAULT_SUBTEXT;

  return (
    <section
      id="why-choose-us-stats"
      ref={containerRef}
      className="relative pt-[clamp(44px,calc(var(--section-gap-y)+5vh),76px)] pb-[clamp(22px,calc(var(--section-gap-y)*0.5+2.5vh),38px)] overflow-hidden bg-background"
    >
      <div className="container-primary relative z-10">
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BlurToFocus>
            {/* Badge pill */}
            <div className="inline-flex items-center gap-2.5 border border-primary/20 bg-primary/5 px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
              <span className="text-[length:var(--font-section-label)] font-bold uppercase tracking-widest text-primary">
                {displayBadge}
              </span>
            </div>

            {/* Heading */}
            <StaggeredTextReveal
              as="h2"
              splitBy="word"
              stagger={0.04}
              y={40}
              className="text-[length:var(--font-heading)] font-extrabold tracking-tight leading-[1.12] text-foreground"
            >
              {displayHeading}
            </StaggeredTextReveal>

            {/* Subtext */}
            <p className="mt-5 text-[length:var(--font-body)] leading-relaxed max-w-2xl mx-auto text-muted-foreground">
              {displaySubtext}
            </p>
          </BlurToFocus>
        </div>

        {/* ── 3 Value Pillar Cards ────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {PILLARS.map((pillar, idx) => (
            <BlurToFocus key={pillar.title} delay={idx * 0.1}>
              <div className="group border border-border bg-card p-8 md:p-9 transition-colors hover:border-primary/50">
                <div className="flex flex-col items-start">
                  {/* Icon */}
                  <div className="w-14 h-14 flex items-center justify-center mb-5 bg-primary text-primary-foreground">
                    <pillar.icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-semibold mb-2.5 text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>

                  {/* Tag link */}
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary">
                    <span>{pillar.tag}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </BlurToFocus>
          ))}
        </div>

        {/* ── Statistics Row ──────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {STATS.map((stat, idx) => (
            <BlurToFocus key={stat.label} delay={0.1 + idx * 0.1}>
              <div className="group border border-border bg-card p-8 md:p-10 text-center transition-colors hover:border-primary/50">
                {/* Stat number */}
                <div className="flex items-center justify-center mb-3">
                  <span className="text-5xl md:text-6xl font-extrabold text-primary">
                    {stat.value}
                  </span>
                </div>

                <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-xs mt-2 text-muted-foreground/70">
                  {stat.sublabel}
                </p>

                {/* Divider */}
                <div className="w-12 h-0.5 mx-auto mt-4 bg-primary/30" />

                {/* Footnote with icon */}
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary">
                  <stat.icon className="w-3 h-3" />
                  <span>{stat.footnote}</span>
                </div>
              </div>
            </BlurToFocus>
          ))}
        </div>
      </div>
    </section>
  );
}
