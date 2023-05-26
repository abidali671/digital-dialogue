import React from "react";
import Layout from "@/components/layout";
import Head from 'next/head'
import "../styles/global.css";
import { AppInitialProps } from "next/app";


interface AppPropsT {
  Component: React.FC<AppInitialProps>;
  pageProps: AppInitialProps;
}

export default function MyApp({ Component, pageProps }: AppPropsT) {
  return (
    <>
      <Head><title>Blogy</title></Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
