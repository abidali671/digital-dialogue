import { notFound } from "next/navigation";

/** Past this, a ?page= value is a 404 and is not sent to Contentful. */
const MAX_PAGE = 100;

/**
 * Page 1 when `page` is omitted.
 * Any other value that is not a real page number is a 404.
 */
export function parsePageQuery(page?: string): number {
  if (page == null || page === "") return 1;
  if (!/^[1-9]\d*$/.test(page)) notFound();
  const value = Number(page);
  if (value > MAX_PAGE) notFound();
  return value;
}

export function assertPageInRange(page: number, totalPages: number) {
  if (page > totalPages) notFound();
}

export function pageCount(total: number, perPage: number) {
  return Math.max(1, Math.ceil(total / perPage));
}
