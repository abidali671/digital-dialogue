import React from "react";
import PostCard from "../PostCard";
import ContentContainer from "../ContentContainer";
import Title from "../Title";
import { IPostData } from "@/types";
import Link from "next/link";

interface PropsT {
  posts: IPostData[];
}

const AllPosts = ({ posts }: PropsT) => {
  return (
    <section className="bg-mist py-14 md:py-20">
      <ContentContainer>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Title as="h2">Latest articles</Title>
          <Link href="/blogs" className="link-underline text-sm">
            View all posts
          </Link>
        </div>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((post: IPostData) => (
            <PostCard key={post.fields.slug} data={post} />
          ))}
        </div>
      </ContentContainer>
    </section>
  );
};

export default AllPosts;
