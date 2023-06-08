import { JSONValue } from "@/types";
import React from "react";
import Card from "../Card";
import ContentContainer from "../ContentContainer";

interface PropsT {
  posts: JSONValue[];
}

const RecentPost = ({ posts }: PropsT) => {
  return (
    <div className="bg-white">
      <ContentContainer className="flex flex-col justify-center">
        <span>
          <h2 className="font-bold text-4xl ">Recent Posts</h2>
          <hr className="w-24 h-[4px]   border-1 rounded bg-orange-700" />
        </span>

        <div className="py-10 grid place-items-center  gap-y-4  grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
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
  );
};

export default RecentPost;
