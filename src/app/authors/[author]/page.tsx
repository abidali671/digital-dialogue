import type { Metadata } from "next";
import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import config from "@/lib/config";
import AuthorPostsClient from "@/components/authors/AuthorPostsClient";
import { getAuthorBySlug } from "@/constants/authors";
import { parseSearchQuery } from "@/lib/listing";
import { isNextNotFound } from "@/lib/next-errors";
import {
  assertPageInRange,
  pageCount,
  parsePageQuery,
} from "@/lib/pagination";
import { DEFAULT_OG_IMAGE, pageTitle, resolvePageTitle, withPageMetaDescription } from "@/lib/metadata";
import { IPostData } from "@/types";

export const revalidate = REVALIDATE_LISTING;

type PageProps = {
  params: { author: string };
  searchParams: { page?: string; q?: string };
};

const loadAuthorPosts = cache(async (page: number, searchQuery: string) => {
  const response = await contentful_client.getEntries({
    content_type: "post",
    limit: config.BLOGS_PER_PAGE,
    skip: (page - 1) * config.BLOGS_PER_PAGE,
    order: "-sys.updatedAt",
    ...(searchQuery ? { query: searchQuery } : {}),
  });
  return {
    posts: response.items as unknown as IPostData[],
    totalPages: pageCount(response.total, config.BLOGS_PER_PAGE),
  };
});

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const author = getAuthorBySlug(params.author);
  if (!author) notFound();

  const currentPage = parsePageQuery(searchParams.page);
  const { totalPages } = await loadAuthorPosts(
    currentPage,
    parseSearchQuery(searchParams.q)
  );
  assertPageInRange(currentPage, totalPages);
  const pageSuffix = currentPage > 1 ? `, Page ${currentPage}` : "";
  const title = `${author.name}'s Articles${pageSuffix}`;
  const resolvedTitle = resolvePageTitle(title);
  const about = author.about.replace(/\s+/g, " ").trim();
  const description = withPageMetaDescription(
    about.length > 160 ? `${about.slice(0, 157).trimEnd()}...` : about,
    currentPage
  );
  const canonical =
    currentPage > 1
      ? `/authors/${params.author}?page=${currentPage}`
      : `/authors/${params.author}`;

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

export default async function AuthorPage({ params, searchParams }: PageProps) {
  try {
    const author = getAuthorBySlug(params.author);
    if (!author) notFound();

    const currentPage = parsePageQuery(searchParams.page);
    const searchQuery = parseSearchQuery(searchParams.q);
    const { posts, totalPages } = await loadAuthorPosts(currentPage, searchQuery);
    assertPageInRange(currentPage, totalPages);

    return (
      <AuthorPostsClient
        posts={posts}
        currentPage={currentPage}
        totalPages={totalPages}
        authorName={author.name}
        authorSlug={author.slug}
        authorRole={author.role}
        authorAbout={author.about}
        authorPictureUrl={author.picture}
        authorPictureAlt={author.pictureAlt}
        testimonials={author.testimonials}
        searchQuery={searchQuery}
      />
    );
  } catch (error) {
    if (isNextNotFound(error)) throw error;
    redirect("/");
  }
}
