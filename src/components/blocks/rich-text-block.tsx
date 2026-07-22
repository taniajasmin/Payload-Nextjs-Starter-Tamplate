import { RichText } from "@payloadcms/richtext-lexical/react";

interface RichTextBlockProps {
  heading?: string;
  content?: unknown;
}

export function RichTextBlock({ heading, content }: RichTextBlockProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-6">
        {heading && (
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-8">
            {heading}
          </h2>
        )}
        {content != null && (
          <div className="prose prose-neutral dark:prose-invert max-w-none rich-text-content">
            <RichText data={content as never} />
          </div>
        )}
      </div>
    </section>
  );
}
