"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const navItems = [
  { href: "/resources/blog", label: "Blog & News" },
  { href: "/resources/faq", label: "FAQ" },
];

function ResourcesSubNavInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  if (isPreview) return null;

  return (
    <nav
      aria-label="Resources sections"
      className="border-b border-border bg-background sticky top-0 z-30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 px-5 py-2 text-sm font-semibold transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
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

export function ResourcesSubNav() {
  return (
    <Suspense fallback={null}>
      <ResourcesSubNavInner />
    </Suspense>
  );
}
