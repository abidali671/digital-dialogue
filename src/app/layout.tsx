import type { Metadata } from "next";
import Layout from "@/components/layout";
import FontPreloads from "@/components/FontPreloads";
import GoogleAdSense from "@/components/GoogleAdSense";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import config from "@/lib/config";
import { DEFAULT_OG_IMAGE } from "@/lib/metadata";
import "@/styles/global.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: config.SITE_NAME,
  description: config.DEFAULT_DESCRIPTION,
  metadataBase: new URL(config.BASE_URL),
  alternates: {
    types: {
      "application/rss+xml": `${config.BASE_URL}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: config.SITE_NAME,
    title: config.SITE_NAME,
    description: config.DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: config.SITE_NAME,
    description: config.DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <FontPreloads />
      </head>
      <body className="font-body" suppressHydrationWarning>
        <Layout>{children}</Layout>
        <GoogleAnalytics />
        <GoogleAdSense />
      </body>
    </html>
  );
}
