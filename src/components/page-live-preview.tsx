"use client";

import { useEffect, useRef, useState } from "react";
import { BlocksRenderer } from "@/components/blocks/renderer";
import type { LayoutBlock } from "@/components/blocks/renderer";

interface PageDoc {
  id: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  layout?: LayoutBlock[];
  meta?: {
    title?: string;
    description?: string;
    image?: { url?: string; alt?: string };
  };
}

interface PageLivePreviewProps {
  initialData: PageDoc | null;
}

export function PageLivePreview({ initialData }: PageLivePreviewProps) {
  const page = initialData ?? { id: "" };

  const [liveData, setLiveData] = useState<PageDoc>(page);
  const readySent = useRef(false);

  useEffect(() => {
    // Send ready message to parent (Payload admin) so it starts broadcasting updates.
    if (typeof window === "undefined" || window.self === window.top) return;

    if (!readySent.current) {
      readySent.current = true;
      const target = window.opener || window.parent;
      target?.postMessage(
        { type: "payload-live-preview", ready: true },
        "*"
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
        setLiveData((prev) => ({
          ...prev,
          ...(event.data.data as PageDoc),
        }));
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const displayPage = liveData.id ? liveData : page;

  return <BlocksRenderer layout={displayPage.layout || []} />;
}
