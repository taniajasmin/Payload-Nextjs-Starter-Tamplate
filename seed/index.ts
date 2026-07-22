/**
 * Seed script — populates the database with example content.
 *
 * Usage:
 *   pnpm seed              # seed example content
 *   pnpm seed -- --force   # allow seeding in production
 *
 * Idempotent: safe to re-run — all operations are upserts.
 */

import "dotenv/config";
import { getPayload } from "payload";
import config from "../payload.config";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const force = process.argv.includes("--force");
  if (process.env.NODE_ENV === "production" && !force) {
    console.error("[seed] Refusing to seed in production. Re-run with --force to override.");
    process.exit(1);
  }

  console.log("\n🚀 Payload Starter — Database Seed\n");
  console.log("=".repeat(50) + "\n");

  const payload = await getPayload({ config });

  // ── 1. Admin User ────────────────────────────────────────────────────
  console.log("📋 Seeding admin user...");
  try {
    const existing = await payload.find({
      collection: "users",
      where: { email: { equals: "admin@example.com" } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      await payload.update({
        collection: "users",
        id: existing.docs[0].id,
        data: {
          email: "admin@example.com",
          password: "admin123",
          role: "administrator",
        },
      });
    } else {
      await payload.create({
        collection: "users",
        data: {
          email: "admin@example.com",
          password: "admin123",
          role: "administrator",
        },
      });
    }
    console.log("  ✓ admin@example.com / admin123");
  } catch (e) {
    console.error("  ✗ Failed to seed admin user:", e);
  }

  // ── 2. Header Global ─────────────────────────────────────────────────
  console.log("\n📋 Seeding Header...");
  try {
    await payload.updateGlobal({
      slug: "header",
      data: {
        logo: null,
        utilityBar: {
          phone: "+1 (555) 000-0000",
          email: "hello@example.com",
        },
        ctaButton: {
          label: "Get Started",
          href: "/contact",
          show: true,
        },
        navItems: [
          {
            label: "Home",
            link: "/",
            status: "published",
            hasDropdown: false,
          },
          {
            label: "About",
            link: "/about",
            status: "published",
            hasDropdown: false,
          },
          {
            label: "Contact",
            link: "/contact",
            status: "published",
            hasDropdown: false,
          },
        ],
      },
    });
    console.log("  ✓ Header (3 nav items)");
  } catch (e) {
    console.error("  ✗ Failed to seed header:", e);
  }

  // ── 3. Footer Global ─────────────────────────────────────────────────
  console.log("\n📋 Seeding Footer...");
  try {
    await payload.updateGlobal({
      slug: "footer",
      data: {
        brandName: "Acme Inc.",
        brandDescription:
          "A modern website powered by Payload CMS and Next.js. Built with the Payload Starter template.",
        logo: null,
        footerColumns: [
          {
            title: "Company",
            links: [
              { label: "About Us", href: "/about" },
              { label: "Contact", href: "/contact" },
            ],
          },
          {
            title: "Legal",
            links: [
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
            ],
          },
        ],
        socialLinks: [
          { platform: "linkedin", url: "https://linkedin.com" },
          { platform: "twitter", url: "https://twitter.com" },
          { platform: "facebook", url: "https://facebook.com" },
        ],
        copyright: "© {year} Acme Inc. All rights reserved.",
      },
    });
    console.log("  ✓ Footer (2 columns, 3 social links)");
  } catch (e) {
    console.error("  ✗ Failed to seed footer:", e);
  }

  // ── 4. Site Settings Global ──────────────────────────────────────────
  console.log("\n📋 Seeding Site Settings...");
  try {
    await payload.updateGlobal({
      slug: "site-settings",
      data: {
        siteName: "Acme Site",
        defaultEmail: "hello@example.com",
        defaultPhone: "+1 (555) 000-0000",
        typography: {
          heroHeadingSize: 48,
          headingSize: 36,
          bodyTextSize: 16,
          buttonTextSize: 14,
          navItemSize: 14,
          badgeSize: 12,
          sectionLabelSize: 14,
          captionSize: 12,
        },
      },
    });
    console.log("  ✓ Site Settings");
  } catch (e) {
    console.error("  ✗ Failed to seed site settings:", e);
  }

  // ── 5. Theme Global ──────────────────────────────────────────────────
  console.log("\n📋 Seeding Theme (Indigo preset)...");
  try {
    await payload.updateGlobal({
      slug: "theme",
      data: {
        preset: "indigo",
        radius: 8,
        lightMode: {
          background: "#ffffff",
          foreground: "#0f172a",
          card: "#ffffff",
          cardForeground: "#0f172a",
          popover: "#ffffff",
          popoverForeground: "#0f172a",
          primary: "#4f46e5",
          primaryForeground: "#ffffff",
          secondary: "#f1f5f9",
          secondaryForeground: "#0f172a",
          muted: "#f1f5f9",
          mutedForeground: "#64748b",
          accent: "#f1f5f9",
          accentForeground: "#0f172a",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#e2e8f0",
          input: "#e2e8f0",
          ring: "#4f46e5",
        },
        darkMode: {
          background: "#0f172a",
          foreground: "#f8fafc",
          card: "#1e293b",
          cardForeground: "#f8fafc",
          popover: "#1e293b",
          popoverForeground: "#f8fafc",
          primary: "#6366f1",
          primaryForeground: "#ffffff",
          secondary: "#1e293b",
          secondaryForeground: "#f8fafc",
          muted: "#1e293b",
          mutedForeground: "#94a3b8",
          accent: "#1e293b",
          accentForeground: "#f8fafc",
          destructive: "#ef4444",
          destructiveForeground: "#ffffff",
          border: "#334155",
          input: "#334155",
          ring: "#6366f1",
        },
      } as Record<string, unknown>,
    });
    console.log("  ✓ Theme (Indigo, light + dark)");
  } catch (e) {
    console.error("  ✗ Failed to seed theme:", e);
  }

  // ── 6. Pages ─────────────────────────────────────────────────────────
  console.log("\n📋 Seeding Pages...");

  // Helper to upsert a page by slug
  async function upsertPage(
    slug: string,
    title: string,
    data: Record<string, unknown>,
  ): Promise<void> {
    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      await payload.update({
        collection: "pages",
        id: existing.docs[0].id,
        data: { title, slug, ...data },
      });
    } else {
      await payload.create({
        collection: "pages",
        data: { title, slug, status: "published", ...data },
      });
    }
  }

  try {
    // Homepage
    await upsertPage("home", "Home", {
      layout: [
        {
          blockType: "heroBlock",
          headline: "Welcome to Acme",
          subHeadline:
            "A modern, fully dynamic website powered by Payload CMS and Next.js. Every section on this page is editable from the admin panel.",
          ctaLabel: "Get Started",
          ctaLink: "/contact",
        },
        {
          blockType: "featureCardsBlock",
          heading: "What We Offer",
          cards: [
            {
              icon: "Zap",
              title: "Lightning Fast",
              description:
                "Built on Next.js with ISR caching for sub-second page loads.",
            },
            {
              icon: "Settings",
              title: "Fully Dynamic",
              description:
                "Every page, block, and image is managed from the admin panel — no code changes needed.",
            },
            {
              icon: "Shield",
              title: "Secure by Default",
              description:
                "Role-based access control, encrypted passwords, and S3-backed media storage.",
            },
          ],
        },
        {
          blockType: "ctaBlock",
          heading: "Ready to Get Started?",
          description:
            "Clone this template, run the seed script, and you'll have a fully working site in minutes.",
          phoneLabel: "Call Us",
          phoneNumber: "+15550000000",
          emailLabel: "Email Us",
          emailAddress: "hello@example.com",
          demoLinkLabel: "View on GitHub",
          demoLinkUrl: "https://github.com",
        },
      ],
      meta: {
        title: "Acme — Modern Website Starter",
        description:
          "A production-ready Next.js + Payload CMS starter template.",
      },
    });
    console.log("  ✓ Homepage (hero + feature cards + CTA)");

    // About page
    await upsertPage("about", "About Us", {
      layout: [
        {
          blockType: "heroBlock",
          headline: "About Acme",
          subHeadline:
            "Learn more about what we do and why we built this template.",
        },
        {
          blockType: "richTextBlock",
          heading: "Our Story",
          content: {
            root: {
              type: "root",
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      text: "This is a dynamic page built with the Payload CMS block system. Every section you see here is configurable from the admin panel — change the text, swap the hero image, add new blocks, or reorder sections with drag and drop.",
                      type: "text",
                    },
                  ],
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              version: 1,
            },
          },
        },
        {
          blockType: "featureCardsBlock",
          heading: "Why Choose This Stack",
          cards: [
            {
              icon: "Globe",
              title: "Open Source",
              description:
                "Payload CMS and Next.js are both open source with active communities.",
            },
            {
              icon: "Database",
              title: "PostgreSQL Backend",
              description:
                "Production-grade relational database with full text search via Meilisearch.",
            },
            {
              icon: "Cloud",
              title: "S3 Media Storage",
              description:
                "All media stored in S3-compatible storage with automatic image optimization.",
            },
          ],
        },
      ],
      meta: {
        title: "About Us",
        description: "Learn about our company and our mission.",
      },
    });
    console.log("  ✓ About (hero + rich text + feature cards)");

    // Contact page
    await upsertPage("contact", "Contact", {
      layout: [
        {
          blockType: "heroBlock",
          headline: "Get in Touch",
          subHeadline:
            "Have questions or want to work with us? We'd love to hear from you.",
        },
        {
          blockType: "ctaBlock",
          heading: "Contact Information",
          description:
            "Reach out via phone, email, or the demo link below.",
          phoneLabel: "Call Us",
          phoneNumber: "+15550000000",
          emailLabel: "Email Us",
          emailAddress: "hello@example.com",
          demoLinkLabel: "Schedule a Call",
          demoLinkUrl: "https://cal.com",
        },
      ],
      meta: {
        title: "Contact Us",
        description: "Get in touch with our team.",
      },
    });
    console.log("  ✓ Contact (hero + CTA)");
  } catch (e) {
    console.error("  ✗ Failed to seed pages:", e);
  }

  console.log("\n" + "=".repeat(50));
  console.log("✅ Seed complete!");
  console.log("   Admin:  http://localhost:3000/admin");
  console.log("   Email:  admin@example.com");
  console.log("   Pass:   admin123");
  console.log("=".repeat(50) + "\n");
}

main().catch((err) => {
  console.error("Fatal seed error:", err);
  process.exit(1);
});
