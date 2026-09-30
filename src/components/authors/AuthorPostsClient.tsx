"use client";

import React from "react";
import Image from "next/image";
import ContentContainer from "@/components/ContentContainer";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import PostSearch from "@/components/PostSearch";
import Title from "@/components/Title";
import { IPostData } from "@/types";

interface PropsT {
  posts: IPostData[];
  currentPage: number;
  totalPages: number;
  authorName: string;
  authorSlug: string;
  authorRole: string;
  authorAbout: string;
  authorPictureUrl?: string;
  authorPictureAlt?: string;
  searchQuery: string;
}

const AuthorPostsClient = ({
  posts,
  currentPage,
  totalPages,
  authorName,
  authorSlug,
  authorRole,
  authorAbout,
  authorPictureUrl,
  authorPictureAlt,
  searchQuery,
}: PropsT) => {
  const basePath = `/authors/${authorSlug}`;

  return (
    <div className="relative pb-16">
      <PostSearch searchQuery={searchQuery} basePath={basePath} />
      <ContentContainer className="relative flex flex-col justify-center pt-10">
        <div className="flex flex-col gap-6 border-b border-line pb-10 md:flex-row md:items-start md:gap-8">
          {authorPictureUrl && (
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-accent/30 md:h-32 md:w-32">
              <Image
                alt={authorPictureAlt || authorName}
                src={authorPictureUrl}
                height={128}
                width={128}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <Title>{authorName}</Title>
            {authorRole && (
              <p className="mt-2 font-mono text-xs uppercase tracking-wide text-accent">
                {authorRole}
              </p>
            )}
            {authorAbout && (
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-mute">
                {authorAbout}
              </p>
            )}
          </div>
        </div>
        {searchQuery && (
          <p className="mt-6 text-sm text-mute">
            Showing results for “{searchQuery}”
          </p>
        )}
        {posts.length === 0 ? (
          <p className="mt-8 text-mute">
            {searchQuery
              ? `No posts match “{searchQuery}”.`
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
        <Pagination
          basePath={basePath}
          currentPage={currentPage}
          pages={totalPages}
          searchQuery={searchQuery}
        />
      </ContentContainer>
    </div>
  );
};

export default AuthorPostsClient;
