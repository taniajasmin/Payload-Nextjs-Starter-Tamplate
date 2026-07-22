import React from "react";
import { getPayload, type BasePayload, type CollectionSlug } from "payload";
import config from "@payload-config";
import { themeConfig } from "../theme.config";

/**
 * Stats-overview widget mounted above Payload's default dashboard via
 * `admin.components.beforeDashboard`. Async SERVER component — Payload's
 * `RenderServerComponent` forwards the `payload` Local-API instance to RSC
 * slots, so we read counts directly (no client fetch, no extra requests).
 *
 * Reuses the Local-API pattern from src/app/(payload)/api/seed-brands/route.ts.
 * The injected `payload` prop is preferred; `getPayload` is only a fallback.
 */

type CollectionRef = { slug: CollectionSlug; label: string };
type Section = {
  key: string;
  label: string;
  emoji: string;
  collections: CollectionRef[];
};

// Mirrors the `admin.group` values set on the collections in src/collections/.
const SECTIONS: Section[] = [
  {
    key: "products",
    label: "Products",
    emoji: "📦",
    collections: [
      { slug: "products", label: "Products" },
      { slug: "brands", label: "Brands" },
      { slug: "categories", label: "Categories" },
    ],
  },
  {
    key: "content",
    label: "Content",
    emoji: "📝",
    collections: [
      { slug: "blog-posts", label: "Blog Posts" },
      { slug: "news-items", label: "News Items" },
      { slug: "pages", label: "Pages" },
      { slug: "office-locations", label: "Office Locations" },
      { slug: "faq-entries", label: "FAQ Entries" },
      { slug: "testimonials", label: "Testimonials" },
      { slug: "awards", label: "Awards" },
      { slug: "stats", label: "Stats" },
    ],
  },
  {
    key: "media",
    label: "Media",
    emoji: "🖼️",
    collections: [
      { slug: "media", label: "Media" },
      { slug: "media-folders", label: "Media Folders" },
    ],
  },
  {
    key: "careers",
    label: "Careers",
    emoji: "💼",
    collections: [
      { slug: "careers", label: "Job Listings" },
      { slug: "applications", label: "Applications" },
    ],
  },
  {
    key: "users",
    label: "Users",
    emoji: "👤",
    collections: [{ slug: "users", label: "Users" }],
  },
];

async function countCollection(
  payload: BasePayload,
  slug: CollectionSlug,
): Promise<number | null> {
  try {
    const { totalDocs } = await payload.count({ collection: slug });
    return typeof totalDocs === "number" ? totalDocs : null;
  } catch {
    // A single failing collection must not break the whole widget.
    return null;
  }
}

/** Gather per-section counts. Throws only on a total data-source failure. */
async function fetchSections(payload: BasePayload) {
  return Promise.all(
    SECTIONS.map(async (section) => {
      const rows = await Promise.all(
        section.collections.map(async (c) => ({
          ...c,
          count: await countCollection(payload, c.slug),
        })),
      );
      const counted = rows.filter((r) => typeof r.count === "number");
      const total = counted.reduce((sum, r) => sum + (r.count as number), 0);
      return { ...section, rows, total, allFailed: counted.length === 0 };
    }),
  );
}

export default async function DashboardStats({
  payload: injectedPayload,
}: {
  payload?: BasePayload;
}) {
  const { primary, primaryDark } = themeConfig.colors;

  // Fetch data inside try/catch (no JSX here) so a DB/config failure degrades
  // gracefully instead of crashing the whole dashboard.
  let sections: Awaited<ReturnType<typeof fetchSections>>;
  try {
    const payload = injectedPayload ?? (await getPayload({ config }));
    sections = await fetchSections(payload);
  } catch {
    return null;
  }

  return (
    <section style={{ margin: "1rem 0 1.5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.75rem",
          padding: "0 0.25rem",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          Content Overview
        </h2>
        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
          documents per section
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1rem",
        }}
      >
        {sections.map((section) => (
          <div
            key={section.key}
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderTop: `3px solid ${primary}`,
              borderRadius: 12,
              padding: "1rem 1.1rem",
              boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                }}
              >
                <span aria-hidden style={{ fontSize: "1.1rem" }}>
                  {section.emoji}
                </span>
                {section.label}
              </span>
              <span
                style={{
                  background: primary,
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  padding: "0.15rem 0.6rem",
                  borderRadius: 999,
                  minWidth: 28,
                  textAlign: "center",
                }}
                title="Total documents in this section"
              >
                {section.allFailed ? "—" : section.total}
              </span>
            </div>

            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {section.rows.map((row) => (
                <li key={row.slug}>
                  <a
                    href={`/admin/collections/${row.slug}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.3rem 0",
                      fontSize: "0.85rem",
                      color: "#475569",
                      textDecoration: "none",
                      borderTop: "1px solid #f1f5f9",
                    }}
                  >
                    <span>{row.label}</span>
                    <span
                      style={{
                        fontWeight: 700,
                        color: row.count === null ? "#cbd5e1" : primaryDark,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {row.count === null ? "—" : row.count}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
