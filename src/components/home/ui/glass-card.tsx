"use client";

import { type ReactNode, type ElementType, createElement } from "react";
import { cn } from "@/lib/utils";

/* Enterprise flat card — replaces the former GlassCard. */

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Render as a different element (default "div" — pass `Link` for a clickable card). */
  as?: ElementType;
  /** Extra props forwarded to the rendered element (e.g. `href` for a Link). */
  [key: string]: unknown;
}

export function GlassCard({
  children,
  className,
  as: Tag = "div",
  ...rest
}: GlassCardProps) {
  return createElement(
    Tag,
    {
      className: cn(
        "relative overflow-hidden border border-border bg-card",
        className,
      ),
      ...rest,
    },
    children,
  );
}
