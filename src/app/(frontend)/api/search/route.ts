import { NextResponse } from "next/server";
import { searchContent, type SearchResult } from "@/lib/search";

/**
 * Lightweight JSON search endpoint backing the header live-suggestions dropdown.
 *
 *   GET /api/search?q=ssd&limit=6&locale=en
 *
 * Returns `{ results: SearchResult[] }`. Queries shorter than 2 characters
 * return an empty list. The CMS is never required — any error yields `[]`.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();
  const locale = searchParams.get("locale") || "en";
  const limit = Math.min(Number(searchParams.get("limit")) || 6, 12);

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const { items } = await searchContent(q, locale, { perTypeLimit: limit });
    const results: SearchResult[] = items.slice(0, limit);
    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
