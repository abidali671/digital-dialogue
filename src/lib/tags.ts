import { cache } from "react";
import contentful_client from "@/lib/contentful/client";
import { postHasTagSlug, searchTextFromKeywordSlug } from "@/lib/keywords";
import type { IPostData } from "@/types";

/** Tag pages with fewer posts are noindex and left out of the sitemap. */
export const MIN_POSTS_FOR_INDEXABLE_TAG = 3;

export function tagPostStats(
  posts: { updatedAt?: string; tags: { slug: string }[] }[]
) {
  const stats: Record<string, { count: number; lastModified?: string }> = {};
  const slugs: string[] = [];

  for (const post of posts) {
    for (const tag of post.tags) {
      const current = stats[tag.slug];
      if (!current) {
        stats[tag.slug] = { count: 1, lastModified: post.updatedAt };
        slugs.push(tag.slug);
        continue;
      }
      current.count += 1;
      if (
        post.updatedAt &&
        (!current.lastModified ||
          new Date(post.updatedAt).getTime() >
            new Date(current.lastModified).getTime())
      ) {
        current.lastModified = post.updatedAt;
      }
    }
  }

  return slugs.map((slug) => ({
    slug,
    count: stats[slug].count,
    lastModified: stats[slug].lastModified,
  }));
}

export const loadTagPosts = cache(async (slug: string, searchQuery = "") => {
  const tagQuery = searchTextFromKeywordSlug(slug);
  if (!slug || !tagQuery) return [] as IPostData[];

  const tagged = await contentful_client.getEntries({
    content_type: "post",
    "fields.tags[match]": tagQuery,
    order: "-sys.updatedAt",
    limit: 100,
    ...(searchQuery ? { query: searchQuery } : {}),
  });

  let posts = (tagged.items as unknown as IPostData[]).filter((post) =>
    postHasTagSlug(post, slug)
  );

  if (!posts.length && !searchQuery) {
    const keywordMatch = await contentful_client.getEntries({
      content_type: "post",
      "fields.keywords[match]": tagQuery,
      order: "-sys.updatedAt",
      limit: 100,
    });
    posts = (keywordMatch.items as unknown as IPostData[]).filter((post) =>
      postHasTagSlug(post, slug)
    );
  }

  if (!posts.length && !searchQuery) {
    const fallback = await contentful_client.getEntries({
      content_type: "post",
      order: "-sys.updatedAt",
      limit: 100,
    });
    posts = (fallback.items as unknown as IPostData[]).filter((post) =>
      postHasTagSlug(post, slug)
    );
  }

  return posts;
});
