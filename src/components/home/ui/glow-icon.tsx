"use client";

import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type GlowColor =
  | "teal"
  | "pink"
  | "blue"
  | "gold"
  | "orange"
  | "green"
  | "purple";

const COLOR_MAP: Record<GlowColor, { wrap: string; icon: string }> = {
  teal: { wrap: "bg-primary text-primary-foreground", icon: "text-primary-foreground" },
  pink: { wrap: "bg-primary text-primary-foreground", icon: "text-primary-foreground" },
  blue: { wrap: "bg-primary text-primary-foreground", icon: "text-primary-foreground" },
  gold: { wrap: "bg-primary text-primary-foreground", icon: "text-primary-foreground" },
  orange: { wrap: "bg-primary text-primary-foreground", icon: "text-primary-foreground" },
  green: { wrap: "bg-primary text-primary-foreground", icon: "text-primary-foreground" },
  purple: { wrap: "bg-primary text-primary-foreground", icon: "text-primary-foreground" },
};

interface GlowIconProps {
  icon: LucideIcon;
  color?: GlowColor;
  /** Icon glyph size in px (default 22). */
  size?: number;
  /** Extra classes on the wrapper (e.g. sizing). */
  className?: string;
  /** Extra classes on the icon glyph itself. */
  iconClassName?: string;
  /** Slow breathing glow animation. */
  pulse?: boolean;
}

export function GlowIcon({
  icon: Icon,
  color = "blue",
  size = 22,
  className,
  iconClassName,
  pulse = false,
}: GlowIconProps) {
  const c = COLOR_MAP[color];
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        c.wrap,
        pulse && "animate-pulse-glow",
        "w-11 h-11",
        className,
      )}
    >
      <Icon
        aria-hidden
        className={cn(c.icon, iconClassName)}
        style={{ width: size, height: size }}
        strokeWidth={2}
      />
    </span>
  );
}
