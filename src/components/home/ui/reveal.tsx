"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
   Shared scroll-reveal primitives.

   The modern, already-wired equivalent of wow.js: framer-motion
   `whileInView`. All variants fall back to plain rendering (no
   transform / no opacity change) under `prefers-reduced-motion`.
   ────────────────────────────────────────────────────────────────── */

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
} as const;

/** Container that staggers its direct <Reveal> / motion children. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal plays. */
  delay?: number;
  /** Travel distance (px) for the upward fade. */
  y?: number;
  /** Animate only once per session (default true). */
  once?: boolean;
}

/**
 * Single-element scroll reveal. Drop any block inside to make it
 * fade + slide up when scrolled into view.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered container: wraps a list of <Reveal> items so they animate
 * in sequence. Children must use `variants={fadeUp}` (or be a <Reveal>).
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}
