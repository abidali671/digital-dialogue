import React from "react";
import {
  LatestPost,
  Hero,
  RecentPost,
  FeaturedSection,
  AllPosts,
} from "@/components";
import contentful_client from "@/lib/contentfull/client";
import { JSONValue } from "@/types";

interface PropsT {
  posts: JSONValue[];
}

const Home = ({ posts }: PropsT) => {
  console.log("posts", posts);
  return (
    <React.Fragment>
      <Hero />
      <RecentPost />
      <LatestPost />
      <FeaturedSection />
      <AllPosts />
    </React.Fragment>
  );
};

export const getStaticProps = async () => {
  const response = await contentful_client.getEntries({ content_type: "post" });
  return { props: { posts: response.items } };
};

export default Home;
