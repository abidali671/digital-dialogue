import React from "react";
import { AppInitialProps } from "next/app";
import "../styles/global.css";

interface AppPropsT {
  Component: React.FC<AppInitialProps>;
  pageProps: AppInitialProps;
}

export default function MyApp({ Component, pageProps }: AppPropsT) {
  return <Component {...pageProps} />;
}
