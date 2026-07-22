"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  Cpu,
  Cable,
  Monitor,
  Gamepad2,
  Laptop,
  LayoutList,
} from "lucide-react";

const navItems = [
  { href: "/hardware/product-catalog", label: "Product Catalog", icon: Package, anchor: null, filter: null },
  { label: "All Products", icon: LayoutList, anchor: null, filter: "all" },
  { label: "Computer Components", icon: Cpu, anchor: "computer-components", filter: "computer-components" },
  { label: "Computer Accessories", icon: Cable, anchor: "computer-accessories", filter: "computer-accessories" },
  { label: "Monitors", icon: Monitor, anchor: "monitors", filter: "monitors" },
  { label: "Gaming", icon: Gamepad2, anchor: "gaming", filter: "gaming" },
  { label: "Laptops", icon: Laptop, anchor: "laptops", filter: "laptops" },
];

interface HardwareSubNavProps {
  activeFilter?: string | null;
  onFilterChange?: (filter: string | null) => void;
}

export function HardwareSubNav({ activeFilter, onFilterChange }: HardwareSubNavProps) {
  const pathname = usePathname();
  const isCatalogPage = pathname === "/hardware/product-catalog";
  const isFilterMode = isCatalogPage && onFilterChange !== undefined;

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string | null) => {
    if (!anchor) return;
    e.preventDefault();
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${anchor}`);
    }
  };

  return (
    <nav
      aria-label="Hardware sections"
      className="sticky top-0 z-40 border-b border-border bg-background"
    >
      <div className="container-primary">
        <div className="flex gap-1.5 overflow-x-auto py-3 no-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isFiltered = isFilterMode && item.filter === activeFilter;
            const Icon = item.icon;

            // Filter mode on catalog page: category items act as filters
            if (isFilterMode && item.filter) {
              return (
                <button
                  key={item.filter}
                  onClick={() => onFilterChange?.(item.filter === "all" ? null : item.filter)}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap ${
                    isFiltered || (item.filter === "all" && !activeFilter)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            }

            // On catalog page without filter: use anchor links for category sections
            if (isCatalogPage && item.anchor && !isFilterMode) {
              return (
                <a
                  key={item.anchor}
                  href={`#${item.anchor}`}
                  onClick={(e) => handleAnchorClick(e, item.anchor)}
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </a>
              );
            }

            // Regular navigation links
            if (!item.href) return null;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
