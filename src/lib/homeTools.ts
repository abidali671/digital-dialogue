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

/** Static examples copied from each calculator page — not live results. */
export const HOME_TOOL_TEASERS: HomeToolTeaser[] = [
  {
    href: "/tools/upwork-fee-calculator",
    title: "Upwork Fee Calculator",
    example: "Example: $500 fixed-price job",
    figureLabel: "Estimated take-home",
    figure: "$448.00",
    figureHint: "after fees",
    rows: [
      { label: "Billed", value: "$500.00" },
      { label: "Service fee (10%)", value: "−$50.00" },
      { label: "Withdrawal fee", value: "−$2.00" },
    ],
  },
  {
    href: "/tools/freelance-rate-calculator",
    title: "Freelance Rate Calculator",
    example: "Example: $1,500-a-month goal",
    figureLabel: "Minimum rate",
    figure: "$18.89",
    figureHint: "/hr",
    rows: [
      { label: "Day rate", value: "$94.44" },
      { label: "10-hour project", value: "$188.89" },
      { label: "Bill each month", value: "$1,888.89" },
    ],
  },
  {
    href: "/tools/upwork-connects-calculator",
    title: "Upwork Connects Calculator",
    example: "Example: 40 proposals in 30 days",
    figureLabel: "Cost per contract",
    figure: "$46.00",
    figureHint: "per contract",
    rows: [
      { label: "Total cost", value: "$92.00" },
      { label: "Cost per reply", value: "$11.50" },
      { label: "Cost per interview", value: "$18.40" },
    ],
  },
  {
    href: "/tools/fiverr-fee-calculator",
    title: "Fiverr Fee Calculator",
    example: "Example: $100 order, PayPal",
    figureLabel: "Estimated withdrawn",
    figure: "$80.00",
    figureHint: "from $100",
    rows: [
      { label: "Order total", value: "$100.00" },
      { label: "Fiverr fee (20%)", value: "−$20.00" },
      { label: "Clears after", value: "14 days" },
    ],
  },
];

export const FOOTER_TOOL_LINKS = HOME_TOOL_TEASERS.map((tool) => ({
  label: tool.title,
  href: tool.href,
}));

export type SearchToolShortcut = {
  href: string;
  title: string;
  blurb: string;
  match: RegExp;
};

/** Shown above /blogs search results when a query word matches. */
export const SEARCH_TOOL_SHORTCUTS: SearchToolShortcut[] = [
  {
    href: "/tools/upwork-fee-calculator",
    title: "Upwork Fee Calculator",
    blurb:
      "See what you keep after the Upwork service fee. Example: $500 fixed-price job: $448.00 estimated take-home.",
    match:
      /^(fee|fees|upwork|keep|take-home|withdraw|service|calculator|tool|earn)$/i,
  },
  {
    href: "/tools/freelance-rate-calculator",
    title: "Freelance Rate Calculator",
    blurb:
      "Find the hourly rate that still hits your income goal. Example: $1,500-a-month goal: $18.89 minimum rate.",
    match:
      /^(rate|rates|charge|hourly|price|pricing|income|goal|calculator|tool|much)$/i,
  },
  {
    href: "/tools/upwork-connects-calculator",
    title: "Upwork Connects Calculator",
    blurb:
      "Work out what proposals cost in Connects and dollars. Example: 40 proposals in 30 days: $46.00 cost per contract.",
    match:
      /^(connect|connects|proposal|proposals|bid|bids|cost|calculator|tool|upwork)$/i,
  },
  {
    href: "/tools/fiverr-fee-calculator",
    title: "Fiverr Fee Calculator",
    blurb:
      "See what you keep from a Fiverr order and when it clears. Example: $100 order, PayPal: $80.00 estimated withdrawn.",
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
