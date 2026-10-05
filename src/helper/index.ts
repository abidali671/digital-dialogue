import type { Document } from "@contentful/rich-text-types";

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/** Rough reading time in minutes for a Contentful rich text document. */
function getReadingTime(document?: Document) {
  if (!document) return 1;

  const collectText = (node: any): string => {
    if (typeof node?.value === "string") return node.value;
    if (Array.isArray(node?.content))
      return node.content.map(collectText).join(" ");
    return "";
  };

  const words = collectText(document).trim().split(/\s+/).filter(Boolean)
    .length;

  return Math.max(1, Math.round(words / 200));
}

/** Format ISO dates in UTC so server and client render the same string. */
function formatDate(iso: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    ...options,
  }).format(new Date(iso));
}

/** e.g. September 16, 2024 */
function formatLongDate(iso: string) {
  return formatDate(iso, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** e.g. Sep 16, 2024 */
function formatShortDate(iso: string) {
  return formatDate(iso, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Prefer Contentful publishDate, then the entry's publishedAt. */
function getPublishedDate(post: {
  sys: { createdAt: string; updatedAt: string; publishedAt?: string };
  fields?: { publishDate?: string };
}) {
  return (
    post.fields?.publishDate ||
    post.sys.publishedAt ||
    post.sys.updatedAt ||
    post.sys.createdAt
  );
}

/** Calendar day in UTC, e.g. 2026-10-05 */
function utcDateKey(iso: string) {
  return new Date(iso).toISOString().slice(0, 10);
}

/** True when updatedAt falls on a later UTC day than the published date. */
function wasUpdatedAfterPublish(publishedAt: string, updatedAt?: string) {
  if (!updatedAt) return false;
  return utcDateKey(updatedAt) > utcDateKey(publishedAt);
}
function toIsoTimestamp(iso: string) {
  return new Date(iso).toISOString();
}

export {
  shuffleArray,
  getReadingTime,
  formatLongDate,
  formatShortDate,
  getPublishedDate,
  toIsoTimestamp,
  wasUpdatedAfterPublish,
};
