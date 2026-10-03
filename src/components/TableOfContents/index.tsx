import type { TocHeading } from "@/lib/toc";

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
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default TableOfContents;
