import { mediaUrl } from "@/lib/media-url";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface HeroBlockProps {
  backgroundImage?: { url?: string; alt?: string };
  headline?: string;
  subHeadline?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

/**
 * Simal-style hero. With a background image the photo sits under a dark
 * slate overlay with white display type; without one the hero falls back
 * to a light token-driven band (dot-grid texture on `bg-muted`) so
 * imageless pages stay light. Headline accent: last two words in primary
 * ("plain ACCENT plain" pattern).
 */
export function HeroBlock({
  backgroundImage,
  headline,
  subHeadline,
  ctaLabel,
  ctaLink,
}: HeroBlockProps) {
  const hasImage = Boolean(backgroundImage?.url);

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

  // Two-thirds of the viewport — enough presence without swallowing
  // the first content section below the fold.
  return (
    <section
      className={cn(
        "relative flex items-center overflow-hidden min-h-[66.67vh]",
        hasImage ? "bg-slate-950" : "bg-muted",
      )}
    >
      {hasImage ? (
        <>
          <img
            src={mediaUrl(backgroundImage!.url!)}
            alt={backgroundImage!.alt || ""}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/60 to-slate-950/30"
            aria-hidden="true"
          />
        </>
      ) : (
        <div className="dot-grid-pattern absolute inset-0" aria-hidden="true" />
      )}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          {headline && (
            <Reveal>
              <h1
                className={cn(
                  "text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]",
                  hasImage ? "text-white" : "text-foreground",
                )}
              >
                {renderHeadline(headline)}
              </h1>
            </Reveal>
          )}
          {subHeadline && (
            <Reveal delay={0.15}>
              <p
                className={cn(
                  "mt-6 text-lg leading-relaxed max-w-xl",
                  hasImage ? "text-white/80" : "text-muted-foreground",
                )}
              >
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
