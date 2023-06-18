import React, { PropsWithChildren } from "react";
import Navbar from "./Container/Navbar";
import Footer from "./Container/Footer";
import { ICategoryData } from "@/types";

type LayoutPropsT = PropsWithChildren<{ categories?: ICategoryData[] }>;

const Layout = ({ children, categories }: LayoutPropsT) => {
  console.log("categories", categories);
  return (
    <>
      <Navbar />
      <main className="container-body">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
