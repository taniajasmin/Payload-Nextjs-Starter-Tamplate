"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const navItems = [
  { href: "/resources/blog", label: "Blog & News" },
  { href: "/resources/faq", label: "FAQ" },
];

function CompanySubNavInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  if (isPreview) return null;

  return (
    <nav
      aria-label="Company sections"
      className="border-b border-border bg-background"
    >
      <div className="container-primary">
        <div className="flex gap-1 overflow-x-auto py-2 no-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
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

export function CompanySubNav() {
  return (
    <Suspense fallback={null}>
      <CompanySubNavInner />
    </Suspense>
  );
}
