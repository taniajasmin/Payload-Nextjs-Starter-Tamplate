import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCachedPayload } from "@/lib/get-payload";

import {
  ChevronRight,
  Tag,
  Info,
  Check,
  Monitor,
  Zap,
  Timer,
  Maximize2,
  Sun,
  Waves,
  Move,
  Cable,
  HardDrive,
  Cpu,
  Eye,
  Wifi,
  Battery,
  Headphones,
  MousePointer2,
  Aperture,
  Layers,
  Scan,
  Sparkles,
  SwitchCamera,
  Projector,
} from "lucide-react";

import { type Product } from "@/lib/product-config";
import { fetchProductsByCategory } from "@/lib/fetch-products";
import {
  ProductGallery,
  ProductActions,
} from "@/components/products/product-detail-client";
import { ProductGridCard } from "@/components/products/product-grid-card";

// ─── Types ─────────────────────────────────────────────────────────────

interface ProductDetailPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

// ─── Helper: fetch product from CMS ────────────────────────────────────

async function getProductBySlug(
  slug: string,
  locale: string,
): Promise<Product | null> {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "products",
      where: { slug: { equals: slug } },
      depth: 2,
      locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
      limit: 1,
    });

    const productData = result.docs[0] as unknown as Record<string, unknown> | undefined;
    if (productData) {
      const brandData = productData.brand as Record<string, unknown> | undefined;
      const categoryData = productData.category as Record<string, unknown> | undefined;
      const images = (productData.images as Array<Record<string, unknown>>) || [];
      const mainImage =
        (images[0]?.image as Record<string, unknown> | undefined) ??
        (productData.mainImage as Record<string, unknown> | undefined);

      return {
        id: 0,
        sku: (productData.sku as string) || "",
        name: (productData.name as string) || "",
        slug: (productData.slug as string) || slug,
        description: (productData.description as string) || "",
        brand: (brandData?.name as string) || "",
        brandSlug: (brandData?.slug as string) || "",
        category: (categoryData?.title as string) || (categoryData?.name as string) || "",
        categorySlug: (categoryData?.slug as string) || "",
        image: (mainImage?.url as string) || "",
        gallery: images
          .map((img) => {
            const i = img.image as Record<string, unknown>;
            return (i?.url as string) || "";
          })
          .filter(Boolean),
        tags: (productData.seoKeywords as string || "")
          .split(",")
          .map((k: string) => k.trim())
          .filter(Boolean),
        attributes: (productData.specs as Record<string, string>) || undefined,
      };
    }
  } catch {
    // CMS not available
  }
  return null;
}

// ─── Helper: fetch all product slugs ───────────────────────────────────

async function getAllProductSlugs(): Promise<string[]> {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({ collection: "products", limit: 0 });
    return result.docs
      .map((doc) => (doc as unknown as Record<string, unknown>).slug as string)
      .filter(Boolean);
  } catch {
    // CMS not available
  }
  return [];
}

// ─── generateStaticParams ──────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── generateMetadata ──────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = await getProductBySlug(slug, locale);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} — ${product.brand} | Simal Technologies`,
    description: product.description,
    keywords: [
      product.brand,
      product.category,
      ...product.tags,
      "Simal Technologies",
      "Dubai",
      "UAE",
    ],
    alternates: { canonical: `https://www.simalme.com/products/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${product.brand} | Simal Technologies`,
      description: product.description.slice(0, 160),
      images: [{ url: product.image, width: 800, height: 600, alt: product.name }],
      type: "website",
    },
  };
}

// ─── Breadcrumb ────────────────────────────────────────────────────────

function Breadcrumb({ product }: { product: Product }) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 sm:py-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
        </li>
        <li>
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li>
          <Link href="/hardware/product-catalog" className="transition-colors hover:text-primary">
            Products
          </Link>
        </li>
        <li>
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li>
          <Link
            href={`/hardware/${product.categorySlug}`}
            className="transition-colors hover:text-primary"
          >
            {product.category}
          </Link>
        </li>
        <li>
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li className="max-w-[10rem] truncate font-medium text-foreground sm:max-w-xs">
          {product.name}
        </li>
      </ol>
    </nav>
  );
}

// ─── Key Features Extractor ────────────────────────────────────────────

interface FeatureItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function extractFeatures(description: string, categorySlug = ""): FeatureItem[] {
  const features: FeatureItem[] = [];
  const d = description.toLowerCase();
  const orig = description;
  const showsDisplaySize = ["monitors", "laptops"].includes(categorySlug.toLowerCase());

  const added = new Set<string>();
  const add = (key: string, icon: React.ReactNode, label: string, value: string) => {
    if (!added.has(key)) {
      added.add(key);
      features.push({ icon, label, value });
    }
  };

  const sizeMatch = orig.match(/(\d+(?:\.\d+)?)["″\s]*(?:inch)?/i);
  if (sizeMatch && showsDisplaySize) {
    const resMatch = orig.match(/FHD|HD|QHD|UHD|4K|8K|1920\s*x\s*1080|2560\s*x\s*1440/i);
    const sizeVal = sizeMatch[1] + '"' + (resMatch ? ' ' + resMatch[0].toUpperCase() : '');
    add('size', <Monitor className="h-5 w-5" />, 'Display Size', sizeVal);
  }

  const hzMatch = orig.match(/(\d+)\s*Hz/i);
  if (hzMatch) add('hz', <Zap className="h-5 w-5" />, 'Refresh Rate', hzMatch[1] + 'Hz');

  const msMatch = orig.match(/(\d+(?:\.\d+)?)\s*ms/i);
  if (msMatch) add('ms', <Timer className="h-5 w-5" />, 'Response Time', msMatch[1] + 'ms');

  const panelMatch = orig.match(/IPS|VA|TN|OLED|QLED|Mini[-\s]?LED/i);
  if (panelMatch) add('panel', <Layers className="h-5 w-5" />, 'Panel Type', panelMatch[0].toUpperCase());

  const contrastMatch = orig.match(/(\d+)[,:]1/i);
  if (contrastMatch) add('contrast', <Sun className="h-5 w-5" />, 'Contrast Ratio', contrastMatch[1] + ':1');

  const syncMatch = orig.match(/Free[-\s]?Sync|G[-\s]?Sync|Adaptive[-\s]?Sync/i);
  if (syncMatch) add('sync', <Waves className="h-5 w-5" />, 'Sync Technology', syncMatch[0]);

  if (d.includes('vesa')) add('vesa', <Move className="h-5 w-5" />, 'Mount', 'VESA Support');

  const hdrMatch = orig.match(/HDR\d*/i);
  if (hdrMatch) add('hdr', <Sparkles className="h-5 w-5" />, 'HDR', hdrMatch[0].toUpperCase());

  const ports: string[] = [];
  if (d.includes('hdmi')) ports.push('HDMI');
  if (d.includes('vga')) ports.push('VGA');
  if (d.includes('displayport') || d.includes('dp')) ports.push('DisplayPort');
  if (d.includes('usb-c') || d.includes('usb c') || d.includes('type-c')) ports.push('USB-C');
  if (d.includes('dvi')) ports.push('DVI');
  if (ports.length > 0) add('ports', <Cable className="h-5 w-5" />, 'Connectivity', ports.join(', '));

  const nitsMatch = orig.match(/(\d+)\s*(?:cd|nits)/i);
  if (nitsMatch) add('brightness', <Eye className="h-5 w-5" />, 'Brightness', nitsMatch[1] + ' nits');

  const angleMatch = orig.match(/(\d+)°/);
  if (angleMatch) add('angle', <Maximize2 className="h-5 w-5" />, 'Viewing Angle', angleMatch[1] + '°');

  const storageMatch = orig.match(/(\d+)\s*(?:TB|GB)/i);
  if (storageMatch && (d.includes('ssd') || d.includes('hdd') || d.includes('storage') || d.includes('nvme'))) {
    const type = d.includes('nvme') ? 'NVMe' : d.includes('ssd') ? 'SSD' : 'HDD';
    add('storage', <HardDrive className="h-5 w-5" />, 'Storage', storageMatch[0] + ' ' + type);
  }

  const cpuMatch = orig.match(/(?:Intel|AMD|Core i\d|Ryzen \d)/i);
  if (cpuMatch) add('cpu', <Cpu className="h-5 w-5" />, 'Processor', cpuMatch[0]);

  const ramMatch = orig.match(/(\d+)\s*GB\s*(?:RAM|DDR)/i);
  if (ramMatch) add('ram', <Cpu className="h-5 w-5" />, 'Memory', ramMatch[1] + 'GB RAM');

  const batteryMatch = orig.match(/(\d+)\s*(?:mAh|Wh)/i);
  if (batteryMatch) add('battery', <Battery className="h-5 w-5" />, 'Battery', batteryMatch[0]);

  const wireless: string[] = [];
  if (d.includes('wifi')) wireless.push('Wi-Fi');
  if (d.includes('bluetooth')) wireless.push('Bluetooth');
  if (wireless.length > 0) add('wireless', <Wifi className="h-5 w-5" />, 'Wireless', wireless.join(', '));

  if (d.includes('speaker') || d.includes('audio') || d.includes('headphone') || d.includes('3.5mm'))
    add('audio', <Headphones className="h-5 w-5" />, 'Audio', 'Built-in Audio');

  if (d.includes('touch')) add('touch', <MousePointer2 className="h-5 w-5" />, 'Input', 'Touchscreen');

  if (d.includes('webcam') || d.includes('camera') || d.includes(' IR '))
    add('camera', <Aperture className="h-5 w-5" />, 'Camera', 'Built-in Webcam');

  const lumenMatch = orig.match(/(\d+)\s*(?:lm|lumens)/i);
  if (lumenMatch || d.includes('projector'))
    add('projector', <Projector className="h-5 w-5" />, 'Brightness', lumenMatch ? lumenMatch[1] + ' lm' : 'Projector');

  const dpiMatch = orig.match(/(\d+)\s*(?:dpi|ppi)/i);
  if (dpiMatch && (d.includes('mouse') || d.includes('scanner') || d.includes('optical')))
    add('dpi', <Scan className="h-5 w-5" />, 'Resolution', dpiMatch[1] + ' DPI');

  if (d.includes('curved')) add('curved', <Monitor className="h-5 w-5" />, 'Design', 'Curved Display');

  if (d.includes('ultrawide') || d.includes('21:9') || d.includes('32:9'))
    add('ultrawide', <Maximize2 className="h-5 w-5" />, 'Aspect Ratio', 'Ultrawide');

  return features.slice(0, 8);
}

function KeyFeaturesGrid({ features }: { features: FeatureItem[] }) {
  if (features.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {features.map((feat, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center border border-border bg-card p-3 text-center transition-colors hover:border-primary/30 sm:p-4"
        >
          <div className="mb-2 flex h-9 w-9 items-center justify-center bg-primary/10 text-primary">
            {feat.icon}
          </div>
          <span className="font-semibold text-foreground leading-tight">
            {feat.value}
          </span>
          <span className="mt-0.5 text-xs text-muted-foreground">{feat.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Product Info Panel ────────────────────────────────────────────────

function ProductInfo({ product }: { product: Product }) {
  const bulletPoints = product.description
    .replace(/To Make an Enquiry.*$/i, "")
    .replace(/Make an Enquiry.*$/i, "")
    .split(/[.,]\s*/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);

  return (
    <div className="space-y-6">
      {/* Brand & Category Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
          <Tag className="mr-1.5 h-3 w-3" />
          {product.brand}
        </span>
        <Link
          href={`/hardware/${product.categorySlug}`}
          className="inline-flex items-center border border-border px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
        >
          {product.category}
        </Link>
      </div>

      {/* Product Title */}
      <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl">
        {product.name}
      </h1>

      {/* SKU */}
      {product.sku && (
        <p className="font-mono text-xs text-muted-foreground">SKU: {product.sku}</p>
      )}

      {/* Key Features Grid */}
      <KeyFeaturesGrid features={extractFeatures(product.description, product.categorySlug)} />

      {/* Description Bullet Points */}
      {bulletPoints.length > 0 && (
        <ul className="space-y-2">
          {bulletPoints.slice(0, 8).map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Product Actions — CTA panel */}
      <div className="border border-border">
        <ProductActions product={product} />
      </div>

      {/* Product Meta */}
      <div className="border border-border">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <Info className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Details
          </span>
        </div>
        <dl className="divide-y divide-border text-sm">
          <div className="flex items-center justify-between px-4 py-2.5">
            <dt className="text-xs font-medium text-muted-foreground">Category</dt>
            <dd>
              <Link
                href={`/hardware/${product.categorySlug}`}
                className="text-xs font-medium text-primary hover:underline"
              >
                {product.category}
              </Link>
            </dd>
          </div>
          <div className="flex items-center justify-between px-4 py-2.5">
            <dt className="text-xs font-medium text-muted-foreground">Brand</dt>
            <dd className="text-xs font-medium text-foreground">{product.brand}</dd>
          </div>
          {product.sku && (
            <div className="flex items-center justify-between px-4 py-2.5">
              <dt className="text-xs font-medium text-muted-foreground">SKU</dt>
              <dd className="font-mono text-xs text-foreground/80">{product.sku}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}

// ─── Description Section ────────────────────────────────────────────────

function DescriptionSection({ product }: { product: Product }) {
  return (
    <div className="max-w-none">
      {/* Section identifier bar */}
      <div className="mb-8 flex items-center gap-4 border-b border-border pb-4">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Product
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
          {product.brand}
        </span>
      </div>

      {/* Eyebrow */}
      <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
        Description
      </span>

      {/* Heading */}
      <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
        About this product
      </h2>

      {/* Description body */}
      <div className="mt-6">
        <p className="whitespace-pre-line leading-relaxed text-foreground/80">
          {product.description}
        </p>
      </div>

      {product.tags.length > 0 && (
        <div className="mt-8 border-t border-border pt-6">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Specifications Section ─────────────────────────────────────────────

function SpecificationsSection({ product }: { product: Product }) {
  const specs: { label: string; value: string }[] = [
    { label: "Brand", value: product.brand },
    { label: "Category", value: product.category },
    { label: "Product Name", value: product.name },
  ];

  if (product.sku) specs.push({ label: "SKU", value: product.sku });

  if (product.attributes) {
    for (const [key, value] of Object.entries(product.attributes)) {
      specs.push({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value,
      });
    }
  }

  const descSpecs = product.description
    .replace(/To Make an Enquiry.*$/i, "")
    .replace(/Make an Enquiry.*$/i, "")
    .replace(/Contact via.*$/i, "");

  const capacityMatch = descSpecs.match(/(\d+)\s*TB|\d+\s*GB/gi);
  if (capacityMatch)
    specs.push({ label: "Available Capacities", value: [...new Set(capacityMatch)].join(", ") });

  const speedMatch = descSpecs.match(/[\d,]+\s*MB\/s/gi);
  if (speedMatch)
    specs.push({ label: "Speed", value: [...new Set(speedMatch)].join(" / ") });

  const hzMatch = descSpecs.match(/\d+\s*Hz/gi);
  if (hzMatch)
    specs.push({ label: "Refresh Rate", value: [...new Set(hzMatch)].join(" / ") });

  const showsDisplaySize = ["monitors", "laptops"].includes(product.categorySlug.toLowerCase());
  const sizeMatch = descSpecs.match(/\d+(?:\.\d+)?["″]/g);
  if (sizeMatch && showsDisplaySize)
    specs.push({ label: "Display Size", value: [...new Set(sizeMatch)].join(" / ") });

  return (
    <div>
      {/* Section identifier bar */}
      <div className="mb-8 flex items-center gap-4 border-b border-border pb-4">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Technical
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
          {specs.length} Specs
        </span>
      </div>

      {/* Eyebrow */}
      <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
        Specifications
      </span>

      {/* Heading */}
      <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
        Technical Specifications
      </h2>

      {/* Specs table */}
      <div className="mt-8 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="min-w-[20rem] overflow-hidden border border-border">
          <table className="w-full">
            <tbody>
              {specs.map((spec, idx) => (
                <tr
                  key={spec.label}
                  className={idx % 2 === 0 ? "bg-muted/50" : "bg-card"}
                >
                  <th className="w-1/3 px-4 py-3 text-left text-sm font-semibold text-foreground sm:px-6">
                    {spec.label}
                  </th>
                  <td className="px-4 py-3 text-sm text-foreground/80 sm:px-6">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {product.tags.length > 0 && (
        <div className="mt-8 border-t border-border pt-6">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center bg-primary/10 px-3 py-1 text-xs text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Related Products ──────────────────────────────────────────────────

function RelatedProducts({ related }: { related: Product[] }) {
  if (related.length === 0) return null;

  return (
    <section className="bg-muted py-12 md:py-16 lg:py-20">
      <div className="container-primary">
        {/* Section identifier bar */}
        <div className="mb-8 flex items-center gap-4 border-b border-border pb-4">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Explore
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            {related.length} Products
          </span>
        </div>

        {/* Eyebrow */}
        <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
          Similar Items
        </span>

        {/* Heading */}
        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
          Related Products
        </h2>

        {/* Product grid — same card component as the catalog page */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {related.slice(0, 4).map((p, idx) => (
            <ProductGridCard key={p.slug} product={p} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Page Component ────────────────────────────────────────────────

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug, locale } = await params;
  const product = await getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  const categoryProducts = await fetchProductsByCategory(product.categorySlug, locale);
  const related = categoryProducts
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `https://www.simalme.com/products/${product.slug}`,
      seller: { "@type": "Organization", name: "Simal Technologies" },
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-background">
        <div className="container-primary">
          <Breadcrumb product={product} />
        </div>
      </div>

      {/* Product Hero */}
      <section className="bg-background">
        <div className="container-primary py-6 sm:py-8 md:py-12">
          <div className="grid grid-cols-1 items-start gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left: Gallery */}
            <div className="lg:col-span-5">
              <ProductGallery product={product} />
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-7">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="bg-muted">
        <div className="container-primary py-12 md:py-16 lg:py-20">
          <DescriptionSection product={product} />
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-background">
        <div className="container-primary py-12 md:py-16 lg:py-20">
          <SpecificationsSection product={product} />
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts related={related} />
    </div>
  );
}
