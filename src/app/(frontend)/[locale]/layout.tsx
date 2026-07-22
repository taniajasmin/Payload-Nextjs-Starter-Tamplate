import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { Suspense, cache } from "react";
import { getCachedPayload } from "@/lib/get-payload";
import "../../globals.css";
import { PreviewWrapper } from "@/components/preview-wrapper";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LivePreviewProvider } from "@/hooks/use-live-preview";
import { LivePreviewDOMUpdater } from "@/components/live-preview-dom-updater";
import { ExtensionCleanup } from "@/components/layout/extension-cleanup";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ThemeStyle } from "@/components/layout/theme-style";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
    title: {
      template: `%s — ${t("title")}`,
      default: t("title"),
    },
    description: t("description"),
    robots: {
      index: true,
      follow: true,
    },
  };
}

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
            locale: locale as "en" | undefined,
            depth: 1,
            draft: false,
            overrideAccess: true,
          }),
          payload.findGlobal({
            slug: "site-settings",
            locale: locale as "en" | undefined,
            draft: false,
            overrideAccess: true,
          }),
          payload.findGlobal({
            slug: "footer",
            locale: locale as "en" | undefined,
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

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${inter.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: DEFAULT_TYPOGRAPHY_CSS }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <LivePreviewProvider>
              <LivePreviewDOMUpdater />

              <Suspense
                fallback={
                  <div className="h-16 bg-background border-b border-border" />
                }
              >
                <HeaderShell locale={locale} />
              </Suspense>

              <main id="main-content" className="flex-1" tabIndex={-1}>
                {children}
              </main>

              <Suspense
                fallback={
                  <div className="h-80 bg-background border-t border-border" />
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
  const { headerData, siteSettings, themeData } = await getLayoutGlobals(locale);

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
  const { footerData } = await getLayoutGlobals(locale);

  return (
    <PreviewWrapper>
      <Footer cmsData={footerData as Record<string, unknown> | undefined} />
    </PreviewWrapper>
  );
}
