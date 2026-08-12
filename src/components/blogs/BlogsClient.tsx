"use client";

import React, { useMemo, useState } from "react";
import {
  ContentContainer,
  LoadMoreButton,
  PostCard,
  Title,
} from "@/components";
import { SearchIcon } from "@/assets/icon";
import { IPostData } from "@/types";
import API from "@/lib/api";

interface PropsT {
  initialPosts: IPostData[];
  totalPosts: number;
}

const BlogsClient = ({ initialPosts, totalPosts }: PropsT) => {
  const [searchText, setSearchText] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [currentPagePosts, setCurrentPagePosts] =
    useState<IPostData[]>(initialPosts);
  const [loading, setLoading] = useState(false);

  const filteredPosts = useMemo(() => {
    return currentPagePosts.filter(
      (post) =>
        post.fields.title.toLowerCase().includes(searchText.toLowerCase()) ||
        post.fields.excerpt.toLowerCase().includes(searchText.toLowerCase()) ||
        post.fields.category.fields.label
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );
  }, [currentPagePosts, searchText]);

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/blogs?page=${pageNo + 1}`);
      setCurrentPagePosts((prev) => [...prev, ...data.items]);
      setPageNo(pageNo + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
        <Title>Blogs</Title>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <PostCard
              key={post.fields.slug}
              data={post}
              priority={index === 0}
            />
          ))}
        </div>
        <LoadMoreButton
          onClick={handleLoadMore}
          isLoading={loading}
          isVisible={currentPagePosts.length < totalPosts}
        />
      </ContentContainer>
    </div>
  );
};

export default BlogsClient;
