import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

/**
 * Proxy (Next.js 16 successor to the deprecated middleware.ts file).
 *
 * Two responsibilities:
 *
 * 1. MAINTENANCE MODE — when SiteSettings.maintenance.enabled is on, every
 *    public page is rewritten to /maintenance (URL preserved). The toggle is
 *    read from a small internal route handler (/api/maintenance-status), NOT via
 *    Payload's Local API directly here — getPayload deadlocks inside the proxy
 *    context, but works fine in a normal route handler where the Payload
 *    singleton is already initialised. The read is bounded (2s abort) and cached
 *    (5s); ANY failure falls back to "not enabled" so the proxy can never hang
 *    or accidentally lock the site. Admin (/admin), API (/api), Next internals
 *    and static assets are excluded (so editors can turn it back off). Staff can
 *    bypass the lock with a secret link:
 *        /?maintenance_bypass=<MAINTENANCE_BYPASS_SECRET>
 *
 * 2. LOCALE ROUTING — delegated to next-intl exactly as before (unchanged).
 */

const intlMiddleware = createMiddleware(routing);

const MAINTENANCE_BYPASS_COOKIE = "maintenance_bypass";
const TOGGLE_TTL_MS = 60_000;
const FETCH_TIMEOUT_MS = 2_000;

type CachedToggle = { value: boolean; expires: number };
let toggleCache: CachedToggle | null = null;

/** Read the maintenance toggle via the internal route handler. Never hangs. */
async function isMaintenanceEnabled(request: NextRequest): Promise<boolean> {
  if (toggleCache && toggleCache.expires > Date.now()) {
    return toggleCache.value;
  }

  let value = false;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(
      new URL("/api/maintenance-status", request.nextUrl.origin),
      { cache: "no-store", signal: controller.signal },
    );
    clearTimeout(timer);
    if (res.ok) {
      const data = (await res.json()) as { enabled?: boolean };
      value = Boolean(data.enabled);
    }
  } catch {
    // Network/timeout/parse error → never lock the site.
    value = false;
  }

  toggleCache = { value, expires: Date.now() + TOGGLE_TTL_MS };
  return value;
}

/** Extract the locale from a locale-prefixed path, falling back to the default. */
function detectLocale(pathname: string): string {
  const re = new RegExp(`^/(${routing.locales.join("|")})(?:/|$)`);
  const match = pathname.match(re);
  return match ? match[1] : routing.defaultLocale;
}

function bypassSecret(): string {
  return process.env.MAINTENANCE_BYPASS_SECRET || "";
}

function applyBypassCookie(res: NextResponse, secret: string): void {
  if (!secret) return;
  res.cookies.set(MAINTENANCE_BYPASS_COOKIE, secret, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export default async function proxy(
  request: NextRequest,
): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const secret = bypassSecret();

  const bypassFromQuery = Boolean(
    secret && request.nextUrl.searchParams.get("maintenance_bypass") === secret,
  );
  const hasCookieBypass = Boolean(
    secret && request.cookies.get(MAINTENANCE_BYPASS_COOKIE)?.value === secret,
  );
  const bypassed = bypassFromQuery || hasCookieBypass;

  // The maintenance page renders directly — never redirect it to itself, and
  // don't let next-intl locale-prefix it.
  if (pathname === "/maintenance") {
    const res = NextResponse.next();
    if (bypassFromQuery) applyBypassCookie(res, secret);
    return res;
  }

  // These are already excluded by the matcher, but guard defensively so the
  // site is never locked out of its own admin/API if the matcher changes.
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel")
  ) {
    const res = intlMiddleware(request);
    if (bypassFromQuery && res) applyBypassCookie(res, secret);
    return res ?? NextResponse.next();
  }

  // Redirect locale-prefixed admin/api URLs to the unprefixed canonical path.
  // The Payload admin lives in a separate (payload) route group outside
  // [locale], so /en/admin won't match — it falls through to the frontend
  // catch-all [slug] and 404s. Redirect to /admin so it bypasses the proxy.
  const localePrefixedAdminRe = new RegExp(
    `^/(${routing.locales.join("|")})/(admin|api)(?:/|$)`,
  );
  const localeAdminMatch = pathname.match(localePrefixedAdminRe);
  if (localeAdminMatch) {
    const newUrl = new URL(request.url);
    // Strip the locale prefix (e.g. /en/admin/... → /admin/...).
    // localeAdminMatch[1] is the locale (e.g. "en"), so we skip
    // 2 slashes + locale length characters from the start.
    newUrl.pathname = `/${pathname.slice(localeAdminMatch[1].length + 2)}`;
    const res = NextResponse.redirect(newUrl);
    if (bypassFromQuery) applyBypassCookie(res, secret);
    return res;
  }

  const enabled = await isMaintenanceEnabled(request);

  if (enabled && !bypassed) {
    const locale = detectLocale(pathname);
    const url = new URL("/maintenance", request.url);
    url.searchParams.set("lng", locale);
    return NextResponse.rewrite(url);
  }

  // Normal traffic → next-intl locale handling (unchanged behaviour).
  const res = intlMiddleware(request);
  if (bypassFromQuery && res) applyBypassCookie(res, secret);
  return res ?? NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/(ar|en|fr|ru)/:path*",
    "/((?!api|admin|_next|_vercel|.*\\..*).*)",
  ],
};
