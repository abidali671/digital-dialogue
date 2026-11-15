import Script from "next/script";
import config from "@/lib/config";

/** AdSense loader. Loaded after hydration so auto-ads cannot rewrite the DOM first. */
const GoogleAdSense = () => {
  const client = config.ADSENSE_CLIENT_ID;
  if (!client) return null;

  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
};

export default GoogleAdSense;
