"use client";

import { useLivePreview } from "@/hooks/use-live-preview";
import { HardwareSubNav } from "@/components/hardware/hardware-sub-nav";
import { SectionContainer } from "@/components/ui/section-container";
import { Button } from "@/components/ui/button";

const authorizedBrands = [
  { category: "SSD & Memory", brands: "Crucial, HIKVISION, Kingston, Samsung, SanDisk, TEAMGROUP, Toshiba, WD" },
  { category: "Graphics Cards", brands: "ARKTEK, Inno3D, Zotac, PNY" },
  { category: "Monitors", brands: "Aiwa, KOORUI" },
  { category: "Laptops", brands: "Dell, HP, Lenovo" },
  { category: "Accessories & Cables", brands: "UGREEN" },
  { category: "Surge Protection", brands: "Honeywell" },
  { category: "Motherboards", brands: "MSI" },
  { category: "AV & Conferencing", brands: "Nearity" },
  { category: "Networking", brands: "Wavlink" },
];

interface AuthorizedBrandsPageClientProps {
  initialData: Record<string, unknown>;
}

export function AuthorizedBrandsPageClient({ initialData }: AuthorizedBrandsPageClientProps) {
  const data = useLivePreview(initialData);

  const hero = data.hero as { headline?: string; subHeadline?: string } | undefined;
  const heroHeadline = hero?.headline || "Authorized Distribution — Guaranteed Authenticity";
  const heroSubHeadline = hero?.subHeadline || "Unlike gray-market resellers, Simal Technologies is the officially authorized distributor for every brand in our portfolio. Every product that ships from our warehouse carries full manufacturer warranty, dedicated support, and the assurance of authenticity.";

  const brands = (data.authorizedBrands as Array<{ category?: string; brands?: string }> | undefined) || authorizedBrands;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 0%, rgba(40,111,180,0.3), transparent 70%)",
          }}
        />
        <div className="container-secondary relative py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-[length:var(--font-hero-heading)] font-extrabold tracking-tight" data-live-preview="hero-headline">
              {heroHeadline}
            </h1>
            <p className="mt-6 text-[length:var(--font-body)] text-neutral-300 leading-relaxed">
              {heroSubHeadline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/hardware/product-catalog" variant="primary">
                Browse Product Catalog
              </Button>
              <Button href="/contact" variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:border-white/30">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>

      <HardwareSubNav />

      {/* Brand Categories */}
      <SectionContainer>
        <h2 className="text-[length:var(--font-heading)] font-extrabold tracking-tight text-center mb-10">
          Our Authorized Brand Portfolio
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-[length:var(--font-body)]">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-foreground">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-foreground">
                      Authorized Brands
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {brands.map((row: { category?: string; brands?: string }) => (
                    <tr key={row.category}>
                      <td className="px-6 py-4 font-semibold text-foreground">
                        {row.category}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{row.brands}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* CTA */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 50%, rgba(40,111,180,0.3), transparent 70%)",
          }}
        />
        <div className="container-primary relative py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-[length:var(--font-heading)] font-extrabold tracking-tight">
              Interested in Becoming a Partner?
            </h2>
            <p className="mt-4 text-neutral-300">
              We are always looking for new reseller and distribution partners across the Middle East, Africa, CIS, and GCC.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact/sales-inquiry" variant="primary">
                Contact Sales
              </Button>
              <Button href="/contact" variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:border-white/30">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
