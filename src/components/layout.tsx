import React, { PropsWithChildren, Suspense } from "react";
import Navbar from "./Container/Navbar";
import Footer from "./Container/Footer";
import FeaturedPosts from "./FeaturedPosts";
import PopularTags from "./PopularTags";
import AdminCacheFab from "./AdminCacheFab";
import { IPostData } from "@/types";

type LayoutPropsT = PropsWithChildren<{
  featuredPosts: IPostData[];
}>;

const Layout = ({ children, featuredPosts }: LayoutPropsT) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container-body">{children}</main>
      <FeaturedPosts posts={featuredPosts} />
      <PopularTags />
      <Footer />
      <Suspense fallback={null}>
        <AdminCacheFab />
      </Suspense>
    </React.Fragment>
  );
};

export default Layout;
