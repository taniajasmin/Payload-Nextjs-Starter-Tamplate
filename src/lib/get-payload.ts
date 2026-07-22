import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Deduplicated Payload initialisation — React's `cache()` guarantees
 * `getPayload({config})` runs ONCE per request even when layout and page
 * render in parallel (Next.js 16 behaviour). Without this, both the layout
 * and the page call `getPayload` concurrently, each triggering a full DB
 * connection + schema load + migrations check.
 */
export const getCachedPayload = cache(() => getPayload({ config }));
