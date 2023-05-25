import React from "react";
import { LatestPost, Hero, RecentPost } from "@/components";

const Home = () => {
  return (
    <React.Fragment>
      <Hero />
      <RecentPost />
      <LatestPost />
    </React.Fragment>
  );
};

export default Home;
