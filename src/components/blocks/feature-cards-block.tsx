import * as LucideIcons from "lucide-react";

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
    <section className="py-16 sm:py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6">
        {heading && (
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-center mb-12">
            {heading}
          </h2>
        )}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const IconComponent = card.icon
              ? (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[card.icon]
              : null;
            return (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {IconComponent && (
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                {card.description && (
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
