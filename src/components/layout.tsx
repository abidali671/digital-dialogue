import React, { PropsWithChildren, Suspense } from "react";
import Navbar from "./Container/Navbar";
import Footer from "./Container/Footer";
import FeaturedPosts from "./FeaturedPosts";
import PopularTags from "./PopularTags";
import AdminCacheFab from "./AdminCacheFab";
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
      <Footer categories={categories} />
      <Suspense fallback={null}>
        <AdminCacheFab />
      </Suspense>
    </React.Fragment>
  );
};

export default Layout;
