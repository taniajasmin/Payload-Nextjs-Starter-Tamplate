import { mediaUrl } from "@/lib/media-url";
import { MarqueeStrip } from "@/components/ui/marquee-strip";
import { Reveal } from "@/components/ui/reveal";

interface GalleryImage {
  image?: { url?: string; alt?: string };
  caption?: string;
}

interface ImageGalleryBlockProps {
  heading?: string;
  images?: GalleryImage[];
}

function GalleryTile({ item }: { item: GalleryImage }) {
  return (
    <figure className="group w-full">
      <div className="flex items-center justify-center aspect-[3/2] border border-border bg-card p-4 transition-colors duration-300 group-hover:border-primary/40">
        {item.image?.url ? (
          <img
            src={mediaUrl(item.image.url)}
            alt={item.image.alt || item.caption || ""}
            className="w-full h-full object-contain grayscale-[20%] opacity-80 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
            loading="lazy"
          />
        ) : (
          <span className="text-sm text-muted-foreground">No image</span>
        )}
      </div>
      {item.caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function ImageGalleryBlock({ heading, images }: ImageGalleryBlockProps) {
  if (!images || images.length === 0) return null;

  const marquee = images.length > 6;

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <Reveal>
            <div className="border-b border-border pb-4 mb-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                {heading}
              </h2>
            </div>
          </Reveal>
        )}

        {marquee ? (
          // Long galleries become a Simal-style trust band: an auto-scrolling
          // marquee (pauses on hover) instead of an ever-growing grid.
          <MarqueeStrip className="py-2" trackClassName="gap-6 pr-6">
            {images.map((item, i) => (
              <div key={i} className="w-56 shrink-0 sm:w-64">
                <GalleryTile item={item} />
              </div>
            ))}
          </MarqueeStrip>
        ) : (
          <div
            className={
              images.length >= 5
                ? "grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
                : "grid gap-4 grid-cols-2 sm:grid-cols-3"
            }
          >
            {images.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <GalleryTile item={item} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
