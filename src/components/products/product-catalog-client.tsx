"use client";

import {
  useState,
  useMemo,
  useEffect,
  useDeferredValue,
  useRef,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { mediaUrl } from "@/lib/media-url";
import Link from "next/link";
import {
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Search,
  Package,
  Check,
  ArrowRight,
} from "lucide-react";

import {
  CATEGORY_MAP,
  type Product,
} from "@/lib/product-config";
import { ProductGridCard } from "./product-grid-card";
import { ProductSpecs } from "./product-specs";

// ─── Types ─────────────────────────────────────────────────────────────

type ViewMode = "grid" | "list";
type SortOption = "name-asc" | "name-desc" | "brand" | "category" | "newest" | "popular";

interface FacetValue {
  value: string;
  count: number;
}

interface ProductCatalogClientProps {
  products: Product[];
  pageTitle?: string;
  hideCategoryFilter?: boolean;
  /** Override image aspect ratio for grid cards (default: "1/1"). */
  cardAspectRatio?: string;
  /** Image object-fit mode (default: "contain"). */
  cardObjectFit?: "contain" | "cover";
  /** Number of columns on desktop (lg+). Default: 3. */
  cardColumns?: 2 | 3 | 4;
}

/** Stable empty Set fallback so `selectedAttrs[key] ?? EMPTY_SET` doesn't churn renders. */
const EMPTY_SET: Set<string> = new Set();

function titleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function brandKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/[/\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function resolveBrandFromParam(
  products: Product[],
  brandParam: string | null,
): string | null {
  if (!brandParam) return null;
  const key = brandKey(brandParam);
  const match = products.find(
    (p) => brandKey(p.brandSlug) === key || brandKey(p.brand) === key,
  );
  return match ? match.brand : null;
}

// ─── Pure filter predicates ────────────────────────────────────────────

function matchesSearch(p: Product, q: string): boolean {
  if (!q) return true;
  return (
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.sku.toLowerCase().includes(q) ||
    p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

function attrsMatch(
  p: Product,
  selectedAttrs: Record<string, Set<string>>,
  exceptKey?: string,
): boolean {
  for (const [k, vals] of Object.entries(selectedAttrs)) {
    if (vals.size === 0 || k === exceptKey) continue;
    const pv = p.attributes?.[k];
    if (!pv || !vals.has(pv)) return false;
  }
  return true;
}

// ─── Filter UI helpers ──────────────────────────────────────────────────

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (detailsRef.current) detailsRef.current.open = defaultOpen;
  }, [defaultOpen]);

  return (
    <details
      ref={detailsRef}
      className="group border-b border-border last:border-b-0"
    >
      <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-bold text-foreground list-none [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <fieldset className="space-y-2 px-4 pb-4 pt-1">
        <legend className="sr-only">{title}</legend>
        {children}
      </fieldset>
    </details>
  );
}

function FilterRow({
  checked,
  onToggle,
  label,
  count,
  disabled,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  count?: number;
  disabled?: boolean;
}) {
  return (
    <label
      className={`flex items-center gap-2.5 py-0.5 ${
        disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer group/row"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        disabled={disabled}
        className="peer sr-only"
      />
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 peer-focus-visible:ring-offset-1 ${
          checked
            ? "border-primary bg-primary"
            : disabled
              ? "border-border bg-muted"
              : "border-border bg-card group-hover/row:border-primary"
        }`}
      >
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </span>
      <span
        className={`min-w-0 flex-1 truncate text-sm transition-colors ${
          checked
            ? "font-medium text-primary"
            : disabled
              ? "text-muted-foreground/50"
              : "text-foreground/80 group-hover/row:text-foreground"
        }`}
      >
        {label}
      </span>
      {typeof count === "number" && (
        <span className="shrink-0 text-xs text-muted-foreground">
          {count}
        </span>
      )}
    </label>
  );
}

function FacetGroup({
  title,
  items,
  selected,
  onToggle,
  renderLabel,
}: {
  title: string;
  items: FacetValue[];
  selected: Set<string>;
  onToggle: (value: string) => void;
  renderLabel?: (value: string) => string;
}) {
  const LIMIT = 6;
  const [expanded, setExpanded] = useState(false);

  const visibleItems = items.filter(
    (it) => it.count > 0 || selected.has(it.value),
  );
  const shown = expanded ? visibleItems : visibleItems.slice(0, LIMIT);
  const hiddenCount = visibleItems.length - LIMIT;

  return (
    <FilterSection title={title}>
      {shown.length === 0 ? (
        <p className="py-0.5 text-sm text-muted-foreground/40">
          No options
        </p>
      ) : (
        shown.map((it) => (
          <FilterRow
            key={it.value}
            checked={selected.has(it.value)}
            onToggle={() => onToggle(it.value)}
            label={renderLabel ? renderLabel(it.value) : it.value}
            count={it.count}
          />
        ))
      )}
      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          {expanded ? "Show less" : `Show ${hiddenCount} more`}
        </button>
      )}
    </FilterSection>
  );
}

// ─── Product Table Row (List View) ───────────────────────────────────────

function ProductTableRow({ product, isLast }: { product: Product; isLast: boolean }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group flex flex-col gap-4 px-4 py-4 transition-colors duration-150 sm:flex-row sm:items-center sm:gap-5 sm:px-5 bg-card hover:bg-muted/50 ${
        isLast ? "" : "border-b border-border"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative flex h-24 w-24 shrink-0 items-center justify-center self-start overflow-hidden border border-border bg-muted/50 sm:h-28 sm:w-28 sm:self-center">
        <img
          src={mediaUrl(product.image)}
          alt={product.name}
          className="h-full w-full object-contain p-2"
          loading="lazy"
        />
      </div>

      {/* Product info + spec list */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-px text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10">
            {product.brand}
          </span>
          {product.sku && (
            <span className="truncate font-mono text-xs text-muted-foreground">
              {product.sku}
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold text-foreground line-clamp-2 sm:line-clamp-1">
          {product.name}
        </h3>
        <div className="mt-2.5">
          <ProductSpecs attributes={product.attributes} columns={2} max={8} />
        </div>
      </div>

      {/* CTA — enterprise outline-to-fill */}
      <div className="shrink-0 sm:self-center">
        <span className="inline-flex w-full items-center justify-center gap-1.5 border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary sm:w-auto">
          Request Quote
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

// ─── Main Catalog Client Component ───────────────────────────────────────

const PRODUCTS_PER_PAGE_OPTIONS = [12, 20, 24] as const;

export function ProductCatalogClient({
  products: productSource,
  pageTitle: _pageTitle = "Product Catalog",
  hideCategoryFilter = false,
  cardAspectRatio = "1/1",
  cardObjectFit = "contain",
  cardColumns = 3,
}: ProductCatalogClientProps) {
  const searchParams = useSearchParams();

  // Category list (slug → title) derived from the product source.
  const derivedCategories = useMemo(() => {
    const catSlugs = [...new Set(productSource.map((p) => p.categorySlug))];
    return catSlugs.map((slug) => ({
      slug,
      title: CATEGORY_MAP[slug] || slug,
    }));
  }, [productSource]);

  const allBrands = useMemo(
    () => [...new Set(productSource.map((p) => p.brand))].sort(),
    [productSource],
  );

  // ─── Multi-select filter state ──────────────────────────────────────
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    () => new Set(),
  );
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(() => {
    const resolved = resolveBrandFromParam(productSource, searchParams.get("brand"));
    return resolved ? new Set([resolved]) : new Set();
  });
  const [selectedAttrs, setSelectedAttrs] = useState<
    Record<string, Set<string>>
  >({});

  const brandParam = searchParams.get("brand");
  const [prevBrandParam, setPrevBrandParam] = useState(brandParam);
  if (brandParam !== prevBrandParam) {
    setPrevBrandParam(brandParam);
    const resolved = resolveBrandFromParam(productSource, brandParam);
    setSelectedBrands(resolved ? new Set([resolved]) : new Set());
  }

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(20);

  const q = deferredSearchQuery.trim().toLowerCase();

  // ─── Toggle handlers ────────────────────────────────────────────────
  const toggleCategory = (slug: string) =>
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  const toggleBrand = (brand: string) =>
    setSelectedBrands((prev) => {
      const next = new Set(prev);
      if (next.has(brand)) next.delete(brand);
      else next.add(brand);
      return next;
    });

  const toggleAttr = (key: string, value: string) =>
    setSelectedAttrs((prev) => {
      const next = { ...prev };
      const set = new Set(next[key] ?? []);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      if (set.size === 0) delete next[key];
      else next[key] = set;
      return next;
    });

  const clearAll = () => {
    setSelectedCategories(new Set());
    setSelectedBrands(new Set());
    setSelectedAttrs({});
    setSearchQuery("");
  };

  // ─── Scope base: search + category + brand ──────────────────────────
  const scopeBase = useMemo(
    () =>
      productSource.filter(
        (p) =>
          matchesSearch(p, q) &&
          (selectedCategories.size === 0 || selectedCategories.has(p.categorySlug)) &&
          (selectedBrands.size === 0 || selectedBrands.has(p.brand)),
      ),
    [productSource, q, selectedCategories, selectedBrands],
  );

  // ─── Displayed products: scopeBase + attribute facets + sort ─────────
  const products = useMemo(() => {
    const result = scopeBase.filter((p) => attrsMatch(p, selectedAttrs));

    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "brand":
        result.sort((a, b) => a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name));
        break;
      case "category":
        result.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
        break;
      case "newest":
        // Higher CMS id = added more recently
        result.sort((a, b) => b.id - a.id);
        break;
      case "popular":
        // Fallback to name-asc; extend with popularity field later
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [scopeBase, selectedAttrs, sortBy]);

  // ─── Live category counts ───────────────────────────────────────────
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of productSource) {
      if (
        !matchesSearch(p, q) ||
        (selectedBrands.size > 0 && !selectedBrands.has(p.brand)) ||
        !attrsMatch(p, selectedAttrs)
      )
        continue;
      counts[p.categorySlug] = (counts[p.categorySlug] ?? 0) + 1;
    }
    return counts;
  }, [productSource, q, selectedBrands, selectedAttrs]);

  // ─── Live brand counts ──────────────────────────────────────────────
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of productSource) {
      if (
        !matchesSearch(p, q) ||
        (selectedCategories.size > 0 && !selectedCategories.has(p.categorySlug)) ||
        !attrsMatch(p, selectedAttrs)
      )
        continue;
      counts[p.brand] = (counts[p.brand] ?? 0) + 1;
    }
    return counts;
  }, [productSource, q, selectedCategories, selectedAttrs]);

  // Category facet options
  const categoryOptions = useMemo(
    () =>
      derivedCategories
        .map((c) => ({ value: c.slug, count: categoryCounts[c.slug] ?? 0 }))
        .filter((o) => o.count > 0 || selectedCategories.has(o.value))
        .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value)),
    [derivedCategories, categoryCounts, selectedCategories],
  );

  // Brand facet options
  const brandOptions = useMemo(
    () =>
      allBrands
        .map((b) => ({ value: b, count: brandCounts[b] ?? 0 }))
        .filter((o) => o.count > 0 || selectedBrands.has(o.value))
        .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value)),
    [allBrands, brandCounts, selectedBrands],
  );

  // ─── Attribute facets derived from current scope ─────────────────────
  const attrFacets = useMemo(() => {
    const keyToValues = new Map<string, Map<string, number>>();
    for (const p of scopeBase) {
      const attrs = p.attributes;
      if (!attrs) continue;
      for (const [k, v] of Object.entries(attrs)) {
        const val = String(v ?? "").trim();
        if (!val) continue;
        let vm = keyToValues.get(k);
        if (!vm) {
          vm = new Map();
          keyToValues.set(k, vm);
        }
        vm.set(val, (vm.get(val) ?? 0) + 1);
      }
    }

    const keys = [...keyToValues.entries()]
      .filter(([, vm]) => vm.size >= 2)
      .map(([key, vm]) => ({
        key,
        total: [...vm.values()].reduce((a, b) => a + b, 0),
      }))
      .sort((a, b) => b.total - a.total || a.key.localeCompare(b.key));

    return keys.map(({ key }) => {
      const base = scopeBase.filter((p) => attrsMatch(p, selectedAttrs, key));
      const counts = new Map<string, number>();
      for (const p of base) {
        const v = String(p.attributes?.[key] ?? "").trim();
        if (!v) continue;
        counts.set(v, (counts.get(v) ?? 0) + 1);
      }
      const vm = keyToValues.get(key)!;
      const values = [...vm.keys()]
        .map((value) => ({ value, count: counts.get(value) ?? 0 }))
        .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
      return { key, values };
    });
  }, [scopeBase, selectedAttrs]);

  const hasFilters =
    selectedCategories.size > 0 ||
    selectedBrands.size > 0 ||
    Object.values(selectedAttrs).some((s) => s.size > 0) ||
    searchQuery.trim() !== "";

  // Pagination
  const totalPages = Math.ceil(products.length / perPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  // Reset to page 1 when filters, sort, or perPage change
  const filterKey = [
    [...selectedCategories].sort().join(","),
    [...selectedBrands].sort().join(","),
    Object.entries(selectedAttrs)
      .map(([k, v]) => `${k}=${[...v].sort().join("|")}`)
      .sort()
      .join("&"),
    deferredSearchQuery,
    sortBy,
    String(perPage),
  ].join("||");
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setCurrentPage(1);
  }

  // Category slug → title for chips and facet labels
  const categoryTitle = (slug: string) =>
    derivedCategories.find((c) => c.slug === slug)?.title ?? slug;

  // ─── Shared filter panel (desktop sidebar + mobile drawer) ───────────
  const renderFilterPanel = () => (
    <div className="overflow-hidden border border-border bg-card">
      {/* Panel header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3">
        <span className="text-sm font-bold text-foreground">Filters</span>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-primary underline transition-colors hover:text-primary/80"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Product Type */}
      {!hideCategoryFilter && categoryOptions.length > 0 && (
        <FacetGroup
          title="Product Type"
          items={categoryOptions}
          selected={selectedCategories}
          onToggle={toggleCategory}
          renderLabel={categoryTitle}
        />
      )}

      {/* Brand */}
      {brandOptions.length > 0 && (
        <FacetGroup
          title="Brand"
          items={brandOptions}
          selected={selectedBrands}
          onToggle={toggleBrand}
        />
      )}

      {/* Attribute facets */}
      {attrFacets.map((facet) => (
        <FacetGroup
          key={facet.key}
          title={titleCase(facet.key)}
          items={facet.values}
          selected={selectedAttrs[facet.key] ?? EMPTY_SET}
          onToggle={(value) => toggleAttr(facet.key, value)}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-muted">
      <div className="container-primary py-8 md:py-12">
        <div className="flex gap-8">
          {/* ─── Sidebar ─── */}
          <aside className="hidden lg:block w-80 shrink-0 self-start sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide space-y-4 pr-1">
            {renderFilterPanel()}
          </aside>

          {/* ─── Main Content ─── */}
          <div className="min-w-0 flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              {/* Left: result count + mobile filter */}
              <div className="flex shrink-0 items-center gap-3">
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </button>
                <p className="text-sm text-muted-foreground">
                  {searchQuery.trim() ? (
                    <>
                      <strong className="text-foreground">{products.length}</strong>{" "}
                      results for{" "}
                      <strong className="text-primary">
                        &ldquo;{searchQuery}&rdquo;
                      </strong>
                    </>
                  ) : (
                    <>
                      Showing{" "}
                      <strong className="text-foreground">{products.length}</strong>{" "}
                      of {productSource.length} products
                    </>
                  )}
                </p>
              </div>

              {/* Right: search + sort + per-page + view toggle */}
              <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
                {/* Search bar */}
                <div className="relative w-full max-w-[160px] min-w-[140px] sm:max-w-[220px] sm:min-w-[180px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-border bg-card py-2 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="cursor-pointer border border-border bg-card px-2 py-2 text-sm text-foreground focus:border-primary focus:outline-none sm:px-3"
                >
                  <option value="name-asc">Name: A–Z</option>
                  <option value="name-desc">Name: Z–A</option>
                  <option value="newest">Newest</option>
                  <option value="popular">Popular</option>
                  <option value="brand">Brand</option>
                  <option value="category">Category</option>
                </select>

                {/* Products per page */}
                <select
                  value={perPage}
                  onChange={(e) => setPerPage(Number(e.target.value))}
                  className="cursor-pointer border border-border bg-card px-2 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                  aria-label="Products per page"
                >
                  {PRODUCTS_PER_PAGE_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {n} / page
                    </option>
                  ))}
                </select>

                {/* View toggle */}
                <div className="hidden sm:flex items-center border border-border bg-card">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`inline-flex items-center justify-center w-10 h-9 transition-all ${
                      viewMode === "grid"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                    title="Grid view"
                    aria-pressed={viewMode === "grid"}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <div className="h-5 w-px bg-border" />
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`inline-flex items-center justify-center w-10 h-9 transition-all ${
                      viewMode === "list"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                    title="List view"
                    aria-pressed={viewMode === "list"}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filter tags */}
            {hasFilters && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Search: &ldquo;{searchQuery}&rdquo;
                    <button onClick={() => setSearchQuery("")}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {[...selectedCategories].map((slug) => (
                  <span
                    key={`cat-${slug}`}
                    className="inline-flex items-center gap-1 border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {categoryTitle(slug)}
                    <button onClick={() => toggleCategory(slug)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {[...selectedBrands].map((brand) => (
                  <span
                    key={`brand-${brand}`}
                    className="inline-flex items-center gap-1 border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {brand}
                    <button onClick={() => toggleBrand(brand)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {Object.entries(selectedAttrs).flatMap(([key, vals]) =>
                  [...vals].map((value) => (
                    <span
                      key={`attr-${key}-${value}`}
                      className="inline-flex items-center gap-1 border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {titleCase(key)}: {value}
                      <button onClick={() => toggleAttr(key, value)}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )),
                )}
                <button
                  onClick={clearAll}
                  className="text-sm text-muted-foreground underline transition-colors hover:text-primary"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Mobile Filters Panel */}
            {showMobileFilters && (
              <div className="mb-6 space-y-4 lg:hidden">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                {renderFilterPanel()}
              </div>
            )}

            {/* Product Grid / List */}
            {products.length === 0 ? (
              <div className="py-20 text-center">
                <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
                <h3 className="mb-1 text-lg font-bold text-foreground">
                  No products found
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div
                className={`grid grid-cols-2 ${
                  cardColumns === 4
                    ? "lg:grid-cols-4"
                    : cardColumns === 2
                      ? "lg:grid-cols-2"
                      : "lg:grid-cols-3"
                } gap-3 sm:gap-4 md:gap-5`}
              >
                {paginatedProducts.map((product, i) => (
                  <ProductGridCard
                    key={product.slug}
                    product={product}
                    index={i}
                    aspectRatio={cardAspectRatio}
                    objectFit={cardObjectFit}
                  />
                ))}
              </div>
            ) : (
              <div className="overflow-hidden border border-border">
                {paginatedProducts.map((product, i) => (
                  <ProductTableRow
                    key={product.slug}
                    product={product}
                    isLast={i === paginatedProducts.length - 1}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-1.5 overflow-x-auto py-2 sm:gap-2 scrollbar-hide">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-card text-muted-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center text-sm font-medium transition-colors sm:h-10 sm:w-10 ${
                      page === currentPage
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-card text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-card text-muted-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Results info */}
            {products.length > 0 && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Showing {(currentPage - 1) * perPage + 1}–
                {Math.min(currentPage * perPage, products.length)} of{" "}
                {products.length} products
                {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
