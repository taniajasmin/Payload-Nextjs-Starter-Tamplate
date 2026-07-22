import type { Metadata } from "next";
import {
  searchContent,
  getRelatedContent,
  getEmptyStateSuggestions,
} from "@/lib/search";
import { mediaUrl } from "@/lib/media-url";
import { SearchResults } from "@/components/search/search-results";

/* Search depends on ?q=, so never statically cache a specific result. */
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
}

function normalizeQuery(value: string | string[] | undefined): string {
  if (!value) return "";
  return Array.isArray(value) ? value[0] ?? "" : value;
}

export const metadata: Metadata = {
  title: "Search — Simal Technologies",
  description:
    "Search products, brands, articles, careers and pages across the whole Simal Technologies website.",
  robots: { index: false, follow: true },
};

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const rawQuery = normalizeQuery((await searchParams).q);

  if (rawQuery.trim().length < 2) {
    const emptyState = await getEmptyStateSuggestions(locale);
    return (
      <div className="flex flex-col">
        <SearchHero />
        <SearchResults
          initialQuery=""
          groups={{}}
          total={0}
          related={null}
          emptyState={emptyState}
        />
      </div>
    );
  }

  const results = await searchContent(rawQuery, locale);
  const related = results.total > 0 ? await getRelatedContent(results, locale) : null;

  return (
    <div className="flex flex-col">
      <SearchHero />
      <SearchResults
        initialQuery={results.query}
        groups={results.groups}
        total={results.total}
        related={related}
        emptyState={null}
      />
    </div>
  );
}

function SearchHero() {
  return (
    <section className="relative bg-neutral-950 text-white">
      <img
        src={mediaUrl("/assets/images/homepage/hello.avif")}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[center_75%] blur-[2px]"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container-primary py-16 md:py-20">
        <div className="max-w-3xl">
          <span className="mb-6 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Site Search
          </span>
          <h1 className="text-[length:var(--font-hero-heading)] font-extrabold tracking-tighter leading-none text-white">
            Find anything on the site
          </h1>
          <p className="mt-6 text-[length:var(--font-body)] text-white/70 leading-relaxed max-w-xl">
            Search across products, brands, articles, careers and pages — plus discover related content.
          </p>
        </div>
      </div>
    </section>
  );
}

function SearchGlyph() {
  return (
    <svg
      className="w-4 h-4 text-[var(--color-primary)]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
