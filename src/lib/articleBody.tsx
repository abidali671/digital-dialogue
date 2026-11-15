import { Fragment } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  INLINES,
  type Block,
  type Document,
  type Inline,
  type Text,
} from "@contentful/rich-text-types";
import InlineToolTeaser, {
  getInlineTeaser,
} from "@/components/article/InlineToolTeaser";
import { createRichTextOptions, internalPath } from "@/lib/richText";

function walkLinks(
  node: Block | Inline | Text,
  found: string[],
) {
  if ("nodeType" in node && node.nodeType === INLINES.HYPERLINK) {
    const uri = typeof node.data.uri === "string" ? node.data.uri : "";
    const path = internalPath(uri);
    if (path?.startsWith("/tools/")) found.push(path.split("?")[0]);
  }
  if ("content" in node && Array.isArray(node.content)) {
    node.content.forEach((child) => walkLinks(child as Block | Inline | Text, found));
  }
}

function firstToolHref(node: Block | Inline | Text) {
  const found: string[] = [];
  walkLinks(node, found);
  return found.find((href) => getInlineTeaser(href));
}

export function renderArticleBody(document: Document) {
  const usedHeadingIds: Record<string, number> = {};
  const options = createRichTextOptions(usedHeadingIds);
  let placed = false;
  let insertedHref: string | null = null;

  const nodes = document.content.map((node, index) => {
    const tree: Document = {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [node],
    };
    const href = !placed ? firstToolHref(node) : null;
    const teaser = href ? getInlineTeaser(href) : null;
    if (teaser) {
      placed = true;
      insertedHref = teaser.href;
    }
    return (
      <Fragment key={index}>
        {documentToReactComponents(tree, options)}
        {teaser ? <InlineToolTeaser href={teaser.href} /> : null}
      </Fragment>
    );
  });

  return { nodes, insertedHref };
}
