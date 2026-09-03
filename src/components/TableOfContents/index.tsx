import type { TocHeading } from "@/lib/toc";
import Link from "next/link";

interface PropsT {
  headings: TocHeading[];
}

const TableOfContents = ({ headings }: PropsT) => {
  return (
    <nav aria-label="Table of contents" className="article-toc">
      <p className="article-toc-title">Contents</p>
      <ol>
        {headings.map((heading) => (
          <li key={heading.id}>
            <Link href={`#${heading.id}`}>{heading.text}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default TableOfContents;
