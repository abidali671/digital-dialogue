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
