import type { Metadata } from "next";
import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import config from "@/lib/config";
import constants from "@/constants";
import BlogsClient from "@/components/blogs/BlogsClient";
import { IPostData } from "@/types";

export const revalidate = REVALIDATE_LISTING;

export const metadata: Metadata = {
  title: "Blogs",
  description: constants.descriptions.BLOGS,
};

type PageProps = {
  searchParams: { page?: string };
};

function parsePage(page?: string) {
  const value = Number(page) || 1;
  return value < 1 ? 1 : value;
}

export default async function BlogsPage({ searchParams }: PageProps) {
  const currentPage = parsePage(searchParams.page);

  const response = await contentful_client.getEntries({
    content_type: "post",
    limit: config.BLOGS_PER_PAGE,
    skip: (currentPage - 1) * config.BLOGS_PER_PAGE,
  });

  const totalPages = Math.max(
    1,
    Math.ceil(response.total / config.BLOGS_PER_PAGE)
  );

  return (
    <BlogsClient
      posts={response.items as unknown as IPostData[]}
      currentPage={Math.min(currentPage, totalPages)}
      totalPages={totalPages}
    />
  );
}
