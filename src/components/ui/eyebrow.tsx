import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "light";
}

export function Eyebrow({
  children,
  className,
  tone = "default",
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}
