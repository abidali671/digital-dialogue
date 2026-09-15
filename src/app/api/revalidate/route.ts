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

type ContentfulListItem = {
  fields?: {
    slug?: string;
    category?: { fields?: { slug?: string } };
  };
};

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

/** Fresh Contentful list (bypass Next data cache) so we can purge every post path. */
async function fetchAllBlogPaths(): Promise<string[]> {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";
  const accessToken = process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN;
  if (!space || !accessToken) return [];

  const paths: string[] = [];
  const limit = 100;
  let skip = 0;
  let total = Infinity;

  while (skip < total) {
    const params = new URLSearchParams({
      access_token: accessToken,
      content_type: "post",
      include: "1",
      limit: String(limit),
      skip: String(skip),
    });

    const url = `https://cdn.contentful.com/spaces/${space}/environments/${environment}/entries?${params}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) break;

    const data = (await res.json()) as {
      items?: ContentfulListItem[];
      total?: number;
      includes?: {
        Entry?: Array<{
          sys?: { id?: string; contentType?: { sys?: { id?: string } } };
          fields?: { slug?: string };
        }>;
      };
    };

    total = data.total ?? 0;
    const categoryById = new Map<string, string>();
    for (const entry of data.includes?.Entry ?? []) {
      if (
        entry.sys?.contentType?.sys?.id === "category" &&
        entry.sys?.id &&
        entry.fields?.slug
      ) {
        categoryById.set(entry.sys.id, entry.fields.slug);
      }
    }

    for (const item of data.items ?? []) {
      const postSlug = item.fields?.slug;
      if (!postSlug) continue;

      const categoryField = item.fields.category as
        | { fields?: { slug?: string }; sys?: { id?: string } }
        | undefined;
      const categorySlug =
        categoryField?.fields?.slug ||
        (categoryField?.sys?.id
          ? categoryById.get(categoryField.sys.id)
          : undefined);
      if (!categorySlug) continue;

      paths.push(`/blogs/${categorySlug}/${postSlug}`);
    }

    skip += limit;
  }

  // Also purge category listing pages
  const categoryParams = new URLSearchParams({
    access_token: accessToken,
    content_type: "category",
    limit: "100",
  });
  const categoryRes = await fetch(
    `https://cdn.contentful.com/spaces/${space}/environments/${environment}/entries?${categoryParams}`,
    { cache: "no-store" }
  );
  if (categoryRes.ok) {
    const categoryData = (await categoryRes.json()) as {
      items?: Array<{ fields?: { slug?: string } }>;
    };
    for (const item of categoryData.items ?? []) {
      if (item.fields?.slug) paths.push(`/blogs/${item.fields.slug}`);
    }
  }

  return paths;
}

async function revalidateAll() {
  revalidateTag(CONTENTFUL_CACHE_TAG);

  const blogPaths = await fetchAllBlogPaths();
  const paths = [...STATIC_PATHS, ...blogPaths];

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    scope: "all",
    tag: CONTENTFUL_CACHE_TAG,
    pathCount: paths.length,
    paths: STATIC_PATHS,
    blogPathCount: blogPaths.length,
  });
}

function revalidateOne(path: string) {
  // Must clear the Contentful fetch tag too — path-only purge used to rebuild
  // the page from a still-cached Delivery response (up to REVALIDATE_DETAIL).
  revalidateTag(CONTENTFUL_CACHE_TAG);
  revalidatePath(path);
  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    scope: "path",
    path,
    tag: CONTENTFUL_CACHE_TAG,
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
 *   (also clears the Contentful data tag so the page does not rebuild from a stale fetch)
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
