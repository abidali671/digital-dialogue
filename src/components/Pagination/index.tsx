import React from "react";
import Link from "next/link";
import Arrow from "@/assets/icon/arrow";
import cx from "clsx";

interface PropsT {
  pages: number;
  currentPage: number;
  /** Path without query, e.g. `/blogs` or `/authors/jane` */
  basePath: string;
}

function pageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

const Pagination = ({ pages, currentPage, basePath }: PropsT) => {
  if (pages <= 1) return null;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-0">
      <div className="flex w-full items-center justify-between border-t border-line">
        {prevPage >= 1 ? (
          <Link
            href={pageHref(basePath, prevPage)}
            className="flex items-center pt-3 text-mute hover:text-accent"
          >
            <Arrow className="rotate-180 transform" />
            <p className="ml-3 text-sm font-medium leading-none">Previous</p>
          </Link>
        ) : (
          <span className="flex cursor-not-allowed items-center pt-3 text-mute-soft opacity-50">
            <Arrow className="rotate-180 transform" />
            <p className="ml-3 text-sm font-medium leading-none">Previous</p>
          </span>
        )}

        <div className="hidden gap-2 px-2 sm:flex">
          {Array.from({ length: pages }, (_, index) => {
            const page = index + 1;
            return (
              <Link
                key={page}
                href={pageHref(basePath, page)}
                className={cx(
                  "border-t border-transparent px-2 pt-3 text-sm font-medium leading-none text-mute hover:border-accent hover:text-accent",
                  page === currentPage && "border-accent text-accent"
                )}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </Link>
            );
          })}
        </div>

        {nextPage <= pages ? (
          <Link
            href={pageHref(basePath, nextPage)}
            className="flex items-center pt-3 text-mute hover:text-accent"
          >
            <p className="mr-3 text-sm font-medium leading-none">Next</p>
            <Arrow />
          </Link>
        ) : (
          <span className="flex cursor-not-allowed items-center pt-3 text-mute-soft opacity-50">
            <p className="mr-3 text-sm font-medium leading-none">Next</p>
            <Arrow />
          </span>
        )}
      </div>
    </div>
  );
};

export default Pagination;
