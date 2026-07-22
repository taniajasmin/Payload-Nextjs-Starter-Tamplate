"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { ErpModuleRenderer } from "@/components/erp/erp-module-renderer";

interface LayoutBlock {
  blockType: string;
  id?: string;
  [key: string]: unknown;
}

interface PageDoc {
  id: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: unknown;
  layout?: LayoutBlock[];
  hero?: {
    headline?: string;
    subHeadline?: string;
    backgroundImage?: { url?: string; alt?: string };
    ctaLabel?: string;
    ctaLink?: string;
  };
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
    // Skip the handshake when the page is browsed stand-alone.
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

  // Use dynamic layout blocks when available
  if (displayPage.layout && displayPage.layout.length > 0) {
    return (
      <>
        <ErpModuleRenderer layout={displayPage.layout} />
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/erp"
            className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            ← Back to ERP Platform
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-[var(--gutter-mobile)] sm:px-[var(--gutter-sm)] lg:px-[var(--gutter-lg)] py-12">
      {/* Hero Section */}
      {(displayPage.hero?.headline || displayPage.hero?.subHeadline) && (
        <div className="mb-10 p-8 bg-neutral-900 text-white rounded-2xl">
          {displayPage.hero.headline && (
            <h1 className="text-[length:var(--font-hero-heading)] font-bold tracking-tight">
              {displayPage.hero.headline}
            </h1>
          )}
          {displayPage.hero.subHeadline && (
            <p className="mt-4 text-[length:var(--font-body)] text-neutral-300 leading-relaxed">
              {displayPage.hero.subHeadline}
            </p>
          )}
          {displayPage.hero.ctaLabel && displayPage.hero.ctaLink && (
            <a
              href={displayPage.hero.ctaLink}
              className="mt-6 inline-block px-5 py-2.5 bg-white text-neutral-900 rounded-lg font-medium hover:bg-neutral-100 transition"
            >
              {displayPage.hero.ctaLabel}
            </a>
          )}
        </div>
      )}

      {/* Title & Excerpt (only show if no hero headline) */}
      {!displayPage.hero?.headline && (
        <header className="mb-10">
          <h1 className="text-[length:var(--font-hero-heading)] font-bold tracking-tight">
            {displayPage.title}
          </h1>
          {displayPage.excerpt && (
            <p className="mt-4 text-[length:var(--font-body)] text-neutral-600">{displayPage.excerpt}</p>
          )}
        </header>
      )}

      {/* Excerpt shown below hero if hero exists */}
      {displayPage.hero?.headline && displayPage.excerpt && (
        <p className="mb-10 text-[length:var(--font-body)] text-neutral-600">{displayPage.excerpt}</p>
      )}

      {/* Content */}
      {displayPage.content != null && (
        <article className="prose prose-neutral max-w-none rich-text-content">
          <RichText data={displayPage.content as never} />
        </article>
      )}
    </div>
  );
}
