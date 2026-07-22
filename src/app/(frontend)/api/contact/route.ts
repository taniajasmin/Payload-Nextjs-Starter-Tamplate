import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Public contact-message submission endpoint.
 *
 * The three Contact Us forms (general, sales inquiry, support request) are
 * filled in by unauthenticated visitors. Posting straight to Payload's REST
 * `/api/messages` from the browser would be rejected by the collection's
 * read/create access control, so this route creates the message server-side
 * via the Payload local API with `overrideAccess: true`.
 *
 * Mirrors the careers `/api/apply` route, but accepts JSON (no file upload).
 */

export const runtime = "nodejs";
// Revalidate never — this is a dynamic mutation endpoint.
export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["general", "sales", "support"] as const;

function fail(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request body.");
  }

  const data = (body ?? {}) as Record<string, unknown>;

  const typeRaw = typeof data.type === "string" ? data.type : "general";
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const company = typeof data.company === "string" ? data.company.trim() : "";
  const subject = typeof data.subject === "string" ? data.subject.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  // ── Validation ──────────────────────────────────────────────
  if (!ALLOWED_TYPES.includes(typeRaw as (typeof ALLOWED_TYPES)[number])) {
    return fail("Invalid message type.");
  }
  if (!name) return fail("Name is required.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail("A valid email is required.");
  }
  // Message is required for general inquiries and support requests;
  // sales inquiries may submit only structured requirements.
  if (!message && typeRaw !== "sales") return fail("Message is required.");

  // Only keep object-shaped `details` (form-specific extras); drop otherwise.
  const details =
    data.details && typeof data.details === "object" && !Array.isArray(data.details)
      ? (data.details as Record<string, unknown>)
      : undefined;

  const payload = await getPayload({ config });

  const doc = await payload.create({
    collection: "messages",
    data: {
      type: typeRaw as never,
      name,
      email,
      ...(phone ? { phone } : {}),
      ...(company ? { company } : {}),
      ...(subject ? { subject } : {}),
      message,
      ...(details ? { details } : {}),
    },
    overrideAccess: true,
  });

  return NextResponse.json({ ok: true, id: doc.id });
}
