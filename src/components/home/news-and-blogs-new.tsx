"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─────────────────────────────────────────────────────── */

interface BlogPostDoc {
  id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  coverImage?: { url?: string; alt?: string };
  publishedAt?: string;
}

interface NewsAndBlogsProps {
  badge?: string;
  heading?: string;
  subtext?: string;
  posts?: BlogPostDoc[];
}

interface ArticleSpec {
  id: string;
  title: string;
  slug: string;
  category: string;
  dateLabel: string;
  excerpt: string;
  image: string;
}

/* ─── Fallback articles ─────────────────────────────────────────── */

const FALLBACK_ARTICLES: ArticleSpec[] = [
  {
    id: "a1",
    title: "Why Choose Authorized IT Distributors in UAE",
    slug: "why-choose-authorized-it-distributors-uae",
    category: "Company News",
    dateLabel: "Jun 28, 2026",
    excerpt:
      "Counterfeit components are flooding the GCC market. Here's how sourcing through an authorized distributor protects your procurement, warranty, and after-sales support.",
    image: "/assets/images/blog/blog-authorized-distributors.jpg",
  },
  {
    id: "a2",
    title: "Enterprise SSD Buying Guide 2026",
    slug: "enterprise-ssd-buying-guide-2026",
    category: "Tech Guides",
    dateLabel: "Jun 14, 2026",
    excerpt:
      "PCIe Gen4 vs Gen5, endurance ratings, form factors, and heatsink considerations — a procurement-friendly walkthrough for IT buyers evaluating NVMe SSDs.",
    image: "/assets/images/blog/blog-enterprise-ssd-guide.jpg",
  },
  {
    id: "a3",
    title: "How UniERP Transforms SME Operations",
    slug: "how-unierp-transforms-sme-operations",
    category: "ERP Trends",
    dateLabel: "May 30, 2026",
    excerpt:
      "Built on Odoo 19 Community Edition, UniERP unifies finance, HR, inventory, and CRM. Learn how SMEs across the GCC are cutting operational overhead by 30%+.",
    image: "/assets/images/illustrations/erp-dashboard-photo.jpg",
  },
];

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toSpec(post: BlogPostDoc, i: number): ArticleSpec {
  const fb = FALLBACK_ARTICLES[i % FALLBACK_ARTICLES.length];
  const date = formatDate(post.publishedAt) ?? fb.dateLabel;
  return {
    id: post.id,
    title: post.title || fb.title,
    slug: post.slug || fb.slug,
    category: fb.category,
    dateLabel: date,
    excerpt: post.excerpt || fb.excerpt,
    image: post.coverImage?.url ? post.coverImage.url : fb.image,
  };
}

/* ─── Component ─────────────────────────────────────────────────── */

export default function NewsAndBlogs({
  badge = "Insights & News",
  heading = "Stay Updated with Simal",
  subtext = "Expert takes on IT distribution, enterprise storage, ERP transformation, and procurement best practices — from the Simal team and our partners.",
  posts,
}: NewsAndBlogsProps = {}) {
  const articles: ArticleSpec[] =
    posts && posts.length > 0
      ? posts.slice(0, 3).map((p, i) => toSpec(p, i))
      : FALLBACK_ARTICLES;

  return (
    <section id="latest-news" className="relative overflow-hidden bg-background">
      {/* Subtle top-to-bottom fade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* ── Section identifier bar ──────────────────────────── */}
        <div className="mb-8 flex items-center gap-4 border-b pb-4">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Latest Updates
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            {badge}
          </span>
        </div>

        {/* ── Heading ────────────────────────────────────────── */}
        <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
          {badge}
        </span>

        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {heading}
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {subtext}
        </p>

        {/* ── Article grid ──────────────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>

        {/* ── Footer CTA ─────────────────────────────────────── */}
        <div className="mt-10 border-t pt-8">
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Read Our Blog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Card ──────────────────────────────────────────────────────── */

function BlogCard({ article }: { article: ArticleSpec }) {
  return (
    <article className="group flex h-full flex-col border border-border bg-card">
      {/* Cover image */}
      <Link
        href={`/resources/blog/${article.slug}`}
        className="relative block aspect-[16/10] border-b border-border bg-muted/50"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 bg-card px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
          <FolderOpen className="h-3 w-3" />
          {article.category}
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />
          {article.dateLabel}
        </div>

        <h3 className="text-base font-bold leading-snug text-foreground">
          <Link
            href={`/resources/blog/${article.slug}`}
            className="line-clamp-2 transition-colors hover:text-primary"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>

        <div className="mt-5 pt-3 border-t border-border">
          <Link
            href={`/resources/blog/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground transition-colors hover:text-primary"
          >
            Read More
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
