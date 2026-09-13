"use client";

import { useState } from "react";
import Link from "next/link";
import { mediaUrl } from "@/lib/media-url";
import { usePathname } from "@/i18n/navigation";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { resolveSocialIcon, WhatsAppIcon } from "@/components/ui/social-icons";

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

interface CMSSocialLink {
  platform?: string;
  url?: string;
}

interface CMSUtilityBar {
  phone?: string;
  email?: string;
  whatsapp?: string;
  showWhatsapp?: boolean;
  showSocialLinks?: boolean;
  socialLinks?: CMSSocialLink[];
}

interface CMSHeaderData {
  logo?: { url?: string; alt?: string } | null;
  utilityBar?: CMSUtilityBar;
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
   Utility bar — solid primary strip with contact info + socials
   ------------------------------------------------------------------ */
function UtilityBar({ utility }: { utility?: CMSUtilityBar }) {
  if (!utility) return null;
  const socials =
    utility.showSocialLinks && utility.socialLinks?.length
      ? utility.socialLinks
      : [];

  return (
    <div className="hidden md:block bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-xs">
        <div className="flex items-center gap-6">
          {utility.phone && (
            <a
              href={`tel:${utility.phone}`}
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{utility.phone}</span>
            </a>
          )}
          {utility.email && (
            <a
              href={`mailto:${utility.email}`}
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{utility.email}</span>
            </a>
          )}
          {utility.showWhatsapp && utility.whatsapp && (
            <a
              href={`https://wa.me/${utility.whatsapp.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>{utility.whatsapp}</span>
            </a>
          )}
        </div>
        {socials.length > 0 && (
          <div className="flex items-center gap-3">
            {socials.map((link, i) => {
              const Icon = resolveSocialIcon(link.platform);
              if (!Icon || !link.url) return null;
              return (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="transition-opacity hover:opacity-80"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

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
    <header className="sticky top-0 z-50">
      <UtilityBar utility={data.utilityBar} />

      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-stretch justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center font-bold text-xl"
            aria-label="Home"
          >
            {data.logo?.url ? (
              <img
                src={mediaUrl(data.logo.url)}
                alt={data.logo.alt || "Logo"}
                className="h-10 w-auto"
              />
            ) : (
              <span className="text-foreground">Hi-Tech Farming</span>
            )}
          </Link>

          {/* Desktop nav — full-height items with a 2px accent underline */}
          <nav className="hidden md:flex items-stretch">
            {publishedItems.map((item, i) => {
              const isActive = pathname === item.link;
              return (
                <div
                  key={i}
                  className="relative flex"
                  onMouseEnter={() => setOpenDropdown(item.label || null)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.hasDropdown && item.children ? (
                    <>
                      <button
                        className={`inline-flex items-center gap-1 px-4 border-b-2 text-sm font-semibold transition-colors ${
                          openDropdown === item.label || isActive
                            ? "border-primary text-primary"
                            : "border-transparent text-foreground/80 hover:text-primary hover:border-primary"
                        }`}
                      >
                        {item.label}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {openDropdown === item.label && (
                        <div className="absolute top-full left-0 w-56 bg-popover text-popover-foreground shadow-xl border-t-2 border-primary py-2">
                          {item.children
                            .filter((c) => c.status !== "draft")
                            .map((child, j) => (
                              <Link
                                key={j}
                                href={child.link || "#"}
                                className="block px-5 py-2.5 text-sm text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
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
                      className={`inline-flex items-center px-4 border-b-2 text-sm font-semibold transition-colors ${
                        isActive
                          ? "border-primary text-primary"
                          : "border-transparent text-foreground/80 hover:text-primary hover:border-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}

            {/* CTA button */}
            {data.ctaButton?.show &&
              data.ctaButton.label &&
              data.ctaButton.href && (
                <Link
                  href={data.ctaButton.href}
                  className="self-center ml-4 px-5 py-2.5 text-sm font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {data.ctaButton.label}
                </Link>
              )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden self-center p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {/* Utility-bar contact info repeated for mobile */}
            {data.utilityBar?.phone && (
              <a
                href={`tel:${data.utilityBar.phone}`}
                className="py-2 text-xs text-muted-foreground flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
                {data.utilityBar.phone}
              </a>
            )}
            {data.utilityBar?.email && (
              <a
                href={`mailto:${data.utilityBar.email}`}
                className="py-2 text-xs text-muted-foreground flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-primary" />
                {data.utilityBar.email}
              </a>
            )}
            <div className="my-2 border-t border-border" />

            {publishedItems.map((item, i) => (
              <div key={i}>
                {item.hasDropdown && item.children ? (
                  <details className="group">
                    <summary className="py-2.5 text-sm font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                      {item.label}
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </summary>
                    <div className="ml-3 mt-1 flex flex-col border-l-2 border-primary/30 pl-3">
                      {item.children
                        .filter((c) => c.status !== "draft")
                        .map((child, j) => (
                          <Link
                            key={j}
                            href={child.link || "#"}
                            className="py-2 text-sm text-muted-foreground hover:text-primary"
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
                    className={`block py-2.5 text-sm font-semibold border-b border-border/60 ${
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
            {data.ctaButton?.show &&
              data.ctaButton.label &&
              data.ctaButton.href && (
                <Link
                  href={data.ctaButton.href}
                  className="mt-4 px-4 py-3 text-sm font-semibold text-center rounded-md bg-primary text-primary-foreground"
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
