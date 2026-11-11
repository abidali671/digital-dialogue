import React from "react";
import Link from "next/link";
import { listingHref } from "@/lib/listing";

interface PropsT {
  pages: number;
  currentPage: number;
  /** Path without query, e.g. `/blogs` or `/authors/jane` */
  basePath: string;
  searchQuery?: string;
}

function pageHref(basePath: string, page: number, searchQuery?: string) {
  return listingHref(basePath, { page, q: searchQuery });
}

const pagerBtn =
  "inline-flex h-10 max-h-10 items-center gap-2 rounded-lg border px-4 text-[16px] font-semibold";

const Pagination = ({
  pages,
  currentPage,
  basePath,
  searchQuery,
}: PropsT) => {
  if (pages <= 1) return null;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <nav
      aria-label="Blog pages"
      className="mt-12 flex items-center justify-between gap-3 border-t border-line pt-6"
    >
      {prevPage >= 1 ? (
        <Link
          href={pageHref(basePath, prevPage, searchQuery)}
          className={`${pagerBtn} border-[#cbd5e1] bg-white text-[#334155] hover:border-[#0f766e] hover:text-[#115e59]`}
        >
          <span aria-hidden="true">←</span>
          Previous
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={`${pagerBtn} cursor-not-allowed border-dashed border-[#cbd5e1] bg-[#f4f6f8] text-[#475569]`}
        >
          <span aria-hidden="true">←</span>
          Previous
        </span>
      )}

      <ul className="m-0 hidden list-none items-center gap-1 sm:flex">
        {Array.from({ length: pages }, (_, index) => {
          const page = index + 1;
          const current = page === currentPage;
          return (
            <li key={page} className="m-0 list-none">
              <Link
                href={pageHref(basePath, page, searchQuery)}
                aria-current={current ? "page" : undefined}
                className={
                  current
                    ? "grid h-10 min-w-[40px] place-items-center rounded-lg bg-[#0f766e] px-3 text-[16px] font-semibold tabular-nums text-white"
                    : "grid h-10 min-w-[40px] place-items-center rounded-lg px-3 text-[16px] font-semibold tabular-nums text-[#334155] hover:bg-[#f0fdfa] hover:text-[#115e59]"
                }
              >
                <span className="sr-only">
                  {current ? "Current page, page " : "Page "}
                </span>
                {page}
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="text-[16px] font-semibold text-ink sm:hidden">
        Page {currentPage} of {pages}
      </p>

      {nextPage <= pages ? (
        <Link
          href={pageHref(basePath, nextPage, searchQuery)}
          className={`${pagerBtn} border-[#cbd5e1] bg-white text-[#334155] hover:border-[#0f766e] hover:text-[#115e59]`}
        >
          Next
          <span className="sr-only"> page</span>
          <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={`${pagerBtn} cursor-not-allowed border-dashed border-[#cbd5e1] bg-[#f4f6f8] text-[#475569]`}
        >
          Next
          <span aria-hidden="true">→</span>
        </span>
      )}
    </nav>
  );
};

export default Pagination;
