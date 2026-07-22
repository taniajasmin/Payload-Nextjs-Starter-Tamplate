"use client";

import { IconBox, SectionCard } from "./utils";

interface FeatureCard {
  id?: string;
  icon?: string;
  title: string;
  description?: string;
}

interface FeatureCardsBlockData {
  heading?: string;
  cards?: FeatureCard[];
}

export function FeatureCardsBlock({ data }: { data: FeatureCardsBlockData }) {
  if (!data.cards || data.cards.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {data.heading && (
          <h2 className="mb-8 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
            {data.heading}
          </h2>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.cards.map((card, i) => (
            <SectionCard key={card.id ?? i}>
              <IconBox icon={card.icon} />
              <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground">
                {card.title}
              </h3>
              {card.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              )}
            </SectionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
