import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import BlogsListing from "@/components/blogs/BlogsListing";
import config from "@/lib/config";
import { parseSearchQuery } from "@/lib/listing";
import { labelFromKeywordSlug, getPostTags } from "@/lib/keywords";
import { isNextNotFound } from "@/lib/next-errors";
import { loadTagPosts, MIN_POSTS_FOR_INDEXABLE_TAG } from "@/lib/tags";
import {
  assertPageInRange,
  pageCount,
  parsePageQuery,
} from "@/lib/pagination";
import { DEFAULT_OG_IMAGE, pageTitle, resolvePageTitle } from "@/lib/metadata";
import { IPostData } from "@/types";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
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
  const searchParams = await props.searchParams;
  const slug = params.slug?.trim();
  if (!slug) notFound();

  const currentPage = parsePageQuery(searchParams.page);
  const posts = await loadTagPosts(slug);
  if (!posts.length) notFound();

  const totalPages = pageCount(posts.length, config.BLOGS_PER_PAGE);
  assertPageInRange(currentPage, totalPages);

  const label = resolveTagLabel(slug, posts);
  const pageSuffix = currentPage > 1 ? `, Page ${currentPage}` : "";
  const title = `${tagPageTitle(label, slug)}${pageSuffix}`;
  const resolvedTitle = resolvePageTitle(title);
  const description = tagPageDescription(label, slug);
  const canonical =
    currentPage > 1 ? `/tags/${slug}?page=${currentPage}` : `/tags/${slug}`;

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

export default async function TagPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  try {
    const slug = params.slug?.trim();
    if (!slug) notFound();

    const searchQuery = parseSearchQuery(searchParams.q);
    const currentPage = parsePageQuery(searchParams.page);
    const allPosts = await loadTagPosts(slug, searchQuery);
    if (!allPosts.length && !searchQuery) notFound();
    let labelPosts = allPosts;
    if (searchQuery && !allPosts.length) {
      const tagged = await loadTagPosts(slug);
      if (!tagged.length) notFound();
      labelPosts = tagged;
    }

    const total = allPosts.length;
    const totalPages = pageCount(total, config.BLOGS_PER_PAGE);
    assertPageInRange(currentPage, totalPages);
    const start = (currentPage - 1) * config.BLOGS_PER_PAGE;
    const posts = allPosts.slice(start, start + config.BLOGS_PER_PAGE);
    const label = resolveTagLabel(slug, labelPosts);

    return (
      <BlogsListing
        posts={posts}
        title={tagPageTitle(label, slug)}
        description={tagPageDescription(label, slug)}
        basePath={`/tags/${slug}`}
        searchQuery={searchQuery}
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
        activeTagSlug={slug}
      />
    );
  } catch (error) {
    if (isNextNotFound(error)) throw error;
    redirect("/");
  }
}
