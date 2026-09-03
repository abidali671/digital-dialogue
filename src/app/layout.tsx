import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import Layout from "@/components/layout";
import config from "@/lib/config";
import { ICategoryData, IPostData } from "@/types";
import "@/styles/global.css";

export const revalidate = REVALIDATE_LISTING;

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

const DEFAULT_OG_IMAGE = {
  url: "/og-default.webp",
  width: 1200,
  height: 630,
  alt: `${config.SITE_NAME} — practical guides on freelancing and technology`,
};

export const metadata: Metadata = {
  title: {
    default: config.SITE_NAME,
    template: `%s | ${config.SITE_NAME}`,
  },
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

async function getCategories() {
  const response = await contentful_client.getEntries({
    content_type: "category",
  });
  return response.items as unknown as ICategoryData[];
}

async function getFeaturedPosts() {
  const slugs = [...config.FEATURED_POST_SLUGS];
  if (!slugs.length) return [] as IPostData[];

  const response = await contentful_client.getEntries({
    content_type: "post",
    "fields.slug[in]": slugs.join(","),
    limit: slugs.length,
  });

  const bySlug = new Map(
    (response.items as unknown as IPostData[]).map((post) => [
      post.fields.slug,
      post,
    ])
  );

  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((post): post is IPostData => Boolean(post));
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, featuredPosts] = await Promise.all([
    getCategories(),
    getFeaturedPosts(),
  ]);

  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}
    >
      <body>
        <Layout categories={categories} featuredPosts={featuredPosts}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
