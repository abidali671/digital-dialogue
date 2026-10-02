import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import CategoryBlogsClient from "@/components/blogs/CategoryBlogsClient";
import { parseSearchQuery } from "@/lib/listing";
import {
  labelFromKeywordSlug,
  postHasTagSlug,
  searchTextFromKeywordSlug,
  getPostTags,
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
    const match = getPostTags(post).find((tag) => tag.slug === slug);
    if (match) return match.label;
  }
  return labelFromKeywordSlug(slug);
}

function tagPageTitle(label: string, slug: string) {
  if (slug === "freelancing") {
    return "Practical freelancing guides";
  }
  return `Freelancing guides on ${label}`;
}

function tagPageDescription(label: string, slug: string) {
  if (slug === "freelancing") {
    return "Browse practical freelancing guides. Clear next steps on profiles, proposals, platforms, fees, and landing client work.";
  }
  return `Browse practical freelancing guides on ${label}. Clear next steps on profiles, proposals, platforms, fees, and landing client work.`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = params.slug?.trim();
  if (!slug) {
    return {
      title: pageTitle("Tag"),
      description:
        "Browse articles by topic tag. Freelancing guides on platforms, profiles, proposals and practical next steps.",
    };
  }

  const label = labelFromKeywordSlug(slug);
  const title = tagPageTitle(label, slug);
  const resolvedTitle = resolvePageTitle(title);
  const description = tagPageDescription(label, slug);
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
      "fields.tags[match]": tagQuery,
      order: "-sys.updatedAt",
      limit: 100,
      ...(searchQuery ? { query: searchQuery } : {}),
    });

    let posts = (response.items as unknown as IPostData[]).filter((post) =>
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

    if (!posts.length && !searchQuery) notFound();

    const label = resolveTagLabel(slug, posts);

    return (
      <CategoryBlogsClient
        posts={posts}
        title={tagPageTitle(label, slug)}
        description={tagPageDescription(label, slug)}
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
