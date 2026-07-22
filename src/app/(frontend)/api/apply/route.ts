import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Public job-application submission endpoint.
 *
 * The careers apply form is filled in by unauthenticated visitors, but the
 * `media` collection's `create` access requires an authenticated CMS user
 * (and its `alt` field is localized). Posting straight to Payload's REST
 * `/api/media` + `/api/applications` from the browser therefore fails for
 * public applicants. This route performs the same two steps server-side via
 * the Payload local API with `overrideAccess: true`, keeping Media create
 * auth-gated while still letting a public visitor submit a CV + application.
 */

export const runtime = "nodejs";
// Revalidate never — this is a dynamic mutation endpoint.
export const dynamic = "force-dynamic";

const ALLOWED_POSITIONS = [
  "general",
  "senior-account-manager",
  "product-specialist",
  "technical-support",
  "warehouse-coordinator",
  "digital-marketing",
  "b2b-sales",
] as const;

const ALLOWED_EXPERIENCE = ["0-1", "1-3", "3-5", "5-10", "10+"] as const;

const MAX_CV_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function fail(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Invalid form submission.");
  }

  const firstName = (form.get("firstName") as string | null)?.trim();
  const lastName = (form.get("lastName") as string | null)?.trim();
  const email = (form.get("email") as string | null)?.trim();
  const phone = (form.get("phone") as string | null)?.trim();
  const positionRaw = (form.get("position") as string | null) || "general";
  const experienceRaw = (form.get("experience") as string | null) || "";
  const expectedSalary = (form.get("expectedSalary") as string | null)?.trim() || "";
  const coverLetter = (form.get("coverLetter") as string | null)?.trim() || "";
  const file = form.get("cv");

  // ── Validation ──────────────────────────────────────────────
  if (!firstName) return fail("First name is required.");
  if (!lastName) return fail("Last name is required.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail("A valid email is required.");
  }
  if (!phone) return fail("Phone number is required.");
  if (!ALLOWED_POSITIONS.includes(positionRaw as (typeof ALLOWED_POSITIONS)[number])) {
    return fail("Invalid position.");
  }
  if (!ALLOWED_EXPERIENCE.includes(experienceRaw as (typeof ALLOWED_EXPERIENCE)[number])) {
    return fail("Years of experience is required.");
  }
  if (!(file instanceof File) || file.size === 0) {
    return fail("CV / Resume is required.");
  }
  if (file.size > MAX_CV_BYTES) {
    return fail("CV must be under 5 MB.");
  }
  // Some browsers omit the MIME type for .doc/.docx — sniff by extension too.
  const ext = file.name.toLowerCase().split(".").pop() || "";
  const typeOk =
    (file.type && ALLOWED_CV_TYPES.includes(file.type)) ||
    ["pdf", "doc", "docx"].includes(ext);
  if (!typeOk) {
    return fail("Only PDF or DOC/DOCX files are accepted.");
  }

  const payload = await getPayload({ config });

  // ── Step 1: upload the CV to the media collection (server-side) ──
  // alt is localized; apply the value to the default locale.
  const alt = `CV — ${firstName} ${lastName}`;
  const mediaBuffer = Buffer.from(await file.arrayBuffer());
  const media = await payload.create({
    collection: "media",
    data: {
      alt: alt as unknown as string,
    },
    file: {
      data: mediaBuffer,
      mimetype: file.type || "application/octet-stream",
      name: file.name,
      size: file.size,
    },
    overrideAccess: true,
  });

  // ── Step 2: create the application, linking the uploaded CV ──
  const application = await payload.create({
    collection: "applications",
    data: {
      firstName,
      lastName,
      email,
      phone,
      position: positionRaw as never,
      experience: experienceRaw as never,
      expectedSalary: expectedSalary || undefined,
      coverLetter: coverLetter || undefined,
      cv: media.id,
    },
    overrideAccess: true,
  });

  return NextResponse.json({
    ok: true,
    id: application.id,
    reference: `APP-${application.id.toString(36).toUpperCase()}`,
  });
}
