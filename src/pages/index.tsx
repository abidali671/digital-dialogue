import React from "react";
import { Hero, AllPosts } from "@/components";
import { ICategoryData, IPostData, ITagData } from "@/types";
import contentful_client from "@/lib/contentful/client";
import constants from "@/constants";

interface PropsT {
  posts: IPostData[];
  categories: ICategoryData[];
  tags: ITagData[];
}

const Home = ({ posts, categories, tags }: PropsT) => {
  const HeroPosts = posts.slice(0, 3);
  const RemainPosts = posts.length < 3 ? posts.slice(0) : posts.slice(3);

  return (
    <React.Fragment>
      <Hero posts={HeroPosts} />
      <AllPosts posts={RemainPosts} categories={categories} tags={tags} />
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
