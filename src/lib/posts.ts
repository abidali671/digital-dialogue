import contentful_client from "@/lib/contentful/client";
import { IPostData } from "@/types";

/** Fetch posts by slug and return them in the requested order. */
export async function getPostsBySlugs(
  slugs: readonly string[]
): Promise<IPostData[]> {
  if (!slugs.length) return [];

  const response = await contentful_client.getEntries({
    content_type: "post",
    "fields.slug[in]": slugs.join(","),
    limit: slugs.length,
  });

  const bySlug = new Map(
    (response.items as unknown as IPostData[]).map((post) => [
      post.fields.slug,
      post,
    ])
  );

  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((post): post is IPostData => Boolean(post));
}
