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
 * Clear the full site cache (root layout + all nested pages/data).
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

  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    scope: "all",
  });
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}
