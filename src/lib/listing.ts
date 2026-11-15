import config from "@/lib/config";
import { getPostTags } from "@/lib/keywords";
import { pageCount } from "@/lib/pagination";
import type { IPostData } from "@/types";

export function parseSearchQuery(q?: string) {
  return (q || "").trim();
}

/** Title, excerpt and tags only — not the article body. */
export function postMatchesListingQuery(post: IPostData, query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const title = String(post.fields.title ?? "").toLowerCase();
  const excerpt = String(post.fields.excerpt ?? "").toLowerCase();
  const tags = getPostTags(post)
    .map((tag) => `${tag.label} ${tag.slug}`)
    .join(" ")
    .toLowerCase();
  return (
    title.includes(needle) ||
    excerpt.includes(needle) ||
    tags.includes(needle)
  );
}

export function paginateMatchedPosts(
  posts: IPostData[],
  query: string,
  page: number,
  perPage = config.BLOGS_PER_PAGE,
) {
  const matched = query
    ? posts.filter((post) => postMatchesListingQuery(post, query))
    : posts;
  const total = matched.length;
  return {
    posts: matched.slice((page - 1) * perPage, page * perPage),
    total,
    totalPages: pageCount(total, perPage),
  };
}

export function listingHref(
  basePath: string,
  options?: { page?: number; q?: string }
) {
  const params = new URLSearchParams();
  const query = parseSearchQuery(options?.q);
  const page = options?.page ?? 1;

  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));

  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}
