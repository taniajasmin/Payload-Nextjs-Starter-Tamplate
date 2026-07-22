"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { mediaUrl } from "@/lib/media-url";
import { cn } from "@/lib/utils";
import { StaggeredTextReveal } from "@/components/home/ui/staggered-text-reveal";
import { MagneticButton } from "@/components/home/ui/magnetic-button";
import type { BrandStory } from "@/lib/computer-components-content";

interface CcBrandStoryProps {
  story: BrandStory;
  /** Flip the two-column layout (alternate per section). */
  reverse: boolean;
  /** 0-based position — drives the editorial index number. */
  index: number;
}

/**
 * One premium, full-width section per brand. A huge product render (scroll
 * parallax + slow float) sits beside the brand story: logo chip, char-reveal
 * tagline, staggered feature bullets, and a "View {brand}" CTA. `reverse`
 * alternates the columns so consecutive sections mirror each other.
 */
export function CcBrandStory({ story, reverse, index }: CcBrandStoryProps) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Parallax: drift the product render as the section scrolls past.
  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const slideX = reverse ? 48 : -48;
  const paddedIndex = String(index + 1).padStart(2, "0");

  const media = (
    <div
      ref={mediaRef}
      className={cn("relative", reverse ? "lg:order-2" : "lg:order-1")}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, x: -slideX }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto flex aspect-square w-full max-w-[34rem] items-center justify-center"
      >
        {/* Accent panel + halo */}
        <div
          className="absolute inset-[8%] bg-primary opacity-90"
          style={{ filter: "saturate(1.05)" }}
        />
        <div
          aria-hidden
          className="absolute inset-[14%] blur-3xl"
          style={{ background: story.glowColor }}
        />

        {/* Decorative index */}
        <span className="absolute left-6 top-4 select-none text-[5rem] font-extrabold leading-none text-white/25 md:text-[7rem]">
          {paddedIndex}
        </span>

        {/* Product render (parallax + float) */}
        <motion.div
          style={reduced ? undefined : { y }}
          className="relative z-10 flex h-full w-full items-center justify-center p-[18%]"
        >
          {story.image ? (
            <motion.img
              src={mediaUrl(story.image)}
              alt={`${story.brand} — ${story.tagline}`}
              className="max-h-full max-w-full object-contain"
              animate={reduced ? undefined : { y: [0, -10, 0] }}
              transition={{
                y: { repeat: Infinity, duration: 4.5 + index * 0.4, ease: "easeInOut" },
              }}
              whileHover={{ scale: 1.04 }}
            />
          ) : (
            // Fallback: brand wordmark when no product image exists.
            <span className="text-center text-3xl font-extrabold uppercase tracking-tight text-white/90 md:text-5xl">
              {story.brand}
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );

  const content = (
    <div className={cn(reverse ? "lg:order-1" : "lg:order-2")}>
      <motion.div
        initial={reduced ? false : { opacity: 0, x: slideX }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Brand chip */}
        <div className="flex items-center gap-3">
          {story.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mediaUrl(story.logo)}
              alt={`${story.brand} logo`}
              className="h-7 w-auto object-contain opacity-80"
            />
          ) : null}
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {story.brand}
          </span>
          {story.productCount > 0 && (
            <span className="border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              {story.productCount} {story.productCount === 1 ? "product" : "products"}
            </span>
          )}
        </div>

        <StaggeredTextReveal
          as="h2"
          splitBy="word"
          stagger={0.06}
          duration={0.8}
          className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-foreground"
        >
          {story.tagline}
        </StaggeredTextReveal>

        <p className="mt-5 max-w-xl text-[length:var(--font-body)] leading-relaxed text-muted-foreground">
          {story.description}
        </p>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {story.bullets.map((bullet, i) => (
            <motion.li
              key={bullet}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
              className="flex items-start gap-2.5 text-sm font-medium text-muted-foreground"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              {bullet}
            </motion.li>
          ))}
        </ul>

        <div className="mt-9">
          <MagneticButton
            href={story.href}
            className="group inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View {story.brand}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
        </div>
      </motion.div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id={story.id}
      className="scroll-mt-24 bg-background"
    >
      <div className="container-primary py-20 md:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {media}
          {content}
        </div>
      </div>
    </section>
  );
}
