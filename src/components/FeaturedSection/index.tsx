import React from "react";
import PostCard from "../PostCard";
import ContentContainer from "../ContentContainer";
import { JSONValue } from "@/types";

interface PropsT {
  posts: JSONValue[];
}

const FeaturedSection = ({ posts }: PropsT) => {
  return (
    <div className="bg-white ">
      <ContentContainer>
        <span>
          <h2 className="font-bold text-4xl ">Featured Post</h2>
          <hr className="w-24 h-[4px]   border-1 rounded bg-orange-700" />
        </span>
        <div className="py-10 grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {posts.map((post: any) => (
            <PostCard key={post.fields.slug} data={post} />
          ))}
        </div>
      </ContentContainer>
    </div>
  );
};

export default FeaturedSection;
