import React from "react";
import Head from "next/head";
import Script from "next/script";
import Layout from "@/components/layout";
import { AppInitialProps, AppProps } from "next/app";
import "../styles/global.css";

interface AppPropsT extends AppProps {
  Component: React.FC<AppInitialProps>;
}

export default function MyApp({ Component, pageProps }: AppPropsT) {
  return (
    <React.Fragment>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-LQYZDNMNFL" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-LQYZDNMNFL');
        `}
      </Script>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6695195287407019"
        crossOrigin="anonymous"
      ></Script>
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
