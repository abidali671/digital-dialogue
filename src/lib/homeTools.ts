import { TOOL_EXAMPLES, type ToolExample } from "@/lib/tool-examples";

export type HomeToolRow = { label: string; value: string };

export type HomeToolTeaser = {
  href: string;
  title: string;
  example: string;
  figureLabel: string;
  figure: string;
  figureHint: string;
  rows: HomeToolRow[];
};

function toHomeTeaser(example: ToolExample): HomeToolTeaser {
  return {
    href: example.href,
    title: example.title,
    example: example.meta,
    figureLabel: example.label,
    figure: example.figure,
    figureHint: example.unit ?? "",
    rows: example.rows,
  };
}

/** Teaser cards. Figures come from `lib/tool-examples.ts`. */
export const HOME_TOOL_TEASERS: HomeToolTeaser[] = TOOL_EXAMPLES.map(toHomeTeaser);

export const FOOTER_TOOL_LINKS = [
  ...HOME_TOOL_TEASERS.map((tool) => ({
    label: tool.title,
    href: tool.href,
  })),
  {
    label: "Invoice Generator",
    href: "/tools/freelance-invoice-generator",
  },
];

export type SearchToolShortcut = {
  href: string;
  title: string;
  blurb: string;
  match: RegExp;
};

const [feeTeaser, rateTeaser, connectsTeaser, fiverrTeaser] = HOME_TOOL_TEASERS;

/** Shown above /blogs search results when a query word matches. */
export const SEARCH_TOOL_SHORTCUTS: SearchToolShortcut[] = [
  {
    href: feeTeaser.href,
    title: feeTeaser.title,
    blurb: `See what you keep after the Upwork service fee. ${feeTeaser.example}: ${feeTeaser.figure} estimated take-home.`,
    match:
      /^(fee|fees|upwork|keep|take-home|withdraw|service|calculator|tool|earn)$/i,
  },
  {
    href: rateTeaser.href,
    title: rateTeaser.title,
    blurb: `Find the hourly rate that still hits your income goal. ${rateTeaser.example}: ${rateTeaser.figure} minimum rate.`,
    match:
      /^(rate|rates|charge|hourly|price|pricing|income|goal|calculator|tool|much)$/i,
  },
  {
    href: connectsTeaser.href,
    title: connectsTeaser.title,
    blurb: `Work out what proposals cost in Connects and dollars. ${connectsTeaser.example}: ${connectsTeaser.figure} cost per contract.`,
    match:
      /^(connect|connects|proposal|proposals|bid|bids|cost|calculator|tool|upwork)$/i,
  },
  {
    href: fiverrTeaser.href,
    title: fiverrTeaser.title,
    blurb: `See what you keep from a Fiverr order and when it clears. ${fiverrTeaser.example}: ${fiverrTeaser.figure} estimated withdrawn.`,
    match:
      /^(fiverr|fee|fees|seller|gig|order|calculator|tool|withdraw)$/i,
  },
];

export function matchingSearchTools(query: string): SearchToolShortcut[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return SEARCH_TOOL_SHORTCUTS.filter((tool) =>
    words.some((word) => tool.match.test(word)),
  );
}
