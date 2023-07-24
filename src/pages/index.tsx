import React from "react";
import { Hero, AllPosts, FeaturedSection } from "@/components";
import { ICategoryData, IPostData, ITagData } from "@/types";
import contentful_client from "@/lib/contentful/client";

interface PropsT {
  posts: IPostData[];
  categories: ICategoryData[];
  tags: ITagData[];
}

const Home = ({ posts, categories, tags }: PropsT) => {
  return (
    <React.Fragment>
      <Hero posts={posts.slice(0, 3)} />
      <FeaturedSection posts={posts.slice(0, 3)} />
      <AllPosts posts={posts} categories={categories} tags={tags} />
    </React.Fragment>
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

export default Home;
