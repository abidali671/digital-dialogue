import { cache } from "react";
import contentful_client from "@/lib/contentful/client";
import { postHasTagSlug, searchTextFromKeywordSlug } from "@/lib/keywords";
import type { IPostData } from "@/types";

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
