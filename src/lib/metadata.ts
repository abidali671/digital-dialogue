import type { Metadata } from "next";
import config from "@/lib/config";

/** Only append the site name when the base title is short enough to stay useful in SERPs. */
const TITLE_SUFFIX_MAX_LENGTH = 40;

/** Final document title string (with conditional site suffix). */
export function resolvePageTitle(title: string): string {
  const base = title.trim();
  if (!base) return config.SITE_NAME;
  if (base.length <= TITLE_SUFFIX_MAX_LENGTH) {
    return `${base} | ${config.SITE_NAME}`;
  }
  return base;
}

/** Next.js metadata title that bypasses the root template. */
export function pageTitle(title: string): NonNullable<Metadata["title"]> {
  return { absolute: resolvePageTitle(title) };
}

/** Makes paginated listing descriptions unique vs page 1 (audit duplicate-meta). */
export function withPageMetaDescription(
  description: string,
  page: number
): string {
  const base = description.replace(/\s+/g, " ").trim();
  if (page <= 1) return base;

  const suffix = ` Page ${page}.`;
  const maxBase = Math.max(40, 160 - suffix.length);
  const trimmed =
    base.length > maxBase
      ? `${base.slice(0, maxBase - 3).trimEnd()}...`
      : base.replace(/\.+$/, "");
  return `${trimmed}${suffix}`;
}
