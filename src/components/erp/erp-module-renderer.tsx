"use client";

import { HeroBlock } from "./blocks/hero-block";
import { RichTextBlock } from "./blocks/rich-text-block";
import { FeatureCardsBlock } from "./blocks/feature-cards-block";
import { HighlightBlock } from "./blocks/highlight-block";
import { CtaBlock } from "./blocks/cta-block";

interface LayoutBlock {
  blockType: string;
  [key: string]: unknown;
}

const blockRenderers: Record<
  string,
  React.ComponentType<{ data: Record<string, unknown> }>
> = {
  heroBlock: HeroBlock,
  richTextBlock: RichTextBlock,
  featureCardsBlock: FeatureCardsBlock,
  highlightBlock: HighlightBlock,
  ctaBlock: CtaBlock,
};

interface ErpModuleRendererProps {
  layout: LayoutBlock[];
}

export function ErpModuleRenderer({ layout }: ErpModuleRendererProps) {
  return (
    <div className="flex flex-col">
      {layout.map((block, i) => {
        const Renderer = blockRenderers[block.blockType];
        if (!Renderer) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`Unknown block type: ${block.blockType}`);
          }
          return null;
        }

        return (
          <Renderer
            key={(block.id as string) ?? i}
            data={block as unknown as Record<string, unknown>}
          />
        );
      })}
    </div>
  );
}
