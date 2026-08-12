"use client";

import React, { useMemo, useState } from "react";
import { ContentContainer, PostCard, Title } from "@/components";
import { SearchIcon } from "@/assets/icon";
import { IPostData } from "@/types";

interface PropsT {
  posts: IPostData[];
  categoryLabel: string;
}

const CategoryBlogsClient = ({ posts, categoryLabel }: PropsT) => {
  const [searchText, setSearchText] = useState("");

  const filteredPosts = useMemo(() => {
    return posts?.filter(
      (post) =>
        post.fields.title.toLowerCase().includes(searchText.toLowerCase()) ||
        post.fields.excerpt.toLowerCase().includes(searchText.toLowerCase())
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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>
      <ContentContainer className="relative flex flex-col justify-center pt-10">
        <Title>{categoryLabel}</Title>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10 lg:grid-cols-3">
          {filteredPosts?.map((post, index) => (
            <PostCard
              key={post.fields.slug}
              data={post}
              priority={index === 0}
            />
          ))}
        </div>
      </ContentContainer>
    </div>
  );
};

export default CategoryBlogsClient;
