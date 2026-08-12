import React from "react";
import { Hero, TopPicks, AllPosts, Newsletter } from "@/components";
import { ICategoryData, IPostData, ITagData } from "@/types";
import contentful_client from "@/lib/contentful/client";
import constants from "@/constants";

interface PropsT {
  posts: IPostData[];
  categories: ICategoryData[];
  tags: ITagData[];
}

const Home = ({ posts, categories, tags }: PropsT) => {
  const featuredPost = posts.slice(0, 1);
  const pickedPosts = posts.slice(1, 4);
  const latestPosts = posts.length > 4 ? posts.slice(4) : posts;

  return (
    <React.Fragment>
      <Hero posts={featuredPost} />
      <TopPicks posts={pickedPosts} />
      <AllPosts posts={latestPosts} categories={categories} tags={tags} />
      <Newsletter />
    </React.Fragment>
  );
};

export const getStaticProps = async () => {
  const responses = await Promise.all([
    contentful_client.getEntries({ content_type: "post", limit: 16 }),
    contentful_client.getEntries({ content_type: "category" }),
    contentful_client.getEntries({ content_type: "tag" }),
  ]);
  return {
    props: {
      posts: responses[0].items,
      categories: responses[1].items,
      tags: responses[2].items,
      title: "Home",
      description: constants.descriptions.HOME,
    },
  };
};

export default Home;
