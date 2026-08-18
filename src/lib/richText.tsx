import type { Options } from "@contentful/rich-text-react-renderer";
import type { ReactNode } from "react";
import {
  BLOCKS,
  MARKS,
  type Block,
  type Inline,
  type Text,
} from "@contentful/rich-text-types";
import { headingPlainText, uniqueHeadingId } from "@/lib/toc";

function isText(node: Block | Inline | Text): node is Text {
  return node.nodeType === "text";
}

/**
 * Contentful marks whole code blocks as inline `code` inside a paragraph,
 * which loses the line breaks. Treat such paragraphs as real code blocks.
 */
function isCodeBlockParagraph(node: Block | Inline) {
  const children = node.content;
  if (!children.length || !children.every(isText)) return false;

  const texts = children as Text[];
  const hasCode = texts.some((text) =>
    text.marks.some((mark) => mark.type === MARKS.CODE)
  );
  const onlyCode = texts.every(
    (text) =>
      text.value.trim() === "" ||
      text.marks.some((mark) => mark.type === MARKS.CODE)
  );

  return hasCode && onlyCode;
}

function renderHeading(
  tag: "h2" | "h3",
  node: Block | Inline,
  children: ReactNode,
  used: Record<string, number>
) {
  const text = headingPlainText(node);
  const id = text ? uniqueHeadingId(text, used) : undefined;
  const HeadingTag = tag;
  return <HeadingTag id={id}>{children}</HeadingTag>;
}

export function createRichTextOptions(): Options {
  const usedHeadingIds: Record<string, number> = {};

  return {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        if (!isCodeBlockParagraph(node)) return <p>{children}</p>;

        const code = (node.content as Text[])
          .map((text) => text.value)
          .join("")
          .replace(/^\n+|\n+$/g, "");

        return (
          <pre>
            <code>{code}</code>
          </pre>
        );
      },
      [BLOCKS.HEADING_2]: (node, children) =>
        renderHeading("h2", node, children, usedHeadingIds),
      [BLOCKS.HEADING_3]: (node, children) =>
        renderHeading("h3", node, children, usedHeadingIds),
    },
  };
}
