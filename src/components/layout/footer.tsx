import { mediaUrl } from "@/lib/media-url";
import Link from "next/link";
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
  brandDescription?: string;
  logo?: { url?: string; alt?: string } | null;
  footerColumns?: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright?: string;
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
                className="h-10 w-auto mb-5"
              />
            ) : (
              <div className="text-lg font-extrabold text-white mb-5">
                {data.brandName || "Hi-Tech Farming"}
              </div>
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
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">{copyright}</p>

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
