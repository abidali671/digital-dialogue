import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import config from "@/lib/config";
import { getPublishedDate } from "@/helper";
import type { IPostData } from "@/types";

export const revalidate = REVALIDATE_LISTING;
export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(iso: string) {
  return new Date(iso).toUTCString();
}

function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  if (path.startsWith("//")) return `https:${path}`;
  return `${config.BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function GET() {
  const response = await contentful_client.getEntries({
    content_type: "post",
    limit: 50,
    order: "-sys.updatedAt",
    include: 1,
  });

  const posts = response.items as unknown as IPostData[];
  const buildDate = toRfc822(new Date().toISOString());

  const items = posts
    .filter(
      (post) =>
        post.fields?.slug &&
        post.fields?.category?.fields?.slug &&
        post.fields?.title
    )
    .map((post) => {
      const path = `/blogs/${post.fields.category.fields.slug}/${post.fields.slug}`;
      const link = absoluteUrl(path);
      const pubDate = toRfc822(getPublishedDate(post));
      const cover = post.fields.coverImage?.fields?.file?.url;
      const enclosure = cover
        ? `\n      <enclosure url="${escapeXml(absoluteUrl(cover))}" type="image/jpeg" />`
        : "";

      return `    <item>
      <title>${escapeXml(post.fields.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.fields.excerpt || "")}</description>
      <category>${escapeXml(post.fields.category.fields.label)}</category>${enclosure}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(config.SITE_NAME)}</title>
    <link>${escapeXml(config.BASE_URL)}</link>
    <description>${escapeXml(config.DEFAULT_DESCRIPTION)}</description>
    <language>en-US</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${escapeXml(`${config.BASE_URL}/feed.xml`)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": `public, s-maxage=${REVALIDATE_LISTING}, stale-while-revalidate`,
    },
  });
}
