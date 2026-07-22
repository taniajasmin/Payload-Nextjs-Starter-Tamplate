"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTitleFrameProps {
  children: ReactNode;
  className?: string;
  variant?: "prism" | "brand" | "subtle" | "compact";
  padding?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
  animated?: boolean;
}

const paddingMap: Record<Required<GradientTitleFrameProps>["padding"], string> =
  {
    sm: "px-4 py-2 md:px-5 md:py-2.5",
    md: "px-5 py-2.5 md:px-7 md:py-3",
    lg: "px-6 py-3 md:px-9 md:py-4",
  };

export function GradientTitleFrame({
  children,
  className,
  padding = "md",
  align = "center",
}: GradientTitleFrameProps) {
  return (
    <div
      className={cn(
        "relative inline-block",
        paddingMap[padding],
        align === "center" && "mx-auto",
        align === "right" && "ml-auto",
        className,
      )}
    >
      {children}
    </div>
  );
}
