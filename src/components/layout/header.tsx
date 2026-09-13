"use client";

import { useState } from "react";
import Link from "next/link";
import { mediaUrl } from "@/lib/media-url";
import { usePathname } from "@/i18n/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

/* ------------------------------------------------------------------
   Types
   ------------------------------------------------------------------ */
interface CMSNavChild {
  label?: string;
  link?: string;
  status?: string;
}

interface CMSNavItem {
  label?: string;
  link?: string;
  status?: string;
  hasDropdown?: boolean;
  children?: CMSNavChild[];
}

interface CMSHeaderData {
  logo?: { url?: string; alt?: string } | null;
  utilityBar?: {
    phone?: string;
    email?: string;
  };
  ctaButton?: {
    label?: string;
    href?: string;
    show?: boolean;
  };
  navItems?: CMSNavItem[];
}

/* ------------------------------------------------------------------
   Fallback navigation (shown when CMS has no data)
   ------------------------------------------------------------------ */
const fallbackNav: CMSNavItem[] = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about" },
  { label: "Contact", link: "/contact" },
];

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */
export function Header({
  cmsData,
}: {
  cmsData?: Record<string, unknown> | undefined;
}) {
  const data = (cmsData || {}) as CMSHeaderData;
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems =
    data.navItems && data.navItems.length > 0 ? data.navItems : fallbackNav;
  const publishedItems = navItems.filter((item) => item.status !== "draft");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          {data.logo?.url ? (
            <img
              src={mediaUrl(data.logo.url)}
              alt={data.logo.alt || "Logo"}
              className="h-8 w-auto"
            />
          ) : (
            <span className="text-foreground">Hi-Tech Farming</span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {publishedItems.map((item, i) => (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label || null)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.hasDropdown && item.children ? (
                <>
                  <button
                    className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      openDropdown === item.label
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-48 rounded-lg border border-border bg-card shadow-lg py-1">
                      {item.children
                        .filter((c) => c.status !== "draft")
                        .map((child, j) => (
                          <Link
                            key={j}
                            href={child.link || "#"}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.link || "#"}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === item.link
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* CTA button */}
          {data.ctaButton?.show && data.ctaButton.label && data.ctaButton.href && (
            <Link
              href={data.ctaButton.href}
              className="ml-3 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {data.ctaButton.label}
            </Link>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {publishedItems.map((item, i) => (
              <div key={i}>
                {item.hasDropdown && item.children ? (
                  <details className="group">
                    <summary className="py-2 text-sm font-medium text-foreground cursor-pointer list-none">
                      {item.label}
                    </summary>
                    <div className="ml-3 mt-1 flex flex-col">
                      {item.children
                        .filter((c) => c.status !== "draft")
                        .map((child, j) => (
                          <Link
                            key={j}
                            href={child.link || "#"}
                            className="py-1.5 text-sm text-muted-foreground hover:text-foreground"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    href={item.link || "#"}
                    className={`block py-2 text-sm font-medium ${
                      pathname === item.link
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            {data.ctaButton?.show && data.ctaButton.label && data.ctaButton.href && (
              <Link
                href={data.ctaButton.href}
                className="mt-3 px-4 py-2 text-sm font-semibold text-center rounded-lg bg-primary text-primary-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {data.ctaButton.label}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
