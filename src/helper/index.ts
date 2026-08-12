import type { Document } from "@contentful/rich-text-types";

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

/** Rough reading time in minutes for a Contentful rich text document. */
function getReadingTime(document?: Document) {
  if (!document) return 1;

  const collectText = (node: any): string => {
    if (typeof node?.value === "string") return node.value;
    if (Array.isArray(node?.content)) return node.content.map(collectText).join(" ");
    return "";
  };

  const words = collectText(document).trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.round(words / 200));
}

export { shuffleArray, getReadingTime };
