import { BLOCKS, type Block, type Document, type Inline, type Text } from "@contentful/rich-text-types";
import { slugifyKeyword } from "@/lib/keywords";

export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type TocSection = {
  heading: TocHeading;
  children: TocHeading[];
};

const MIN_TOC_HEADINGS = 3;

function collectText(node: Block | Inline | Text): string {
  if ("value" in node && typeof node.value === "string") return node.value;
  if ("content" in node && Array.isArray(node.content)) {
    return node.content.map(collectText).join("");
  }
  return "";
}

export function uniqueHeadingId(
  text: string,
  used: Record<string, number>
): string {
  const base = slugifyKeyword(text) || "section";
  const count = used[base] || 0;
  used[base] = count + 1;
  return count === 0 ? base : `${base}-${count + 1}`;
}

export function headingPlainText(node: Block | Inline): string {
  return collectText(node).replace(/\s+/g, " ").trim();
}

export function extractToc(document?: Document): TocHeading[] {
  if (!document?.content) return [];

  const used: Record<string, number> = {};
  const headings: TocHeading[] = [];

  const walk = (nodes: Array<Block | Inline | Text>) => {
    for (const node of nodes) {
      const level =
        node.nodeType === BLOCKS.HEADING_2
          ? 2
          : node.nodeType === BLOCKS.HEADING_3
            ? 3
            : null;

      if (level) {
        const text = headingPlainText(node as Block);
        if (text) {
          headings.push({
            id: uniqueHeadingId(text, used),
            text,
            level,
          });
        }
      }

      if ("content" in node && Array.isArray(node.content)) {
        walk(node.content);
      }
    }
  };

  walk(document.content);
  return headings;
}

export function groupToc(headings: TocHeading[]): TocSection[] {
  const sections: TocSection[] = [];

  for (const heading of headings) {
    if (heading.level === 2 || sections.length === 0) {
      sections.push({ heading, children: [] });
      continue;
    }
    sections[sections.length - 1].children.push(heading);
  }

  return sections;
}

export function shouldShowToc(headings: TocHeading[]) {
  return headings.length >= MIN_TOC_HEADINGS;
}
