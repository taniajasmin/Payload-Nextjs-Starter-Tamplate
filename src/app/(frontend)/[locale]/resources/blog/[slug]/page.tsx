import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCachedPayload } from "@/lib/get-payload";

import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  TrendingUp,
} from "lucide-react";
import { RichText } from "@payloadcms/richtext-lexical/react";

/* ------------------------------------------------------------------
   Types
   ------------------------------------------------------------------ */

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

interface BlogPostData {
  title: string;
  slug: string;
  excerpt: string;
  content: unknown;
  publishedAt: string;
  status: string;
  coverImage?: Record<string, unknown> | null;
  author?: Record<string, unknown> | null;
  meta?: {
    title?: string;
    description?: string;
  };
}

/* ------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------ */

function formatDate(dateStr: string | undefined | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function lexicalToText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as Record<string, unknown>;
  if (n.root && typeof n.root === "object") return lexicalToText(n.root);
  if (n.type === "text" && typeof n.text === "string") return n.text;
  if (Array.isArray(n.children)) {
    return (n.children as unknown[]).map(lexicalToText).join(" ");
  }
  return "";
}

function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).filter(Boolean).length;
  const mins = Math.max(2, Math.round(words / 200));
  return `${mins} min read`;
}

/* ── Local blog cover images (served via nginx) ── */
function localCoverUrl(slug: string): string {
  return `/assets/images/blog-covers/${slug}.jpg`;
}

/* Build a minimal Lexical root node from plain paragraphs */
function richText(...paragraphs: string[]) {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "text",
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text,
            version: 1,
          },
        ],
        direction: "ltr",
        textFormat: 0,
        textStyle: "",
      })),
      direction: "ltr",
      textFormat: 0,
      textStyle: "",
    },
  };
}

/* Build a Lexical root node from a mix of h2 headings and paragraphs */
function richDoc(blocks: Array<{ h2?: string; p?: string }>) {
  const textNode = (text: string) => ({
    type: "text",
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    text,
    version: 1,
  });
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      textFormat: 0,
      textStyle: "",
      children: blocks.map((b) =>
        b.h2
          ? {
              type: "heading",
              tag: "h2",
              format: "",
              indent: 0,
              version: 1,
              direction: "ltr",
              children: [textNode(b.h2)],
            }
          : {
              type: "paragraph",
              format: "",
              indent: 0,
              version: 1,
              direction: "ltr",
              textFormat: 0,
              textStyle: "",
              children: [textNode(b.p ?? "")],
            },
      ),
    },
  };
}

/* ------------------------------------------------------------------
   Fallback data
   ------------------------------------------------------------------ */

const fallbackPost: BlogPostData = {
  title: "5 Key Trends Shaping IT Distribution in the Middle East for 2026",
  slug: "hardware-trends-middle-east-2026",
  excerpt:
    "From AI-powered infrastructure to sustainable IT, explore the trends that will define the IT distribution landscape across the GCC and CIS regions this year.",
  content: richDoc([
    {
      p: "The IT distribution industry in the Middle East is evolving faster than at any point in the last decade. As we move through 2026, a convergence of artificial intelligence, sustainability mandates, regional cloud investment, and changing work patterns is reshaping how technology products reach businesses across the GCC, Levant, Africa, and CIS regions.",
    },
    {
      p: "For resellers, system integrators, and procurement teams, understanding these shifts is no longer optional — it directly affects which products to stock, how to position solutions, and where the next wave of demand will come from. Below we break down the five trends defining the regional distribution landscape this year, and what each means for partners on the ground.",
    },
    { h2: "1. AI-Powered Infrastructure Goes Mainstream" },
    {
      p: "Demand for AI-ready hardware — high-performance GPUs, accelerator cards, specialised servers, and high-bandwidth NVMe storage — is surging as enterprises and government entities move from AI pilots to full production deployments.",
    },
    {
      p: "This is no longer confined to hyperscalers. Banks, healthcare providers, logistics firms, and public-sector bodies across the UAE and Saudi Arabia are building on-premise and hybrid AI clusters to keep sensitive data inside national borders. For distributors, that means a fast-growing market for workstation-class GPUs, liquid-cooling-ready chassis, and PCIe Gen 5 storage capable of feeding data-hungry training workloads.",
    },
    {
      p: "Resellers who can bundle compute, storage, networking, and pre-sales engineering into a single validated solution will capture the highest margins as this category scales.",
    },
    { h2: "2. Sustainable IT Becomes a Buying Criterion" },
    {
      p: "Sustainability has moved from a 'nice to have' to a formal procurement requirement. Organisations are increasingly prioritising energy-efficient hardware, longer product lifecycles, responsible packaging, and certified e-waste recycling.",
    },
    {
      p: "Government tenders across the GCC now frequently include environmental criteria, and multinational customers are extending their global ESG commitments to regional purchases. Distributors who can document power-efficiency ratings, offer trade-in and recycling programmes, and supply products with recognised green certifications will gain a clear competitive edge.",
    },
    { h2: "3. Cybersecurity Investment Keeps Climbing" },
    {
      p: "With cyber threats growing in both volume and sophistication, demand for enterprise security solutions — next-generation firewalls, endpoint protection, network access control, and surveillance systems — continues to accelerate across every market segment.",
    },
    {
      p: "Regulatory pressure is a major driver: data-protection frameworks across the UAE, Saudi Arabia, and the wider region are pushing organisations to harden their infrastructure. For the channel this creates recurring revenue in security appliances, licensing, and managed services, as well as strong attach-rate potential alongside networking and storage deals.",
    },
    { h2: "4. Hybrid Work Solutions Are Here to Stay" },
    {
      p: "The shift to hybrid work has settled into a permanent operating model rather than a temporary response. That permanence is driving steady demand for collaboration tools, docking stations, high-resolution monitors, webcams, headsets, and reliable remote-access infrastructure.",
    },
    {
      p: "Businesses are standardising home and office setups to ensure consistent productivity and security wherever staff work. Distributors that offer complete, branded workspace bundles — rather than individual components — are best positioned to win these volume deals with corporate and SME customers alike.",
    },
    { h2: "5. Regional Supply Chains and Market Expansion" },
    {
      p: "Distributors are localising supply chains and expanding beyond traditional GCC strongholds into Africa, the Levant, and the CIS. Shorter, more resilient logistics routes, regional warehousing, and local warranty fulfilment are becoming key differentiators after years of global supply-chain disruption.",
    },
    {
      p: "This expansion opens significant growth opportunities for partners willing to serve emerging markets, where demand for enterprise hardware, networking equipment, and surveillance systems is rising quickly. Local stock availability and fast delivery are often the deciding factors in competitive deals.",
    },
    { h2: "What This Means for Simal Technologies Partners" },
    {
      p: "Each of these trends points to the same conclusion: customers increasingly want a distribution partner that delivers more than boxes. They want validated solutions, technical pre-sales support, regional stock, and a supply chain they can trust.",
    },
    {
      p: "Simal Technologies is positioned at the forefront of these shifts, with expanded product lines spanning AI-ready infrastructure, energy-efficient hardware, security, and collaboration — backed by deep regional coverage across the Middle East, Africa, and CIS. Our team works alongside resellers and system integrators to match the right technology to each opportunity, and to stay ahead of what comes next.",
    },
    {
      p: "To discuss how these trends affect your business, or to access our latest product guides and volume pricing, contact your Simal Technologies account manager today.",
    },
  ]),
  publishedAt: "2025-12-20",
  status: "published",
  coverImage: null,
  author: null,
  meta: {
    title: "IT Distribution Trends in the Middle East 2026",
    description:
      "Explore the 5 key trends shaping IT distribution in the Middle East, GCC, and CIS regions in 2026.",
  },
};

const fallbackRelated: BlogPostData[] = [
  {
    title:
      "The Rise of NVMe SSDs in Enterprise Storage: What IT Resellers Need to Know",
    slug: "rise-of-nvme-ssds-enterprise-storage",
    excerpt:
      "NVMe technology is transforming enterprise storage. This comprehensive guide covers everything IT resellers need to know — from form factors and PCIe generations to TCO analysis, NVMe over Fabrics, and what comes after Gen 5.",
    content: richText(
      "The enterprise storage landscape is undergoing a seismic shift. NVMe SSDs have moved from premium niche to mainstream necessity.",
    ),
    publishedAt: "2026-01-10",
    status: "published",
  },
  {
    title:
      "Simal Technologies Awarded HIKSEMi Best Distribution Partner at MEA Summit 2025",
    slug: "hiksemi-best-distribution-partner-mea-summit-2025",
    excerpt:
      "We are proud to announce that Simal Technologies has been recognized as the Best Distribution Partner by HIKSEMi at the prestigious Middle East & Africa Summit 2025.",
    content: richText(
      "Simal Technologies Middle East LLC is honored to be named the Best Distribution Partner by HIKSEMi.",
    ),
    publishedAt: "2025-11-15",
    status: "published",
  },
];

/* ------------------------------------------------------------------
   Static params
   ------------------------------------------------------------------ */

export async function generateStaticParams() {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "blog-posts",
      where: { status: { equals: "published" } },
      limit: 0,
      draft: false,
      overrideAccess: true,
    });
    return result.docs.map((post) => ({
      slug: (post as unknown as { slug: string }).slug,
    }));
  } catch {
    return [fallbackPost, ...fallbackRelated].map((post) => ({
      slug: post.slug,
    }));
  }
}

/* ------------------------------------------------------------------
   Metadata
   ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  let title = "";
  let description = "";
  let coverImageUrl = "";

  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "blog-posts",
      where: {
        slug: { equals: slug },
        status: { equals: "published" },
      },
      locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
      depth: 2,
      limit: 1,
      draft: false,
      overrideAccess: true,
    });

    const post = result.docs[0] as unknown as BlogPostData | undefined;
    if (post) {
      title = post.meta?.title || post.title || "";
      description = post.meta?.description || post.excerpt || "";
      const coverImage = post.coverImage as Record<string, unknown> | undefined;
      coverImageUrl = (coverImage?.url as string) || "";
    }
  } catch {
    const fallback = [fallbackPost, ...fallbackRelated].find(
      (post) => post.slug === slug,
    );
    if (fallback) {
      title = fallback.meta?.title || fallback.title;
      description = fallback.meta?.description || fallback.excerpt;
    }
  }

  if (!title) {
    return { title: "Blog Post Not Found" };
  }

  return {
    title: `${title} — Simal Technologies Blog`,
    description,
    alternates: {
      canonical: `https://www.simalme.com/resources/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://www.simalme.com/resources/blog/${slug}`,
      title,
      description,
      images: [
        {
          url: `https://www.simalme.com/assets/images/blog-covers/${slug}.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

/* ------------------------------------------------------------------
   Page
   ------------------------------------------------------------------ */

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug, locale } = await params;

  let post: BlogPostData | null = null;
  let relatedPosts: BlogPostData[] = [];

  try {
    const payload = await getCachedPayload();

    const postResult = await payload.find({
      collection: "blog-posts",
      where: {
        slug: { equals: slug },
        status: { equals: "published" },
      },
      locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
      depth: 2,
      limit: 1,
      draft: false,
      overrideAccess: true,
    });
    post = (postResult.docs[0] as unknown as BlogPostData) || null;

    if (post) {
      const relatedResult = await payload.find({
        collection: "blog-posts",
        where: {
          status: { equals: "published" },
          slug: { not_equals: slug },
        },
        locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
        sort: "-publishedAt",
        limit: 2,
        draft: false,
        overrideAccess: true,
      });
      relatedPosts =
        (relatedResult.docs as unknown as BlogPostData[]) || [];
    }
  } catch {
    // CMS unavailable — use fallback
  }

  const useCMS = !!post;
  const postData = useCMS ? post : fallbackPost;

  if (!postData) {
    notFound();
  }

  const title = postData.title || fallbackPost.title;
  const excerpt = postData.excerpt || fallbackPost.excerpt;
  const content = postData.content;
  const publishedAt = postData.publishedAt || fallbackPost.publishedAt;
  const coverImage = postData.coverImage as
    | Record<string, unknown>
    | undefined;
  const coverImageUrl = (coverImage?.url as string) || "";
  const author = postData.author as Record<string, unknown> | undefined;
  const authorName = (author?.name as string) || "";

  const textContent = content ? lexicalToText(content) : "";
  const readTime = textContent
    ? estimateReadTime(textContent)
    : estimateReadTime(excerpt);
  const formattedDate = formatDate(publishedAt);

  const related =
    useCMS && relatedPosts.length > 0
      ? relatedPosts.map((p) => {
          const pText = p.content ? lexicalToText(p.content) : "";
          return {
            title: p.title || "",
            slug: p.slug || "",
            excerpt:
              p.excerpt || (pText ? `${pText.slice(0, 200)}...` : ""),
            date: formatDate(p.publishedAt),
            readTime: pText ? estimateReadTime(pText) : "5 min read",
          };
        })
      : fallbackRelated.map((p) => ({
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          date: formatDate(p.publishedAt),
          readTime: estimateReadTime(lexicalToText(p.content)),
        }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    image: `https://www.simalme.com${localCoverUrl(postData.slug || slug)}`,
    datePublished: publishedAt,
    author: authorName
      ? { "@type": "Person", name: authorName }
      : { "@type": "Organization", name: "Simal Technologies" },
    publisher: {
      "@type": "Organization",
      name: "Simal Technologies Middle East LLC",
      logo: {
        "@type": "ImageObject",
        url: "https://www.simalme.com/assets/logo/simal-technologies-logo.png",
      },
    },
    url: `https://www.simalme.com/resources/blog/${slug}`,
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="relative w-full py-28 md:py-36 overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url(${localCoverUrl(postData.slug || slug)})`,
          }}
        />
        <div className="absolute inset-0 bg-slate-950/80" />

        <div className="container-primary relative z-10">
          <div className="max-w-3xl">
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Blog Article
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-8 text-white">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              {authorName && (
                <>
                  <span className="font-semibold">{authorName}</span>
                  <span className="text-white/40">·</span>
                </>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <span className="text-white/40">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article Content ── */}
      <section className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 " />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* ── LEFT: Image card ── */}
            <div className="lg:col-span-2">
              <div className="sticky top-8 border border-border overflow-hidden aspect-[4/3]">
                <img
                  src={localCoverUrl(postData.slug || slug)}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* ── RIGHT: Text content ── */}
            <div className="lg:col-span-3">
              <p className="text-base text-muted-foreground leading-relaxed mb-10 font-medium">
                {excerpt}
              </p>

              {content ? (
                <div className="rich-text-content text-foreground leading-relaxed">
                  <RichText data={content as never} />
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  Full article content will be available soon.
                </p>
              )}

              <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/resources/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Back to Blog
                </Link>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Share:
                  </span>
                  {["LinkedIn", "Twitter", "WhatsApp"].map((platform) => (
                    <span
                      key={platform}
                      className="inline-flex items-center border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary transition-colors cursor-pointer"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Articles ── */}
      <section className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 " />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Section identifier bar */}
          <div className="mb-8 flex items-center gap-4 border-b pb-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Blog
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Related Articles
            </span>
          </div>

          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Related Articles
          </span>
          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-12">
            More from the{" "}
            <span className="text-primary">Blog</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {related.map((r) => (
              <a
                key={r.slug}
                href={`/resources/blog/${r.slug}`}
                className="border border-border bg-card p-6 md:p-8 flex flex-col transition-colors hover:border-primary/50"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-3 h-3" />
                  <span>{r.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {r.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground flex-1">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {r.excerpt}
                </p>
                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary flex items-center gap-1">
                    Read Article{" "}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="relative w-full py-28 md:py-36 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-slate-950/80" />

        <div className="container-primary text-center relative z-10">
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Stay Updated
          </span>
          <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl mb-6">
            Subscribe to Our{" "}
            <span className="text-primary">Newsletter</span>
          </h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Get the latest articles, product launches, and industry insights
            delivered to your inbox.
          </p>
          <form className="mt-10 flex flex-wrap justify-center gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 min-w-[260px] border border-white/20 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            />
            <button
              type="submit"
              className="bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
