import React from "react";
import Card from "../Card";
import ContentContainer from "../ContentContainer";
import { JSONValue } from "@/types";
import { slideContent } from "../HeroSection/data";

interface PropsT {
  posts: JSONValue[];
}

const LatestPost = ({ posts }: PropsT) => {
  return (
    <div className=" bg-neutral-50 ">
      <div className="">
        <ContentContainer>
          <span className="flex r gap-1 flex-col">
            <h2 className="font-bold text-4xl ">Latest Post</h2>
            <hr className="w-24 h-[4px]   border-1 rounded bg-orange-700" />
          </span>
          <div className="py-10  grid place-items-center gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {posts.map((post) => (
              <Card
                key={post.fields.slug}
                id={post.fields.slug}
                categoryId={post.fields.category.fields.slug}
                imageUrl={"https:" + post.fields.coverImage.fields.file.url}
                altText={post.fields.coverImage.fields.title}
                title={post.fields.title}
                description={post.fields.exerpt}
                date={post.sys.createdAt}
              />
            ))}
          </div>
        </ContentContainer>
      </div>
    </div>
  );
};
export default LatestPost;
