import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import CategoryBlogsClient from "@/components/blogs/CategoryBlogsClient";
import { parseSearchQuery } from "@/lib/listing";
import {
  labelFromKeywordSlug,
  postHasKeywordSlug,
  searchTextFromKeywordSlug,
  toKeywordTags,
} from "@/lib/keywords";
import { pageTitle, resolvePageTitle } from "@/lib/metadata";
import { IPostData } from "@/types";

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
      title: pageTitle("Tag"),
      description:
        "Browse Digital Dialogue articles by topic tag. Freelancing guides on platforms, profiles, proposals and practical next steps.",
    };
  }

  const label = labelFromKeywordSlug(slug);
  const title = `Articles tagged ${label}`;
  const resolvedTitle = resolvePageTitle(title);
  const description = `Browse practical freelancing guides tagged ${label} on Digital Dialogue. Profiles, proposals, platforms and clear next steps for beginners and freelancers.`;
  const canonical = `/tags/${slug}`;

  return {
    title: pageTitle(title),
    description,
    alternates: { canonical },
    openGraph: { title: resolvedTitle, description, url: canonical },
  };
}

export default async function TagPage({ params, searchParams }: PageProps) {
  try {
    const slug = params.slug?.trim();
    const tagQuery = searchTextFromKeywordSlug(slug || "");
    if (!slug || !tagQuery) notFound();

    const searchQuery = parseSearchQuery(searchParams.q);

    const response = await contentful_client.getEntries({
      content_type: "post",
      "fields.keywords[match]": tagQuery,
      order: "-sys.updatedAt",
      limit: 100,
      ...(searchQuery ? { query: searchQuery } : {}),
    });

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

    return (
      <CategoryBlogsClient
        posts={posts}
        title={resolveTagLabel(slug, posts)}
        basePath={`/tags/${slug}`}
        searchQuery={searchQuery}
      />
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
