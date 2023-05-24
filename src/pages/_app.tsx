import React from "react";
import { AppInitialProps } from "next/app";
import "../styles/global.css";
import { Navbar } from "@/components";
import Layout from "@/components/layout";

interface AppPropsT {
  Component: React.FC<AppInitialProps>;
  pageProps: AppInitialProps;
}

export default function MyApp({ Component, pageProps }: AppPropsT) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
