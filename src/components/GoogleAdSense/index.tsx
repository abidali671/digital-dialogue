"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import config from "@/lib/config";

/** Auto ads above the first result on /tools and posts push MAIN and the tool cards. */
function skipAutoAds(pathname: string) {
  if (pathname === "/tools" || pathname.startsWith("/tools/")) return true;
  const parts = pathname.split("/").filter(Boolean);
  return parts[0] === "blogs" && parts.length >= 3;
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
