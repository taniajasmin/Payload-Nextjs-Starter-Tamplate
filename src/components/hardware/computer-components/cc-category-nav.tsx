"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CategoryNavItem {
  id: string;
  label: string;
}

interface CcCategoryNavProps {
  /** Anchor targets — should match `id`s of sections on the page. */
  items: CategoryNavItem[];
}

/**
 * Sticky in-page category navigation with scroll-spy + a top progress bar.
 *
 * `useScroll()` drives the progress bar; an IntersectionObserver (rootMargin
 * biased to the vertical middle) tracks which section is active. Clicking an
 * item smooth-scrolls to the target and updates the URL hash.
 */
export function CcCategoryNav({ items }: CcCategoryNavProps) {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  // Scroll-spy: highlight the section crossing the viewport middle.
  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-slate-950">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden
        className="h-0.5 origin-left bg-primary"
        style={reduced ? undefined : { scaleX: scrollYProgress }}
      />

      <nav
        aria-label="Component categories"
        className="container-primary"
      >
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto py-3">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative shrink-0 whitespace-nowrap px-4 py-2 text-sm font-semibold transition-colors duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-neutral-400 hover:text-white",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
