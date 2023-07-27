import React from "react";
import Head from "next/head";
import Script from "next/script";
import Layout from "@/components/layout";
import { DefaultSeo } from "next-seo";
import { AppInitialProps, AppProps } from "next/app";
import "../styles/global.css";
import config from "@/lib/config";

interface AppPropsT extends AppProps {
  Component: React.FC<AppInitialProps>;
}

export default function MyApp({ Component, pageProps }: AppPropsT) {
  return (
    <React.Fragment>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-WTZCCLQ2FF" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-WTZCCLQ2FF');
        `}
      </Script>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6695195287407019"
        crossOrigin="anonymous"
      ></Script>

      <DefaultSeo
        title={pageProps.title || config.DEFAULT_TITLE}
        description={pageProps.description || config.DEFAULT_DESCRIPTION}
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: config.BASE_URL,
          siteName: config.SITE_NAME,
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </Head>
      <Layout categories={pageProps.categories}>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  );
}
