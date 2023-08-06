import React from "react";
import PostCard from "../PostCard";
import ContentContainer from "../ContentContainer";
import { IPostData } from "@/types";
import Title from "../Title";

interface PropsT {
  posts: IPostData[];
}

const FeaturedSection = ({ posts }: PropsT) => {
  return (
    <div className="bg-white ">
      <ContentContainer>
        <Title>Featured Post</Title>
        <div className="py-10 grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {posts.map((post: IPostData) => (
            <PostCard key={post.fields.slug} data={post} />
          ))}
        </div>
      </ContentContainer>
    </div>
  );
};

export default FeaturedSection;
