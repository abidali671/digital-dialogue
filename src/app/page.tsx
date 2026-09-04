import type { Metadata } from "next";
import Hero from "@/components/HeroSection";
import TopPicks from "@/components/TopPicks";
import CategoryHubs from "@/components/CategoryHubs";
import AllPosts from "@/components/AllPosts";
import Newsletter from "@/components/Newsletter";
import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import config from "@/lib/config";
import constants from "@/constants";
import { getPostsBySlugs } from "@/lib/posts";
import { pageTitle, resolvePageTitle } from "@/lib/metadata";
import {
  JsonLdScript,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";
import { ICategoryData, IPostData } from "@/types";

export const revalidate = REVALIDATE_LISTING;

const HOME_TITLE = `${config.SITE_NAME} | Freelancing and Technology Guides`;

export const metadata: Metadata = {
  title: pageTitle(HOME_TITLE),
  description: constants.descriptions.HOME,
  alternates: { canonical: "/" },
  openGraph: {
    title: resolvePageTitle(HOME_TITLE),
    description: constants.descriptions.HOME,
    url: "/",
  },
};

export default async function HomePage() {
  const latestCount = config.BLOGS_PER_PAGE;
  const fetchLimit = 1 + latestCount + config.EDITOR_PICK_SLUGS.length;

  const [postsRes, categoriesRes, pickedPosts] = await Promise.all([
    contentful_client.getEntries({
      content_type: "post",
      limit: fetchLimit,
      order: "-sys.updatedAt",
    }),
    contentful_client.getEntries({ content_type: "category" }),
    getPostsBySlugs(config.EDITOR_PICK_SLUGS),
  ]);

  const posts = postsRes.items as unknown as IPostData[];
  const categories = categoriesRes.items as unknown as ICategoryData[];
  const editorPickSlugs = new Set<string>(config.EDITOR_PICK_SLUGS);

  const featuredPost = posts.slice(0, 1);
  const latestPosts = posts
    .slice(1)
    .filter((post) => !editorPickSlugs.has(post.fields.slug))
    .slice(0, latestCount);

  return (
    <>
      <JsonLdScript data={[organizationSchema(), websiteSchema()]} />
      <Hero posts={featuredPost} />
      <TopPicks posts={pickedPosts} />
      <CategoryHubs categories={categories} />
      <AllPosts posts={latestPosts} categories={categories} />
      <Newsletter />
    </>
  );
}
