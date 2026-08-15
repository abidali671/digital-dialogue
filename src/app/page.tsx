import type { Metadata } from "next";
import Hero from "@/components/HeroSection";
import TopPicks from "@/components/TopPicks";
import AllPosts from "@/components/AllPosts";
import Newsletter from "@/components/Newsletter";
import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import config from "@/lib/config";
import constants from "@/constants";
import { ICategoryData, IPostData } from "@/types";

export const revalidate = REVALIDATE_LISTING;

export const metadata: Metadata = {
  title: { absolute: `${config.SITE_NAME} | Freelancing and Technology Guides` },
  description: constants.descriptions.HOME,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${config.SITE_NAME} | Freelancing and Technology Guides`,
    description: constants.descriptions.HOME,
    url: "/",
  },
};

export default async function HomePage() {
  const [postsRes, categoriesRes] = await Promise.all([
    contentful_client.getEntries({
      content_type: "post",
      limit: 16,
      order: "-sys.updatedAt",
    }),
    contentful_client.getEntries({ content_type: "category" }),
  ]);

  const posts = postsRes.items as unknown as IPostData[];
  const categories = categoriesRes.items as unknown as ICategoryData[];

  const featuredPost = posts.slice(0, 1);
  const pickedPosts = posts.slice(1, 4);
  const latestPosts = posts.length > 4 ? posts.slice(4) : posts;

  return (
    <>
      <Hero posts={featuredPost} />
      <TopPicks posts={pickedPosts} />
      <AllPosts posts={latestPosts} categories={categories} />
      <Newsletter />
    </>
  );
}
