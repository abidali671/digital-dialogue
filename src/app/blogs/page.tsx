import type { Metadata } from "next";
import { cache } from "react";
import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import config from "@/lib/config";
import constants from "@/constants";
import BlogsClient from "@/components/blogs/BlogsClient";
import { parseSearchQuery } from "@/lib/listing";
import {
  assertPageInRange,
  pageCount,
  parsePageQuery,
} from "@/lib/pagination";
import { DEFAULT_OG_IMAGE, pageTitle, resolvePageTitle, withPageMetaDescription } from "@/lib/metadata";
import { ICategoryData, IPostData } from "@/types";

export const revalidate = REVALIDATE_LISTING;

type PageProps = {
  searchParams: { page?: string; q?: string };
};

const loadBlogPage = cache(async (page: number, searchQuery: string) => {
  const response = await contentful_client.getEntries({
    content_type: "post",
    limit: config.BLOGS_PER_PAGE,
    skip: (page - 1) * config.BLOGS_PER_PAGE,
    order: "-sys.updatedAt",
    ...(searchQuery ? { query: searchQuery } : {}),
  });
  return {
    response,
    totalPages: pageCount(response.total, config.BLOGS_PER_PAGE),
  };
});

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const currentPage = parsePageQuery(searchParams.page);
  const { totalPages } = await loadBlogPage(
    currentPage,
    parseSearchQuery(searchParams.q)
  );
  assertPageInRange(currentPage, totalPages);
  const pageSuffix = currentPage > 1 ? `, Page ${currentPage}` : "";
  const title = `Freelancing Articles and Upwork Guides${pageSuffix}`;
  const resolvedTitle = resolvePageTitle(title);
  const description = withPageMetaDescription(
    constants.descriptions.BLOGS,
    currentPage
  );
  const canonical = currentPage > 1 ? `/blogs?page=${currentPage}` : "/blogs";

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

export default async function BlogsPage({ searchParams }: PageProps) {
  const currentPage = parsePageQuery(searchParams.page);
  const searchQuery = parseSearchQuery(searchParams.q);

  const [{ response, totalPages }, categoriesRes] = await Promise.all([
    loadBlogPage(currentPage, searchQuery),
    contentful_client.getEntries({ content_type: "category" }),
  ]);
  assertPageInRange(currentPage, totalPages);

  const categories = categoriesRes.items as unknown as ICategoryData[];

  return (
    <BlogsClient
      posts={response.items as unknown as IPostData[]}
      categories={categories}
      currentPage={currentPage}
      totalPages={totalPages}
      searchQuery={searchQuery}
    />
  );
}
