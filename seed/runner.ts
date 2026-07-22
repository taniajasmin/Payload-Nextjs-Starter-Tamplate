/// <reference types="node" />

/**
 * Shared seeding infrastructure.
 *
 * Provides the Payload Local API singleton, idempotent upsert helpers,
 * media upload utilities, and a production safety guard.
 */

import "dotenv/config";
import fs from "fs";
import path from "path";

import { getPayload } from "payload";

import config from "../payload.config";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PayloadInstance = Awaited<ReturnType<typeof getPayload>>;

// ---------------------------------------------------------------------------
// Singleton
// ---------------------------------------------------------------------------

let payload: PayloadInstance | null = null;

export function getPayloadInstance(): PayloadInstance {
  if (!payload) throw new Error("Payload not initialized — call initPayload() first");
  return payload;
}

// ---------------------------------------------------------------------------
// Init & safety
// ---------------------------------------------------------------------------

export async function initPayload(): Promise<PayloadInstance> {
  const force = process.argv.includes("--force");
  if (process.env.NODE_ENV === "production" && !force) {
    console.error("[seed] Refusing to seed in production. Re-run with --force to override.");
    process.exit(1);
  }

  payload = await getPayload({ config });
  return payload;
}

export async function destroyPayload(): Promise<void> {
  if (payload) {
    await payload.destroy();
    payload = null;
  }
}

// ---------------------------------------------------------------------------
// Logging
// ---------------------------------------------------------------------------

export function log(phase: string, msg: string): void {
  console.log(`  [${phase}] ${msg}`);
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

// ---------------------------------------------------------------------------
// Lexical rich-text builder
// ---------------------------------------------------------------------------

export function richDoc(
  blocks: Array<{ h2?: string; p?: string }>,
): Record<string, unknown> {
  const textNode = (text: string) => ({
    type: "text",
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    text,
    version: 1,
  });

  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      textFormat: 0,
      textStyle: "",
      children: blocks.map((b) =>
        b.h2
          ? {
              type: "heading",
              tag: "h2",
              format: "",
              indent: 0,
              version: 1,
              direction: "ltr",
              children: [textNode(b.h2)],
            }
          : {
              type: "paragraph",
              format: "",
              indent: 0,
              version: 1,
              direction: "ltr",
              textFormat: 0,
              textStyle: "",
              children: [textNode(b.p ?? "")],
            },
      ),
    },
  };
}

// ---------------------------------------------------------------------------
// Collection helpers
// ---------------------------------------------------------------------------

export async function findDoc(
  collection: string,
  field: string,
  value: string,
): Promise<{ id: string | number } | null> {
  const p = getPayloadInstance();
  const where: Record<string, unknown> = {};
  where[field] = { equals: value };
  const res = await p.find({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collection: collection as any,
    where: where as any,
    limit: 1,
    overrideAccess: true,
  });
  return (res.docs[0] as { id: string | number } | undefined) ?? null;
}

export async function upsert(
  collection: string,
  field: string,
  value: string,
  data: Record<string, unknown>,
): Promise<string | number> {
  const p = getPayloadInstance();
  const existing = await findDoc(collection, field, value);
  if (existing) {
    await p.update({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: collection as any,
      id: existing.id as number,
      data: data as any,
      overrideAccess: true,
    });
    return existing.id;
  }
  const created = await p.create({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collection: collection as any,
    data: data as any,
    overrideAccess: true,
  });
  return (created as { id: string | number }).id;
}

// ---------------------------------------------------------------------------
// Global helpers
// ---------------------------------------------------------------------------

export async function upsertGlobal(
  slug: string,
  data: Record<string, unknown>,
): Promise<void> {
  const p = getPayloadInstance();
  await p.updateGlobal({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    slug: slug as any,
    data: data as any,
    overrideAccess: true,
  });
}

// ---------------------------------------------------------------------------
// Media helpers
// ---------------------------------------------------------------------------

export async function findMediaByFilename(
  filename: string,
): Promise<{ id: string | number } | null> {
  return findDoc("media", "filename", filename);
}

export async function uploadMedia(
  filePath: string,
  alt?: string,
): Promise<string | number | null> {
  const filename = path.basename(filePath);

  const existing = await findMediaByFilename(filename);
  if (existing) {
    log("media", `skip (exists) ${filename}`);
    return existing.id;
  }

  if (!fs.existsSync(filePath)) {
    log("media", `missing file ${filePath}`);
    return null;
  }

  const p = getPayloadInstance();
  const buffer = fs.readFileSync(filePath);

  try {
    const created = await p.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: "media" as any,
      data: {
        alt: alt ?? filename,
        caption: alt ?? filename,
        _filename: filename,
      } as any,
      file: {
        data: buffer,
        mimetype: guessMimeType(filePath),
        name: filename,
        size: buffer.length,
      },
      overrideAccess: true,
    });

    log("media", `uploaded ${filename} (id=${created.id})`);
    return created.id;
  } catch (e: unknown) {
    log("media", `upload failed for ${filename}: ${getErrorMessage(e).slice(0, 120)}`);
    return null;
  }
}

function guessMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".svg": "image/svg+xml",
    ".pdf": "application/pdf",
  };
  return map[ext] ?? "application/octet-stream";
}

// ---------------------------------------------------------------------------
// Convenience: seed a list of items into a collection
// ---------------------------------------------------------------------------

export async function seedCollection(
  collection: string,
  uniqueField: string,
  items: Array<Record<string, unknown>>,
  transform?: (item: Record<string, unknown>) => Record<string, unknown>,
): Promise<Array<string | number>> {
  const p = getPayloadInstance();
  const ids: Array<string | number> = [];

  for (const item of items) {
    const data = transform ? transform(item) : item;
    const value = String(data[uniqueField] ?? "");
    const id = await upsert(collection, uniqueField, value, data);
    ids.push(id);
    log(
      collection,
      `${transform ? "✓" : "✓"} ${data[uniqueField] ?? data.title ?? data.name ?? "?"}`,
    );
  }

  return ids;
}
