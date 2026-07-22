"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { Reveal } from "@/components/home/ui/reveal";
import { StaggeredTextReveal } from "@/components/home/ui/staggered-text-reveal";
import {
  WHY_CHOOSE_STATS,
  WHY_CHOOSE_POINTS,
  type WhyChooseStat,
} from "@/lib/computer-components-content";

function Stat({ stat, index }: { stat: WhyChooseStat; index: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp({ end: stat.value, duration: 2000, enabled: inView });

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-none text-white">
        {count}
        {stat.suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-neutral-400">{stat.label}</div>
    </motion.div>
  );
}

/** Dark closing argument: count-up stats + warranty/support guarantees. */
export function CcWhyChooseUs() {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_80%_0%,rgba(40,111,180,0.3),transparent_70%)]"
      />
      <div className="container-primary relative py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Official distributor
            </p>
          </Reveal>
          <StaggeredTextReveal
            as="h2"
            splitBy="word"
            className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight"
          >
            Why build with Simal
          </StaggeredTextReveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-3 gap-6 border-y border-white/10 py-12">
          {WHY_CHOOSE_STATS.map((stat, i) => (
            <Stat key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        <ul className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          {WHY_CHOOSE_POINTS.map((point, i) => (
            <motion.li
              key={point}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-3 border border-white/10 bg-white/[0.04] px-5 py-4"
            >
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center bg-primary">
                <Check className="h-4 w-4 text-primary-foreground" strokeWidth={3} />
              </span>
              <span className="text-sm font-medium text-neutral-200">{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
