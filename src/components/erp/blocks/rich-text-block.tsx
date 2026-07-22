"use client";

import { RichTextRenderer } from "@/components/erp/rich-text-renderer";

interface RichTextBlockData {
  heading?: string;
  content?: unknown;
}

export function RichTextBlock({ data }: { data: RichTextBlockData }) {
  if (!data.content) return null;

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {data.heading && (
          <h2 className="mb-8 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
            {data.heading}
          </h2>
        )}
        <div className="max-w-3xl text-sm leading-relaxed text-muted-foreground rich-text-content">
          <RichTextRenderer data={data.content} />
        </div>
      </div>
    </section>
  );
}
