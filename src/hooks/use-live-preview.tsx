"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// ─── Per-page live preview hook ────────────────────────────────────

/**
 * Reusable hook for Payload CMS live preview.
 * Listens for postMessage events from the Payload admin panel
 * and merges incoming data with the initial server-fetched data.
 *
 * Usage:
 *   const data = useLivePreview(initialData);
 */
export function useLivePreview<T extends Record<string, unknown>>(
  initialData: T,
): T {
  const [data, setData] = useState<T>(initialData);
  const readySent = useRef(false);

  useEffect(() => {
    if (!isInsideIframe()) return;

    if (!readySent.current) {
      readySent.current = true;
      const target = window.opener || window.parent;
      target?.postMessage(
        { type: "payload-live-preview", ready: true },
        "*",
      );
    }

    const onMessage = (event: MessageEvent) => {
      if (
        !event.data ||
        typeof event.data !== "object" ||
        event.data.type !== "payload-live-preview"
      ) {
        return;
      }

      if (event.data.data) {
        setData((prev) => ({
          ...prev,
          ...(event.data.data as Partial<T>),
        }));
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return data;
}

// ─── Shared live preview context (layout-level) ────────────────────

const LivePreviewContext = createContext<Record<string, unknown> | null>(null);

/**
 * Provider that listens for Payload CMS live preview messages at the
 * layout level and shares the current preview data with all children
 * via React context.
 */
function isInsideIframe() {
  if (typeof window === "undefined") return false;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

export function LivePreviewProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Record<string, unknown>>({});
  const readySent = useRef(false);

  useEffect(() => {
    // Live preview only makes sense when the page is rendered inside the
    // Payload admin iframe. Skip the postMessage handshake in production
    // stand-alone browsing to reduce startup work.
    if (!isInsideIframe()) return;

    if (!readySent.current) {
      readySent.current = true;
      const target = window.opener || window.parent;
      target?.postMessage(
        { type: "payload-live-preview", ready: true },
        "*",
      );
    }

    const onMessage = (event: MessageEvent) => {
      if (
        !event.data ||
        typeof event.data !== "object" ||
        event.data.type !== "payload-live-preview"
      ) {
        return;
      }

      if (event.data.data) {
        setData((prev) => ({
          ...prev,
          ...(event.data.data as Record<string, unknown>),
        }));
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <LivePreviewContext.Provider value={data}>
      {children}
    </LivePreviewContext.Provider>
  );
}

/**
 * Hook to consume the shared live preview data from LivePreviewProvider.
 * Used by LivePreviewDOMUpdater for layout-level DOM patching.
 */
export function useLivePreviewData(): Record<string, unknown> | null {
  return useContext(LivePreviewContext);
}
