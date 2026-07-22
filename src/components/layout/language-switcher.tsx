"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown, Check } from "lucide-react";
import { languages } from "./navigation-data";

const switcherLanguages = languages.filter((l) => l.code === "en" || l.code === "ar");

/**
 * Locale picker for the site locales (en/ar).
 * Used in the header utility bar (tone="dark") and at the bottom of the
 * mobile drawer (tone="light").
 */
export function LanguageSwitcher({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const locale = useLocale() as string;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const current = switcherLanguages.find((l) => l.code === locale) ?? switcherLanguages[0];

  const choose = (code: string) => {
    setOpen(false);
    if (code === locale) return;
    router.push(pathname, { locale: code });
  };

  const triggerHover =
    tone === "dark" ? "hover:text-white" : "hover:text-foreground";
  const triggerText = tone === "dark" ? "" : "text-foreground";
  const ringClass =
    tone === "dark"
      ? "focus-visible:ring-white/50"
      : "focus-visible:ring-ring";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded px-1 py-0.5 transition-colors focus:outline-none focus-visible:ring-2 ${triggerText} ${triggerHover} ${ringClass}`}
        aria-label={`Change language. Current: ${current.label}`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="font-semibold uppercase">{current.code}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-44 overflow-hidden rounded-md border border-border bg-popover py-1 text-popover-foreground"
          >
            {switcherLanguages.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  onClick={() => choose(l.code)}
                  className={`flex w-full items-center justify-between px-3 py-1.5 text-xs hover:bg-muted ${
                    l.code === locale ? "font-semibold text-primary" : ""
                  }`}
                >
                  <span>{l.label}</span>
                  {l.code === locale && <Check className="h-3 w-3" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
