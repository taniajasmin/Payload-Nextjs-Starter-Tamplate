import { HeroBlock } from "./hero-block";
import { RichTextBlock } from "./rich-text-block";
import { FeatureCardsBlock } from "./feature-cards-block";
import { HighlightBlock } from "./highlight-block";
import { CTABlock } from "./cta-block";
import { ImageGalleryBlock } from "./image-gallery-block";
import { StatsCounterBlock } from "./stats-counter-block";

export interface LayoutBlock {
  blockType: string;
  id?: string;
  [key: string]: unknown;
}

interface BlocksRendererProps {
  layout: LayoutBlock[];
  /** Landing page flag — currently gives the hero the animated koi scene. */
  isHome?: boolean;
}

/**
 * Maps each Payload block type to its React component.
 * To add a new block type:
 * 1. Add it to the Pages collection's `layout.blocks` array
 * 2. Create the component in this directory
 * 3. Add a case to the switch below
 */
export function BlocksRenderer({ layout, isHome }: BlocksRendererProps) {
  if (!layout || layout.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-muted-foreground">
        <p>This page has no content yet. Add blocks in the admin panel.</p>
      </div>
    );
  }

  return (
    <>
      {layout.map((block, index) => {
        const key = block.id || `${block.blockType}-${index}`;
        switch (block.blockType) {
          case "heroBlock":
            return <HeroBlock key={key} {...block} koi={isHome} />;
          case "richTextBlock":
            return <RichTextBlock key={key} {...block} />;
          case "featureCardsBlock":
            return <FeatureCardsBlock key={key} {...block} />;
          case "highlightBlock":
            return <HighlightBlock key={key} {...block} />;
          case "ctaBlock":
            return <CTABlock key={key} {...block} />;
          case "imageGalleryBlock":
            return <ImageGalleryBlock key={key} {...block} />;
          case "statsCounterBlock":
            return <StatsCounterBlock key={key} {...block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
