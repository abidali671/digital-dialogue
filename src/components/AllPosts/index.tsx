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
          <Title>Latest posts</Title>
          <Link href="/blogs" className="link-underline text-sm">
            View all posts
          </Link>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_220px]">
          <div>
            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post: IPostData) => (
                <PostCard key={post.fields.slug} data={post} />
              ))}
            </div>
            {posts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <Link href="/blogs" className="btn-primary">
                  Browse all articles
                </Link>
              </div>
            )}
          </div>
          <aside className="hidden md:block">
            <div className="sticky top-24 flex flex-col gap-3">
              <h2 className="font-display text-lg font-bold text-ink">
                Categories
              </h2>
              <div className="flex flex-col gap-2 border-t border-line pt-3">
                {categories.map((data: ICategoryData) => (
                  <Category key={data.fields.slug} data={data} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </ContentContainer>
    </section>
  );
};

export default AllPosts;
