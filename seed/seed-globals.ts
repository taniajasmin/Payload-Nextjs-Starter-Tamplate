/**
 * Globals seeder — seeds all 22 Payload globals.
 *
 * Each phase is idempotent: updateGlobal() is always an upsert.
 */

import { getPayloadInstance, upsertGlobal, log, getErrorMessage } from "./runner";

// ── Fixture data ──
import {
  HEADER_DATA,
  FOOTER_DATA,
  SITE_SETTINGS_DATA,
  HOMEPAGE_DATA,
} from "./data/globals";

import {
  ABOUT_PAGE_DATA,
  CONTACT_PAGE_DATA,
  BRANDS_PAGE_DATA,
  IT_DISTRIBUTION_PAGE_DATA,
  AUTHORIZED_BRANDS_PAGE_DATA,
  PRODUCT_CATALOG_PAGE_DATA,
  COMPUTER_COMPONENTS_PAGE_DATA,
  COMPUTER_ACCESSORIES_PAGE_DATA,
  MONITORS_PAGE_DATA,
  GAMING_PAGE_DATA,
  LAPTOPS_PAGE_DATA,
} from "./data/globals-about";

// ── Helpers ──

async function seedGlobal(
  slug: string,
  data: Record<string, unknown>,
  label?: string,
): Promise<void> {
  try {
    await upsertGlobal(slug, data);
    log(slug, `✓ ${label ?? slug}`);
  } catch (e: unknown) {
    console.error(`  ✗ ${slug}:`, getErrorMessage(e).slice(0, 120));
  }
}

// ── Main ──

export async function seedGlobals(): Promise<void> {
  const payload = getPayloadInstance();

  // ── Phase 14: Header ──
  console.log("\n📋 Phase 14: Header Global");
  await seedGlobal("header", HEADER_DATA as Record<string, unknown>);

  // ── Phase 15: Footer ──
  console.log("\n📋 Phase 15: Footer Global");
  await seedGlobal("footer", FOOTER_DATA as Record<string, unknown>);

  // ── Phase 16: Site Settings ──
  console.log("\n📋 Phase 16: Site Settings Global");
  await seedGlobal(
    "site-settings",
    SITE_SETTINGS_DATA as Record<string, unknown>,
  );

  // ── Phase 17: Homepage (resolves product/brand/testimonial/stat IDs) ──
  console.log("\n📋 Phase 17: Homepage Global");
  try {
    const [productsRes, brandsRes, testimonialsRes, statsRes] =
      await Promise.all([
        payload.find({
          collection: "products",
          limit: 8,
          overrideAccess: true,
        }),
        payload.find({
          collection: "brands",
          limit: 12,
          overrideAccess: true,
        }),
        payload.find({
          collection: "testimonials",
          limit: 4,
          overrideAccess: true,
        }),
        payload.find({ collection: "stats", limit: 10, overrideAccess: true }),
      ]);

    const data = {
      ...HOMEPAGE_DATA,
      featuredProducts: productsRes.docs.map((d) => d.id),
      featuredBrands: brandsRes.docs.map((d) => d.id),
      featuredTestimonials: testimonialsRes.docs.map((d) => d.id),
      stats: statsRes.docs.map((d) => d.id),
    };

    await upsertGlobal("homepage", data as Record<string, unknown>);
    log("homepage", "✓ Homepage global seeded with hero slides & featured content");
  } catch (e: unknown) {
    console.error("  ✗ Homepage:", getErrorMessage(e).slice(0, 200));
  }

  // ── Phase 18-21: Page-content globals ──
  console.log("\n📋 Phase 18: About Page Global");
  await seedGlobal(
    "about-page",
    ABOUT_PAGE_DATA as Record<string, unknown>,
  );

  console.log("\n📋 Phase 19: Contact Page Global");
  await seedGlobal(
    "contact-page",
    CONTACT_PAGE_DATA as Record<string, unknown>,
  );

  console.log("\n📋 Phase 20: Careers Contact Page Global");
  try {
    const careersContact = await import("./data/careers-contact").catch(
      () => null,
    );
    if (careersContact?.default) {
      await seedGlobal(
        "careers-contact-page",
        careersContact.default as Record<string, unknown>,
      );
    } else {
      log("careers-contact-page", "(no fixture — skipping)");
    }
  } catch (e: unknown) {
    console.error(
      "  ✗ careers-contact-page:",
      getErrorMessage(e).slice(0, 120),
    );
  }

  console.log("\n📋 Phase 21: Brands Page Global");
  await seedGlobal(
    "brands-page",
    BRANDS_PAGE_DATA as Record<string, unknown>,
  );

  // ── Phase 22: Services Page Global ──
  console.log("\n📋 Phase 22: Services Page Global");
  try {
    // Try to find a services-page fixture
    const servicesPageModule = await import("./data/globals-about")
      .then((m: Record<string, unknown>) => m.SERVICES_PAGE_DATA)
      .catch(() => null);
    if (servicesPageModule) {
      await seedGlobal(
        "services-page",
        servicesPageModule as Record<string, unknown>,
      );
    } else {
      // Minimal placeholder
      await seedGlobal("services-page", {
        hero: {
          headline: "Professional IT Services",
          subHeadline:
            "From AMC to cloud security — comprehensive IT services for your business",
        },
      } as Record<string, unknown>);
    }
  } catch (e: unknown) {
    console.error(
      "  ✗ services-page:",
      getErrorMessage(e).slice(0, 120),
    );
  }

  // ── Phase 23: IT Distribution Global (slug: it-dp) ──
  console.log("\n📋 Phase 23: IT Distribution Page Global");
  await seedGlobal(
    "it-dp",
    IT_DISTRIBUTION_PAGE_DATA as Record<string, unknown>,
  );

  // ── Phases 24-32: IT Distribution sub-pages ──
  const subPages: Array<[string, Record<string, unknown>]> = [
    ["authorized-brands-page", AUTHORIZED_BRANDS_PAGE_DATA],
    ["product-catalog-page", PRODUCT_CATALOG_PAGE_DATA],
    ["computer-components-page", COMPUTER_COMPONENTS_PAGE_DATA],
    ["computer-accessories-page", COMPUTER_ACCESSORIES_PAGE_DATA],
    ["monitors-page", MONITORS_PAGE_DATA],
    ["gaming-page", GAMING_PAGE_DATA],
    ["laptops-page", LAPTOPS_PAGE_DATA],

  ];

  console.log("\n📋 Phase 24-34: IT Distribution Sub-Page Globals");
  for (const [slug, data] of subPages) {
    await seedGlobal(slug, data as Record<string, unknown>);
  }

  // ── Phase 35: Theme Global (minimal defaults) ──
  console.log("\n📋 Phase 35: Theme Global");
  try {
    await seedGlobal("theme", {
      brandColor: "#1a56db",
      accentColor: "#f59e0b",
    } as Record<string, unknown>);
  } catch (e: unknown) {
    // Theme global — non-fatal if it fails (Next.js static generation store)
    log("theme", "(skipped — Next.js static generation issue)");
  }

  console.log("\n✅ All globals seeded.");
}
