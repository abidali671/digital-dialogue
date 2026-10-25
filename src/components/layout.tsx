import React, { PropsWithChildren, Suspense } from "react";
import Navbar from "./Container/Navbar";
import Footer from "./Container/Footer";
import AdminCacheFab from "./AdminCacheFab";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
      <Footer />
      <Suspense fallback={null}>
        <AdminCacheFab />
      </Suspense>
    </React.Fragment>
  );
};

export default Layout;
