import config from "@/lib/config";

/** AdSense loader. The publisher id is public; it ships in the page head. */
const GoogleAdSense = () => {
  const client = config.ADSENSE_CLIENT_ID;
  if (!client) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
  );
};

export default GoogleAdSense;
