import React from "react";
import Link from "next/link";
import ContentContainer from "../ContentContainer";
import PostCard from "../PostCard";
import Title from "../Title";
import { IPostData } from "@/types";

interface IProps {
  posts: IPostData[];
}

/** Sitewide featured post cards, driven by config.FEATURED_POST_SLUGS. */
const FeaturedPosts = ({ posts }: IProps) => {
  if (!posts.length) return null;

  return (
    <section className="border-t border-line bg-mist py-14 md:py-16">
      <ContentContainer>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Title as="h2">Featured posts</Title>
          <Link href="/blogs" className="link-underline text-sm">
            View all posts
          </Link>
        </div>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.fields.slug} data={post} />
          ))}
        </div>
      </ContentContainer>
    </section>
  );
};

export default FeaturedPosts;
