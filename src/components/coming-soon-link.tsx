"use client";

import { useState } from "react";
import { ArrowRight, Download } from "lucide-react";

interface ComingSoonLinkProps {
  label: string;
  variant?: "download" | "read";
}

export default function ComingSoonLink({ label, variant = "read" }: ComingSoonLinkProps) {
  const [showToast, setShowToast] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const baseClasses =
    "group/link inline-flex items-center gap-1.5 text-[length:var(--font-body)] font-medium text-primary hover:underline relative";

  return (
    <a href="#" onClick={handleClick} className={baseClasses}>
      {variant === "download" && <Download className="h-3.5 w-3.5" />}
      {label}
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
      {showToast && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground px-3 py-1.5 text-[length:var(--font-caption)] text-background animate-in fade-in slide-in-from-bottom-2">
          Coming soon
        </span>
      )}
    </a>
  );
}
