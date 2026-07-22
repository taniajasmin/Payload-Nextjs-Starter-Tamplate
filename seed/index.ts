/**
 * Seed orchestrator — single entry point for all seeding.
 *
 * Usage:
 *   pnpm seed              # seed all collections, globals, and media
 *   pnpm seed -- --force   # allow seeding in production
 *
 * Architecture:
 *   seed/
 *   ├── index.ts               ← this file
 *   ├── runner.ts              # Payload init, upsert helpers, logging
 *   ├── seed-collections.ts    # users → categories → brands → products → ... → services
 *   ├── seed-globals.ts        # header → footer → homepage → about → ... → laptops
 *   ├── seed-media.ts          # product images, blog covers, hero backgrounds
 *   └── data/                  # fixture files (pure data, no logic)
 */

import "dotenv/config";

import { initPayload, destroyPayload, log, getErrorMessage } from "./runner";
import { seedCollections } from "./seed-collections";
import { seedGlobals } from "./seed-globals";
import { seedMedia } from "./seed-media";

async function main(): Promise<void> {
  console.log("\n🚀 Simal Technologies — Database Seed\n");
  console.log("=".repeat(60) + "\n");

  // 1. Initialize Payload Local API (guards against production)
  await initPayload();

  // 2. Seed collections (users → categories → brands → products → ... → services)
  await seedCollections();

  // 3. Seed globals (header → footer → homepage → about → ... → laptops-page)
  await seedGlobals();

  // 4. Seed media (product images, blog covers, hero backgrounds)
  // Best-effort: skips files that don't exist on disk
  await seedMedia();

  // 5. Cleanup
  await destroyPayload();

  console.log("\n" + "=".repeat(60));
  console.log("✅ Seed complete! All collections and globals populated.");
  console.log("=".repeat(60) + "\n");
}

main().catch((err) => {
  console.error("Fatal seed error:", err);
  process.exit(1);
});
