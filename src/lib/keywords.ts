import type { IKeywordTag, IPostData } from "@/types";

export function parseKeywordLabels(value?: string): string[] {
  const labels: string[] = [];
  const seen: Record<string, true> = {};

  for (const raw of (value ?? "").split(",")) {
    const label = raw.trim();
    if (!label || seen[label]) continue;
    seen[label] = true;
    labels.push(label);
  }

  return labels;
}

export function slugifyKeyword(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toKeywordTags(value?: string): IKeywordTag[] {
  const seen: Record<string, true> = {};
  const tags: IKeywordTag[] = [];

  for (const label of parseKeywordLabels(value)) {
    const slug = slugifyKeyword(label);
    if (!slug || seen[slug]) continue;
    seen[slug] = true;
    tags.push({ label, slug });
  }

  return tags;
}

export function getPostTags(post: IPostData): IKeywordTag[] {
  return toKeywordTags(post.fields.tags || post.fields.keywords);
}

export function toShareHashtags(value?: string, max = 10): string[] {
  const seen: Record<string, true> = {};
  const hashtags: string[] = [];

  for (const label of parseKeywordLabels(value)) {
    const tag = label.replace(/[^a-zA-Z0-9]/g, "");
    if (!tag || seen[tag.toLowerCase()]) continue;
    seen[tag.toLowerCase()] = true;
    hashtags.push(tag);
    if (hashtags.length >= max) break;
  }

  return hashtags;
}

export function searchTextFromKeywordSlug(slug: string): string {
  return slug.replace(/-/g, " ").trim();
}

export function labelFromKeywordSlug(slug: string): string {
  return searchTextFromKeywordSlug(slug)
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function postHasTagSlug(post: IPostData, slug: string): boolean {
  return getPostTags(post).some((tag) => tag.slug === slug);
}

/** @deprecated Use postHasTagSlug */
export function postHasKeywordSlug(post: IPostData, slug: string): boolean {
  return postHasTagSlug(post, slug);
}

export function pickRelatedPosts(
  current: IPostData,
  categoryPosts: IPostData[],
  candidatePosts: IPostData[],
  max = 3
): IPostData[] {
  const currentSlugs: Record<string, true> = {};
  for (const tag of getPostTags(current)) {
    currentSlugs[tag.slug] = true;
  }
  const picked: IPostData[] = [];
  const seen: Record<string, true> = { [current.sys.id]: true };

  const take = (post: IPostData) => {
    if (picked.length >= max || seen[post.sys.id]) return;
    seen[post.sys.id] = true;
    picked.push(post);
  };

  for (const post of categoryPosts) take(post);
  if (picked.length >= max) return picked;

  const scored = candidatePosts
    .filter((post) => !seen[post.sys.id])
    .map((post) => ({
      post,
      score: getPostTags(post).filter((tag) => currentSlugs[tag.slug]).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  for (const { post } of scored) take(post);
  return picked;
}
