import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import CategoryBlogsClient from "@/components/blogs/CategoryBlogsClient";
import { parseSearchQuery } from "@/lib/listing";
import { labelFromKeywordSlug, getPostTags } from "@/lib/keywords";
import { isNextNotFound } from "@/lib/next-errors";
import { loadTagPosts } from "@/lib/tags";
import { DEFAULT_OG_IMAGE, pageTitle, resolvePageTitle } from "@/lib/metadata";
import { IPostData } from "@/types";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string }>;
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

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
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
    openGraph: {
      title: resolvedTitle,
      description,
      url: canonical,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function TagPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
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
