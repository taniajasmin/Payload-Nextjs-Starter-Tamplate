import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { Suspense, cache } from "react";
import { getCachedPayload } from "@/lib/get-payload";
import "../../globals.css";
import { BackToTop } from "@/components/ui/back-to-top";
import { PreviewWrapper } from "@/components/preview-wrapper";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LivePreviewProvider } from "@/hooks/use-live-preview";
import { LivePreviewDOMUpdater } from "@/components/live-preview-dom-updater";
import { ExtensionCleanup } from "@/components/layout/extension-cleanup";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ThemeStyle } from "@/components/layout/theme-style";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-ff",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Locale = (typeof routing.locales)[number];

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/* Revalidate pages periodically so CMS changes are reflected without
 * forcing every request to be dynamic. Individual pages can override this
 * when truly dynamic behavior is required. */
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://www.simalme.com/${locale === "en" ? "" : `${locale}/`}`,
      languages: {
        "en-US": "https://www.simalme.com/",
        "ar-AE": "https://www.simalme.com/ar/",
        fr: "https://www.simalme.com/fr/",
        ru: "https://www.simalme.com/ru/",
      },
    },
    verification: {
      google: "u79bQ3Lqsh180ZirtAIgRybEqZCFFmFxEy5FvuPfxGY",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#DF4C73",
};

/**
 * Fetch layout globals with cross-request caching so the Payload DB is not
 * hit on every render. Revalidated alongside the page ISR.
 */
const fetchLayoutGlobals = unstable_cache(
  async (locale: string) => {
    try {
      const payload = await getCachedPayload();
      const [headerData, siteSettings, footerData, themeData] =
        await Promise.all([
          payload.findGlobal({
            slug: "header",
            locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
            depth: 1,
            draft: false,
            overrideAccess: true,
          }),
          payload.findGlobal({
            slug: "site-settings",
            locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
            draft: false,
            overrideAccess: true,
          }),
          payload.findGlobal({
            slug: "footer",
            locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
            depth: 1,
            draft: false,
            overrideAccess: true,
          }),
          payload.findGlobal({
            slug: "theme",
            draft: false,
            overrideAccess: true,
          }),
        ]);
      return { headerData, siteSettings, footerData, themeData };
    } catch {
      return { headerData: {}, siteSettings: {}, footerData: {}, themeData: null };
    }
  },
  ["layout-globals"],
  { revalidate: 60, tags: ["layout-globals"] },
);

/**
 * React `cache()` deduplicates `fetchLayoutGlobals` so both HeaderShell and
 * FooterShell can call this independently — the 4 Payload queries fire ONCE
 * and the result is shared within the request.
 */
const getLayoutGlobals = cache((locale: string) => fetchLayoutGlobals(locale));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Simal Technologies Middle East LLC",
  url: "https://www.simalme.com",
  logo: "https://www.simalme.com/assets/logo/simal-technologies-logo.png",
  description:
    "Premier IT distributor in Dubai, UAE with 20+ years experience. Authorized distributor for Crucial, UGREEN, HIKVISION and 20+ global IT brands.",
  foundingDate: "2002",
  numberOfEmployees: "300+",
  parentOrganization: {
    "@type": "Organization",
    name: "TwinMOS Group",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Office No: 201, Dar Al Riffa Building, Khalid Bin Al Waleed Rd, Bur Dubai",
    addressLocality: "Dubai",
    addressCountry: "AE",
    postalCode: "49740",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+971-4-393-0507",
      contactType: "sales",
      areaServed: ["AE", "SA", "QA", "KW", "BH", "OM"],
      availableLanguage: ["English", "Arabic"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+971-54-308-8655",
      contactType: "customer service",
      contactOption: "WhatsApp",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/simal-technologies-middle-east-llc/",
    "https://www.instagram.com/simaltechnologiesuae/",
    "https://www.facebook.com/SimalTechnologiesMiddleEast",
    "https://x.com/simalllc",
  ],
};

// ─── Default typography CSS variables (before CMS data loads) ─────────

const DEFAULT_TYPOGRAPHY_CSS = `
  :root {
    --font-hero-heading: 15px;
    --font-heading: 15px;
    --font-body: 12px;
    --font-button: 12px;
    --font-nav-item: 15px;
    --font-badge: 12px;
    --font-section-label: 12px;
    --font-caption: 10px;
  }
`;

// ─── Layout: shell streams immediately, data loads in parallel ────────
//
// Previously the layout awaited `fetchLayoutGlobals` (4 Payload queries)
// BEFORE rendering {children}. That serialised the layout's 3 queries with
// the page's own queries (e.g. homepage's 4). Now the Header + Footer each
// suspend independently, and the page's {children} renders immediately
// between them — all data fetching overlaps.
//
// `getLayoutGlobals` is wrapped in React `cache()` so the 4 Payload
// queries fire once per request even though both HeaderShell and
// FooterShell call it.

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Tell next-intl the locale up-front so it does NOT have to read it from
  // request headers. Without this (and an explicit locale passed to
  // getMessages/getTranslations), every static/ISR route under this layout
  // reads `headers()` during its prerender/revalidation and Next.js throws
  // `DYNAMIC_SERVER_USAGE` → HTTP 500.
  setRequestLocale(locale);

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  const isRTL = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: DEFAULT_TYPOGRAPHY_CSS }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Script
          id="ld-json-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="perf-measure-patch"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (typeof performance !== 'undefined' && performance.measure) {
                  var originalMeasure = performance.measure.bind(performance);
                  performance.measure = function (measureName, startOrMeasureOptions, endMark) {
                    try {
                      return originalMeasure(measureName, startOrMeasureOptions, endMark);
                    } catch (error) {
                      if (error instanceof TypeError && /cannot have a negative time stamp/.test(error.message)) {
                        return undefined;
                      }
                      throw error;
                    }
                  };
                }
              } catch (e) {}
            `,
          }}
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <LivePreviewProvider>
              <LivePreviewDOMUpdater />

              {/* ── Header streams in via Suspense ────────────────────
                  fetchLayoutGlobals fires immediately. The page's own
                  data fetching starts in parallel because {children}
                  renders outside the Suspense boundary. */}

              <Suspense
                fallback={
                  <div className="h-16 bg-neutral-950 border-b border-neutral-900" />
                }
              >
                <HeaderShell locale={locale} />
              </Suspense>

              {/* ── Page renders immediately — NOT inside an awaiting
                  component. Its 4 Payload queries run concurrently with
                  the layout's queries in HeaderShell/FooterShell. */}

              <main id="main-content" className="flex-1" tabIndex={-1}>
                {children}
              </main>

              <BackToTop />

              {/* ── Footer streams in via Suspense ────────────────────
                  Shares the same getLayoutGlobals promise (React cache
                  deduplication) — no duplicate fetch. */}

              <Suspense
                fallback={
                  <div className="h-80 bg-neutral-950 border-t border-neutral-900" />
                }
              >
                <FooterShell locale={locale} />
              </Suspense>
            </LivePreviewProvider>
          </ThemeProvider>
        </NextIntlClientProvider>

        {/*
          Strip the `bis_skin_checked` attribute injected by some browser
          extensions to avoid React hydration mismatches.
        */}
        <ExtensionCleanup />
      </body>
    </html>
  );
}

// ─── Header + typography CSS (streams in via Suspense) ────────────────

async function HeaderShell({ locale }: { locale: string }) {
  const { headerData, siteSettings, themeData } = await getLayoutGlobals(
    locale,
  );

  // CMS typography overrides — injected as a second <style> block that
  // takes precedence over the defaults in <head> because it appears later
  // in the DOM (streamed into <body>).
  const typography = (
    (siteSettings as Record<string, unknown>)?.typography || {}
  ) as Record<string, number>;

  return (
    <>
      <style>{`
        :root {
          --font-hero-heading: ${typography.heroHeadingSize ?? 15}px;
          --font-heading: ${typography.headingSize ?? 15}px;
          --font-body: ${typography.bodyTextSize ?? 12}px;
          --font-button: ${typography.buttonTextSize ?? 12}px;
          --font-nav-item: ${typography.navItemSize ?? 15}px;
          --font-badge: ${typography.badgeSize ?? 12}px;
          --font-section-label: ${typography.sectionLabelSize ?? 12}px;
          --font-caption: ${typography.captionSize ?? 10}px;
        }
      `}</style>
      <ThemeStyle theme={themeData as Record<string, unknown> | null} />
      <PreviewWrapper>
        <Header cmsData={headerData as Record<string, unknown> | undefined} />
      </PreviewWrapper>
    </>
  );
}

// ─── Footer (streams in via Suspense) ─────────────────────────────────

async function FooterShell({ locale }: { locale: string }) {
  // React cache deduplication: returns the SAME promise as HeaderShell
  // (if still in-flight) or the cached result. No duplicate Payload calls.
  const { footerData } = await getLayoutGlobals(locale);

  return (
    <PreviewWrapper>
      <Footer cmsData={footerData as Record<string, unknown> | undefined} />
    </PreviewWrapper>
  );
}
