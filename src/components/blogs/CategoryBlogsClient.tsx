"use client";

import React from "react";
import ContentContainer from "@/components/ContentContainer";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import PostSearch from "@/components/PostSearch";
import Title from "@/components/Title";
import { IPostData } from "@/types";

interface PropsT {
  posts: IPostData[];
  title: string;
  description?: string;
  basePath: string;
  searchQuery: string;
  currentPage?: number;
  totalPages?: number;
}

const CategoryBlogsClient = ({
  posts,
  title,
  description,
  basePath,
  searchQuery,
  currentPage,
  totalPages,
}: PropsT) => {
  return (
    <div className="relative pb-16">
      <PostSearch searchQuery={searchQuery} basePath={basePath} />
      <ContentContainer className="relative flex flex-col justify-center pt-10">
        <Title>{title}</Title>
        {description && (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-mute">
            {description}
          </p>
        )}
        {searchQuery && (
          <p className="mt-4 text-sm text-mute">
            Showing results for “{searchQuery}”
          </p>
        )}
        {posts.length === 0 ? (
          <p className="mt-8 text-mute">
            {searchQuery
              ? `No posts match “${searchQuery}”.`
              : "No posts yet."}
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
        {currentPage != null && totalPages != null && (
          <Pagination
            basePath={basePath}
            currentPage={currentPage}
            pages={totalPages}
            searchQuery={searchQuery}
          />
        )}
      </ContentContainer>
    </div>
  );
};

export default CategoryBlogsClient;
