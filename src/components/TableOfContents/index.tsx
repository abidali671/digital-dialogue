import { groupToc, type TocHeading } from "@/lib/toc";

interface PropsT {
  headings: TocHeading[];
}

const TableOfContents = ({ headings }: PropsT) => {
  const sections = groupToc(headings);

  return (
    <nav aria-label="Table of contents" className="article-toc">
      <p className="article-toc-title">Contents</p>
      <ol>
        {sections.map((section) => (
          <li key={section.heading.id}>
            <a href={`#${section.heading.id}`}>{section.heading.text}</a>
            {section.children.length > 0 && (
              <ul>
                {section.children.map((child) => (
                  <li key={child.id}>
                    <a href={`#${child.id}`}>{child.text}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default TableOfContents;
