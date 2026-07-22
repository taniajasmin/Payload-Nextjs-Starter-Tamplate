"use client";

import { useState, useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import {
  Search,
  Package,
  Award,
  Newspaper,
  Briefcase,
  HelpCircle,
  FileText,
  LayoutGrid,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react";
import type {
  SearchResult,
  SearchResultType,
  RelatedContent,
} from "@/lib/search";
import type { EmptyStateSuggestions } from "@/lib/search";
import { SafeImage } from "@/components/ui/safe-image";

/* ------------------------------------------------------------------ */
/* Per-type presentation                                               */
/* ------------------------------------------------------------------ */

interface TypeMeta {
  label: string;
  singular: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string;
}

const TYPE_META: Record<SearchResultType, TypeMeta> = {
  product: { label: "Products", singular: "Product", Icon: Package, accent: "text-primary" },
  brand: { label: "Brands", singular: "Brand", Icon: Award, accent: "text-primary" },
  blog: { label: "Articles", singular: "Article", Icon: Newspaper, accent: "text-primary" },
  news: { label: "News", singular: "News", Icon: Newspaper, accent: "text-primary" },
  page: { label: "Pages", singular: "Page", Icon: FileText, accent: "text-primary" },
  career: { label: "Careers", singular: "Job", Icon: Briefcase, accent: "text-primary" },
  faq: { label: "FAQ", singular: "FAQ", Icon: HelpCircle, accent: "text-primary" },
  category: { label: "Categories", singular: "Category", Icon: LayoutGrid, accent: "text-primary" },
};

// Display order for grouped sections / filter tabs.
const TYPE_ORDER: SearchResultType[] = [
  "page",
  "product",
  "brand",
  "blog",
  "news",
  "category",
  "career",
  "faq",
];

interface Props {
  initialQuery: string;
  groups: Partial<Record<SearchResultType, SearchResult[]>>;
  total: number;
  related: RelatedContent | null;
  emptyState: EmptyStateSuggestions | null;
}

export function SearchResults({ initialQuery, groups, total, related, emptyState }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [active, setActive] = useState<SearchResultType | "all">("all");
  const [, startTransition] = useTransition();

  const availableTypes = TYPE_ORDER.filter((t) => (groups[t]?.length ?? 0) > 0);
  const hasQuery = initialQuery.trim().length > 0;
  const hasResults = total > 0;

  const submit = (value: string) => {
    const v = value.trim();
    if (!v) return;
    startTransition(() => {
      router.push({ pathname: "/search", query: { q: v } });
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(query);
  };

  /* ---------------- Empty / no-query state ---------------- */
  if (!hasQuery && emptyState) {
    return (
      <SearchShell query={query} setQuery={setQuery} onSubmit={handleSubmit}>
        <div className="container-primary py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Sparkles className="w-8 h-8 mx-auto text-primary mb-4" />
            <h2 className="text-[length:var(--font-heading)] font-extrabold text-foreground">
              Search Simal Technologies
            </h2>
            <p className="mt-3 text-[length:var(--font-body)] text-muted-foreground">
              Find products, brands, articles, careers and pages across the whole site.
            </p>
          </div>

          {emptyState.popularSearches.length > 0 && (
            <div className="max-w-2xl mx-auto mt-10">
              <p className="text-[length:var(--font-section-label)] font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                Popular searches
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {emptyState.popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      submit(term);
                    }}
                    className="border border-border bg-card px-4 py-2 text-[length:var(--font-body)] font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {emptyState.browseCategories.length > 0 && (
            <div className="max-w-4xl mx-auto mt-14">
              <p className="text-[length:var(--font-section-label)] font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">
                Browse by category
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {emptyState.browseCategories.map((c) => (
                  <a
                    key={c.url}
                    href={c.url}
                    className="group flex items-center justify-between border border-border bg-card px-4 py-3 hover:border-primary/50 transition-all"
                  >
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {c.title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {emptyState.latestArticles.length > 0 && (
            <div className="max-w-5xl mx-auto mt-14">
              <p className="text-[length:var(--font-section-label)] font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">
                Latest insights
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {emptyState.latestArticles.map((a) => (
                  <ArticleCard key={a.url + a.title} a={a} />
                ))}
              </div>
            </div>
          )}
        </div>
      </SearchShell>
    );
  }

  /* ---------------- No results state ---------------- */
  if (hasQuery && !hasResults) {
    return (
      <SearchShell query={query} setQuery={setQuery} onSubmit={handleSubmit}>
        <div className="container-primary py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mx-auto w-14 h-14 bg-muted flex items-center justify-center mb-5">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <h2 className="text-[length:var(--font-heading)] font-extrabold text-foreground">
              No results for &ldquo;{initialQuery}&rdquo;
            </h2>
            <p className="mt-3 text-[length:var(--font-body)] text-muted-foreground">
              Try a different keyword, or browse our most popular categories.
            </p>
          </div>
          {emptyState && emptyState.browseCategories.length > 0 && (
            <div className="max-w-3xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
              {emptyState.browseCategories.map((c) => (
                <a
                  key={c.url}
                  href={c.url}
                  className="group flex items-center justify-between border border-border bg-card px-4 py-3 hover:border-primary/50 transition-all"
                >
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {c.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          )}
        </div>
      </SearchShell>
    );
  }

  /* ---------------- Results ---------------- */
  const typesForTabs: (SearchResultType | "all")[] = ["all", ...availableTypes];

  return (
    <SearchShell query={query} setQuery={setQuery} onSubmit={handleSubmit}>
      <div className="container-primary py-12">
        {/* Result meta */}
        <p className="text-[length:var(--font-body)] text-muted-foreground mb-6">
          <span className="font-semibold text-foreground">{total}</span>{" "}
          {total === 1 ? "result" : "results"} for{" "}
          <span className="font-semibold text-foreground">&ldquo;{initialQuery}&rdquo;</span>
        </p>

        {/* Filter tabs */}
        {availableTypes.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {typesForTabs.map((t) => {
              const isAll = t === "all";
              const count = isAll ? total : groups[t as SearchResultType]?.length ?? 0;
              const isActiveTab = active === t;
              return (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-[length:var(--font-body)] font-medium border transition-colors ${
                    isActiveTab
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {isAll ? "All" : TYPE_META[t as SearchResultType].label}
                  <span
                    className={`text-[length:var(--font-badge)] px-1.5 ${
                      isActiveTab ? "bg-primary-foreground/25" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Results list */}
        {active === "all" ? (
          <div className="space-y-12">
            {availableTypes.map((t) => (
              <ResultGroup
                key={t}
                type={t}
                results={groups[t]!}
                onSeeAll={() => setActive(t)}
              />
            ))}
          </div>
        ) : (
          <ResultGrid results={groups[active] ?? []} />
        )}

        {/* Related content */}
        {related && (related.brands.length > 0 || related.latestArticles.length > 0) && (
          <div className="mt-16 pt-12 border-t border-border">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-[length:var(--font-heading)] font-extrabold text-foreground">
                Related content
              </h2>
            </div>

            {related.brands.length > 0 && (
              <div className="mb-8">
                <p className="text-[length:var(--font-section-label)] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Related brands
                </p>
                <div className="flex flex-wrap gap-2">
                  {related.brands.map((b) => (
                    <a
                      key={b.url + b.title}
                      href={b.url}
                      className="inline-flex items-center gap-1.5 border border-border bg-card px-4 py-2 text-[length:var(--font-body)] font-medium text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      <Award className="w-3.5 h-3.5" />
                      {b.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {related.latestArticles.length > 0 && (
              <div>
                <p className="text-[length:var(--font-section-label)] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Latest insights
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {related.latestArticles.map((a) => (
                    <ArticleCard key={a.url + a.title} a={a} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </SearchShell>
  );
}

/* ------------------------------------------------------------------ */
/* Shared search input shell                                          */
/* ------------------------------------------------------------------ */

function SearchShell({
  query,
  setQuery,
  onSubmit,
  children,
}: {
  query: string;
  setQuery: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Search bar */}
      <section className="w-full py-10 bg-background">
        <div className="container-primary">
          <form onSubmit={onSubmit} className="max-w-3xl mx-auto" role="search">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands, articles, jobs…"
                aria-label="Search the website"
                autoFocus
                className="w-full h-14 border border-border bg-card pl-12 pr-28 text-[length:var(--font-body)] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-28 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 h-10 px-5 bg-primary text-primary-foreground text-[length:var(--font-button)] font-semibold hover:opacity-90 transition-colors"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {children}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Result group + grid                                                */
/* ------------------------------------------------------------------ */

function ResultGroup({
  type,
  results,
  onSeeAll,
}: {
  type: SearchResultType;
  results: SearchResult[];
  onSeeAll: () => void;
}) {
  const meta = TYPE_META[type];
  const { Icon } = meta;
  // Cap the "All" view per group; full list available via the tab.
  const preview = results.slice(0, 6);
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-[length:var(--font-heading)] font-extrabold text-foreground">
          <Icon className={`w-5 h-5 ${meta.accent}`} />
          {meta.label}
          <span className="text-[length:var(--font-body)] font-medium text-muted-foreground">
            {results.length}
          </span>
        </h2>
        {results.length > preview.length && (
          <button
            onClick={onSeeAll}
            className="inline-flex items-center gap-1 text-[length:var(--font-body)] font-semibold text-primary hover:opacity-90 transition-colors"
          >
            See all {results.length} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      <ResultGrid results={preview} />
    </section>
  );
}

function ResultGrid({ results }: { results: SearchResult[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {results.map((r) => (
        <ResultCard key={`${r.type}-${r.id}`} result={r} />
      ))}
    </div>
  );
}

function ResultCard({ result }: { result: SearchResult }) {
  const meta = TYPE_META[result.type];
  const { Icon } = meta;
  return (
    <a
      href={result.url}
      className="group flex flex-col border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-300"
    >
      {result.image && (
        <div className="w-full h-40 bg-muted overflow-hidden">
          <SafeImage
            src={result.image}
            alt=""
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-flex items-center gap-1 text-[length:var(--font-badge)] font-bold uppercase tracking-wider ${meta.accent}`}>
            <Icon className="w-3.5 h-3.5" />
            {meta.singular}
          </span>
          {result.meta && (
            <span className="text-[length:var(--font-body)] text-muted-foreground truncate">
              · {result.meta}
            </span>
          )}
        </div>
        <h3 className="font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
          {result.title}
        </h3>
        {result.excerpt && (
          <p className="mt-2 text-[length:var(--font-body)] text-muted-foreground line-clamp-2">
            {result.excerpt}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-[length:var(--font-body)] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          View <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </a>
  );
}

interface ArticleSummary {
  title: string;
  excerpt?: string;
  url: string;
  date?: string;
  image?: string;
}

function ArticleCard({ a }: { a: ArticleSummary }) {
  return (
    <a
      href={a.url}
      className="group flex flex-col overflow-hidden border border-border bg-card hover:border-primary/50 transition-all"
    >
      {a.image && (
        <div className="w-full h-40 bg-muted overflow-hidden">
          <SafeImage
            src={a.image}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        {a.date && (
          <span className="text-[length:var(--font-body)] text-muted-foreground font-medium">
            {a.date}
          </span>
        )}
        <h3 className="mt-1 font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
          {a.title}
        </h3>
        {a.excerpt && (
          <p className="mt-2 text-[length:var(--font-body)] text-muted-foreground line-clamp-2">
            {a.excerpt}
          </p>
        )}
      </div>
    </a>
  );
}
