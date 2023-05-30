import React from "react";
import {
  LatestPost,
  Hero,
  RecentPost,
  FeaturedSection,
  AllPosts,
} from "@/components";

const Home = () => {
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

export default Home;
