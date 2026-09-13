import { fetchGlobal } from "@/lib/fetch-global";
import { mediaUrl } from "@/lib/media-url";

/**
 * Maintenance / downtime page.
 *
 * Shown when SiteSettings.maintenance.enabled is on (the proxy in src/proxy.ts
 * rewrites every public page here). Content is fully CMS-driven from the
 * SiteSettings `maintenance` group, with sensible fallbacks so the page always
 * renders even if the DB is unreachable.
 *
 * `lng` is injected by the proxy based on the visitor's locale so the page
 * renders in the right language (fields are localized).
 */

interface MediaDoc {
  url?: string | null;
}

interface SiteSettingsShape {
  siteName?: string;
  logo?: MediaDoc | number | null;
  defaultEmail?: string;
  defaultPhone?: string;
  maintenance?: {
    enabled?: boolean;
    headline?: string;
    message?: string;
    estimatedReturnTime?: string;
    logoImage?: MediaDoc | number | null;
    backgroundImage?: MediaDoc | number | null;
    contactEmail?: string;
    contactPhone?: string;
  };
}

const FALLBACK = {
  siteName: "Hi-Tech Farming BD",
  headline: "We'll be back shortly",
  message:
    "Our website is currently undergoing scheduled maintenance. We expect to be back online shortly. Thank you for your patience.",
};

export const dynamic = "force-dynamic";

function asMedia(value: MediaDoc | number | null | undefined): MediaDoc | null {
  return value && typeof value === "object" ? value : null;
}

export default async function MaintenancePage({
  searchParams,
}: {
  searchParams: Promise<{ lng?: string }>;
}) {
  const { lng } = await searchParams;
  const locale = lng || "en";
  const settings = await fetchGlobal<SiteSettingsShape>(
    "site-settings",
    locale,
  );
  const m = settings.maintenance ?? {};

  const logoUrl = mediaUrl(asMedia(m.logoImage ?? settings.logo)?.url);
  const bgUrl = mediaUrl(asMedia(m.backgroundImage)?.url);

  const siteName = settings.siteName || FALLBACK.siteName;
  const headline = m.headline || FALLBACK.headline;
  const message = m.message || FALLBACK.message;
  const eta = m.estimatedReturnTime;
  const email = m.contactEmail || settings.defaultEmail;
  const phone = m.contactPhone || settings.defaultPhone;

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-slate-100"
    >
      {/* Optional CMS background image */}
      {bgUrl ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
      ) : null}
      {/* Gradient overlay (always, for legibility) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95"
      />

      <div className="relative z-10 w-full max-w-xl text-center">
        {/* Logo (CMS override → site logo → wordmark fallback) */}
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={siteName}
            className="mx-auto mb-10 h-12 w-auto object-contain"
          />
        ) : (
          <div className="mx-auto mb-10 text-[length:var(--font-heading)] font-bold tracking-tight text-white">
            {siteName}
          </div>
        )}

        {/* Status badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[length:var(--font-badge)] font-medium uppercase tracking-wider text-slate-300 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          Scheduled Maintenance
        </div>

        <h1 className="text-balance text-[length:var(--font-hero-heading)] font-bold tracking-tight text-white">
          {headline}
        </h1>

        <p className="mx-auto mt-5 max-w-md text-pretty text-[length:var(--font-body)] leading-relaxed text-slate-300">
          {message}
        </p>

        {eta ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[length:var(--font-body)] text-slate-200 backdrop-blur">
            <svg
              className="h-4 w-4 text-amber-400"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden
            >
              <circle cx="8" cy="8" r="7" />
              <path
                d="M8 4v4l3 2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {eta}
          </div>
        ) : null}

        {(email || phone) && (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-[length:var(--font-body)] text-slate-300 sm:flex-row sm:gap-6">
            {email ? (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                <span aria-hidden>✉</span>
                {email}
              </a>
            ) : null}
            {phone ? (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                <span aria-hidden>☎</span>
                {phone}
              </a>
            ) : null}
          </div>
        )}

        <p className="mt-12 text-[length:var(--font-body)] text-slate-500">
          © {siteName}. All rights reserved.
        </p>
      </div>
    </main>
  );
}
