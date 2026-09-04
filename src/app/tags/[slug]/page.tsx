import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import CategoryHubs from "@/components/CategoryHubs";
import CategoryBlogsClient from "@/components/blogs/CategoryBlogsClient";
import { parseSearchQuery } from "@/lib/listing";
import {
  labelFromKeywordSlug,
  postHasKeywordSlug,
  searchTextFromKeywordSlug,
  toKeywordTags,
} from "@/lib/keywords";
import { ICategoryData, IPostData } from "@/types";

export const revalidate = REVALIDATE_LISTING;

type PageProps = {
  params: { slug: string };
  searchParams: { q?: string };
};

function resolveTagLabel(slug: string, posts: IPostData[]) {
  for (const post of posts) {
    const match = toKeywordTags(post.fields.keywords).find(
      (tag) => tag.slug === slug
    );
    if (match) return match.label;
  }
  return labelFromKeywordSlug(slug);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = params.slug?.trim();
  if (!slug) {
    return {
      title: "Tag",
      description: "Browse articles by topic on Digital Dialogue.",
    };
  }

  const label = labelFromKeywordSlug(slug);
  const title = `Articles tagged ${label}`;
  const description = `Browse guides and explainers tagged ${label.toLowerCase()} on Digital Dialogue.`;
  const canonical = `/tags/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  };
}

export default async function TagPage({ params, searchParams }: PageProps) {
  try {
    const slug = params.slug?.trim();
    const tagQuery = searchTextFromKeywordSlug(slug || "");
    if (!slug || !tagQuery) notFound();

    const searchQuery = parseSearchQuery(searchParams.q);

    const [response, categoriesRes] = await Promise.all([
      contentful_client.getEntries({
        content_type: "post",
        "fields.keywords[match]": tagQuery,
        order: "-sys.updatedAt",
        limit: 100,
        ...(searchQuery ? { query: searchQuery } : {}),
      }),
      contentful_client.getEntries({ content_type: "category" }),
    ]);

    let posts = (response.items as unknown as IPostData[]).filter((post) =>
      postHasKeywordSlug(post, slug)
    );

    if (!posts.length && !searchQuery) {
      const fallback = await contentful_client.getEntries({
        content_type: "post",
        order: "-sys.updatedAt",
        limit: 100,
      });
      posts = (fallback.items as unknown as IPostData[]).filter((post) =>
        postHasKeywordSlug(post, slug)
      );
    }

    if (!posts.length && !searchQuery) notFound();

    const categories = categoriesRes.items as unknown as ICategoryData[];

    return (
      <>
        <CategoryBlogsClient
          posts={posts}
          title={resolveTagLabel(slug, posts)}
          basePath={`/tags/${slug}`}
          searchQuery={searchQuery}
        />
        {!searchQuery && <CategoryHubs categories={categories} />}
      </>
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      (error as { digest?: string }).digest === "NEXT_NOT_FOUND"
    ) {
      throw error;
    }
    redirect("/");
  }
}
