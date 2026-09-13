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

/** Normalize a site-relative path like `/blogs/seo/my-post`. Returns null if invalid. */
function normalizePath(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  let pathname: string;
  try {
    if (/^https?:\/\//i.test(trimmed)) {
      pathname = new URL(trimmed).pathname;
    } else {
      pathname = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    }
  } catch {
    return null;
  }

  if (
    pathname.includes("?") ||
    pathname.includes("#") ||
    pathname.includes("..") ||
    pathname.includes("//")
  ) {
    return null;
  }

  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  return pathname;
}

async function getRawPath(request: NextRequest): Promise<string | null> {
  const fromQuery = request.nextUrl.searchParams.get("path");
  if (fromQuery !== null) return fromQuery;

  if (request.method === "POST") {
    try {
      const body = await request.json();
      if (body && typeof body.path === "string") return body.path;
    } catch {
      // no / invalid JSON — full revalidate
    }
  }

  return null;
}

function revalidateAll() {
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

function revalidateOne(path: string) {
  revalidatePath(path);
  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    scope: "path",
    path,
  });
}

/**
 * Clear cache on demand.
 * Next 13.4 only supports single-arg revalidatePath / revalidateTag.
 *
 * Full site:
 *   GET  /api/revalidate?secret=...
 *   POST /api/revalidate
 *        Authorization: Bearer ...
 *
 * Single page:
 *   GET  /api/revalidate?secret=...&path=/blogs/category/slug
 *   POST /api/revalidate
 *        Authorization: Bearer ...
 *        { "path": "/blogs/category/slug" }
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

  const rawPath = await getRawPath(request);
  if (rawPath !== null) {
    const path = normalizePath(rawPath);
    if (!path) {
      return NextResponse.json(
        {
          error:
            "Invalid path. Use a site-relative path like /blogs/category/slug",
        },
        { status: 400 }
      );
    }
    return revalidateOne(path);
  }

  return revalidateAll();
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}
