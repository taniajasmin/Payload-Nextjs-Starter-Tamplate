import { type JSX } from "react";
import { HIDDEN_SPEC_KEYS } from "@/lib/product-config";

interface ProductSpecsProps {
  /** Key/value specs from `Product.attributes` (sourced from CMS `specs`). */
  attributes?: Record<string, string>;
  /** Max spec entries to render. */
  max?: number;
  /** Grid columns on sm+ screens. Mobile is always 1 column. */
  columns?: 1 | 2;
  /** Hide the block entirely when there are no specs (default true). */
  hideWhenEmpty?: boolean;
}

/**
 * CDW-style label:value spec list shared by the product list row and grid card.
 * Renders `Product.attributes` as a compact `<dl>` grid — muted label above a
 * single-line value — the signature look of a CDW category listing.
 */
export function ProductSpecs({
  attributes,
  max = 6,
  columns = 2,
  hideWhenEmpty = true,
}: ProductSpecsProps): JSX.Element | null {
  const entries = Object.entries(attributes ?? {})
    .filter(
      ([key, value]) =>
        value && String(value).trim().length > 0 && !HIDDEN_SPEC_KEYS.has(key.toLowerCase()),
    )
    .slice(0, max);

  if (entries.length === 0) {
    return hideWhenEmpty ? null : (
      <div className="text-sm text-muted-foreground/30">No specs listed</div>
    );
  }

  return (
    <dl
      className={`grid grid-cols-1 ${columns === 2 ? "sm:grid-cols-2" : ""} gap-x-5 gap-y-1.5 text-[length:var(--font-body)] leading-snug`}
    >
      {entries.map(([key, value]) => (
        <div key={key} className="min-w-0 flex flex-col">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate">
            {key}
          </dt>
          <dd className="text-foreground/80 truncate text-xs">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
