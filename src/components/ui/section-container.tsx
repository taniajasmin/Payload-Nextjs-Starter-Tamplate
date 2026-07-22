import React from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  innerClassName?: string;
  // Forwarded to the underlying `<section>` so callers can attach a ref
  // (e.g. for framer-motion `useScroll({ target })`). Without this, a passed
  // ref is silently dropped and motion throws "Target ref is defined but not
  // hydrated" because `ref.current` never gets set.
  ref?: React.Ref<HTMLElement>;
  variant?: "default" | "light" | "dark" | "muted" | "gradient" | "primary";
  size?: "primary" | "secondary";
  withNoise?: boolean;
  withGrid?: boolean;
}

export function SectionContainer({
  children,
  className = "",
  id,
  innerClassName = "",
  ref,
  variant = "default",
  size = "primary",
  withNoise = false,
  withGrid = false,
}: SectionContainerProps) {
  const variantClasses = {
    default: "bg-background",
    light: "bg-muted",
    dark: "bg-slate-950 text-white",
    muted: "bg-muted",
    gradient: "bg-muted",
    primary: "bg-primary text-primary-foreground",
  };

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative py-[var(--section-gap-y)] overflow-hidden",
        variantClasses[variant],
        className
      )}
    >
      {withGrid && (
        <div className="absolute inset-0 dot-grid-pattern opacity-30 pointer-events-none" />
      )}
      {withNoise && <div className="absolute inset-0 noise-overlay pointer-events-none" />}
      <div
        className={cn(
          "relative z-10",
          size === "secondary" ? "container-secondary" : "container-primary",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
