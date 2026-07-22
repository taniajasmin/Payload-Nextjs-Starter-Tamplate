"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Package } from "lucide-react";
import Link from "next/link";
import { StaggeredTextReveal } from "@/components/home/ui/staggered-text-reveal";
import { MagneticButton } from "@/components/home/ui/magnetic-button";
import { useMouseLighting } from "@/hooks/use-mouse-lighting";
import { HERO_COPY } from "@/lib/computer-components-content";

// three.js particle field — client-only, lazy.
const ThreeParticleBackground = dynamic(
  () => import("@/components/home/effects/three-particle-background"),
  { ssr: false, loading: () => <div className="absolute inset-0" /> },
);

/** Subtle PCB / motherboard trace overlay drawn in SVG. */
function CircuitTraces() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full text-[#1f6fb8]/25"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M0 120 H320 V240 H640 V80 H960 V320 H1200" />
        <path d="M0 420 H260 V300 H560 V480 H880 V200 H1200" />
        <path d="M120 0 V160 H240 V600" />
        <path d="M760 0 V120 H880 V600" />
        <path d="M480 600 V360 H600 V0" />
      </g>
      <g fill="currentColor">
        {[320, 640, 960, 260, 880, 600].map((x, i) => (
          <circle key={i} cx={x} cy={[240, 80, 320, 300, 200, 360][i]} r="3.5" />
        ))}
      </g>
    </svg>
  );
}

export function CcHero({ sub }: { sub?: string }) {
  const reduced = useReducedMotion();
  const { containerRef } = useMouseLighting();
  const heroSub = sub ?? HERO_COPY.sub;

  return (
    <section
      ref={containerRef}
      className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-slate-950 text-white"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
        } as React.CSSProperties
      }
    >
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,#153D68_0%,#0F2D4E_35%,#0a0f1a_75%,#07090f_100%)]" />
      <ThreeParticleBackground />
      <CircuitTraces />

      {/* Cursor-following glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(38% 38% at var(--mouse-x) var(--mouse-y), rgba(40,111,180,0.45), transparent 70%)",
        }}
      />

      {/* Bottom fade into the page */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />

      <div className="container-primary relative z-10 py-24 md:py-32">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
        >
          {HERO_COPY.eyebrow}
        </motion.div>

        <h1 className="mt-6 font-extrabold leading-[0.95] tracking-tight">
          {HERO_COPY.lines.map((line, i) => (
            <StaggeredTextReveal
              key={line}
              as="span"
              splitBy="word"
              stagger={0.08}
              duration={0.9}
              delay={i * 0.12}
              className="block text-[clamp(2.75rem,8vw,5.5rem)]"
            >
              {line}
            </StaggeredTextReveal>
          ))}
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-7 max-w-2xl text-[length:var(--font-body)] leading-relaxed text-neutral-300"
        >
          {heroSub}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href={HERO_COPY.primaryCta.href}
            className="group inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {HERO_COPY.primaryCta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton
            href={HERO_COPY.secondaryCta.href}
            className="group inline-flex items-center gap-2 border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Package className="h-4 w-4" />
            {HERO_COPY.secondaryCta.label}
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <Link
        href="#brands"
        aria-label="Scroll to components"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60 transition-colors hover:text-white"
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.span>
      </Link>
    </section>
  );
}
