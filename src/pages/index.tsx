import React from "react";
import { LatestPost, Hero, AllPosts } from "@/components";
import contentful_client from "@/lib/contentfull/client";
import { JSONValue } from "@/types";
import FeaturedSection from "@/components/FeaturedSection";

interface PropsT {
  posts: JSONValue[];
  category: JSONValue[];
  tag: JSONValue[];
}

const Home = ({ posts, category, tag }: PropsT) => {
  console.log("posts", posts);
  console.log("category", category);
  console.log("tag", tag);

  return (
    <React.Fragment>
      <Hero />
      <LatestPost posts={posts.slice(0, 3)} />
      <FeaturedSection posts={posts.slice(0, 3)} />
      <AllPosts posts={posts} />
    </React.Fragment>
  );
};

export const getStaticProps = async () => {
  const responses = await Promise.all([
    contentful_client.getEntries({ content_type: "post" }),
    contentful_client.getEntries({ content_type: "category" }),
    contentful_client.getEntries({ content_type: "tag" }),
    contentful_client.getEntries({ links_to_entry: "1IKm8tMF5LiivwlkyebxMC" }),
  ]);
  return {
    props: {
      posts: responses[0].items,
      category: responses[1].items,
      tag: responses[2].items,
    },
  };
};

export default Home;
