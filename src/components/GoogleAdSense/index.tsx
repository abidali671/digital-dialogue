"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import config from "@/lib/config";

/** Auto ads on calculator pages reflow the hero after load (production CLS). */
function skipAutoAds(pathname: string) {
  return pathname.startsWith("/tools/") && pathname !== "/tools/";
}

/** AdSense loader. After hydration so auto-ads cannot rewrite the DOM first. */
const GoogleAdSense = () => {
  const pathname = usePathname();
  const client = config.ADSENSE_CLIENT_ID;
  if (!client || skipAutoAds(pathname)) return null;

  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
};

export default GoogleAdSense;
