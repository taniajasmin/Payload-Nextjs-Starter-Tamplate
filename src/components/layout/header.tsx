"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { mediaUrl } from "@/lib/media-url";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  Globe,
  MapPin,
  Phone,
  Mail,
  Search,
  Menu,
  Shield,
  Truck,
  ChevronDown,
} from "lucide-react";
import {
  type NavItem,
  iconNameToComponent,
  colorNameToTheme,
} from "./navigation-data";
import { MegaMenu, SimpleDropdown } from "./mega-menu";
import { MobileDrawer } from "./mobile-drawer";
import { LanguageSwitcher } from "./language-switcher";
import { SearchSuggestions } from "@/components/search/search-suggestions";

/* ------------------------------------------------------------------
   CMS data integration
   ------------------------------------------------------------------ */
interface CMSNavChild {
  label?: string;
  link?: string;
  section?: string;
  description?: string;
  status?: string;
  icon?: string;
  iconColor?: string;
  kind?: "link" | "brand" | "case" | "viewAll";
  brandLogo?: string;
  badge?: string;
}

interface CMSNavItem {
  label?: string;
  link?: string;
  status?: string;
  hasDropdown?: boolean;
  dropdownVariant?: "mega" | "simple";
  viewAllLink?: string;
  viewAllLabel?: string;
  children?: CMSNavChild[];
}

interface CMSHeaderData {
  logo?: { url?: string; alt?: string } | null;
  utilityBar?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
    showLanguageSwitcher?: boolean;
    showWhatsapp?: boolean;
    showSocialLinks?: boolean;
    socialLinks?: { platform?: string; url?: string }[];
  };
  ctaButton?: {
    label?: string;
    href?: string;
    show?: boolean;
  };
  navItems?: CMSNavItem[];
}

/**
 * Transform CMS nav items to component format.
 * Filters out draft items and draft children.
 * Maps CMS icon/color names to real components and themes when present.
 */
function buildNavFromCMS(cmsItems?: CMSNavItem[]): NavItem[] {
  if (!cmsItems || cmsItems.length === 0) return [];

  return cmsItems
    .filter((item) => item.status === "published")
    .map((item) => {
      const hasChildren =
        item.hasDropdown && item.children && item.children.length > 0;
      return {
        label: item.label || "",
        href: item.link || "#",
        dropdownVariant: item.dropdownVariant,
        viewAllLink: item.viewAllLink,
        viewAllLabel: item.viewAllLabel,
        children: hasChildren
          ? item
              .children!.filter((child) => child.status === "published")
              .map((child) => {
                const cmsIcon = child.icon
                  ? iconNameToComponent[child.icon]
                  : undefined;
                const cmsColor = child.iconColor
                  ? colorNameToTheme[child.iconColor]
                  : undefined;
                return {
                  label: child.label || "",
                  href: child.link || "#",
                  section: child.section,
                  description: child.description,
                  icon: cmsIcon,
                  iconColor: cmsColor,
                  kind: child.kind,
                  brandLogo: child.brandLogo,
                  badge: child.badge,
                };
              })
          : undefined,
      };
    });
}

/* ------------------------------------------------------------------
   Fallbacks
   ------------------------------------------------------------------ */
const fallbackUtilityBar = {
  phone: "+971 4 393 0507",
  email: "info@simalme.com",
  whatsapp: "+971 54 308 8655",
  showLanguageSwitcher: true,
  showWhatsapp: true,
  showSocialLinks: true,
  socialLinks: [
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/company/simal-technologies-middle-east-llc/",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/simaltechnologiesuae/",
    },
    {
      platform: "facebook",
      url: "https://www.facebook.com/SimalTechnologiesMiddleEast",
    },
    { platform: "youtube", url: "https://www.youtube.com/@simaltechnologies" },
  ],
};

/* ------------------------------------------------------------------
   Social icon helper — brand icons are not in lucide-react
   ------------------------------------------------------------------ */
function SocialIcon({
  platform,
  className,
}: {
  platform: string;
  className?: string;
}) {
  switch (platform) {
    case "linkedin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "x":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    default:
      return <Globe className={className} />;
  }
}

/* ------------------------------------------------------------------
   WhatsApp icon (not in lucide)
   ------------------------------------------------------------------ */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   SkipLinks — accessibility
   ------------------------------------------------------------------ */
function SkipLinks() {
  return (
    // Intentional dark island — do not token-swap.
    // Skip links need high contrast against any page background.
    <div className="absolute top-0 left-0 z-[100] -translate-y-full focus-within:translate-y-0 transition-transform">
      <a
        href="#main-content"
        className="block bg-slate-900 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
      >
        Skip to main content
      </a>
      <a
        href="#primary-navigation"
        className="block bg-slate-900 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
      >
        Skip to navigation
      </a>
      <a
        href="#site-footer"
        className="block bg-slate-900 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
      >
        Skip to footer
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------
   DesktopNavItem — enterprise: border-b indicator, no motion
   ------------------------------------------------------------------ */
function DesktopNavItem({
  item,
  isActive,
  isMegaOpen,
  onOpenMega,
  onCloseMega,
}: {
  item: NavItem;
  isActive: boolean;
  isMegaOpen: boolean;
  onOpenMega: () => void;
  onCloseMega: () => void;
}) {
  const hasChildren = item.children && item.children.length > 0;

  const baseClass =
    "flex items-center gap-1 border-b-2 bg-transparent px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  // When dropdown is open the panel's accent line replaces the border —
  // keep text primary but hide the border to avoid a double line.
  const borderClass = isMegaOpen
    ? "border-transparent text-primary"
    : isActive
      ? "border-primary text-primary"
      : "border-transparent text-foreground hover:border-primary hover:text-primary";

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (hasChildren) onOpenMega();
      }}
      onMouseLeave={() => {
        if (hasChildren) onCloseMega();
      }}
    >
      {hasChildren ? (
        <button
          type="button"
          className={`cursor-pointer ${baseClass} ${borderClass}`}
          aria-expanded={isMegaOpen}
        >
          {item.label}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              isMegaOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : (
        <Link
          href={item.href}
          className={`${baseClass} ${borderClass}`}
          aria-current={isActive ? "page" : undefined}
        >
          {item.label}
        </Link>
      )}

      {hasChildren && item.dropdownVariant === "simple" && (
        <SimpleDropdown
          items={item.children}
          isOpen={isMegaOpen}
          category={item.label}
          shouldReduceMotion={null}
          onMouseEnter={() => onOpenMega()}
          onMouseLeave={() => onCloseMega()}
          onNavigate={onCloseMega}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
   Header
   ------------------------------------------------------------------ */
export function Header({ cmsData }: { cmsData?: Record<string, unknown> }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  /* Parse CMS data with fallbacks */
  const headerData = cmsData as CMSHeaderData | undefined;

  // Logo
  const logo = headerData?.logo as
    | { url?: string; alt?: string }
    | undefined
    | null;
  // The CMS stores the localized alt as a JSON string (e.g. '{"en":"…"}'); pull
  // out a clean string for the <img alt>.
  const logoAlt = (() => {
    try {
      const parsed = JSON.parse(logo?.alt ?? "");
      return (
        parsed?.en ||
        parsed?.ar ||
        logo?.alt ||
        "Simal Technologies Middle East"
      );
    } catch {
      return logo?.alt || "Simal Technologies Middle East";
    }
  })();

  // Utility bar
  const utilityBar = headerData?.utilityBar || fallbackUtilityBar;
  const utilityPhone = utilityBar.phone || fallbackUtilityBar.phone;
  const utilityEmail = utilityBar.email || fallbackUtilityBar.email;
  const whatsappNumber = utilityBar.whatsapp || fallbackUtilityBar.whatsapp;
  const showLanguageSwitcher = utilityBar.showLanguageSwitcher !== false;
  const showWhatsapp = utilityBar.showWhatsapp !== false;
  const showSocialLinks = utilityBar.showSocialLinks !== false;
  const socialLinks = utilityBar.socialLinks || fallbackUtilityBar.socialLinks;

  // Nav items — from CMS only (seeder is the single source of truth)
  const navItems: NavItem[] = buildNavFromCMS(headerData?.navItems);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const openMegaMenu = useCallback((label: string) => {
    if (megaMenuTimerRef.current) clearTimeout(megaMenuTimerRef.current);
    setSearchOpen(false);
    setActiveMegaMenu(label);
  }, []);

  const closeMegaMenu = useCallback(() => {
    megaMenuTimerRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (megaMenuTimerRef.current) clearTimeout(megaMenuTimerRef.current);
    };
  }, []);

  // Close search dropdown on click outside
  useEffect(() => {
    if (!searchOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [searchOpen]);

  // Navigate to the full search results page for a query.
  const goToSearch = useCallback(
    (query: string) => {
      const q = (query || "").trim();
      if (!q) return;
      setSearchOpen(false);
      router.push({ pathname: "/search", query: { q } });
    },
    [router],
  );

  const toggleSearch = useCallback(() => {
    setSearchOpen((prev) => !prev);
    setActiveMegaMenu(null);
  }, []);

  // Close all open menus (mobile drawer, mega menu, search) on route change.
  useEffect(() => {
    if (megaMenuTimerRef.current) clearTimeout(megaMenuTimerRef.current);
    setMobileOpen(false);
    setActiveMegaMenu(null);
    setSearchOpen(false);
  }, [pathname]);

  // Find active nav item with children for mega menu rendering
  const activeNavItem = navItems.find((item) => item.label === activeMegaMenu);

  return (
    <>
      <SkipLinks />
      <header
        className={`sticky top-0 z-[60] w-full bg-background transition-colors ${
          scrolled ? "border-b" : ""
        }`}
      >
        {/* Utility Bar — clean enterprise topbar */}
        <div className="hidden border-b border-primary-foreground/10 bg-primary lg:block">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-9 items-center justify-between text-xs text-primary-foreground">
              <div className="flex items-center gap-5">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-primary-foreground" />
                  <span className="hidden sm:inline">Dubai, UAE</span>
                </span>
                <span className="select-none text-white/30">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-3 w-3 text-primary-foreground" />
                  Est. 2015
                </span>
                <span className="select-none text-white/30">|</span>
                <a
                  href={`tel:${utilityPhone.replace(/\s/g, "")}`}
                  className="flex items-center gap-1.5 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Phone className="h-3 w-3 text-primary-foreground" />
                  {utilityPhone}
                </a>
                <span className="select-none text-white/30">|</span>
                <a
                  href={`mailto:${utilityEmail}`}
                  className="flex items-center gap-1.5 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Mail className="h-3 w-3 text-primary-foreground" />
                  {utilityEmail}
                </a>
                {showWhatsapp && whatsappNumber && (
                  <>
                    <span className="select-none text-white/30">|</span>
                    <a
                      href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      aria-label="Chat on WhatsApp"
                    >
                      <WhatsAppIcon className="h-3 w-3 text-primary-foreground" />
                      <span className="hidden xl:inline">WhatsApp</span>
                    </a>
                  </>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheck className="h-3 w-3 text-primary-foreground" />
                  <span className="hidden xl:inline">CITC Compliant</span>
                </span>
                <span className="select-none text-white/30">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="h-3 w-3 text-primary-foreground" />
                  <span className="hidden xl:inline">JAFZA Stocked</span>
                </span>
                <span className="select-none text-white/30">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <Shield className="h-3 w-3 text-primary-foreground" />
                  <span className="hidden xl:inline">ISO Certified</span>
                </span>
                <span className="select-none text-white/30">|</span>
                {showLanguageSwitcher && <LanguageSwitcher />}
              </div>
            </div>
          </div>
        </div>

        {/* Primary Navigation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center lg:h-20">
            {/* Logo — flex-1 keeps it left-aligned within its half */}
            <div className="flex-1">
              <Link
              href="/"
              className="flex items-center gap-2 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Simal Technologies Middle East — Home"
            >
              {logo?.url ? (
                /* CMS logo is served from localhost media; next/image refuses
                   private-IP URLs (HTTP 400), so render with a plain <img>. */
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mediaUrl(logo.url)}
                  alt={logoAlt}
                  className="shrink-0 h-[34px] w-auto"
                  loading="eager"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mediaUrl("/assets/images/logo/simal-logo-home.png")}
                  alt="Simal Technologies Middle East"
                  className="shrink-0 h-[34px] w-auto"
                  loading="eager"
                />
              )}
            </Link>
            </div>

            {/* Desktop Nav — centered between logo and right actions */}
            <nav
              id="primary-navigation"
              className="hidden lg:flex items-center text-foreground"
              aria-label="Primary navigation"
              role="navigation"
            >
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                const isMegaOpen = activeMegaMenu === item.label;

                return (
                  <DesktopNavItem
                    key={`${item.label}::${item.href}`}
                    item={item}
                    isActive={isActive}
                    isMegaOpen={isMegaOpen}
                    onOpenMega={() => openMegaMenu(item.label)}
                    onCloseMega={() => closeMegaMenu()}
                  />
                );
              })}
            </nav>

            {/* Right actions — flex-1 + justify-end mirrors logo side for true nav centering */}
            <div className="flex-1 flex justify-end items-center gap-2">
              {/* Desktop: Search dropdown → Contact → Portal */}
              <div className="hidden lg:flex items-center gap-3">
                <div ref={searchRef} className="relative">
                  <button
                    onClick={toggleSearch}
                    className="flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Toggle search"
                    aria-expanded={searchOpen}
                  >
                    <Search className="h-5 w-5" />
                  </button>
                  <div
                    className={`absolute right-0 top-full mt-1 z-50 w-[360px] border border-border bg-background transition-opacity duration-200 ${
                      searchOpen ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" />
                    <SearchSuggestions onSubmitQuery={goToSearch} variant="header" />
                  </div>
                </div>
                <Link
                  href="/contact?topic=rfq"
                  className="inline-flex items-center gap-1.5 bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Phone className="h-4 w-4" />
                  Request a Quote
                </Link>
              </div>

              {/* Mobile / tablet */}
              <button
                onClick={() => router.push("/search")}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation-drawer"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Full-width Mega Menu — only for "mega" variants. "simple" variants
            render an inline dropdown inside DesktopNavItem instead. */}
        <MegaMenu
          items={activeNavItem?.children}
          isOpen={
            !!activeMegaMenu && activeNavItem?.dropdownVariant !== "simple"
          }
          category={activeNavItem?.label ?? ""}
          shouldReduceMotion={shouldReduceMotion}
          onMouseEnter={() => {
            if (activeNavItem) openMegaMenu(activeNavItem.label);
          }}
          onMouseLeave={() => closeMegaMenu()}
          onNavigate={() => closeMegaMenu()}
        />
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
        shouldReduceMotion={shouldReduceMotion}
      />
    </>
  );
}
