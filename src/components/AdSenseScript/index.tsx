import Script from "next/script";
import config from "@/lib/config";

const AdSenseScript = () => {
  if (!config.ADSENSE_CLIENT_ID) {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
};

export default AdSenseScript;
