"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Phone, Mail, X, Search } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { type NavItem, type NavItemChild } from "./navigation-data";
import { LanguageSwitcher } from "./language-switcher";

/* Inline WhatsApp icon */
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  shouldReduceMotion: boolean | null;
}

/* ─── Single nav item (top-level) ───────────────────────────────── */

function MobileNavItem({
  item,
  onNavigate,
  shouldReduceMotion,
}: {
  item: NavItem;
  onNavigate: () => void;
  shouldReduceMotion: boolean | null;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const dur = shouldReduceMotion ? "duration-0" : "duration-300";

  return (
    <li>
      <div
        className={`flex items-center border-b border-border ${
          hasChildren ? "border-l-[3px] border-l-primary" : ""
        }`}
      >
        <Link
          href={item.href}
          onClick={onNavigate}
          className={`flex-1 py-3.5 text-sm font-semibold text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
            hasChildren ? "pl-[17px] pr-5" : "px-5"
          }`}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center justify-center min-w-[48px] min-h-[48px] border-l border-border text-muted-foreground hover:text-primary hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            aria-expanded={expanded}
            aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${dur} ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>

      {/* Children — grouped by section, CSS grid-rows animation */}
      {hasChildren && (
        <div
          className={`grid transition-[grid-template-rows] ${dur} ease-out ${
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="bg-muted/30 border-b border-border">
              {(() => {
                const groups: { title: string | null; items: NavItemChild[] }[] = [];
                for (const child of item.children!) {
                  const section = child.section ?? null;
                  const last = groups[groups.length - 1];
                  if (last && last.title === section) {
                    last.items.push(child);
                  } else {
                    groups.push({ title: section, items: [child] });
                  }
                }
                const showSections = groups.length > 1 || groups[0]?.title !== null;

                return groups.map((group, gi) => (
                  <div key={group.title ?? `_${gi}`}>
                    {showSections && group.title && (
                      <div className="pt-3 pb-1 pl-9 pr-5">
                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                          {group.title}
                        </span>
                      </div>
                    )}
                    {group.items.map((child, idx) => (
                      <Link
                        key={`${child.href}-${idx}`}
                        href={child.href}
                        onClick={onNavigate}
                        className="flex items-center gap-2 py-2.5 pl-9 pr-5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                      >
                        <span className="h-1 w-1 shrink-0 bg-primary/60" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

/* ─── Drawer ────────────────────────────────────────────────────── */

export function MobileDrawer({
  isOpen,
  onClose,
  navItems,
  shouldReduceMotion,
}: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  const dur = shouldReduceMotion ? "duration-0" : "duration-200";
  const drawerDur = shouldReduceMotion ? "duration-0" : "duration-300";

  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(
        'a, button, input, [tabindex]:not([tabindex="-1"])',
      );
      firstFocusable?.focus();
    } else {
      document.body.style.overflow = "";
      lastFocusedRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${dur} ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-[340px] bg-background z-50 flex flex-col border-l border-border transition-transform ${drawerDur} ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal={isOpen}
        aria-label="Mobile navigation"
      >
        {/* Header — close button */}
        <div className="flex items-center justify-end px-2 py-2 border-b border-border">
          <button
            onClick={onClose}
            className="flex items-center justify-center min-w-[44px] min-h-[44px] text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-4 border-b border-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem("q") as HTMLInputElement | null;
              const q = input?.value.trim();
              onClose();
              if (q) {
                router.push({ pathname: "/search", query: { q } });
              } else {
                router.push("/search");
              }
            }}
            role="search"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                name="q"
                type="search"
                placeholder="Search…"
                aria-label="Search the website"
                className="w-full h-11 border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </form>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto" aria-label="Mobile primary navigation">
          <ul>
            {navItems.map((item) => (
              <MobileNavItem
                key={`${item.label}::${item.href}`}
                item={item}
                onNavigate={onClose}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </ul>
        </nav>

        {/* Contact info */}
        <div className="border-t border-border px-5 py-4 space-y-3">
          <a
            href="tel:+97143930507"
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="w-4 h-4 text-primary shrink-0" />
            +971 4 393 0507
          </a>
          <a
            href="mailto:info@simalme.com"
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-4 h-4 text-primary shrink-0" />
            info@simalme.com
          </a>
          <a
            href="https://wa.me/971543088655"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <WhatsAppIcon className="w-[15px] h-[15px] text-primary shrink-0" />
            WhatsApp
          </a>
        </div>

        {/* Language */}
        <div className="border-t border-border px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Language</span>
            <LanguageSwitcher tone="light" />
          </div>
        </div>
      </div>
    </>
  );
}
