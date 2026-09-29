/**
 * One sized Contentful CDN URL.
 * Listing cards used to go through next/image, which prints every configured
 * width into srcset and repeats the full asset URL each time.
 */
export function contentfulImageUrl(url: string, width: number, quality = 75) {
  const absolute = url.startsWith("http")
    ? url
    : `https:${url.startsWith("//") ? url : `//${url}`}`;
  const parsed = new URL(absolute);
  parsed.searchParams.set("fm", "webp");
  parsed.searchParams.set("q", String(quality));
  parsed.searchParams.set("w", String(width));
  return parsed.toString();
}
