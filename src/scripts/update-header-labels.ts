/**
 * Update Header global nav items in Payload CMS.
 * Run with: cd apps/web && npx tsx src/scripts/update-header-labels.ts
 *
 * This runs outside the Next.js process so it avoids the proxy/Payload deadlock.
 */
import { getPayload } from "payload";
import config from "@payload-config";

async function main() {
  const payload = await getPayload({ config });

  // Fetch current header data
  const header = await payload.findGlobal({ slug: "header" });

  const navItems = (header.navItems as Array<Record<string, unknown>>) || [];

  for (const item of navItems) {
    const label = String(item.label ?? "");

    // Rename top-level labels
    if (label === "IT Distribution") item.label = "Hardware";
    else if (label === "Services") item.label = "Software";
    else if (label === "About Us") item.label = "About us";
    else if (label === "Careers") item.label = "careers";
    else if (label === "Contact") item.label = "contact";

    // Update links
    const link = String(item.link ?? "");
    if (link.startsWith("/it-distribution")) {
      item.link = link.replace("/it-distribution", "/hardware");
    } else if (link.startsWith("/services")) {
      item.link = link.replace("/services", "/solutions");
    }

    // Update children
    const children = (item.children as Array<Record<string, unknown>>) || [];
    for (const child of children) {
      const childLink = String(child.link ?? "");
      if (childLink.startsWith("/it-distribution/")) {
        child.link = childLink.replace("/it-distribution", "/hardware");
      } else if (childLink.startsWith("/services/")) {
        child.link = childLink.replace("/services", "/solutions");
      } else if (childLink === "/blog") {
        child.link = "/resources/blog";
      }
    }
  }

  // Save
  await payload.updateGlobal({
    slug: "header",
    data: { navItems },
  });

  console.log("✅ Header updated:");
  for (const item of navItems) {
    console.log(`  ${item.label} → ${item.link}`);
    const children = (item.children as Array<Record<string, unknown>>) || [];
    for (const child of children) {
      console.log(`    ${child.label} → ${child.link}`);
    }
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
