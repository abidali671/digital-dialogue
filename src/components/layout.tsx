import React, { PropsWithChildren } from "react";
import Navbar from "./Container/Navbar";
import Footer from "./Container/Footer";
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
