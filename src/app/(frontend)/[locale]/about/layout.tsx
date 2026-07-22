import type { Metadata } from "next";
import { fetchAboutPageData } from "@/components/about/about-data";
import { AboutDataProvider } from "@/components/about/about-data-provider";
import { AboutSubNav } from "@/components/about/about-sub-nav";
import { mediaUrl } from "@/lib/media-url";

export const metadata: Metadata = {
  title: "About Simal Technologies — Premier IT Distributor in Dubai, UAE (20+ Years)",
  description:
    "Learn about Simal Technologies Middle East LLC — founded 2002, 20+ years of IT distribution excellence. Authorized distributor for 20+ global brands across Middle East, Africa, CIS & GCC.",
  alternates: {
    canonical: "https://www.simalme.com/about",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/about",
    title: "About Simal Technologies — Premier IT Distributor in Dubai, UAE",
    description:
      "Learn about Simal Technologies Middle East LLC — founded 2002, 20+ years of IT distribution excellence.",
    images: [
      {
        url: "https://www.simalme.com/assets/og/about-company-overview-og.jpg",
        width: 1200,
        height: 630,
        alt: "About Simal Technologies",
      },
    ],
  },
};

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AboutLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const data = await fetchAboutPageData(locale);

  return (
    <AboutDataProvider data={data}>
      <div className="flex flex-col">
        {/* Hero */}
        <section className="relative w-full py-28 md:py-36 overflow-hidden bg-slate-950">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage: `url(${mediaUrl("/assets/images/homepage/about.avif")})`,
            }}
          />
          <div className="absolute inset-0 bg-slate-950/80" />

          <div className="container-primary relative z-10">
            <div className="max-w-3xl">
              <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                {data.hero.badge}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-8 text-white">
                {data.hero.headline}
              </h1>

              <p className="text-base text-white/80 leading-relaxed">
                {data.hero.description}
              </p>
              <p className="mt-4 text-base text-white/60 leading-relaxed">
                {data.hero.secondaryDescription}
              </p>
            </div>
          </div>
        </section>

        <AboutSubNav />

        {children}

        {/* CTA */}
        <section className="relative w-full py-28 md:py-36 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-slate-950/80" />

          <div className="container-primary text-center relative z-10">
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Get in Touch
            </span>
            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl mb-6">
              {data.cta.heading}
            </h2>
            <p className="text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
              {data.cta.description}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={data.cta.primaryHref}
                className="bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 inline-flex items-center gap-2"
              >
                {data.cta.primaryLabel}
              </a>
              <a
                href={data.cta.secondaryHref}
                className="border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 inline-flex items-center gap-2"
              >
                {data.cta.secondaryLabel}
              </a>
            </div>
          </div>
        </section>
      </div>
    </AboutDataProvider>
  );
}
