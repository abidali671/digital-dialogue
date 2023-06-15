import React from "react";
import Head from "next/head";
import Layout from "@/components/layout";
import { AppInitialProps } from "next/app";
import "../styles/global.css";

interface AppPropsT {
  Component: React.FC<AppInitialProps>;
  pageProps: AppInitialProps;
}

export default function MyApp({ Component, pageProps }: AppPropsT) {
  return (
    <>
      <Head>
        <title>Digital Dialogue</title>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
