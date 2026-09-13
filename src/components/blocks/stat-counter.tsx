"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "@/hooks/use-count-up";

interface StatCounterProps {
  /** Numeric target — parsed from the CMS text field (e.g. "24"). */
  value: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Animated number that counts up when scrolled into view.
 * `useCountUp` is rAF-based; falls back to the final value instantly
 * when reduced motion is on (enabled: false).
 */
export function StatCounter({
  value,
  prefix,
  suffix,
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const end = Number.parseInt(String(value).replace(/[^\d.]/g, ""), 10);
  const target = Number.isFinite(end) ? end : 0;
  const display = useCountUp({
    end: target,
    duration: 1800,
    enabled: inView,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      <span className="text-primary">{suffix}</span>
    </span>
  );
}
