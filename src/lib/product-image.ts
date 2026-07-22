/**
 * Product image resolution — shared by the catalog/category pages and the
 * product detail page.
 *
 * Product image *content* lives in the Payload CMS, but in dev the CMS media
 * route (`/api/media/file/...`) often isn't served (MinIO/S3 storage not
 * reachable), so those `<img>` URLs break and the browser shows a
 * broken-image icon. To keep product pages clean we resolve images to the same
 * on-disk files the CMS seeds from (src/scripts/product-image-map.json),
 * preferring a generated transparent cutout for opaque JPG sources.
 */
import productImageMap from "@/scripts/product-image-map.json";
import productAlphaMap from "@/scripts/product-alpha-map.json";
import productTransparentMap from "@/scripts/product-transparent-map.json";
import { mediaUrl } from "@/lib/media-url";
import type { Product } from "@/lib/product-config";

type ImageMapEntry = {
  id: number;
  brand: string;
  sku: string;
  main: string;
  gallery: string[];
};

// SKU → on-disk main image path.
const DISK_IMAGE_BY_SKU = new Map<string, string>(
  (productImageMap as ImageMapEntry[]).map((e) => [
    e.sku.trim().toLowerCase(),
    `/assets/images/products/${e.brand}/${e.main}`,
  ]),
);

// SKU → source image has an alpha channel (transparent cutout).
const ALPHA_BY_SKU = new Map<string, boolean>(
  Object.entries(productAlphaMap as Record<string, boolean>).map(([k, v]) => [
    k.trim().toLowerCase(),
    v,
  ]),
);

// SKU → generated transparent cutout (for opaque JPG sources).
const TRANSPARENT_BY_SKU = new Map<string, string>(
  Object.entries(productTransparentMap as Record<string, string>).map(
    ([k, v]) => [k.trim().toLowerCase(), v],
  ),
);

/**
 * Resolve a product's main display image. Prefers a generated transparent
 * cutout, then the on-disk source, then the CMS image.
 */
export function resolveProductImage(product: Product): string {
  const key = (product.sku || "").trim().toLowerCase();
  const cutout = TRANSPARENT_BY_SKU.get(key);
  if (cutout) return mediaUrl(cutout);
  const disk = DISK_IMAGE_BY_SKU.get(key);
  if (disk) return mediaUrl(disk);
  return product.image ? mediaUrl(product.image) : "";
}

/** Whether the product has a transparent display image (cutout or alpha source). */
export function hasTransparentImage(product: Product): boolean {
  const key = (product.sku || "").trim().toLowerCase();
  return TRANSPARENT_BY_SKU.has(key) || ALPHA_BY_SKU.get(key) === true;
}

/** Opaque images (no transparent source or cutout) need a multiply knockout. */
export function isImageOpaque(product: Product): boolean {
  return !hasTransparentImage(product);
}
