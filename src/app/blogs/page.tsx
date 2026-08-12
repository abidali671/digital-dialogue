import type { Metadata } from "next";
import contentful_client from "@/lib/contentful/client";
import config from "@/lib/config";
import constants from "@/constants";
import BlogsClient from "@/components/blogs/BlogsClient";
import { IPostData } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blogs",
  description: constants.descriptions.BLOGS,
};

export default async function BlogsPage() {
  const response = await contentful_client.getEntries({
    content_type: "post",
    limit: config.BLOGS_PER_PAGE,
  });

  return (
    <BlogsClient
      initialPosts={response.items as unknown as IPostData[]}
      totalPosts={response.total}
    />
  );
}
