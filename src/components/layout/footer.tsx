"use client";

import React from "react";
import { mediaUrl } from "@/lib/media-url";
import Link from "next/link";

/* ------------------------------------------------------------------
   Fallback data
   ------------------------------------------------------------------ */
const fallbackFooterColumns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

/* ------------------------------------------------------------------
   Types
   ------------------------------------------------------------------ */
interface FooterLink {
  label?: string;
  href?: string;
}

interface FooterColumn {
  title?: string;
  links?: FooterLink[];
}

interface SocialLink {
  platform?: string;
  url?: string;
}

interface FooterCmsData {
  brandName?: string;
  brandDescription?: string;
  logo?: { url?: string; alt?: string } | null;
  footerColumns?: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright?: string;
  showVatInfo?: boolean;
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */
export function Footer({
  cmsData,
}: {
  cmsData?: Record<string, unknown> | undefined;
}) {
  const data = (cmsData || {}) as FooterCmsData;

  const columns =
    data.footerColumns && data.footerColumns.length > 0
      ? data.footerColumns
      : fallbackFooterColumns;

  const currentYear = new Date().getFullYear();
  const copyright =
    data.copyright || `© ${currentYear} ${data.brandName || "Hi-Tech Farming Ltd"}. All rights reserved.`;

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            {data.logo?.url ? (
              <img
                src={mediaUrl(data.logo.url)}
                alt={data.logo.alt || data.brandName || "Logo"}
                className="h-8 w-auto mb-4"
              />
            ) : (
              <div className="text-lg font-bold text-foreground mb-4">
                {data.brandName || "Hi-Tech Farming"}
              </div>
            )}
            {data.brandDescription && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {data.brandDescription}
              </p>
            )}
          </div>

          {/* Link columns */}
          {columns.map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold text-foreground text-sm mb-3">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links?.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href || "#"}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">{copyright}</p>

          {data.socialLinks && data.socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {data.socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors capitalize"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
