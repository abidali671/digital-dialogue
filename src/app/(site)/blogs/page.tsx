import type { Metadata } from "next";
import { cache } from "react";
import contentful_client from "@/lib/contentful/client";
import config from "@/lib/config";
import constants from "@/constants";
import BlogsListing from "@/components/blogs/BlogsListing";
import { parseSearchQuery } from "@/lib/listing";
import {
  assertPageInRange,
  pageCount,
  parsePageQuery,
} from "@/lib/pagination";
import {
  DEFAULT_OG_IMAGE,
  pageTitle,
  resolvePageTitle,
  withPageMetaDescription,
} from "@/lib/metadata";
import { IPostData } from "@/types";

export const revalidate = 3600;

type PageProps = {
  searchParams: Promise<{ page?: string; q?: string }>;
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
    total: response.total,
    totalPages: pageCount(response.total, config.BLOGS_PER_PAGE),
  };
});

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const currentPage = parsePageQuery(searchParams.page);
  const { totalPages } = await loadBlogPage(
    currentPage,
    parseSearchQuery(searchParams.q),
  );
  assertPageInRange(currentPage, totalPages);
  const pageSuffix = currentPage > 1 ? `, Page ${currentPage}` : "";
  const title = `Freelancing Articles and Upwork Guides${pageSuffix}`;
  const resolvedTitle = resolvePageTitle(title);
  const description = withPageMetaDescription(
    constants.descriptions.BLOGS,
    currentPage,
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

export default async function BlogsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const currentPage = parsePageQuery(searchParams.page);
  const searchQuery = parseSearchQuery(searchParams.q);

  const { response, total, totalPages } = await loadBlogPage(
    currentPage,
    searchQuery,
  );
  assertPageInRange(currentPage, totalPages);

  return (
    <BlogsListing
      posts={response.items as unknown as IPostData[]}
      currentPage={currentPage}
      totalPages={totalPages}
      total={total}
      searchQuery={searchQuery}
    />
  );
}
