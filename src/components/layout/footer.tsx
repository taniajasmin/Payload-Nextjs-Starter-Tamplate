"use client";

import React from "react";
import { mediaUrl } from "@/lib/media-url";
import Link from "next/link";
import { Mail, Phone, MapPin, Shield } from "lucide-react";
import { socialIconMap } from "@/components/ui/social-icons";

/* ------------------------------------------------------------------
   Fallback data
   ------------------------------------------------------------------ */
const fallbackSocialLinks = [
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
  { platform: "whatsapp", url: "https://wa.me/971543088655" },
];

const fallbackFooterColumns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/about" },
      { label: "Awards", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "News & Events", href: "/resources/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Products & Solutions",
    links: [
      { label: "Product Catalog", href: "/hardware/product-catalog" },
      { label: "Authorized Brands", href: "/brands" },
      { label: "ERP Solutions", href: "/erp/overview" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "RFQ / Inquiry", href: "/contact?topic=rfq" },
      { label: "Request Demo", href: "/contact?topic=erp-demo" },
    ],
  },
  {
    title: "Support & Legal",
    links: [
      { label: "FAQs", href: "/faqs" },
      { label: "B2B Portal Login", href: "/contact?topic=portal-login" },
      { label: "Contact Support", href: "/contact?topic=support" },
      { label: "Privacy Policy", href: "/contact?topic=privacy" },
      { label: "Terms & Conditions", href: "/contact?topic=terms" },
    ],
  },
];

/* ------------------------------------------------------------------
   Types
   ------------------------------------------------------------------ */
interface FooterColumn {
  title: string;
  links: Array<{ label: string; href: string }>;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterCmsData {
  brandName?: string;
  brandSubtitle?: string;
  brandDescription?: string;
  logo?: { url?: string; alt?: string } | null;
  socialLinks?: SocialLink[];
  footerColumns?: FooterColumn[];
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;
  vatNumber?: string;
  tradeLicense?: string;
  chamberMember?: string;
  copyright?: string;
  parentCompany?: { name?: string; url?: string };
}

/* ------------------------------------------------------------------
   Footer
   ------------------------------------------------------------------ */
export function Footer({ cmsData }: { cmsData?: FooterCmsData }) {
  const data = cmsData || {};

  // Brand
  const brandName = data.brandName || "Simal Technologies";
  const brandSubtitle = data.brandSubtitle || "Middle East LLC";
  const brandDescription =
    data.brandDescription ||
    "Simal Technologies Middle East LLC is an accredited regional Value-Added Distributor (VAD), providing high-availability network routers, secure access firewalls, storage nodes, and fiber backbones to certified system integrators throughout the Gulf Cooperation Council.";
  const logo = data.logo as { url?: string } | undefined | null;

  // Social
  const socials = (
    data.socialLinks?.length ? data.socialLinks : fallbackSocialLinks
  ) as SocialLink[];

  // Columns
  const columns = (
    data.footerColumns?.length ? data.footerColumns : fallbackFooterColumns
  ).slice(0, 3) as FooterColumn[];

  // Contact
  const contactPhone = data.contactPhone || "+971 4 393 0507";
  const contactEmail = data.contactEmail || "info@simalme.com";
  const contactAddress =
    data.contactAddress ||
    "Office 201, Dar Al Riffa Building, Khalid Bin Al Waleed Rd, Bur Dubai, PO Box 49740, Dubai, UAE";

  // Legal
  const vatNumber = data.vatNumber || "100207478700003";
  const tradeLicense = data.tradeLicense || "49740";
  const chamberMember = data.chamberMember || "Dubai Chamber Member";

  // Copyright
  const copyrightRaw =
    data.copyright ||
    "© {year} Simal Technologies Middle East LLC. A TwinMOS Group Company. All rights reserved.";
  const parentCompany = data.parentCompany || {
    name: "TwinMOS Group",
    url: "https://twinmos.com",
  };

  const copyrightText = copyrightRaw.replace(
    "{year}",
    String(new Date().getFullYear()),
  );

  const renderCopyright = () => {
    if (copyrightText.includes("{twinmosLink}")) {
      const parts = copyrightText.split("{twinmosLink}");
      return (
        <>
          {parts[0]}
          <a
            href={parentCompany.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
          >
            {parentCompany.name}
          </a>
          {parts[1]}
        </>
      );
    }
    const name = parentCompany.name || "TwinMOS Group";
    if (copyrightText.includes(name)) {
      const idx = copyrightText.indexOf(name);
      return (
        <>
          {copyrightText.slice(0, idx)}
          <a
            href={parentCompany.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
          >
            {name}
          </a>
          {copyrightText.slice(idx + name.length)}
        </>
      );
    }
    return copyrightText;
  };

  return (
    <footer
      id="site-footer"
      className="relative w-full overflow-hidden bg-background text-sm"
      role="contentinfo"
    >
      {/* Background image */}
      <img
        src="/assets/images/homepage/footer-bg.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.04]"
      />

      <div className="container relative z-10 mx-auto px-4 pt-12 pb-5 sm:px-6 lg:px-8">
        {/* ── Corporate header bar ──────────────────────────── */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Dubai, United Arab Emirates
            </span>
            <span className="text-border select-none">|</span>
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-primary" />
              VAT: {vatNumber}
            </span>
            <span className="text-border select-none">|</span>
            <span className="inline-flex items-center gap-1.5">
              Trade License: {tradeLicense}
            </span>
            <span className="text-border select-none">|</span>
            <span>{chamberMember}</span>
          </div>
          <div className="flex items-center gap-1">
            {socials.map((social, i) => {
              const Icon = socialIconMap[social.platform];
              if (!Icon) return null;
              return (
                <a
                  key={`${social.platform}-${i}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* ── Main grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 mb-8 sm:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 shrink-0"
              aria-label={`${brandName} ${brandSubtitle} — Home`}
            >
              {logo?.url ? (
                <img
                  src={mediaUrl(logo.url)}
                  alt={`${brandName} logo`}
                  width={140}
                  height={30}
                  className="shrink-0 h-8 w-auto object-contain"
                />
              ) : (
                <img
                  src="/assets/images/logo/simal-logo-home.png"
                  alt={`${brandName} logo`}
                  width={140}
                  height={30}
                  className="shrink-0 h-8 w-auto object-contain"
                />
              )}
            </Link>

            <div className="leading-tight">
              <div className="text-sm font-bold text-foreground">
                {brandName}
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {brandSubtitle}
              </div>
            </div>

            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              {brandDescription}
            </p>

            {/* Contact details */}
            <div className="space-y-1.5 pt-1">
              <a
                href={`tel:${contactPhone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="w-3 h-3 shrink-0 text-primary" />
                {contactPhone}
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground break-all"
              >
                <Mail className="w-3 h-3 shrink-0 text-primary" />
                {contactEmail}
              </a>
              <span className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 shrink-0 mt-0.5 text-primary" />
                {contactAddress}
              </span>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column, colIdx) => (
            <div key={`${column.title}-${colIdx}`} className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                {column.title}
              </h4>
              {column.links.map((link, idx) => {
                const isExternal =
                  link.href.startsWith("http://") ||
                  link.href.startsWith("https://");
                return (
                  <Link
                    key={`${link.href}-${idx}`}
                    href={link.href}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="block text-xs leading-snug text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* ── Bottom bar ────────────────────────────────────── */}
        <div className="flex flex-col gap-x-8 gap-y-2 border-t border-border py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">{renderCopyright()}</p>
        </div>
      </div>
    </footer>
  );
}
