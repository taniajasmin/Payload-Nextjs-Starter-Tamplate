import React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

interface SectionHeadingProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  tone?: "default" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "default",
  className,
}: SectionHeadingProps) {
  const isLight = tone === "light";
  return (
    <div
      className={cn(
        "mb-10 md:mb-12",
        align === "center" && "flex flex-col items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow tone={isLight ? "light" : "default"} className="mb-3 block">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          "max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl",
          // Light variant sits inside a dark island — keep literal.
          isLight ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <div
          className={cn(
            "mt-4 max-w-2xl text-sm md:text-base leading-relaxed",
            align === "center" && "mx-auto",
            // Light variant sits inside a dark island — keep literal.
            isLight ? "text-slate-300" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}
