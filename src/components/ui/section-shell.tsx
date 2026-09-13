import React from "react";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  ref?: React.Ref<HTMLElement>;
  variant?: "default" | "muted" | "dark";
  container?: "default" | "narrow";
}

const variantClasses: Record<
  NonNullable<SectionShellProps["variant"]>,
  string
> = {
  default: "bg-background text-foreground",
  muted: "bg-muted text-foreground",
  // Intentional dark island — do not token-swap (see migration plan).
  dark: "bg-slate-950 text-white",
};

export function SectionShell({
  children,
  className,
  innerClassName,
  id,
  ref,
  variant = "default",
  container = "default",
}: SectionShellProps) {
  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "py-16 md:py-20 lg:py-24",
        variantClasses[variant],
        className,
      )}
    >
      <div
        className={cn(
          "container mx-auto px-4 sm:px-6 lg:px-8",
          container === "narrow" && "max-w-5xl",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
