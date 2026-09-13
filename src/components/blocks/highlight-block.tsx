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
    <SectionShell variant="dark">
      {heading && (
        <Reveal>
          <div className="border-b border-white/10 pb-4 mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {heading}
            </h2>
          </div>
        </Reveal>
      )}
      {description != null && (
        <Reveal delay={0.1}>
          <div className="rich-text-content max-w-3xl text-white/70 leading-relaxed mb-10">
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
              <div className="flex gap-4 p-4 rounded-lg transition-colors duration-300 hover:bg-white/5">
                {IconComponent && (
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <IconComponent className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-white/70 leading-relaxed">
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
