import { mediaUrl } from "@/lib/media-url";
import { Reveal } from "@/components/ui/reveal";

interface HeroBlockProps {
  backgroundImage?: { url?: string; alt?: string };
  headline?: string;
  subHeadline?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

/**
 * Simal-style hero: full-bleed image under a dark slate overlay, left-aligned
 * display headline with the trailing words picked out in the accent color
 * ("plain ACCENT plain" pattern), and a staggered entrance reveal.
 */
export function HeroBlock({
  backgroundImage,
  headline,
  subHeadline,
  ctaLabel,
  ctaLink,
}: HeroBlockProps) {
  // "plain ACCENT plain" — accent the last two words of longer headlines
  const renderHeadline = (text: string) => {
    const words = text.split(" ");
    if (words.length <= 2) return <>{text}</>;
    return (
      <>
        {words.slice(0, -2).join(" ")}{" "}
        <span className="text-primary">
          {words.slice(-2).join(" ")}
        </span>
      </>
    );
  };

  return (
    // Two-thirds of the viewport — enough presence without swallowing
    // the first content section below the fold.
    <section className="relative flex items-center overflow-hidden min-h-[66.67vh] bg-slate-950">
      {backgroundImage?.url && (
        <>
          <img
            src={mediaUrl(backgroundImage.url)}
            alt={backgroundImage.alt || ""}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/60 to-slate-950/30"
            aria-hidden="true"
          />
        </>
      )}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          {headline && (
            <Reveal>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                {renderHeadline(headline)}
              </h1>
            </Reveal>
          )}
          {subHeadline && (
            <Reveal delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-white/80 max-w-xl">
                {subHeadline}
              </p>
            </Reveal>
          )}
          {ctaLabel && ctaLink && (
            <Reveal delay={0.3}>
              <a
                href={ctaLink}
                className="mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {ctaLabel}
                <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
