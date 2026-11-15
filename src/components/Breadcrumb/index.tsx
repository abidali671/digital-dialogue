import Link from "next/link";
import { Fragment } from "react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="site-breadcrumb mb-4 flex flex-wrap items-center gap-1.5 text-[16px] font-semibold text-mute"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Fragment key={`${item.href ?? "current"}-${item.label}`}>
            {index > 0 && (
              <span aria-hidden="true" className="text-mute">
                /
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className={
                  isLast
                    ? "inline-flex min-h-[var(--control-h)] items-center rounded px-1 text-[#0f766e] hover:text-[#115e59] hover:underline focus-visible:underline"
                    : "inline-flex min-h-[var(--control-h)] items-center rounded px-1 hover:text-ink hover:underline"
                }
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#0f766e]" aria-current="page">
                {item.label}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
