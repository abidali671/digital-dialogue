import type { Metadata } from "next";
import { Hero, TopPicks, AllPosts, Newsletter } from "@/components";
import contentful_client, {
  CONTENTFUL_REVALIDATE,
} from "@/lib/contentful/client";
import constants from "@/constants";
import { ICategoryData, IPostData, ITagData } from "@/types";

export const revalidate = CONTENTFUL_REVALIDATE;

export const metadata: Metadata = {
  title: "Home",
  description: constants.descriptions.HOME,
};

export default async function HomePage() {
  const [postsRes, categoriesRes, tagsRes] = await Promise.all([
    contentful_client.getEntries({ content_type: "post", limit: 16 }),
    contentful_client.getEntries({ content_type: "category" }),
    contentful_client.getEntries({ content_type: "tag" }),
  ]);

  const posts = postsRes.items as unknown as IPostData[];
  const categories = categoriesRes.items as unknown as ICategoryData[];
  const tags = tagsRes.items as unknown as ITagData[];

  const featuredPost = posts.slice(0, 1);
  const pickedPosts = posts.slice(1, 4);
  const latestPosts = posts.length > 4 ? posts.slice(4) : posts;

  return (
    <>
      <Hero posts={featuredPost} />
      <TopPicks posts={pickedPosts} />
      <AllPosts posts={latestPosts} categories={categories} tags={tags} />
      <Newsletter />
    </>
  );
}
