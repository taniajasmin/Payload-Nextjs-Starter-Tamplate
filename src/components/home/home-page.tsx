"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "animate.css";

import { registerGSAP } from "@/lib/gsap-setup";
import { useMouseLighting } from "@/hooks/use-mouse-lighting";
import { LenisProvider } from "@/components/home/providers/lenis-provider";
import { SectionSkeleton } from "@/components/ui/section-skeleton";
import WOWProvider from "@/components/home/providers/wow-provider";

import HeroEnterprise from "@/components/home/hero-enterprise";

/* ── Static imports for frequently used sections ────────────────── */
import SolutionsHighlightNew from "@/components/home/solutions-highlight-new";
import AwardsShowcaseNew from "@/components/home/awards-showcase-new";
import ErpShowcaseNew from "@/components/home/erp-showcase-new";

const TrustBand = dynamic(() => import("@/components/home/trust-band"), {
  loading: () => <SectionSkeleton className="h-16" />,
});

const ProductCategoriesNew = dynamic(
  () => import("@/components/home/product-categories-new"),
  {
    loading: () => <SectionSkeleton className="min-h-[500px]" />,
  },
);

const AuthorizedDistributorsNew = dynamic(
  () => import("@/components/home/authorized-distributors-new"),
  {
    loading: () => <SectionSkeleton className="min-h-[400px]" />,
  },
);

const TrustedPartnersNew = dynamic(
  () => import("@/components/home/trusted-partners-new"),
  {
    loading: () => <SectionSkeleton className="min-h-[400px]" />,
  },
);

const ServicesSectionNew = dynamic(
  () => import("@/components/home/services-section-new"),
  {
    loading: () => <SectionSkeleton className="min-h-[400px]" />,
  },
);

const CustomerReviewsNew = dynamic(
  () => import("@/components/home/customer-reviews-new"),
  {
    loading: () => <SectionSkeleton className="min-h-[400px]" />,
  },
);

const NewsAndBlogsNew = dynamic(
  () => import("@/components/home/news-and-blogs-new"),
  {
    loading: () => <SectionSkeleton className="min-h-[500px]" />,
  },
);

const NewsletterNew = dynamic(
  () => import("@/components/home/newsletter-new"),
  {
    loading: () => <SectionSkeleton className="min-h-[300px]" />,
  },
);

const QuickContact = dynamic(
  () =>
    import("@/components/home/quick-contact").then((m) => ({
      default: m.QuickContact,
    })),
  {
    loading: () => <SectionSkeleton className="min-h-[300px]" />,
  },
);

const TopProductsNew = dynamic(
  () => import("@/components/home/top-products-new"),
  {
    loading: () => <SectionSkeleton className="min-h-[500px]" />,
  },
);


const OurClientsNew = dynamic(
  () => import("@/components/home/our-clients-new"),
  {
    loading: () => <SectionSkeleton className="min-h-[300px]" />,
  },
);

const WhyChooseUsNew = dynamic(
  () => import("@/components/home/why-choose-us-new"),
  {
    loading: () => <SectionSkeleton className="min-h-[500px]" />,
  },
);

const CompanyIntroduction = dynamic(
  () => import("@/components/home/company-introduction"),
  {
    loading: () => <SectionSkeleton className="min-h-[500px]" />,
  },
);

const IndustriesWeServe = dynamic(
  () => import("@/components/home/industries-we-serve"),
  {
    loading: () => <SectionSkeleton className="min-h-[400px]" />,
  },
);

const CompanyIntroNew = dynamic(
  () => import("@/components/home/company-intro-new"),
  {
    loading: () => <SectionSkeleton className="min-h-[400px]" />,
  },
);

/* ─── Types ─────────────────────────────────────────────────────── */

interface SectionConfigItem {
  sectionId: string;
  visible: boolean;
}

interface HomePageProps {
  initialHomepageData: Record<string, unknown>;
  awards: unknown[];
  blogPosts: unknown[];
  testimonials?: unknown[];
  services?: import("@/lib/services-config").ServiceSummary[];
  serverURL: string;
}

/* ─── Default section order ─────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════
   Homepage Section Order — matches 01_Homepage_Content.md exactly
   ──────────────────────────────────────────────────────────────
   §1:  Hero
   §2:  Company Introduction
   §3:  Featured Products Carousel
   §4:  Brand Showcase Logo Grid
   §5:  Solutions Highlight Cards
   §6:  Awards & Recognition
   §7:  Customer Testimonials
   §8:  Latest News & Blog
   §9:  Newsletter Signup
   §10: Quick Contact Bar
   ═══════════════════════════════════════════════════════════════ */
const DEFAULT_SECTION_ORDER: SectionConfigItem[] = [
  // §1: Hero
  { sectionId: "hero", visible: true },

  // §2: Company Introduction (Content §2)
  { sectionId: "company-introduction", visible: true },

  // §3: Featured Products Carousel (Content §3)
  { sectionId: "top-products", visible: true },

  // §4: Brand Showcase Logo Grid (Content §4)
  { sectionId: "authorized-brands", visible: true },

  // §5: Solutions Highlight Cards (Content §5)
  { sectionId: "solutions-highlight", visible: true },

  // §6: Awards & Recognition (Content §6)
  { sectionId: "awards-showcase", visible: true },

  // §7: Customer Testimonials (Content §7)
  { sectionId: "customer-reviews", visible: true },

  // §8: Latest News & Blog (Content §8)
  { sectionId: "news-and-blogs", visible: true },

  // §9: Newsletter Signup (Content §9)
  { sectionId: "newsletter", visible: true },

  // §10: Quick Contact Bar (Content §10)
  { sectionId: "quick-contact", visible: true },

  // ── Sections NOT in content document (hidden) ─────────────
  { sectionId: "trust-band", visible: false },
  { sectionId: "product-categories", visible: false },
  { sectionId: "erp-showcase", visible: false },
  { sectionId: "services", visible: false },
  { sectionId: "company-intro", visible: false },
  { sectionId: "trusted-partners", visible: false },
  { sectionId: "our-clients", visible: false },
  { sectionId: "why-choose-us", visible: false },
  { sectionId: "industries-we-serve", visible: false },
];

/* ─── Section ID union ──────────────────────────────────────────── */

type SectionId =
  | "hero"
  | "trust-band"
  | "product-categories"
  | "top-products"
  | "company-introduction"
  | "industries-we-serve"
  | "erp-showcase"
  | "authorized-brands"
  | "trusted-partners"
  | "why-choose-us"
  | "services"
  | "solutions-highlight"
  | "pre-sales-compiler"
  | "awards-showcase"
  | "company-intro"
  | "customer-reviews"
  | "news-and-blogs"
  | "newsletter"
  | "quick-contact"
  | "our-clients";

/* ─── Helper: safely cast a slice of homepageData ───────────────── */

function asRecord(val: unknown): Record<string, unknown> | undefined {
  if (val && typeof val === "object" && !Array.isArray(val)) {
    return val as Record<string, unknown>;
  }
  return undefined;
}

function asArray(val: unknown): unknown[] {
  if (Array.isArray(val)) return val;
  return [];
}

/* ─── Main Component ────────────────────────────────────────────── */

export function HomePage({
  initialHomepageData,
  awards,
  blogPosts,
  testimonials,
  services = [],
}: HomePageProps) {
  const [homepageData, setHomepageData] =
    useState<Record<string, unknown>>(initialHomepageData);
  const readySent = useRef(false);
  const { containerRef } = useMouseLighting();

  // Register GSAP once
  useEffect(() => {
    registerGSAP();
  }, []);

  // Payload CMS Live Preview — only run inside the admin iframe.
  useEffect(() => {
    if (typeof window === "undefined" || window.self === window.top) return;

    if (!readySent.current) {
      readySent.current = true;
      const target = window.opener || window.parent;
      target?.postMessage({ type: "payload-live-preview", ready: true }, "*");
    }

    const onMessage = (event: MessageEvent) => {
      if (
        !event.data ||
        typeof event.data !== "object" ||
        event.data.type !== "payload-live-preview"
      ) {
        return;
      }

      if (event.data.data) {
        setHomepageData((prev) => ({
          ...prev,
          ...(event.data.data as Record<string, unknown>),
        }));
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  /* ── Resolve section order from CMS or fallback ─────────────── */
  const rawSectionConfig = homepageData?.sectionConfig as
    | SectionConfigItem[]
    | undefined;
  const sectionConfig: SectionConfigItem[] =
    rawSectionConfig && rawSectionConfig.length > 0
      ? rawSectionConfig
      : DEFAULT_SECTION_ORDER;

  let visibleSections = sectionConfig.filter((s) => s.visible);

  /* ═════════════════════════════════════════════════════════════
     Smart Section Injection
     ─────────────────────────────────────────────────────────────
     Ensures each section follows the content document order.
     Only document-listed sections are auto-injected when missing.
     ═════════════════════════════════════════════════════════════ */

  // §2: Company Introduction always follows Hero
  const heroIndex = visibleSections.findIndex((s) => s.sectionId === "hero");
  const hasCompanyIntroduction = visibleSections.some(
    (s) => s.sectionId === "company-introduction",
  );
  if (!hasCompanyIntroduction && heroIndex !== -1) {
    visibleSections = [
      ...visibleSections.slice(0, heroIndex + 1),
      { sectionId: "company-introduction", visible: true },
      ...visibleSections.slice(heroIndex + 1),
    ];
  }

  // §3: Featured Products after Company Introduction
  const companyIntroductionIndex = visibleSections.findIndex(
    (s) => s.sectionId === "company-introduction",
  );
  const hasTopProducts = visibleSections.some(
    (s) => s.sectionId === "top-products",
  );
  if (!hasTopProducts && companyIntroductionIndex !== -1) {
    visibleSections = [
      ...visibleSections.slice(0, companyIntroductionIndex + 1),
      { sectionId: "top-products", visible: true },
      ...visibleSections.slice(companyIntroductionIndex + 1),
    ];
  }

  // §4: Brand Showcase after Featured Products
  const topProductsIndex = visibleSections.findIndex(
    (s) => s.sectionId === "top-products",
  );
  const hasAuthorizedBrands = visibleSections.some(
    (s) => s.sectionId === "authorized-brands",
  );
  if (!hasAuthorizedBrands && topProductsIndex !== -1) {
    visibleSections = [
      ...visibleSections.slice(0, topProductsIndex + 1),
      { sectionId: "authorized-brands", visible: true },
      ...visibleSections.slice(topProductsIndex + 1),
    ];
  }

  // §5: Solutions Highlight after Brand Showcase
  const authBrandsIndex = visibleSections.findIndex(
    (s) => s.sectionId === "authorized-brands",
  );
  const hasSolutionsHighlight = visibleSections.some(
    (s) => s.sectionId === "solutions-highlight",
  );
  if (!hasSolutionsHighlight && authBrandsIndex !== -1) {
    visibleSections = [
      ...visibleSections.slice(0, authBrandsIndex + 1),
      { sectionId: "solutions-highlight", visible: true },
      ...visibleSections.slice(authBrandsIndex + 1),
    ];
  }

  // §6: Awards after Solutions Highlight
  const solutionsIndex = visibleSections.findIndex(
    (s) => s.sectionId === "solutions-highlight",
  );
  const hasAwardsShowcase = visibleSections.some(
    (s) => s.sectionId === "awards-showcase",
  );
  if (!hasAwardsShowcase && solutionsIndex !== -1) {
    visibleSections = [
      ...visibleSections.slice(0, solutionsIndex + 1),
      { sectionId: "awards-showcase", visible: true },
      ...visibleSections.slice(solutionsIndex + 1),
    ];
  }

  // §7: Testimonials after Awards
  const awardsShowcaseIdx = visibleSections.findIndex(
    (s) => s.sectionId === "awards-showcase",
  );
  const hasCustomerReviews = visibleSections.some(
    (s) => s.sectionId === "customer-reviews",
  );
  if (!hasCustomerReviews && awardsShowcaseIdx !== -1) {
    visibleSections = [
      ...visibleSections.slice(0, awardsShowcaseIdx + 1),
      { sectionId: "customer-reviews", visible: true },
      ...visibleSections.slice(awardsShowcaseIdx + 1),
    ];
  }

  // §8: News & Blog after Testimonials
  const reviewsIndex = visibleSections.findIndex(
    (s) => s.sectionId === "customer-reviews",
  );
  const hasNewsAndBlogs = visibleSections.some(
    (s) => s.sectionId === "news-and-blogs",
  );
  if (!hasNewsAndBlogs && reviewsIndex !== -1) {
    visibleSections = [
      ...visibleSections.slice(0, reviewsIndex + 1),
      { sectionId: "news-and-blogs", visible: true },
      ...visibleSections.slice(reviewsIndex + 1),
    ];
  }

  // §9: Newsletter after News & Blog
  const newsIndex = visibleSections.findIndex(
    (s) => s.sectionId === "news-and-blogs",
  );
  const hasNewsletter = visibleSections.some(
    (s) => s.sectionId === "newsletter",
  );
  if (!hasNewsletter && newsIndex !== -1) {
    visibleSections = [
      ...visibleSections.slice(0, newsIndex + 1),
      { sectionId: "newsletter", visible: true },
      ...visibleSections.slice(newsIndex + 1),
    ];
  }

  // §10: Quick Contact after Newsletter
  const newsletterIndex = visibleSections.findIndex(
    (s) => s.sectionId === "newsletter",
  );
  const hasQuickContact = visibleSections.some(
    (s) => s.sectionId === "quick-contact",
  );
  if (!hasQuickContact && newsletterIndex !== -1) {
    visibleSections = [
      ...visibleSections.slice(0, newsletterIndex + 1),
      { sectionId: "quick-contact", visible: true },
      ...visibleSections.slice(newsletterIndex + 1),
    ];
  }

  // Note: Supplementary sections (trust-band, product-categories, erp-showcase,
  // services, company-intro, trusted-partners, our-clients, why-choose-us,
  // industries-we-serve) are NOT auto-injected. They only appear if explicitly
  // enabled in the CMS section config.

  /* ── Extract CMS data for each section ──────────────────────── */

  // Hero
  const heroContent = asRecord(homepageData?.heroContent);
  const heroProducts = asArray(
    (heroContent as Record<string, unknown> | undefined)?.heroProducts,
  );
  const heroBackgroundImage = asRecord(homepageData?.heroBackgroundImage);

  // Product Categories
  const productCategoriesSection = asRecord(
    homepageData?.productCategoriesSection,
  );
  const productCategories = asArray(homepageData?.productCategories);

  // Top Products
  const topProductsSection = asRecord(homepageData?.topProductsSection);
  const topProductsList = asArray(homepageData?.topProductsList);

  // Pre-Sales Compiler
  const preSalesCompilerSection = asRecord(
    homepageData?.preSalesCompilerSection,
  );

  // Brand Showcase
  const brandShowcaseSection = asRecord(homepageData?.brandShowcaseSection);
  const featuredBrands = asArray(homepageData?.featuredBrands);

  // Why Choose Us
  const whyChooseUsSection = asRecord(homepageData?.whyChooseUsSection);

  // Services
  const servicesSection = asRecord(homepageData?.servicesSection);

  // Company Intro
  const companyIntroSection = asRecord(homepageData?.companyIntroSection);

  // Company Introduction
  const companyIntroductionSection = asRecord(
    homepageData?.companyIntroductionSection,
  );

  // Industries We Serve
  const industriesSection = asRecord(homepageData?.industriesSection);

  // Trusted Partners
  const trustedPartnersSection = asRecord(homepageData?.trustedPartnersSection);

  // Testimonials
  const testimonialsSection = asRecord(homepageData?.testimonialsSection);
  const featuredTestimonials = asArray(homepageData?.featuredTestimonials);
  // All active testimonials from the collection (auto-shown when none are
  // hand-picked in the Homepage global's featuredTestimonials field).
  const activeTestimonials = asArray(testimonials);

  // Latest News
  const latestNewsSection = asRecord(homepageData?.latestNewsSection);

  // Solutions Highlight (Two Pillars)
  const solutionsHighlightSection = asRecord(
    homepageData?.solutionsHighlightSection,
  );
  const solutionsHighlightAwards = asArray(
    homepageData?.solutionsHighlightAwards,
  );

  // Awards Showcase
  const awardsShowcaseSection = asRecord(homepageData?.awardsShowcaseSection);
  // All active awards from the collection (auto-shown when none are
  // hand-picked in the Homepage global's solutionsHighlightAwards field).
  const activeAwards = asArray(awards);

  // Quick Contact
  const quickContactSection = asRecord(homepageData?.quickContactSection);

  // Our Clients
  const ourClientsSection = asRecord(homepageData?.ourClientsSection);
  const ourClientsBrands = asArray(homepageData?.ourClientsBrands);

  // Newsletter
  const newsletterSection = asRecord(homepageData?.newsletterSection);

  /* ── Render helpers ─────────────────────────────────────────── */
  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case "hero":
        return (
          <HeroEnterprise
            key="hero"
            heroContent={heroContent}
            backgroundImage={
              heroBackgroundImage as { url?: string; alt?: string } | undefined
            }
          />
        );

      case "trust-band":
        return <TrustBand key="trust-band" />;

      case "product-categories":
        return (
          <ProductCategoriesNew
            key="product-categories"
            badge={productCategoriesSection?.badge as string | undefined}
            heading={productCategoriesSection?.heading as string | undefined}
            subtext={productCategoriesSection?.subtext as string | undefined}
            categories={productCategories}
          />
        );

      case "erp-showcase":
        return <ErpShowcaseNew key="erp-showcase" />;

      case "authorized-brands":
        return (
          <AuthorizedDistributorsNew
            key="authorized-brands"
            badge={brandShowcaseSection?.badge as string | undefined}
            heading={brandShowcaseSection?.heading as string | undefined}
            subtext={brandShowcaseSection?.subtext as string | undefined}
            brands={
              (featuredBrands || []) as Array<{
                id: string;
                name: string;
                slug?: string;
                logo?: { url?: string; alt?: string };
              }>
            }
          />
        );

      case "trusted-partners":
        return (
          <TrustedPartnersNew
            key="trusted-partners"
            badge={trustedPartnersSection?.badge as string | undefined}
            heading={trustedPartnersSection?.heading as string | undefined}
            subtext={trustedPartnersSection?.subtext as string | undefined}
          />
        );

      case "our-clients":
        return (
          <OurClientsNew
            key="our-clients"
            badge={ourClientsSection?.badge as string | undefined}
            heading={ourClientsSection?.heading as string | undefined}
            subtext={ourClientsSection?.subtext as string | undefined}
            brands={
              (ourClientsBrands || []) as Array<{
                id: string;
                name: string;
                slug?: string;
                logo?: { url?: string; alt?: string };
              }>
            }
          />
        );

      case "why-choose-us":
        return (
          <WhyChooseUsNew
            key="why-choose-us"
            badge={whyChooseUsSection?.badge as string | undefined}
            heading={whyChooseUsSection?.heading as string | undefined}
            accent={whyChooseUsSection?.accent as string | undefined}
            subheading={whyChooseUsSection?.subheading as string | undefined}
          />
        );

      case "services":
        return (
          <ServicesSectionNew
            key="services-section"
            badge={servicesSection?.badge as string | undefined}
            heading={servicesSection?.heading as string | undefined}
            subtext={servicesSection?.subtext as string | undefined}
            services={services}
          />
        );

      case "top-products":
        return (
          <TopProductsNew
            key="top-products"
            badge={topProductsSection?.badge as string | undefined}
            heading={topProductsSection?.heading as string | undefined}
            subtext={topProductsSection?.subtext as string | undefined}
            products={
              (topProductsList as Array<{
                id: string;
                title?: string;
                slug?: string;
                brand?: { name?: string } | string;
                description?: string;
                image?: { url?: string; alt?: string };
                category?: { title?: string } | string;
              }>) || undefined
            }
          />
        );

      case "company-introduction":
        return (
          <CompanyIntroduction
            key="company-introduction"
            badge={companyIntroductionSection?.badge as string | undefined}
            heading={companyIntroductionSection?.heading as string | undefined}
            accent={companyIntroductionSection?.accent as string | undefined}
            intro={companyIntroductionSection?.intro as string | undefined}
            closing={companyIntroductionSection?.closing as string | undefined}
          />
        );

      case "industries-we-serve":
        return (
          <IndustriesWeServe
            key="industries-we-serve"
            badge={industriesSection?.badge as string | undefined}
            heading={industriesSection?.heading as string | undefined}
            subtext={industriesSection?.subtext as string | undefined}
          />
        );

      case "solutions-highlight":
        return (
          <SolutionsHighlightNew
            key="solutions-highlight"
            badge={solutionsHighlightSection?.badge as string | undefined}
            heading={solutionsHighlightSection?.heading as string | undefined}
            subtext={solutionsHighlightSection?.subtext as string | undefined}
          />
        );

      case "awards-showcase":
        return (
          <AwardsShowcaseNew
            key="awards-showcase"
            badge={awardsShowcaseSection?.badge as string | undefined}
            heading={awardsShowcaseSection?.heading as string | undefined}
            subtext={awardsShowcaseSection?.subtext as string | undefined}
            awards={
              (solutionsHighlightAwards.length > 0
                ? solutionsHighlightAwards
                : activeAwards) as Array<{
                id: string;
                title: string;
                year?: string;
                issuer?: string;
                description?: string;
              }>
            }
          />
        );

      case "quick-contact":
        return (
          <QuickContact
            key="quick-contact"
            badge={quickContactSection?.badge as string | undefined}
            heading={quickContactSection?.heading as string | undefined}
            officeHours={quickContactSection?.officeHours as string | undefined}
            contacts={
              (quickContactSection?.contacts as Array<{
                label?: string;
                value?: string;
                href?: string;
                cta?: string;
                iconType?: "phone" | "whatsapp" | "email";
              }>) || undefined
            }
          />
        );

      case "company-intro":
        return (
          <CompanyIntroNew
            key="company-intro"
            badge={companyIntroSection?.badge as string | undefined}
            heading={companyIntroSection?.heading as string | undefined}
            body={companyIntroSection?.body as string | undefined}
            stats={
              (companyIntroSection?.stats as Array<{
                id: string;
                label: string;
                value: string;
                suffix?: string;
              }>) || undefined
            }
            values={
              (companyIntroSection?.values as Array<{
                icon: string;
                title: string;
                description: string;
              }>) || undefined
            }
          />
        );

      case "customer-reviews":
        return (
          <CustomerReviewsNew
            key="customer-reviews"
            badge={testimonialsSection?.badge as string | undefined}
            heading={testimonialsSection?.heading as string | undefined}
            testimonials={
              (featuredTestimonials.length > 0
                ? featuredTestimonials
                : activeTestimonials) as Array<{
                id: string;
                authorName: string;
                authorTitle?: string;
                authorCompany?: string;
                quote: string;
                rating?: number;
                avatar?: { url?: string; alt?: string };
              }>
            }
          />
        );

      case "news-and-blogs":
        return (
          <NewsAndBlogsNew
            key="news-and-blogs"
            badge={latestNewsSection?.badge as string | undefined}
            heading={latestNewsSection?.heading as string | undefined}
            subtext={latestNewsSection?.subtext as string | undefined}
            posts={
              (blogPosts as Array<{
                id: string;
                title: string;
                slug?: string;
                excerpt?: string;
                coverImage?: { url?: string; alt?: string };
                publishedAt?: string;
              }>) || undefined
            }
          />
        );

      case "newsletter":
        return (
          <NewsletterNew
            key="newsletter"
            badge={newsletterSection?.badge as string | undefined}
            heading={newsletterSection?.heading as string | undefined}
            subtext={newsletterSection?.subtext as string | undefined}
            emailPlaceholder={
              newsletterSection?.emailPlaceholder as string | undefined
            }
            namePlaceholder={
              newsletterSection?.namePlaceholder as string | undefined
            }
            submitLabel={newsletterSection?.submitLabel as string | undefined}
            successTitle={newsletterSection?.successTitle as string | undefined}
            successMessage={
              newsletterSection?.successMessage as string | undefined
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <LenisProvider>
      <WOWProvider offset={100} mobile={true} live={true}>
        <div ref={containerRef} className="flex flex-col mouse-lighting">
          {visibleSections.map((section) =>
            renderSection(section.sectionId as SectionId),
          )}
        </div>
      </WOWProvider>
    </LenisProvider>
  );
}
