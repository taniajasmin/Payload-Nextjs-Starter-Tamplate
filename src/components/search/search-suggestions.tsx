"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import {
  Search,
  Package,
  Award,
  Newspaper,
  Briefcase,
  HelpCircle,
  FileText,
  LayoutGrid,
  Loader2,
  ArrowRight,
} from "lucide-react";
import type { SearchResult, SearchResultType } from "@/lib/search";
import { SafeImage } from "@/components/ui/safe-image";

const ICONS: Record<SearchResultType, React.ComponentType<{ className?: string }>> = {
  product: Package,
  brand: Award,
  blog: Newspaper,
  news: Newspaper,
  page: FileText,
  career: Briefcase,
  faq: HelpCircle,
  category: LayoutGrid,
};

const TYPE_LABEL: Record<SearchResultType, string> = {
  product: "Product",
  brand: "Brand",
  blog: "Article",
  news: "News",
  page: "Page",
  career: "Job",
  faq: "FAQ",
  category: "Category",
};

interface Props {
  onSubmitQuery: (query: string) => void;
  /** "header" renders input + results inline within a parent dropdown panel. */
  variant?: "standalone" | "header";
}

const inputStandalone =
  "w-full h-10 border border-border bg-background pl-10 pr-9 text-[length:var(--font-body)] text-foreground placeholder:text-muted-foreground focus:outline-none focus:bg-card focus:border-primary transition-colors";

const inputHeader =
  "w-full h-12 border-0 bg-transparent pl-10 pr-9 text-[length:var(--font-body)] text-foreground placeholder:text-muted-foreground focus:outline-none";

const resultsStandalone =
  "absolute right-0 top-12 w-[min(420px,90vw)] border border-border bg-card overflow-hidden z-[70]";

const resultsHeader =
  "w-full border-t border-border overflow-hidden";

export function SearchSuggestions({ onSubmitQuery, variant = "standalone" }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const [value, setValue] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reqIdRef = useRef(0);

  const isHeader = variant === "header";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const runSearch = useCallback(
    async (q: string) => {
      const myId = ++reqIdRef.current;
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(q)}&limit=6&locale=${encodeURIComponent(locale)}`,
          { cache: "no-store" },
        );
        const data = (await res.json()) as { results?: SearchResult[] };
        if (myId === reqIdRef.current) {
          setResults(data.results ?? []);
          setOpen(true);
        }
      } catch {
        if (myId === reqIdRef.current) setResults([]);
      } finally {
        if (myId === reqIdRef.current) setLoading(false);
      }
    },
    [locale],
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = value.trim();
    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    debounceRef.current = setTimeout(() => runSearch(q), 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, runSearch]);

  const goToResult = (r: SearchResult) => {
    setOpen(false);
    setValue("");
    setResults([]);
    window.location.href = r.url;
  };

  const submit = (opts?: { all?: boolean }) => {
    const q = value.trim();
    if (!q) return;
    setOpen(false);

    if (!opts?.all) {
      const norm = (s: string) => s.trim().toLowerCase();
      const decode = (s: string) => {
        try {
          return norm(decodeURIComponent(s));
        } catch {
          return norm(s);
        }
      };
      const brandMatch = results.find((r) => {
        if (r.type !== "brand") return false;
        const slug = r.url.match(/[?&]brand=([^&]+)/)?.[1] ?? "";
        return (
          norm(r.title) === norm(q) || (slug !== "" && decode(slug) === norm(q))
        );
      });
      if (brandMatch) {
        setValue("");
        setResults([]);
        window.location.href = brandMatch.url;
        return;
      }
    }

    onSubmitQuery(q);
  };

  const showDropdown = open && value.trim().length >= 2;
  const inputClass = isHeader ? inputHeader : inputStandalone;
  const resultsClass = isHeader ? resultsHeader : resultsStandalone;
  const iconMuted = "text-muted-foreground";

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${iconMuted}`} />
        <input
          type="search"
          name="q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => value.trim().length >= 2 && results.length > 0 && setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="Search products, brands, articles…"
          aria-label="Search site"
          aria-expanded={showDropdown}
          aria-controls="search-suggestions-listbox"
          autoComplete="off"
          autoFocus
          className={inputClass}
        />
        {loading && (
          <Loader2 className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin ${iconMuted}`} />
        )}
      </div>

      {showDropdown && (
        <div id="search-suggestions-listbox" role="listbox" className={resultsClass}>
          {loading && results.length === 0 ? (
            <div className="px-4 py-6 text-center text-[length:var(--font-body)] text-muted-foreground">
              Searching…
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-6 text-center text-[length:var(--font-body)] text-muted-foreground">
              No quick matches. Press Enter for full results.
            </div>
          ) : (
            <ul className="max-h-[60vh] overflow-y-auto py-1.5">
              {results.map((r) => {
                const Icon = ICONS[r.type];
                return (
                  <li key={`${r.type}-${r.id}`} role="option" aria-selected={false}>
                    <button
                      type="button"
                      onClick={() => goToResult(r)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-muted transition-colors"
                    >
                      <span className="relative shrink-0 w-10 h-10 bg-muted flex items-center justify-center overflow-hidden">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        {r.image && (
                          <SafeImage
                            src={r.image}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-foreground text-[length:var(--font-body)]">
                          {r.title}
                        </span>
                        <span className="block text-[length:var(--font-badge)] text-muted-foreground uppercase tracking-wider">
                          {TYPE_LABEL[r.type]}
                          {r.meta ? ` · ${r.meta}` : ""}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
              <li className="border-t border-border">
                <button
                  type="button"
                  onClick={() => submit({ all: true })}
                  className="w-full flex items-center justify-between px-4 py-3 text-[length:var(--font-body)] font-semibold text-primary hover:bg-muted transition-colors"
                >
                  See all results for &ldquo;{value.trim()}&rdquo;
                  <ArrowRight className="w-4 h-4" />
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
