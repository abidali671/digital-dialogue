import React from "react";
import Head from "next/head";
import Layout from "@/components/layout";
import { AppInitialProps, AppProps } from "next/app";
import "../styles/global.css";

interface AppPropsT extends AppProps {
  Component: React.FC<AppInitialProps>;
}

export default function MyApp({ Component, pageProps }: AppPropsT) {
  return (
    <React.Fragment>
      <Head>
        <title>Digital Dialogue</title>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </Head>
      <Layout categories={pageProps.categories}>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  );
}
