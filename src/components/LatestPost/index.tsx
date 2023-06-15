import React from "react";
import PostCard from "../PostCard";
import ContentContainer from "../ContentContainer";
import { IPostData } from "@/types";

interface PropsT {
  posts: IPostData[];
}

const LatestPost = ({ posts }: PropsT) => {
  return (
    <div className=" bg-neutral-50 ">
      <ContentContainer>
        <span className="flex r gap-1 flex-col">
          <h2 className="font-bold text-4xl ">Latest Post</h2>
          <hr className="w-24 h-[4px]   border-1 rounded bg-orange-700" />
        </span>
        <div className="py-10 grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {posts.map((post: IPostData) => (
            <PostCard key={post.fields.slug} data={post} />
          ))}
        </div>
      </ContentContainer>
    </div>
  );
};
export default LatestPost;
