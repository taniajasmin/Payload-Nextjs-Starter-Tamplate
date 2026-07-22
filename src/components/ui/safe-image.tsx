"use client";

import { useState } from "react";
import { mediaUrl } from "@/lib/media-url";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Original image source. */
  src: string;
  /** Alt text for the image. */
  alt: string;
  /**
   * Optional fallback shown when `src` fails to load. If omitted (or itself
   * fails), the component renders nothing rather than a broken-image icon.
   */
  fallbackSrc?: string;
}

/**
 * Image wrapper that degrades gracefully when an asset is missing or fails
 * to load. It tries `src`, then an optional `fallbackSrc`, and finally
 * renders nothing — it never shows a browser broken-image icon, which keeps
 * product pages clean when a CMS/static asset is unavailable.
 *
 * Callers that need to react to a failed image (e.g. to drop a thumbnail
 * box entirely) can pass `onError`, which fires once the asset is deemed
 * un-loadable.
 */
export function SafeImage({
  src,
  alt,
  fallbackSrc,
  onError,
  ...props
}: SafeImageProps) {
  const [failedPrimary, setFailedPrimary] = useState(false);
  const [failedFallback, setFailedFallback] = useState(false);

  // Reset error state when the source changes (adjusted during render rather
  // than in an effect, per React guidance) so a new image gets a fresh try.
  const [prevSrc, setPrevSrc] = useState(src);
  if (src !== prevSrc) {
    setPrevSrc(src);
    setFailedPrimary(false);
    setFailedFallback(false);
  }

  // Exhausted primary + fallback → render nothing (never a broken icon).
  if (failedFallback) return null;

  const usingFallback = !src || failedPrimary;
  const resolvedSrc = usingFallback ? fallbackSrc : mediaUrl(src);

  // Nothing usable left to render.
  if (!resolvedSrc) return null;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      onError={(e) => {
        if (usingFallback) {
          // The fallback (or an empty src) also failed — give up.
          setFailedFallback(true);
        } else {
          // Primary failed — fall through to the fallback next render.
          setFailedPrimary(true);
        }
        onError?.(e);
      }}
      {...props}
    />
  );
}
