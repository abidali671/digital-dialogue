import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LIVE_FIVERR_PATH =
  "/blogs/freelancing/what-is-fiverr-and-how-does-fiverr-work";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = LIVE_FIVERR_PATH;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: "/blogs/freelancing/what-is-fiverr-and-how-does-it-work",
};
