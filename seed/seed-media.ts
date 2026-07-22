/**
 * Media seeder — uploads product images, blog covers, and hero backgrounds.
 *
 * Best-effort: missing files on disk are logged and skipped.
 * Idempotent: files are deduplicated by filename.
 */

import fs from "fs";
import path from "path";

import {
  getPayloadInstance,
  findDoc,
  uploadMedia,
  log,
  getErrorMessage,
} from "./runner";

const PUBLIC_DIR = path.resolve("public/assets/images");

// ── Main ──

export async function seedMedia(): Promise<void> {
  console.log("\n📋 Media: Uploading images...\n");

  await seedProductImages();
  await seedBlogCovers();
  await seedHeroBackgrounds();

  console.log("\n✅ Media seeding complete.");
}

// ── Product Images ──

async function seedProductImages(): Promise<void> {
  console.log("  [media] Product images...");

  // Load the precomputed product-image map
  const mapPath = path.resolve("src/scripts/product-image-map.json");
  if (!fs.existsSync(mapPath)) {
    log("media", "product-image-map.json not found — skipping product images");
    return;
  }

  try {
    const map: Record<
      string,
      { main?: string[]; gallery?: string[] }
    > = JSON.parse(fs.readFileSync(mapPath, "utf-8"));

    const payload = getPayloadInstance();
    let uploaded = 0;
    let linked = 0;
    let skipped = 0;

    for (const [sku, images] of Object.entries(map)) {
      const product = await findDoc("products", "sku", sku);
      if (!product) {
        skipped++;
        continue;
      }

      const mainIds: (string | number)[] = [];
      const galleryIds: (string | number)[] = [];

      // Upload main images
      if (images.main) {
        for (const file of images.main) {
          const filePath = path.join(PUBLIC_DIR, "products", file);
          const id = await uploadMedia(filePath, sku);
          if (id) {
            mainIds.push(id);
            uploaded++;
          }
        }
      }

      // Upload gallery images
      if (images.gallery) {
        for (const file of images.gallery) {
          const filePath = path.join(PUBLIC_DIR, "products", file);
          const id = await uploadMedia(filePath, `${sku} gallery`);
          if (id) {
            galleryIds.push(id);
            uploaded++;
          }
        }
      }

      // Link images to product
      if (mainIds.length > 0 || galleryIds.length > 0) {
        try {
          const updateData: Record<string, unknown> = {};
          if (mainIds.length > 0) updateData.mainImage = mainIds[0];
          if (galleryIds.length > 0 || mainIds.length > 1) {
            updateData.images = [...mainIds.slice(1), ...galleryIds];
          }

          await payload.update({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            collection: "products" as any,
            id: product.id as number,
            data: updateData as any,
            overrideAccess: true,
          });
          linked++;
        } catch (e: unknown) {
          log("media", `link failed for ${sku}: ${getErrorMessage(e).slice(0, 80)}`);
        }
      }
    }

    log("media", `products: ${uploaded} uploaded, ${linked} linked, ${skipped} skipped (no match)`);
  } catch (e: unknown) {
    console.error("  ✗ Product images:", getErrorMessage(e).slice(0, 200));
  }
}

// ── Blog Cover Images ──

async function seedBlogCovers(): Promise<void> {
  console.log("  [media] Blog cover images...");

  // Try to get the blog cover image mappings
  try {
    const blogModule: Record<string, unknown> = await import("./data/blog-posts");
    const coverImages = blogModule.BLOG_COVER_IMAGES as Array<{ file: string; alt?: string; postSlug?: string }> | undefined;
    if (!coverImages || coverImages.length === 0) {
      log("media", "blog covers: no mappings — skipping");
      return;
    }

    const payload = getPayloadInstance();
    let count = 0;

    for (const img of coverImages) {
      const filePath = path.join(PUBLIC_DIR, "blog", img.file);
      const id = await uploadMedia(filePath, img.alt ?? img.file);
      if (id && img.postSlug) {
        const post = await findDoc("blog-posts", "slug", img.postSlug);
        if (post) {
          await payload.update({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            collection: "blog-posts" as any,
            id: post.id as number,
            data: { coverImage: id } as any,
            overrideAccess: true,
          });
          count++;
        }
      }
    }

    log("media", `blog covers: ${count} linked`);
  } catch {
    log("media", "blog covers: no mappings found — skipping");
  }
}

// ── Hero Backgrounds ──

async function seedHeroBackgrounds(): Promise<void> {
  console.log("  [media] Hero backgrounds...");

  const heroImages = [
    { file: "home_4_t705_HS___6_-removebg-preview_6f21d30648.png", slug: "homepage" },
    { file: "hello.avif", slug: null },
  ];

  let count = 0;
  for (const img of heroImages) {
    const filePath = path.join(PUBLIC_DIR, img.file);
    const id = await uploadMedia(filePath);
    if (id) count++;
  }

  log("media", `hero backgrounds: ${count} uploaded`);
}
