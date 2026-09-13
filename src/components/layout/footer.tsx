import { mediaUrl } from "@/lib/media-url";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { resolveSocialIcon } from "@/components/ui/social-icons";

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
  brandSubtitle?: string;
  brandDescription?: string;
  logo?: { url?: string; alt?: string } | null;
  footerColumns?: FooterColumn[];
  socialLinks?: SocialLink[];
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;
  copyright?: string;
  vatNumber?: string;
  tradeLicense?: string;
  chamberMember?: string;
  showVatInfo?: boolean;
}

/* ------------------------------------------------------------------
   Component — Simal-style dark footer
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
    (data.copyright || `© ${currentYear} ${data.brandName || "Hi-Tech Farming Ltd"}. All rights reserved.`)
      .replace("{year}", String(currentYear));

  const socials = (data.socialLinks || []).filter((s) => s.url);
  const hasContact =
    data.contactPhone || data.contactEmail || data.contactAddress;

  const legalBits = [
    data.showVatInfo && data.vatNumber ? `VAT: ${data.vatNumber}` : null,
    data.tradeLicense ? `Trade License: ${data.tradeLicense}` : null,
    data.chamberMember ? `Chamber: ${data.chamberMember}` : null,
  ].filter(Boolean) as string[];

  // Intentional dark island — do not token-swap (see migration plan).
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            {data.logo?.url ? (
              <img
                src={mediaUrl(data.logo.url)}
                alt={data.logo.alt || data.brandName || "Logo"}
                className="h-10 w-auto mb-3"
              />
            ) : (
              <div className="text-lg font-extrabold text-white mb-3">
                {data.brandName || "Hi-Tech Farming"}
              </div>
            )}
            {data.brandSubtitle && (
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-4">
                {data.brandSubtitle}
              </p>
            )}
            {data.brandDescription && (
              <p className="text-sm text-white/60 leading-relaxed">
                {data.brandDescription}
              </p>
            )}
          </div>

          {/* Link columns */}
          {columns.map((col, i) => (
            <div key={i}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links?.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href || "#"}
                      className="text-xs text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          {hasContact && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Contact
              </h4>
              <ul className="space-y-3">
                {data.contactPhone && (
                  <li>
                    <a
                      href={`tel:${data.contactPhone}`}
                      className="inline-flex items-start gap-2.5 text-xs text-white/60 hover:text-white transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
                      {data.contactPhone}
                    </a>
                  </li>
                )}
                {data.contactEmail && (
                  <li>
                    <a
                      href={`mailto:${data.contactEmail}`}
                      className="inline-flex items-start gap-2.5 text-xs text-white/60 hover:text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
                      {data.contactEmail}
                    </a>
                  </li>
                )}
                {data.contactAddress && (
                  <li className="flex items-start gap-2.5 text-xs text-white/60">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
                    {data.contactAddress}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs text-white/50">{copyright}</p>
            {legalBits.length > 0 && (
              <p className="mt-1.5 text-[11px] text-white/35">
                {legalBits.join(" · ")}
              </p>
            )}
          </div>

          {socials.length > 0 && (
            <div className="flex items-center gap-3">
              {socials.map((link, i) => {
                const Icon = resolveSocialIcon(link.platform);
                if (!Icon) return null;
                return (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 transition-colors hover:text-primary hover:border-primary"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
