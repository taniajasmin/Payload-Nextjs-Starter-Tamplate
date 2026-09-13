import { RichText } from "@payloadcms/richtext-lexical/react";
import { Reveal } from "@/components/ui/reveal";

interface RichTextBlockProps {
  heading?: string;
  content?: unknown;
}

export function RichTextBlock({ heading, content }: RichTextBlockProps) {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <Reveal>
            <div className="border-b border-border pb-4 mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                {heading}
              </h2>
            </div>
          </Reveal>
        )}
        {content != null && (
          <Reveal delay={0.1}>
            <div className="rich-text-content text-muted-foreground leading-relaxed">
              <RichText data={content as never} />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
