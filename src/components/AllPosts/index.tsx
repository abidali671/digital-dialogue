import React from "react";
import PostCard from "../PostCard";
import Category from "../Category";
import ContentContainer from "../ContentContainer";
import Title from "../Title";
import { ICategoryData, ITagData, IPostData } from "@/types";
import Link from "next/link";

interface PropsT {
  posts: IPostData[];
  categories: ICategoryData[];
  tags: ITagData[];
}

const AllPosts = ({ posts, categories }: PropsT) => {
  return (
    <section className="bg-mist py-14 md:py-20">
      <ContentContainer>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Title>Latest articles</Title>
          <Link href="/blogs" className="link-underline text-sm">
            View all posts
          </Link>
        </div>
        <div className="mt-10 grid gap-12 md:grid-cols-[1fr_220px]">
          <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post: IPostData) => (
              <PostCard key={post.fields.slug} data={post} />
            ))}
          </div>
          <aside className="hidden md:block">
            <div className="sticky top-24 flex flex-col gap-3">
              <h2 className="font-display text-lg font-bold text-ink">
                Categories
              </h2>
              <div className="flex flex-col border-t border-line">
                {categories.map((data: ICategoryData) => (
                  <Category key={data.fields.slug} data={data} />
                ))}
              </div>
              <Link
                href="/blogs"
                className="link-underline mt-4 text-sm"
              >
                Browse all articles
              </Link>
            </div>
          </aside>
        </div>
      </ContentContainer>
    </section>
  );
};

export default AllPosts;
