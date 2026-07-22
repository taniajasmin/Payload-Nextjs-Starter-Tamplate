"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { serviceHref, type ServiceSummary } from "@/lib/services-config";

interface Props {
  /** Sibling services to surface in the in-page sub-nav. */
  items: ServiceSummary[];
}

/**
 * Sticky in-page sub-nav for /solutions/[slug] pages — mirrors the layout of
 * erp-sub-nav. Always leads with an "All Solutions" link back to /solutions.
 */
export function ServicesSubNav({ items }: Props) {
  const pathname = usePathname();

  const links = [
    { href: "/solutions", label: "All Solutions" },
    ...items.map((s) => ({ href: serviceHref(s), label: s.title })),
  ];

  return (
    <nav
      aria-label="Services sections"
      className="border-b border-border bg-background sticky top-0 z-40"
    >
      <div className="container-primary">
        <div className="flex gap-1 overflow-x-auto py-2 no-scrollbar">
          {links.map((item) => {
            // pathname is locale-prefixed (e.g. /en/services/amc), href is not.
            const isActive = pathname.endsWith(item.href);
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`shrink-0 px-4 py-2 text-[length:var(--font-nav-item)] font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
