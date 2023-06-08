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
      <RecentPost />
      <LatestPost />
      <FeaturedSection />
      <AllPosts />
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
    props: { posts: responses[0], category: responses[1], tag: responses[2] },
  };
};

export default Home;
