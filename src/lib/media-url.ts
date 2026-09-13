/**
 * Media URL helper.
 *
 * Routes frontend images through nginx by prepending a configurable base URL
 * to RELATIVE paths only. Absolute URLs and data: URIs are returned unchanged.
 *
 * Configure the base URL with the `NEXT_PUBLIC_MEDIA_BASE_URL` env var
 * (e.g. "http://localhost:8090" in dev, or your nginx origin in Docker).
 * When unset/empty, paths are returned as-is so nothing breaks.
 *
 *   mediaUrl("/assets/images/x.avif")            -> "http://localhost:8090/assets/images/x.avif"
 *   mediaUrl("/api/media/file/foo.jpg")          -> "http://localhost:8090/api/media/file/foo.jpg"
 *   mediaUrl("https://hitechfarmingbd.com/og/x.jpg") -> unchanged (absolute)
 *   mediaUrl("data:image/png;base64,...")        -> unchanged (data URI)
 *   mediaUrl(undefined)                          -> ""
 */
const MEDIA_BASE_URL = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "").replace(
  /\/+$/,
  "",
);

export function mediaUrl(src?: string | null): string {
  if (!src) return "";

  // Leave absolute URLs (http/https), protocol-relative URLs (//), and
  // data: URIs untouched.
  if (src.startsWith("data:")) return src;
  if (/^https?:\/\//i.test(src) || src.startsWith("//")) return src;

  // No base URL configured → return the path unchanged (relative to the app).
  if (!MEDIA_BASE_URL) return src;

  const path = src.startsWith("/") ? src : `/${src}`;
  return `${MEDIA_BASE_URL}${path}`;
}

export default mediaUrl;
