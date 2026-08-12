import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import contentful_client, {
  CONTENTFUL_REVALIDATE,
} from "@/lib/contentful/client";
import Layout from "@/components/layout";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import config from "@/lib/config";
import { ICategoryData } from "@/types";
import "@/styles/global.css";

export const revalidate = CONTENTFUL_REVALIDATE;

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const displayFont = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  variable: "--font-display",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: config.SITE_NAME,
    template: `%s | ${config.DEFAULT_TITLE_TEMPLATE}`,
  },
  description: config.DEFAULT_DESCRIPTION,
  metadataBase: new URL(config.BASE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: config.SITE_NAME,
    url: config.BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

async function getCategories() {
  const response = await contentful_client.getEntries({
    content_type: "category",
  });
  return response.items as unknown as ICategoryData[];
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}
    >
      <body>
        <GoogleAnalytics />
        <Layout categories={categories}>{children}</Layout>
      </body>
    </html>
  );
}
