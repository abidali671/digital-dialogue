"use client";

import React from "react";
import Link from "next/link";
import ContentContainer from "@/components/ContentContainer";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import PostSearch from "@/components/PostSearch";
import Title from "@/components/Title";
import { ICategoryData, IPostData } from "@/types";

interface PropsT {
  posts: IPostData[];
  categories: ICategoryData[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

function CategoryLinks({ categories }: { categories: ICategoryData[] }) {
  if (!categories.length) return null;

  return (
    <>
      {categories.map((category, index) => {
        const { label, slug } = category.fields;
        const isLast = index === categories.length - 1;
        const isSecondLast = index === categories.length - 2;

        return (
          <React.Fragment key={slug}>
            {index > 0 && (isLast ? ", and " : isSecondLast ? ", " : ", ")}
            <Link href={`/blogs/${slug}`}>{label.toLowerCase()}</Link>
          </React.Fragment>
        );
      })}
    </>
  );
}

const BlogsClient = ({
  posts,
  categories,
  currentPage,
  totalPages,
  searchQuery,
}: PropsT) => {
  return (
    <div className="relative pb-16">
      <PostSearch searchQuery={searchQuery} basePath="/blogs" />
      <ContentContainer className="relative flex flex-col justify-center pt-10">
        <Title>Blogs</Title>
        {!searchQuery && categories.length > 0 && (
          <div className="mt-4 max-w-3xl space-y-3 text-base leading-relaxed text-mute">
            <p>
              Practical guides on <CategoryLinks categories={categories} />.
              Browse the archive below, or open a category when you already know
              the kind of problem you need to solve.
            </p>
            <p>
              New articles land here first. Use search if you are looking for a
              specific platform, skill, or workflow.
            </p>
          </div>
        )}
        {searchQuery && (
          <p className="mt-4 text-sm text-mute">
            Showing results for “{searchQuery}”
          </p>
        )}
        {posts.length === 0 ? (
          <p className="mt-8 text-mute">
            {searchQuery ? `No posts match “${searchQuery}”.` : "No posts yet."}
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10 lg:grid-cols-3">
            {posts.map((post, index) => (
              <PostCard
                key={post.fields.slug}
                data={post}
                priority={index === 0}
              />
            ))}
          </div>
        )}
        <Pagination
          basePath="/blogs"
          currentPage={currentPage}
          pages={totalPages}
          searchQuery={searchQuery}
        />
      </ContentContainer>
    </div>
  );
};

export default BlogsClient;
