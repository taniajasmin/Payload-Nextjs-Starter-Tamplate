import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeStripProps {
  children: ReactNode;
  className?: string;
  /** Track className (the duplicated flex row). */
  trackClassName?: string;
}

/**
 * Seamless horizontal marquee. Children are duplicated so the
 * `marquee-fast` keyframe (translateX 0 → -50%) loops without a seam.
 * Pauses on hover; animates only when the OS allows motion
 * (the `motion-safe:` guard covers prefers-reduced-motion).
 */
export function MarqueeStrip({
  children,
  className,
  trackClassName,
}: MarqueeStripProps) {
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      <div
        className={cn(
          "motion-safe:animate-marquee-fast flex w-max group-hover:[animation-play-state:paused]",
          trackClassName,
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        {/* Duplicate for the seamless loop — aria-hidden, not focusable */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
