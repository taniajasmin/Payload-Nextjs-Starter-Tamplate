import { mediaUrl } from "@/lib/media-url";

interface HeroBlockProps {
  backgroundImage?: { url?: string; alt?: string };
  headline?: string;
  subHeadline?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export function HeroBlock({
  backgroundImage,
  headline,
  subHeadline,
  ctaLabel,
  ctaLink,
}: HeroBlockProps) {
  return (
    <section className="relative flex items-center justify-center min-h-[60vh] overflow-hidden bg-neutral-900">
      {backgroundImage?.url && (
        <img
          src={mediaUrl(backgroundImage.url)}
          alt={backgroundImage.alt || ""}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      )}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        {headline && (
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {headline}
          </h1>
        )}
        {subHeadline && (
          <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            {subHeadline}
          </p>
        )}
        {ctaLabel && ctaLink && (
          <a
            href={ctaLink}
            className="mt-8 inline-block px-8 py-3 bg-white text-neutral-900 rounded-lg font-semibold hover:bg-neutral-100 transition-colors"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}
