import FeaturedPosts from "@/components/FeaturedPosts";
import HomeGuideOnHome from "@/components/HomeGuideOnHome";
import PopularTags from "@/components/PopularTags";
import config from "@/lib/config";
import { getPostsBySlugs } from "@/lib/posts";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const featuredPosts = await getPostsBySlugs(config.FEATURED_POST_SLUGS);

  return (
    <>
      <main className="container-body">{children}</main>
      <FeaturedPosts posts={featuredPosts} />
      <PopularTags />
      <HomeGuideOnHome />
    </>
  );
}
