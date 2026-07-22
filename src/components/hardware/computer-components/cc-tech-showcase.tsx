"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { StaggeredTextReveal } from "@/components/home/ui/staggered-text-reveal";
import { TECH_SHOWCASE_ITEMS, type TechShowcaseItem } from "@/lib/computer-components-content";

const ACCENT: Record<TechShowcaseItem["accent"], string> = {
  primary: "text-primary",
  teal: "text-primary",
  pink: "text-primary",
};

function TechItem({ item, index }: { item: TechShowcaseItem; index: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const accent = ACCENT[item.accent];
  const slideX = item.reverse ? 40 : -40;

  const title = (
    <div className={cn(item.reverse ? "lg:order-2" : "lg:order-1")}>
      <StaggeredTextReveal
        as="h3"
        splitBy="char"
        stagger={0.04}
        duration={0.9}
        className="text-[clamp(3rem,9vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight text-white"
      >
        {item.title}
      </StaggeredTextReveal>
    </div>
  );

  const body = (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: slideX }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(item.reverse ? "lg:order-1" : "lg:order-2")}
    >
      <p className={cn("text-xs font-semibold uppercase tracking-[0.25em]", accent)}>
        {item.eyebrow}
      </p>
      <p className="mt-4 text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold leading-snug text-white">
        {item.highlight}
      </p>
      <p className="mt-4 max-w-md text-[length:var(--font-body)] leading-relaxed text-neutral-400">
        {item.copy}
      </p>
    </motion.div>
  );

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border-t border-white/5 py-20 md:py-28"
    >
      {/* giant faded index */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 top-4 select-none text-[12rem] font-extrabold leading-none text-white/[0.03] md:text-[18rem]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="container-primary relative">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {title}
          {body}
        </div>
      </div>
    </div>
  );
}

/** Large-typography technology story (PCIe Gen5 / DDR5 / NVMe). */
export function CcTechShowcase() {
  return (
    <section id="tech" className="scroll-mt-24 bg-slate-950 text-white">
      <div className="container-primary pt-20 text-center md:pt-28">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
          Under the hood
        </p>
        <StaggeredTextReveal
          as="h2"
          splitBy="word"
          className="mx-auto mt-4 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight"
        >
          The technology inside
        </StaggeredTextReveal>
      </div>
      {TECH_SHOWCASE_ITEMS.map((item, i) => (
        <TechItem key={item.title} item={item} index={i} />
      ))}
    </section>
  );
}
