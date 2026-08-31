import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { CONTENTFUL_CACHE_TAG } from "@/lib/contentful/client";

export const dynamic = "force-dynamic";

const STATIC_PATHS = [
  "/",
  "/blogs",
  "/authors",
  "/about",
  "/contact-us",
  "/privacy-policy",
  "/disclaimer",
  "/feed.xml",
] as const;

function getSecret(request: NextRequest) {
  const header = request.headers.get("authorization");
  if (header?.startsWith("Bearer ")) {
    return header.slice("Bearer ".length).trim();
  }
  return request.nextUrl.searchParams.get("secret") || "";
}

function isAuthorized(request: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) return false;
  return getSecret(request) === expected;
}

/**
 * Clear the full site cache (Contentful fetch tag + static routes).
 * Next 13.4 only supports single-arg revalidatePath / revalidateTag.
 *
 * GET  /api/revalidate?secret=...
 * POST /api/revalidate
 *      Authorization: Bearer ...
 */
async function handleRevalidate(request: NextRequest) {
  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET is not configured" },
      { status: 500 }
    );
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(CONTENTFUL_CACHE_TAG);

  for (const path of STATIC_PATHS) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    scope: "all",
    tag: CONTENTFUL_CACHE_TAG,
    paths: STATIC_PATHS,
  });
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}
