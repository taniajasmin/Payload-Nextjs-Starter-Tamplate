import type { Metadata } from "next";
import { getCachedPayload } from "@/lib/get-payload";

import { ArrowRight, Check, Clock, Calendar, Star, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & News — Simal Technologies | IT Industry Insights Dubai, UAE",
  description:
    "Stay updated with the latest IT industry news, product launches, technology insights, and company updates from Simal Technologies. Expert articles on IT distribution, hardware, and enterprise solutions.",
  alternates: {
    canonical: "https://www.simalme.com/resources/blog",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/resources/blog",
    title: "Blog & News — Simal Technologies",
    description: "IT industry news, product launches, and technology insights from Simal Technologies.",
    images: [
      {
        url: "https://www.simalme.com/assets/og/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "Simal Technologies Blog",
      },
    ],
  },
};

/* ------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------ */
function formatDate(dateStr: string | undefined | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).length;
  const mins = Math.max(2, Math.round(words / 200));
  return `${mins} min read`;
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

/* ------------------------------------------------------------------
   Fallback data
   ------------------------------------------------------------------ */
const fallbackFeatured = {
  title: "Simal Technologies Awarded HIKSEMi Best Distribution Partner at MEA Summit 2025",
  excerpt: "We are proud to announce that Simal Technologies has been recognized as the Best Distribution Partner by HIKSEMi at the prestigious Middle East & Africa Summit 2025, highlighting our commitment to excellence in IT distribution.",
  date: "November 2025",
  readTime: "4 min read",
  slug: "hiksemi-best-distribution-partner-mea-summit-2025",
};

const fallbackPosts = [
  { title: "The Rise of NVMe SSDs in Enterprise Storage: What IT Resellers Need to Know", excerpt: "NVMe technology is transforming enterprise storage. Learn how the latest generation of SSDs from Crucial, Samsung, and Kingston can help your customers boost performance.", date: "January 2026", readTime: "6 min read", slug: "rise-of-nvme-ssds-enterprise-storage" },
  { title: "5 Key Trends Shaping IT Distribution in the Middle East for 2026", excerpt: "From AI-powered infrastructure to sustainable IT, explore the trends that will define the IT distribution landscape across the GCC and CIS regions this year.", date: "December 2025", readTime: "8 min read", slug: "hardware-trends-middle-east-2026" },
  { title: "UGREEN Docking Stations: A Complete Guide for System Integrators", excerpt: "A comprehensive look at UGREEN's docking station lineup and how to position these solutions for enterprise and consumer markets.", date: "December 2025", readTime: "5 min read", slug: "ugreen-docking-stations-guide-system-integrators" },
  { title: "How to Choose the Right Firewall Solution for Your Enterprise Clients", excerpt: "Sophos XG series firewalls offer advanced threat protection. Here's a guide to help resellers match the right solution to client needs.", date: "November 2025", readTime: "7 min read", slug: "choosing-right-firewall-enterprise-clients" },
  { title: "Simal Technologies Expands Coverage to East Africa", excerpt: "Expanding our distribution network to Kenya, Tanzania, and Ethiopia with dedicated logistics and local support partnerships.", date: "October 2025", readTime: "3 min read", slug: "simal-expands-east-africa-coverage" },
  { title: "Understanding Gaming Hardware Trends: MSI, Zotac, and ARKTEK in 2026", excerpt: "Gaming hardware continues to evolve. Explore the latest GPU launches, monitor technologies, and what they mean for your distribution business.", date: "October 2025", readTime: "6 min read", slug: "gaming-hardware-trends-msi-zotac-arktek-2026" },
  { title: "AI-Powered Infrastructure: What Resellers Should Know in 2026", excerpt: "Artificial intelligence is reshaping enterprise IT. Discover the hardware requirements and opportunities for resellers supporting AI workloads.", date: "September 2025", readTime: "7 min read", slug: "ai-powered-infrastructure-resellers-2026" },
  { title: "Cybersecurity Essentials: Building a Resilient Security Stack", excerpt: "From firewalls to endpoint protection, learn how to build comprehensive security solutions that protect modern enterprises from evolving threats.", date: "September 2025", readTime: "6 min read", slug: "cybersecurity-essentials-security-stack" },
  { title: "Data Center Storage Trends: High-Capacity SSDs and Beyond", excerpt: "Enterprise storage demands continue to grow. Explore high-capacity NVMe SSDs, hybrid arrays, and the future of data center storage.", date: "August 2025", readTime: "8 min read", slug: "data-center-storage-trends-ssds" },
  { title: "Cloud vs. On-Premises: Helping Clients Choose the Right Infrastructure", excerpt: "Navigate the cloud versus on-premises debate with practical guidance for resellers advising enterprise and SMB clients.", date: "August 2025", readTime: "5 min read", slug: "cloud-vs-on-premises-infrastructure" },
  { title: "Edge Computing and the Future of Distributed IT", excerpt: "Edge computing is driving demand for compact, powerful hardware. Learn which products and configurations are winning at the edge.", date: "July 2025", readTime: "6 min read", slug: "edge-computing-distributed-it" },
  { title: "Sustainable IT: How Resellers Can Meet Growing ESG Demand", excerpt: "Energy-efficient components, longer lifecycles, and responsible recycling are becoming key differentiators in enterprise procurement.", date: "July 2025", readTime: "4 min read", slug: "sustainable-it-esg-demand" },
  { title: "Maximizing Margins with Simal's Partner Reseller Program", excerpt: "An inside look at partner tiers, volume incentives, co-marketing support, and how resellers can grow with Simal Technologies.", date: "June 2025", readTime: "5 min read", slug: "maximizing-margins-partner-reseller-program" },
  { title: "Network Modernization: switches, Access Points, and Cabling Essentials", excerpt: "Reliable networking is the backbone of every modern office. Explore the core building blocks for upgrading client networks.", date: "June 2025", readTime: "6 min read", slug: "network-modernization-switches-access-points-cabling" },
];

/* ------------------------------------------------------------------
   Blog Page
   ------------------------------------------------------------------ */
interface Props {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;

  let cmsPosts: Array<{
    title: string;
    slug: string;
    excerpt: string;
    content: unknown;
    publishedAt: string;
    status: string;
  }> = [];

  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "blog-posts",
      locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
      draft: false,
      overrideAccess: true,
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      limit: 50,
    });
    cmsPosts = result.docs as unknown as typeof cmsPosts;
  } catch {
    // CMS unavailable — use fallback
  }

  const useCMS = cmsPosts.length > 0;

  let featured: { title: string; excerpt: string; date: string; readTime: string; slug: string };
  let recent: Array<{ title: string; excerpt: string; date: string; readTime: string; slug: string }>;

  if (useCMS) {
    const mapped = cmsPosts.map((post) => {
      const textContent = lexicalToText(post.content);
      return {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || textContent.slice(0, 200) + "...",
        date: formatDate(post.publishedAt),
        readTime: estimateReadTime(textContent),
      };
    });
    featured = mapped[0];
    recent = mapped.slice(1);
  } else {
    featured = fallbackFeatured;
    recent = fallbackPosts;
  }

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative w-full py-28 md:py-36 overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(/assets/images/blog/blog.avif)` }}
        />
        <div className="absolute inset-0 bg-slate-950/80" />

        <div className="container-primary relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="max-w-3xl lg:col-span-7">
              <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                Insights & Updates
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
                News. Trends.{" "}
                <span className="text-primary">Insights.</span>
              </h1>
              <p className="mt-5 text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
                Stay ahead with the latest IT industry insights, product launches, and technology
                trends from Simal Technologies. From deep-dive analysis to breaking product news,
                our blog keeps partners and resellers informed across the UAE, GCC, MENA, and CIS.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="#articles"
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Browse Articles <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#newsletter"
                  className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Subscribe
                </a>
              </div>
            </div>

            {/* ── Right-side topics ── */}
            <div className="lg:col-span-5">
              <div className="lg:border-l lg:border-white/15 lg:pl-10">
                <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                  What You&rsquo;ll Find
                </span>
                <div className="mt-6 h-px bg-white/20" />
                <ul className="mt-6 space-y-3">
                  {[
                    "Industry trends shaping IT across the GCC, MENA & CIS",
                    "Product launches and hands-on technology deep-dives",
                    "Practical guidance for resellers and system integrators",
                    "Company news, partner programs, and event highlights",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/80">
                      <span className="mt-0.5 inline-flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-primary" strokeWidth={1.6} />
                      </span>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Blog Content ── */}
      <section id="articles" className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 " />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Section identifier bar */}
          <div className="mb-8 flex items-center gap-4 border-b pb-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Resources
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Blog & News
            </span>
          </div>

          {/* Featured Post */}
          {featured && (
            <div className="border border-border bg-card mb-12">
              <div className="grid md:grid-cols-5">
                <div className="md:col-span-2">
                  <img
                    src={`/assets/images/blog-covers/${featured.slug}.jpg`}
                    alt={featured.title}
                    className="w-full h-full min-h-[280px] object-cover"
                  />
                </div>
                <div className="md:col-span-3 p-6 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                    <span className="inline-flex items-center gap-1.5 border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                      <Star className="w-3 h-3" />
                      Featured
                    </span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-extrabold leading-[1.1] tracking-tight text-foreground">{featured.title}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                  <div className="mt-6">
                    <a
                      href={`/resources/blog/${featured.slug}`}
                      className="inline-flex items-center gap-1.5 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Post Grid */}
          {recent.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recent.map((post) => (
                <article
                  key={post.slug}
                  className="border border-border bg-card flex flex-col h-full"
                >
                  <img
                    src={`/assets/images/blog-covers/${post.slug}.jpg`}
                    alt={post.title}
                    className="w-full h-[220px] object-cover"
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground">{post.title}</h3>
                    <div className="mt-2 flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                      <a
                        href={`/resources/blog/${post.slug}`}
                        className="self-end mt-3 text-sm font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                      >
                        Read More <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section
        id="newsletter"
        className="relative w-full py-28 md:py-36 overflow-hidden bg-slate-950"
      >
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
            Get the latest articles, product launches, and industry insights delivered to your inbox.
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
