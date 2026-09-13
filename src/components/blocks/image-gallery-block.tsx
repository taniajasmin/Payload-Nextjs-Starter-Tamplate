import { mediaUrl } from "@/lib/media-url";
import { cn } from "@/lib/utils";
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

/**
 * Responsive photo grid — rows and columns at every breakpoint.
 * Larger sets (7+) widen to 4 columns on desktop, smaller sets stay at 3.
 */
export function ImageGalleryBlock({ heading, images }: ImageGalleryBlockProps) {
  if (!images || images.length === 0) return null;

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

        <div
          className={cn(
            "grid gap-4 grid-cols-2 sm:grid-cols-3",
            images.length > 6 ? "lg:grid-cols-4" : "lg:grid-cols-3",
          )}
        >
          {images.map((item, i) => (
            <Reveal key={i} delay={(i % 4) * 0.08}>
              <GalleryTile item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
