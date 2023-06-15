import React from "react";
import { LatestPost, Hero, AllPosts } from "@/components";
import contentful_client from "@/lib/contentfull/client";
import { ICategoryData, IPostData, ITagData } from "@/types";
import FeaturedSection from "@/components/FeaturedSection";

interface PropsT {
  posts: IPostData[];
  categories: ICategoryData[];
  tags: ITagData[];
}

const Home = ({ posts, categories, tags }: PropsT) => {
  return (
    <React.Fragment>
      <Hero posts={posts.slice(0, 3)} />
      <LatestPost posts={posts.slice(0, 3)} />
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
    // contentful_client.getEntries({ links_to_entry: "1IKm8tMF5LiivwlkyebxMC" }),
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
