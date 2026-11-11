import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GONE_PATHS, PERMANENT_REDIRECTS } from "./lib/removed-urls";

/**
 * Exact removed paths from the 11 Nov 2026 audit.
 * next.config redirects cannot return 410, and they run before middleware,
 * so these addresses are listed here instead of as redirect sources.
 * A path that is not in the set falls through, including future tags and posts.
 */
const gonePaths = new Set<string>(GONE_PATHS);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (gonePaths.has(pathname)) {
    return new NextResponse("Gone\n", {
      status: 410,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  const destination = PERMANENT_REDIRECTS[pathname];
  if (destination) {
    const url = request.nextUrl.clone();
    url.pathname = destination;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tags/:slug", "/blogs/:category", "/blogs/:category/:slug"],
};
