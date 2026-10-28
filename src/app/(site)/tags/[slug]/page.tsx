import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import CategoryBlogsClient from "@/components/blogs/CategoryBlogsClient";
import { parseSearchQuery } from "@/lib/listing";
import { labelFromKeywordSlug, getPostTags } from "@/lib/keywords";
import { isNextNotFound } from "@/lib/next-errors";
import { loadTagPosts, MIN_POSTS_FOR_INDEXABLE_TAG } from "@/lib/tags";
import { REVALIDATE_LISTING } from "@/lib/contentful/client";
import { DEFAULT_OG_IMAGE, pageTitle, resolvePageTitle } from "@/lib/metadata";
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
    return "Practical freelancing tips";
  }
  return `Freelancing tips on ${label}`;
}

function tagPageDescription(label: string, slug: string) {
  if (slug === "freelancing") {
    return "Browse practical freelancing tips. Clear next steps on profiles, proposals, platforms, fees, and landing client work.";
  }
  return `Browse practical freelancing tips on ${label}. Clear next steps on profiles, proposals, platforms, fees, and landing client work.`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = params.slug?.trim();
  if (!slug) notFound();

  const posts = await loadTagPosts(slug);
  if (!posts.length) notFound();

  const label = resolveTagLabel(slug, posts);
  const title = tagPageTitle(label, slug);
  const resolvedTitle = resolvePageTitle(title);
  const description = tagPageDescription(label, slug);
  const canonical = `/tags/${slug}`;

  return {
    title: pageTitle(title),
    description,
    alternates: { canonical },
    robots: {
      index: posts.length >= MIN_POSTS_FOR_INDEXABLE_TAG,
      follow: true,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: canonical,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function TagPage({ params, searchParams }: PageProps) {
  try {
    const slug = params.slug?.trim();
    if (!slug) notFound();

    const searchQuery = parseSearchQuery(searchParams.q);
    const posts = await loadTagPosts(slug, searchQuery);
    if (!posts.length && !searchQuery) notFound();
    if (searchQuery && !posts.length) {
      const tagged = await loadTagPosts(slug);
      if (!tagged.length) notFound();
    }

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
    if (isNextNotFound(error)) throw error;
    redirect("/");
  }
}
