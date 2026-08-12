import { revalidatePath } from "next/cache";
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
 * Clear cached page by path only.
 *
 * GET  /api/revalidate?secret=...&path=/blogs/technology/my-post
 * POST /api/revalidate
 *      Authorization: Bearer ...
 *      { "path": "/blogs/technology/my-post" }
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

  let body: { path?: string } = {};

  if (request.method === "POST") {
    try {
      body = await request.json();
    } catch {
      body = {};
    }
  }

  const path = body.path || request.nextUrl.searchParams.get("path") || "";

  if (!path.startsWith("/")) {
    return NextResponse.json(
      { error: "Provide a path starting with / (e.g. /blogs/technology/my-post)" },
      { status: 400 }
    );
  }

  revalidatePath(path);

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    path,
  });
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}
