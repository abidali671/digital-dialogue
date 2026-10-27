import Script from "next/script";
import config from "@/lib/config";

/** GA4 gtag. The measurement ID is public; it ships in the page. */
const GoogleAnalytics = () => {
  const id = config.GA_MEASUREMENT_ID;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500,
            region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH']
          });
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
