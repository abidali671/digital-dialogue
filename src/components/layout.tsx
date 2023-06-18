import React, { PropsWithChildren } from "react";
import Navbar from "./Container/Navbar";
import Footer from "./Container/Footer";
import { ICategoryData } from "@/types";

type LayoutPropsT = PropsWithChildren<{ categories?: ICategoryData[] }>;

const Layout = ({ children, categories }: LayoutPropsT) => {
  return (
    <React.Fragment>
      <Navbar categories={categories} />
      <main className="container-body">{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
