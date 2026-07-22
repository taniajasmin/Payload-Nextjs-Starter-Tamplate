import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Maintenance toggle endpoint, read by the proxy (src/proxy.ts) on every public
 * request (cached + bounded there). Lives under /api, which the proxy matcher
 * excludes — so this handler is reached directly and never re-enters the proxy.
 *
 * We use Payload's Local API here (not in the proxy) because the Payload
 * singleton is already initialised by the rest of the app, so this is fast and
 * safe. Any error returns enabled:false so the site is never locked by a fault.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await getPayload({ config });
    const settings = (await payload.findGlobal({
      slug: "site-settings",
      depth: 0,
      overrideAccess: true,
    })) as { maintenance?: { enabled?: boolean } } | null;
    return NextResponse.json({
      enabled: Boolean(settings?.maintenance?.enabled),
    });
  } catch {
    return NextResponse.json({ enabled: false });
  }
}
