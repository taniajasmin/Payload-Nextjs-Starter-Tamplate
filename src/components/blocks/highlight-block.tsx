import { RichText } from "@payloadcms/richtext-lexical/react";
import * as LucideIcons from "lucide-react";

interface Highlight {
  icon?: string;
  title: string;
  description?: string;
}

interface HighlightBlockProps {
  heading?: string;
  description?: unknown;
  highlights?: Highlight[];
}

export function HighlightBlock({
  heading,
  description,
  highlights,
}: HighlightBlockProps) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          {heading && (
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              {heading}
            </h2>
          )}
          {description != null && (
            <div className="mt-4 prose prose-neutral dark:prose-invert max-w-none rich-text-content">
              <RichText data={description as never} />
            </div>
          )}
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {highlights.map((item, i) => {
            const IconComponent = item.icon
              ? (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[item.icon]
              : null;
            return (
              <div key={i} className="flex gap-4 p-4">
                {IconComponent && (
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <IconComponent className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
