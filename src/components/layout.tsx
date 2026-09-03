import React, { PropsWithChildren } from "react";
import Navbar from "./Container/Navbar";
import Footer from "./Container/Footer";
import FeaturedPosts from "./FeaturedPosts";
import PopularTags from "./PopularTags";
import { ICategoryData, IPostData } from "@/types";

type LayoutPropsT = PropsWithChildren<{
  categories: ICategoryData[];
  featuredPosts: IPostData[];
}>;

const Layout = ({ children, categories, featuredPosts }: LayoutPropsT) => {
  return (
    <React.Fragment>
      <Navbar categories={categories} />
      <main className="container-body">{children}</main>
      <FeaturedPosts posts={featuredPosts} />
      <PopularTags />
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
