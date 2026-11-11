import React, { PropsWithChildren, Suspense } from "react";
import Navbar from "./Container/Navbar";
import Footer from "./Container/Footer";
import AdminCacheFab from "./AdminCacheFab";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <React.Fragment>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-[#0f766e] focus:px-4 focus:py-3 focus:text-[16px] focus:font-semibold focus:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Skip to content
      </a>
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
