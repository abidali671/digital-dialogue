"use client";

import React, { useMemo, useState } from "react";
import ContentContainer from "@/components/ContentContainer";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import Title from "@/components/Title";
import SearchIcon from "@/assets/icon/searchIcon";
import { IPostData } from "@/types";

interface PropsT {
  posts: IPostData[];
  currentPage: number;
  totalPages: number;
  authorName: string;
  authorSlug: string;
}

const AuthorPostsClient = ({
  posts,
  currentPage,
  totalPages,
  authorName,
  authorSlug,
}: PropsT) => {
  const [searchText, setSearchText] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        post.fields.title.toLowerCase().includes(searchText.toLowerCase()) ||
        post.fields.excerpt.toLowerCase().includes(searchText.toLowerCase()) ||
        post.fields.category.fields.label
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );
  }, [posts, searchText]);

  return (
    <div className="relative pb-16">
      <div className="w-full border-b border-line bg-white">
        <div className="flex flex-col items-center justify-center gap-4 px-6 py-12">
          <div className="flex h-12 w-full max-w-xl items-center gap-3 rounded-lg border border-line bg-mist px-4">
            <SearchIcon className="h-5 w-5 text-mute" />
            <input
              type="text"
              className="w-full border-none bg-transparent text-ink outline-0 placeholder:text-mute-soft"
              placeholder="Search posts"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>
        </div>
      </div>
      <ContentContainer className="relative flex flex-col justify-center pt-10">
        <Title>{authorName}</Title>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <PostCard
              key={post.fields.slug}
              data={post}
              priority={index === 0}
            />
          ))}
        </div>
        <Pagination
          basePath={`/authors/${authorSlug}`}
          currentPage={currentPage}
          pages={totalPages}
        />
      </ContentContainer>
    </div>
  );
};

export default AuthorPostsClient;
