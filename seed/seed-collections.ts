/**
 * Collections seeder — seeds all 14 data-bearing collections in dependency order.
 *
 * Each phase is idempotent: re-running safely updates existing records.
 */

import type { PayloadInstance } from "./runner";
import {
  getPayloadInstance,
  upsert,
  upsertGlobal,
  log,
  getErrorMessage,
} from "./runner";

// ── Fixture data ──
import CATEGORIES from "./data/categories";
import PRODUCTS from "./data/products";
import STATS from "./data/stats";
import TESTIMONIALS from "./data/testimonials";
import AWARDS from "./data/awards";
import NEWS_ITEMS from "./data/news-items";
import BLOG_POSTS from "./data/blog-posts";
import OFFICE_LOCATIONS from "./data/office-locations";
import FAQ_ENTRIES from "./data/faq-entries";
import CAREERS from "./data/careers";
import PAGES from "./data/pages";
import PAGE_PARENTS from "./data/page-parents";
import BRAND_SLUGS from "./data/brand-slugs";
import BRAND_NAMES from "./data/brand-names";

// ── Types ──

interface IdMaps {
  categories: Record<string, string | number>;
  brands: Record<string, string | number>;
  products: Record<string, string | number>;
  stats: (string | number)[];
  testimonials: (string | number)[];
  awards: (string | number)[];
}

// ── Main ──

export async function seedCollections(): Promise<IdMaps> {
  const payload = getPayloadInstance();
  const ids: IdMaps = {
    categories: {},
    brands: {},
    products: {},
    stats: [],
    testimonials: [],
    awards: [],
  };

  // ── Phase 0: Admin User ──
  console.log("\n📋 Phase 0: Admin User");
  try {
    await upsert("users", "email", "admin@simal.com", {
      email: "admin@simal.com",
      password: "SimalAdmin123!",
      firstName: "Admin",
      lastName: "User",
      role: "administrator",
      active: true,
    });
    log("users", "✓ admin@simal.com (administrator)");
  } catch (e: unknown) {
    console.error("  ✗ Admin user:", getErrorMessage(e).slice(0, 120));
  }

  // ── Phase 1: Categories ──
  console.log("\n📋 Phase 1: Categories");
  for (const cat of CATEGORIES) {
    try {
      const data = { ...cat } as Record<string, unknown>;
      ids.categories[cat.slug] = await upsert(
        "categories",
        "slug",
        cat.slug,
        data,
      );
      log("categories", `✓ ${cat.title}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${cat.title}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 2: Brands (minimal — full data seeded separately) ──
  console.log("\n📋 Phase 2: Brands");
  for (const slug of BRAND_SLUGS) {
    try {
      const name = BRAND_NAMES[slug];
      const data: Record<string, unknown> = {
        name,
        slug,
        meta: {
          title: name,
          description: `${name} products distributed by Simal Technologies`,
        },
      };
      ids.brands[slug] = await upsert("brands", "slug", slug, data);
      log("brands", `✓ ${name}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${slug}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 3: Products ──
  console.log("\n📋 Phase 3: Products");
  for (const prod of PRODUCTS) {
    try {
      const data: Record<string, unknown> = {
        sku: prod.sku,
        slug: prod.sku.toLowerCase(),
        name: prod.name,
        specs: prod.specs,
        stockStatus: prod.stockStatus,
      };
      if (ids.categories[prod.category])
        data.category = ids.categories[prod.category];
      if (ids.brands[prod.brand]) data.brand = ids.brands[prod.brand];
      ids.products[prod.sku] = await upsert(
        "products",
        "sku",
        prod.sku,
        data,
      );
      log("products", `✓ ${prod.name}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${prod.sku}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 4: Stats ──
  console.log("\n📋 Phase 4: Stats");
  for (const stat of STATS) {
    try {
      const data = { ...stat } as Record<string, unknown>;
      const id = await upsert("stats", "label", stat.label, data);
      ids.stats.push(id);
      log("stats", `✓ ${stat.label}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${stat.label}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 5: Testimonials ──
  console.log("\n📋 Phase 5: Testimonials");
  for (const t of TESTIMONIALS) {
    try {
      const data = { ...t } as Record<string, unknown>;
      const id = await upsert("testimonials", "authorName", t.authorName, data);
      ids.testimonials.push(id);
      log("testimonials", `✓ ${t.authorName}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${t.authorName}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 6: Awards ──
  console.log("\n📋 Phase 6: Awards");
  for (const award of AWARDS) {
    try {
      const data = { ...award } as Record<string, unknown>;
      const id = await upsert("awards", "title", award.title, data);
      ids.awards.push(id);
      log("awards", `✓ ${award.title}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${award.title}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 7: News Items ──
  console.log("\n📋 Phase 7: News Items");
  for (const news of NEWS_ITEMS) {
    try {
      const data = { ...news } as Record<string, unknown>;
      await upsert("news-items", "slug", news.slug, data);
      log("news-items", `✓ ${news.title}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${news.title}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 8: Blog Posts ──
  console.log("\n📋 Phase 8: Blog Posts");
  for (const post of BLOG_POSTS) {
    try {
      const data = { ...post } as Record<string, unknown>;
      await upsert("blog-posts", "slug", post.slug, data);
      log("blog-posts", `✓ ${post.title}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${post.title}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 9: Office Locations ──
  console.log("\n📋 Phase 9: Office Locations");
  for (const office of OFFICE_LOCATIONS) {
    try {
      const data = { ...office } as Record<string, unknown>;
      await upsert("office-locations", "city", office.city, data);
      log("office-locations", `✓ ${office.city}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${office.city}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 10: FAQ Entries ──
  console.log("\n📋 Phase 10: FAQ Entries");
  for (const faq of FAQ_ENTRIES) {
    try {
      const data = { ...faq } as Record<string, unknown>;
      await upsert("faq-entries", "question", faq.question, data);
      log("faq-entries", `✓ ${faq.question.substring(0, 60)}...`);
    } catch (e: unknown) {
      console.error(`  ✗ FAQ:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 11: Careers ──
  console.log("\n📋 Phase 11: Careers");
  for (const career of CAREERS) {
    try {
      const data = { ...career } as Record<string, unknown>;
      await upsert("careers", "slug", career.slug, data);
      log("careers", `✓ ${career.title}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${career.title}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // ── Phase 12: Pages ──
  console.log("\n📋 Phase 12: Pages");
  const PROTECTED_PAGE_SLUGS = ["about"];
  const pageIdsBySlug = new Map<string, string | number>();

  for (const page of PAGES) {
    try {
      if (PROTECTED_PAGE_SLUGS.includes(page.slug)) {
        const { findDoc } = await import("./runner");
        const existing = await findDoc("pages", "slug", page.slug);
        if (existing) {
          pageIdsBySlug.set(page.slug, existing.id);
          log("pages", `⊘ Skipped (protected): ${page.title}`);
          continue;
        }
      }
      const data = { ...page } as Record<string, unknown>;
      const id = await upsert("pages", "slug", page.slug, data);
      pageIdsBySlug.set(page.slug, id);
      log("pages", `✓ ${page.title}`);
    } catch (e: unknown) {
      console.error(`  ✗ ${page.title}:`, getErrorMessage(e).slice(0, 120));
    }
  }

  // Parent-child linking
  for (const [parentSlug, childSlugs] of Object.entries(PAGE_PARENTS)) {
    const parentId = pageIdsBySlug.get(parentSlug);
    if (!parentId) continue;
    for (const childSlug of childSlugs) {
      const childId = pageIdsBySlug.get(childSlug);
      if (!childId) continue;
      try {
        await payload.update({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          collection: "pages" as any,
          id: childId as unknown as number,
          data: { parent: parentId as unknown as number } as any,
          overrideAccess: true,
        });
        log("pages", `  → Linked "${childSlug}" under "${parentSlug}"`);
      } catch (e: unknown) {
        console.error(
          `  ✗ Link ${childSlug}:`,
          getErrorMessage(e).slice(0, 120),
        );
      }
    }
  }

  // ── Phase 13: Services ──
  console.log("\n📋 Phase 13: Services");
  try {
    // Services are seeded separately if the fixture exists
    const servicesModule = await import("./data/services").catch(() => null);
    if (servicesModule?.default) {
      for (const svc of servicesModule.default) {
        const data = { ...svc } as Record<string, unknown>;
        await upsert("services", "slug", svc.slug, data);
        log("services", `✓ ${svc.title}`);
      }
    } else {
      log("services", "(no services fixture — skipping)");
    }
  } catch (e: unknown) {
    console.error("  ✗ Services:", getErrorMessage(e).slice(0, 120));
  }

  return ids;
}
