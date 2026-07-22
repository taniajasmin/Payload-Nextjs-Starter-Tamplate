// make-transparent-cutouts.mjs
//
// Generates transparent PNG cutouts for products whose source image is an
// opaque JPG (baked-in white background) by flood-filling the background from
// the image corners with ImageMagick. Writes the new files next to the
// originals (<stem>.cutout.png) and a SKU → cutout-path map the frontend
// resolver prefers, so those products render as clean floating cutouts.
//
// Idempotent: re-running regenerates every cutout and rewrites the map.
//
// Usage: node --input-type=module src/scripts/make-transparent-cutouts.mjs
//   (run from apps/web)
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const WEB_ROOT = "public/assets/images/products";
const map = JSON.parse(
  readFileSync("./src/scripts/product-image-map.json", "utf8"),
);
const alpha = JSON.parse(
  readFileSync("./src/scripts/product-alpha-map.json", "utf8"),
);

const opaqueSkus = Object.entries(alpha)
  .filter(([, v]) => v === false)
  .map(([k]) => k);

const transparentMap = {};
const report = [];

for (const sku of opaqueSkus) {
  const entry = map.find((e) => e.sku === sku);
  if (!entry) {
    report.push(`SKIP (not in image map): ${sku}`);
    continue;
  }
  const inPath = `${WEB_ROOT}/${entry.brand}/${entry.main}`;
  if (!existsSync(inPath)) {
    report.push(`SKIP (missing file): ${sku}`);
    continue;
  }

  const stem = entry.main.replace(/\.[^.]+$/, "");
  const outPath = `${WEB_ROOT}/${entry.brand}/${stem}.cutout.png`;
  const pubPath = `/assets/images/products/${entry.brand}/${stem}.cutout.png`;

  const meta = await sharp(inPath).metadata();
  const w = meta.width;
  const h = meta.height;

  // Flood-fill transparency from all four corners so any background region
  // connected to an edge is removed (handles off-center subjects).
  const corners = [`0,0`, `${w - 1},0`, `0,${h - 1}`, `${w - 1},${h - 1}`];
  const args = [inPath, "-alpha", "set", "-fuzz", "18%", "-fill", "none"];
  for (const c of corners) {
    args.push("-draw", `alpha ${c} floodfill`);
  }
  args.push(outPath);

  try {
    execFileSync("magick", args, { stdio: "pipe" });
    const out = await sharp(outPath).raw().toBuffer({ resolveWithObject: true });
    let transp = 0;
    let total = 0;
    for (let i = 3; i < out.data.length; i += 4) {
      total++;
      if (out.data[i] < 16) transp++;
    }
    const pct = total ? Math.round((transp / total) * 100) : 0;
    transparentMap[sku] = pubPath;
    report.push(`OK   ${sku.padEnd(20)} transparent: ${pct}%`);
  } catch (err) {
    report.push(`FAIL ${sku}: ${String(err.message).slice(0, 120)}`);
  }
}

writeFileSync(
  "./src/scripts/product-transparent-map.json",
  JSON.stringify(transparentMap, null, 2),
);

console.log(report.join("\n"));
console.log(
  `\nWrote product-transparent-map.json | ${Object.keys(transparentMap).length} cutouts`,
);
