import React from "react";
import { Category, ContentContainer, PostCard, Tag } from "@/components";
import { SearchIcon } from "@/assets/icon";
import contentful_client from "@/lib/contentful/client";
import { ICategoryData, ITagData, JSONValue } from "@/types";

interface PropsT {
  posts: JSONValue[];
  categories: ICategoryData[];
  tags: ITagData[];
}

const Blogs = ({ posts, categories, tags }: PropsT) => {
  return (
    <div className="relative">
      <div className="w-full bg-neutral-200 ">
        <div className="flex flex-col h-full items-center  justify-center py-10 gap-4 px-10 ">
          <div className="flex gap-2 justify-center items-center w-full sm:flex-row flex-col ">
            <div className="flex gap-2 h-12 w-full sm:w-6/12 bg-white items-center shadow-md px-3">
              <SearchIcon className="w-6 h-6" />
              <input
                type="text"
                className=" border-none outline-0 text-black bg-transparent w-full"
                placeholder="Search Blogs"
              />
            </div>
            <button className="bg-orange-500 h-12 p-3 text-white w-28">
              Search
            </button>
          </div>
        </div>
      </div>
      <ContentContainer className="relative flex justify-center flex-col p-0">
        <div className="md:col-span-7 col-span-10 gap-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {posts.map((post: any) => (
            <PostCard key={post.fields.slug} data={post} />
          ))}
        </div>
      </ContentContainer>
    </div>
  );
};

export const getStaticProps = async () => {
  const responses = await Promise.all([
    contentful_client.getEntries({ content_type: "post" }),
    contentful_client.getEntries({ content_type: "category" }),
    contentful_client.getEntries({ content_type: "tag" }),
  ]);
  return {
    props: {
      posts: responses[0].items,
      categories: responses[1].items,
      tags: responses[2].items,
    },
  };
};

export default Blogs;
