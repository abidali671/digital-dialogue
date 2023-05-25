import React from "react";
import { LatestPost, Hero, RecentPost, FeaturedSection } from "@/components";

const Home = () => {
  return (
    <React.Fragment>
      <Hero />
      <RecentPost />
      <LatestPost />
      <FeaturedSection />
    </React.Fragment>
  );
};

export default Home;
