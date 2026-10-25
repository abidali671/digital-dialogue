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
      className="site-breadcrumb mb-6 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-mute"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Fragment key={`${item.href ?? "current"}-${item.label}`}>
            {index > 0 && <span className="text-mute-soft">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className={
                  isLast
                    ? "text-accent hover:text-accent-hover"
                    : "hover:text-accent"
                }
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-accent" aria-current="page">
                {item.label}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
