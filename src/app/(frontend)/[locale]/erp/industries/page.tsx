import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCachedPayload } from "@/lib/get-payload";
import { ArrowRight, ChevronRight } from "lucide-react";
import { iconNameToComponent, colorNameToTheme } from "@/components/layout/navigation-data";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { createElement } from "react";

interface Props {
  params: Promise<{ locale: string }>;
}

interface IndustryCard {
  title: string;
  slug: string;
  tagline?: string;
  icon?: string;
  iconColor?: string;
}

/* ------------------------------------------------------------------
   Metadata
   ------------------------------------------------------------------ */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "erp-industries" as any,
      where: { status: { equals: "published" } },
      limit: 1,
      locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
      draft: false,
      overrideAccess: true,
    });
    const doc = result.docs[0] as unknown as Record<string, unknown> | undefined;
    const meta = doc?.meta as { title?: string; description?: string } | undefined;
    if (meta?.title) {
      return { title: meta.title, description: meta.description || "" };
    }
  } catch {
    // fallback
  }

  return {
    title: "ERP Industry Solutions — Simal Technologies",
    description:
      "UniERP configured for 8+ industry verticals including healthcare, education, government, retail, manufacturing, and more.",
  };
}

/* ------------------------------------------------------------------
   Page
   ------------------------------------------------------------------ */

export default async function ErpIndustriesPage({ params }: Props) {
  const { locale } = await params;

  let industries: IndustryCard[] = [];

  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "erp-industries" as any,
      where: { status: { equals: "published" } },
      locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
      sort: "title",
      limit: 20,
      draft: false,
      overrideAccess: true,
    });
    industries = result.docs.map((doc) => {
      const d = doc as unknown as IndustryCard;
      return { title: d.title, slug: d.slug, tagline: d.tagline, icon: d.icon, iconColor: d.iconColor };
    });
  } catch {
    // Payload not available
  }

  if (industries.length === 0) {
    // Try the pages collection as fallback
    try {
      const payload = await getCachedPayload();
      const result = await payload.find({
        collection: "pages",
        where: { slug: { equals: "erp/industries" }, status: { equals: "published" } },
        limit: 1,
        locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
        draft: false,
        overrideAccess: true,
      });
      if (result.docs.length === 0) notFound();

      // Render generic page fallback
      const page = result.docs[0] as unknown as { title?: string; excerpt?: string };
      return (
        <div className="flex flex-col">
          <SectionContainer variant="default">
            <div className="max-w-4xl mx-auto text-center py-20">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
                {page.title || "Industry Solutions"}
              </h1>
              {page.excerpt && (
                <p className="text-muted-foreground">{page.excerpt}</p>
              )}
              <p className="mt-8 text-muted-foreground text-sm">
                Industry pages are being configured. Please check back soon.
              </p>
            </div>
          </SectionContainer>
        </div>
      );
    } catch {
      notFound();
    }
  }

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative w-full py-28 md:py-36 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-slate-950/80" />

        <div className="container-primary relative z-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
              <li>
                <Link href="/erp" className="transition-colors hover:text-primary">
                  ERP
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3 h-3" />
              </li>
              <li>
                <span className="font-semibold text-white/70">Industries</span>
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-white">
              Industry Solutions
            </h1>
            <p className="mt-5 text-base text-white/70 leading-relaxed">
              UniERP is pre-configured for 8+ industry verticals. Each
              configuration maps modules, workflows, and compliance rules to the
              specific requirements of your sector.
            </p>
          </div>
        </div>
      </section>

      {/* ── Industry Grid ── */}
      <SectionContainer variant="default">
        <SectionHeading
          eyebrow="Industries"
          title="Solutions by Industry"
          align="center"
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => {
            const IconComp = ind.icon ? iconNameToComponent[ind.icon] : null;
            const colors = ind.iconColor
              ? colorNameToTheme[ind.iconColor]
              : null;

            return (
              <Link
                key={ind.slug}
                href={`/erp/industries/${ind.slug}`}
                className="group border border-border bg-card p-6 md:p-8 flex flex-col transition-colors hover:border-primary/50"
              >
                {IconComp && (
                  <div
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-lg mb-4 ${
                      colors?.bg ?? "bg-primary/10"
                    }`}
                  >
                    {createElement(IconComp, {
                      className: `w-5 h-5 ${colors?.icon ?? "text-primary"}`,
                    })}
                  </div>
                )}
                <h2 className="text-lg font-bold text-foreground leading-[1.1] tracking-tight group-hover:text-primary transition-colors">
                  {ind.title}
                </h2>
                {ind.tagline && (
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {ind.tagline}
                  </p>
                )}
                <div className="mt-4 pt-4 border-t border-border flex items-center text-sm font-semibold text-primary">
                  <span>Explore Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </SectionContainer>
    </div>
  );
}
