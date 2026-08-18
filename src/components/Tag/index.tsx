import React from "react";
import Link from "next/link";

interface PropsT {
  href?: string;
  children: React.ReactNode;
}

const Tag = ({ href, children }: PropsT) => {
  if (!href) {
    return <span className="tag-span">{children}</span>;
  }

  return (
    <Link href={href} className="tag-span hover:border-accent hover:text-accent">
      {children}
    </Link>
  );
};

export default Tag;
