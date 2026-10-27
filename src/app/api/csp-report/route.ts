import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const text = (await req.text()).slice(0, 8192);
  try {
    const r = JSON.parse(text)["csp-report"] ?? {};
    console.warn(
      "csp-ro",
      r["effective-directive"] ?? r["violated-directive"],
      String(r["blocked-uri"] ?? "").slice(0, 200),
      String(r["document-uri"] ?? "").slice(0, 200)
    );
  } catch {
    // Malformed reports are ignored. Nothing is stored.
  }
  return new NextResponse(null, { status: 204 });
}
