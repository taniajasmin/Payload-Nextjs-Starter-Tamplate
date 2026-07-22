import { mediaUrl } from "@/lib/media-url";

interface GalleryImage {
  image?: { url?: string; alt?: string };
  caption?: string;
}

interface ImageGalleryBlockProps {
  heading?: string;
  images?: GalleryImage[];
}

export function ImageGalleryBlock({ heading, images }: ImageGalleryBlockProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {heading && (
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-center mb-12">
            {heading}
          </h2>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl border border-border bg-card"
            >
              {item.image?.url ? (
                <img
                  src={mediaUrl(item.image.url)}
                  alt={item.image.alt || item.caption || ""}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-muted text-muted-foreground">
                  No image
                </div>
              )}
              {item.caption && (
                <div className="p-3">
                  <p className="text-sm text-muted-foreground">{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
