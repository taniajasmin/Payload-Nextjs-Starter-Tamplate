"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { NavItemChild } from "./navigation-data";

interface MegaMenuProps {
  items: NavItemChild[] | undefined;
  isOpen: boolean;
  category: string;
  shouldReduceMotion: boolean | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onNavigate?: () => void;
}

export function MegaMenu({
  items,
  isOpen,
  category,
  shouldReduceMotion,
  onMouseEnter,
  onMouseLeave,
  onNavigate,
}: MegaMenuProps) {
  if (!items || items.length === 0) return null;

  const duration = shouldReduceMotion ? "duration-0" : "duration-200";

  return (
    <div
      className={`absolute top-full left-0 w-full z-40 transition-opacity ${duration} ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="navigation"
      aria-label={`${category} mega menu`}
    >
      <div className="relative bg-popover border-b border-border">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-9 sm:pt-9 sm:pb-10 max-h-[50dvh] overflow-y-auto scrollbar-hide">
          <MegaMenuPanels items={items} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

/* ─── Section-grouped rendering ─────────────────────────────────── */

function MegaMenuPanels({
  items,
  onNavigate,
}: {
  items: NonNullable<NavItemChild[]>;
  onNavigate?: () => void;
}) {
  const groups: { title: string | null; items: NonNullable<NavItemChild[]> }[] = [];
  for (const item of items) {
    const title = item.section ?? null;
    const last = groups[groups.length - 1];
    if (last && last.title === title) {
      last.items.push(item);
    } else {
      groups.push({ title, items: [item] });
    }
  }

  const multiColumn = groups.length > 1;

  return (
    <div
      className={
        multiColumn
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          : ""
      }
    >
      {groups.map((group, gi) => {
        const viewAllItem = group.items.find((i) => i.kind === "viewAll");
        const regularItems = group.items.filter((i) => i.kind !== "viewAll");
        if (regularItems.length === 0 && !viewAllItem) return null;

        const groupKind = regularItems[0]?.kind ?? "link";
        const hasHeader = !!group.title || !!viewAllItem;

        return (
          <div key={`${group.title ?? "default"}-${gi}`} className="min-w-0">
            {hasHeader && (
              <div className="mb-3 border-b border-border pb-2 flex items-center gap-2">
                {group.title && (
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {group.title}
                  </h3>
                )}
                {group.title && viewAllItem && (
                  <span className="text-[11px] text-border select-none">|</span>
                )}
                {viewAllItem && (
                  <Link
                    href={viewAllItem.href}
                    onClick={onNavigate}
                    className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary/70 hover:text-primary transition-colors duration-150"
                  >
                    {viewAllItem.label}
                  </Link>
                )}
              </div>
            )}
            {regularItems.length > 0 &&
              (groupKind === "brand" ? (
                <BrandGrid items={regularItems} onNavigate={onNavigate} />
              ) : (
                <LinkGrid
                  items={regularItems}
                  singleColumn={multiColumn}
                  onNavigate={onNavigate}
                />
              ))}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Standard link grid ────────────────────────────────────────── */

function LinkGrid({
  items,
  singleColumn = false,
  onNavigate,
}: {
  items: NonNullable<NavItemChild[]>;
  singleColumn?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div
      className={
        singleColumn
          ? "grid grid-cols-1 gap-1"
          : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1"
      }
    >
      {items.map((child, idx) => {
        const Icon = child.icon ?? ArrowRight;
        const color = child.iconColor;
        return (
          <Link
            key={`${child.href}-${idx}`}
            href={child.href}
            onClick={onNavigate}
            className="group flex items-start gap-3 px-3 py-2.5 hover:bg-muted transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
          >
            <div className="shrink-0 w-9 h-9 flex items-center justify-center border border-border/60 bg-card group-hover:border-primary/40 transition-colors duration-150">
              <Icon
                className={`w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-150 ${color?.icon ?? ""}`}
              />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <span className="text-[length:var(--font-nav-item)] font-semibold text-foreground group-hover:text-primary transition-colors duration-150">
                {child.label}
              </span>
              {child.description && (
                <p className="mt-0.5 text-[length:var(--font-body)] text-muted-foreground leading-relaxed line-clamp-2">
                  {child.description}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/* ─── Brand logo grid ───────────────────────────────────────────── */

function BrandGrid({
  items,
  onNavigate,
}: {
  items: NonNullable<NavItemChild[]>;
  onNavigate?: () => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-2">
      {items.map((brand, idx) => (
        <Link
          key={`${brand.href}-${idx}`}
          href={brand.href}
          onClick={onNavigate}
          title={brand.label}
          className="group flex aspect-[3/2] items-center justify-center border border-border bg-card p-2 transition-colors duration-150 hover:border-primary/40 hover:bg-muted/50"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brand.brandLogo}
            alt={`${brand.label} logo`}
            loading="lazy"
            className="max-h-8 max-w-full object-contain opacity-70 transition-opacity duration-150 group-hover:opacity-100"
          />
        </Link>
      ))}
    </div>
  );
}

/* ─── Simple dropdown (narrow, single-column, anchored under parent) */

export function SimpleDropdown({
  items,
  isOpen,
  category,
  shouldReduceMotion,
  onMouseEnter,
  onMouseLeave,
  onNavigate,
}: {
  items: NavItemChild[] | undefined;
  isOpen: boolean;
  category: string;
  shouldReduceMotion: boolean | null;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onNavigate?: () => void;
}) {
  if (!items || items.length === 0) return null;

  const duration = shouldReduceMotion ? "duration-0" : "duration-200";

  return (
    <div
      className={`absolute top-full left-0 pt-2 z-50 transition-opacity ${duration} ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="navigation"
      aria-label={`${category} menu`}
    >
      <div className="relative w-[18rem] border border-border bg-popover overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" />
        <ul className="py-1 max-h-[calc(100dvh-7rem)] overflow-y-auto scrollbar-hide">
          {items.map((child, idx) => {
            const Icon = child.icon ?? ArrowRight;
            const color = child.iconColor;
            return (
              <li key={`${child.href}-${idx}`}>
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  className="group flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                >
                  <div className="shrink-0 w-8 h-8 flex items-center justify-center border border-border/60 bg-card group-hover:border-primary/40 transition-colors duration-150">
                    <Icon
                      className={`w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors duration-150 ${color?.icon ?? ""}`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[length:var(--font-nav-item)] font-semibold text-foreground group-hover:text-primary transition-colors duration-150">
                      {child.label}
                    </span>
                    {child.description && (
                      <p className="mt-0.5 text-[length:var(--font-body)] text-muted-foreground leading-relaxed line-clamp-1">
                        {child.description}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
