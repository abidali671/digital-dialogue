import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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
 * Clear cached blog detail pages (and optional paths).
 *
 * Examples:
 * GET  /api/revalidate?secret=...&path=/blogs/technology/my-post
 * GET  /api/revalidate?secret=...&slug=my-post
 * GET  /api/revalidate?secret=...&allBlogs=1
 * POST /api/revalidate  Authorization: Bearer ...
 *      { "path": "/blogs/technology/my-post" }
 *      { "slug": "my-post" }
 *      { "allBlogs": true }
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

  let body: {
    path?: string;
    slug?: string;
    category?: string;
    allBlogs?: boolean;
  } = {};

  if (request.method === "POST") {
    try {
      body = await request.json();
    } catch {
      body = {};
    }
  }

  const searchParams = request.nextUrl.searchParams;
  const path = body.path || searchParams.get("path") || undefined;
  const slug = body.slug || searchParams.get("slug") || undefined;
  const category = body.category || searchParams.get("category") || undefined;
  const allBlogs =
    body.allBlogs === true ||
    searchParams.get("allBlogs") === "1" ||
    searchParams.get("allBlogs") === "true";

  const revalidated: string[] = [];

  if (allBlogs) {
    revalidateTag("blog");
    revalidated.push("tag:blog");
  }

  if (slug) {
    revalidateTag(`blog:${slug}`);
    revalidated.push(`tag:blog:${slug}`);
  }

  if (path) {
    revalidatePath(path);
    revalidated.push(`path:${path}`);
  } else if (category && slug) {
    const blogPath = `/blogs/${category}/${slug}`;
    revalidatePath(blogPath);
    revalidated.push(`path:${blogPath}`);
  }

  if (!revalidated.length) {
    return NextResponse.json(
      {
        error:
          "Provide path, slug, category+slug, or allBlogs=1 to clear cache",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    targets: revalidated,
  });
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}
