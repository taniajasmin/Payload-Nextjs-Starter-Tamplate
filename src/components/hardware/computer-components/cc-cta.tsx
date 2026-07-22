"use client";

import { ArrowRight, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "@/components/home/ui/magnetic-button";
import { StaggeredTextReveal } from "@/components/home/ui/staggered-text-reveal";
import { Reveal } from "@/components/home/ui/reveal";
import { CTA_COPY } from "@/lib/computer-components-content";

/** Final call-to-action band. */
export function CcCta() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      {/* subtle glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 120%, rgba(40,111,180,0.4), transparent 70%)",
        }}
        animate={reduced ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-primary relative py-24 text-center md:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {CTA_COPY.eyebrow}
          </p>
        </Reveal>

        <StaggeredTextReveal
          as="h2"
          splitBy="word"
          className="mx-auto mt-5 max-w-3xl text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-[1.02] tracking-tight"
        >
          {CTA_COPY.title}
        </StaggeredTextReveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-[length:var(--font-body)] leading-relaxed text-neutral-300">
            {CTA_COPY.sub}
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href={CTA_COPY.primaryCta.href}
              className="group inline-flex items-center gap-2 bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {CTA_COPY.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              href={CTA_COPY.secondaryCta.href}
              className="group inline-flex items-center gap-2 border border-white/20 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              {CTA_COPY.secondaryCta.label}
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
