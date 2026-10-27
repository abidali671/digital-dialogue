import type { Options } from "@contentful/rich-text-react-renderer";
import type { ReactNode } from "react";
import {
  BLOCKS,
  INLINES,
  MARKS,
  type Block,
  type Inline,
  type Text,
} from "@contentful/rich-text-types";
import Link from "next/link";
import { headingPlainText, uniqueHeadingId } from "@/lib/toc";

const SITE_HOSTS = new Set(["digitaldialogue.pk", "www.digitaldialogue.pk"]);
const SAFE_SCHEME = /^(https?:|mailto:|tel:|#|\/)/i;

/** Site paths use Next.js Link. External, mail, and same-page hashes stay anchors. */
function internalPath(uri: string): string | null {
  const value = uri.trim();
  if (
    !value ||
    value.startsWith("#") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:")
  ) {
    return null;
  }
  if (value.startsWith("/") && !value.startsWith("//")) return value;

  try {
    const url = new URL(value);
    if (!SITE_HOSTS.has(url.hostname)) return null;
    return `${url.pathname}${url.search}${url.hash}` || "/";
  } catch {
    return null;
  }
}

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
      [INLINES.HYPERLINK]: (node, children) => {
        const uri = typeof node.data.uri === "string" ? node.data.uri.trim() : "";
        const path = internalPath(uri);
        if (path) return <Link href={path}>{children}</Link>;
        if (!SAFE_SCHEME.test(uri)) return <>{children}</>;
        const external = /^https?:/i.test(uri);
        return (
          <a href={uri} {...(external ? { rel: "noopener noreferrer" } : {})}>
            {children}
          </a>
        );
      },
    },
  };
}
