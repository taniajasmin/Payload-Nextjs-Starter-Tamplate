"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

const navItems = [
  { href: "/about", label: "Company" },
  { href: "/about/leadership", label: "Leadership" },
  { href: "/about/mission-vision", label: "Mission, Vision & Values" },
  { href: "/about/awards", label: "Awards & Certifications" },
  { href: "/about/csr", label: "CSR & Sustainability" },
] as const;

function AboutSubNavInner() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  useEffect(() => {
    navItems.forEach((item) => router.prefetch(item.href));
  }, [router]);

  if (isPreview) return null;

  return (
    <nav
      aria-label="About sections"
      className="border-b border-border bg-background sticky top-0 z-30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto py-3">
          {navItems.map((item) => {
            const isActive =
              item.href === "/about"
                ? pathname === "/about"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
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

export function AboutSubNav() {
  return (
    <Suspense fallback={null}>
      <AboutSubNavInner />
    </Suspense>
  );
}
