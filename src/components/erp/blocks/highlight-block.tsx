"use client";

import { RichTextRenderer } from "@/components/erp/rich-text-renderer";
import { SectionHeading, IconBox } from "./utils";

interface Highlight {
  id?: string;
  icon?: string;
  title: string;
  description?: string;
}

interface HighlightBlockData {
  heading?: string;
  description?: unknown;
  highlights?: Highlight[];
}

export function HighlightBlock({ data }: { data: HighlightBlockData }) {
  const hasHighlights = data.highlights && data.highlights.length > 0;

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />
      <div className="container relative z-10 mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <SectionHeading heading={data.heading} />
        {data.description != null && (
          <div className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground rich-text-content">
            <RichTextRenderer data={data.description} />
          </div>
        )}

        {hasHighlights && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.highlights!.map((item, i) => (
              <div
                key={item.id ?? i}
                className="flex h-full flex-col border border-border bg-card p-8"
              >
                <IconBox icon={item.icon} />
                <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
