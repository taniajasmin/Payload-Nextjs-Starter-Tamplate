"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import {
  INDUSTRY_META,
  type CaseStudy,
  type IndustryMeta,
} from "./case-studies-data";

/* ------------------------------------------------------------------
   Types
   ------------------------------------------------------------------ */
export type { CaseStudy };

/* ------------------------------------------------------------------
   Props
   ------------------------------------------------------------------ */
interface CaseStudiesGridProps {
  studies: CaseStudy[];
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */
export default function CaseStudiesGrid({ studies }: CaseStudiesGridProps) {
  const [industryFilter, setIndustryFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");

  // Derive unique filter options from the data
  const { industries, services } = useMemo(() => {
    const ind = new Set<string>();
    const svc = new Set<string>();
    studies.forEach((s) => {
      ind.add(s.industry);
      if (s.service) svc.add(s.service);
    });
    return {
      industries: Array.from(ind).sort(),
      services: Array.from(svc).sort(),
    };
  }, [studies]);

  // Filter
  const filtered = useMemo(() => {
    return studies.filter((s) => {
      if (industryFilter && s.industry !== industryFilter) return false;
      if (serviceFilter && s.service !== serviceFilter) return false;
      return true;
    });
  }, [studies, industryFilter, serviceFilter]);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-7">
        {/* Industry filter */}
        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          className="border border-border bg-card px-4 py-2.5 text-sm text-foreground font-medium cursor-pointer transition-colors hover:border-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        >
          <option value="">All Industries</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>

        {/* Service filter — only show if there are services */}
        {services.length > 0 && (
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="border border-border bg-card px-4 py-2.5 text-sm text-foreground font-medium cursor-pointer transition-colors hover:border-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          >
            <option value="">All Services</option>
            {services.map((svc) => (
              <option key={svc} value={svc}>
                {svc}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cs) => {
          const meta: IndustryMeta | undefined = INDUSTRY_META[cs.industry];
          const Icon = meta?.icon;
          return (
            <article
              key={cs.title}
              className="flex flex-col border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              {/* Industry icon + label */}
              <div className="flex items-center gap-3 mb-4">
                {Icon && meta ? (
                  <>
                    <div className="inline-flex items-center justify-center w-11 h-11 bg-primary">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-primary">
                        {cs.industry}
                      </span>
                      {cs.service && (
                        <span className="block text-[10px] text-muted-foreground">
                          {cs.service}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {cs.industry}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground mb-2">
                {cs.title}
              </h3>

              {/* Summary */}
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                {cs.summary}
              </p>

              {/* Metrics */}
              {cs.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {cs.metrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="bg-muted px-3 py-2.5">
                      <div className="text-lg font-extrabold text-primary">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer: location + read more */}
              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {cs.location}
                </span>
                <Link
                  href={`/company/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  aria-label={`Read more: ${cs.title}`}
                >
                  Read more
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-sm">
            No case studies match the selected filters.
          </p>
          <button
            onClick={() => {
              setIndustryFilter("");
              setServiceFilter("");
            }}
            className="mt-3 text-primary font-medium text-sm hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
