import { RichText } from "@payloadcms/richtext-lexical/react";
import * as LucideIcons from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { Reveal } from "@/components/ui/reveal";

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
    <SectionShell>
      {heading && (
        <Reveal>
          <div className="border-b border-border pb-4 mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
              {heading}
            </h2>
          </div>
        </Reveal>
      )}
      {description != null && (
        <Reveal delay={0.1}>
          <div className="rich-text-content max-w-3xl text-muted-foreground leading-relaxed mb-10">
            <RichText data={description as never} />
          </div>
        </Reveal>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {highlights.map((item, i) => {
          const IconComponent = item.icon
            ? (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[item.icon]
            : null;
          return (
            <Reveal key={i} delay={i * 0.08}>
              <div className="h-full flex gap-4 p-5 rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
                {IconComponent && (
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <IconComponent className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
