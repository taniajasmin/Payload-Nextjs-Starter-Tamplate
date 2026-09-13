import * as LucideIcons from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { Reveal } from "@/components/ui/reveal";

interface FeatureCard {
  icon?: string;
  title: string;
  description?: string;
}

interface FeatureCardsBlockProps {
  heading?: string;
  cards?: FeatureCard[];
}

export function FeatureCardsBlock({ heading, cards }: FeatureCardsBlockProps) {
  if (!cards || cards.length === 0) return null;

  return (
    <SectionShell variant="muted">
      {heading && (
        <Reveal>
          <div className="flex items-end justify-between border-b border-border pb-4 mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
              {heading}
            </h2>
          </div>
        </Reveal>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => {
          const IconComponent = card.icon
            ? (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[card.icon]
            : null;
          return (
            <Reveal key={i} delay={i * 0.08}>
              <div className="h-full rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
                {IconComponent && (
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-5">
                    <IconComponent className="w-6 h-6" />
                  </div>
                )}
                <h3 className="text-lg font-bold text-foreground">{card.title}</h3>
                {card.description && (
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
