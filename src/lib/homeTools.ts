import {
  CLEARANCE_DAYS,
  FIVERR_SELLER_FEE_PERCENT,
  computeFiverrFee,
} from "@/lib/fiverrFee";
import { computeRate } from "@/lib/freelanceRate";
import { computeConnects } from "@/lib/upworkConnects";
import { computeFee, formatMoney } from "@/lib/upworkFee";

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

const USD = "USD";

function minus(amount: number) {
  return `−${formatMoney(amount, USD)}`;
}

const feeExample = computeFee({
  type: "fixed",
  rate: 35,
  hours: 40,
  amount: 500,
  feePercent: 10,
  extraFlat: 2,
  extraPercent: 0,
});

const rateExample = computeRate({
  period: "month",
  billMode: "hours",
  takeHome: 1500,
  expenses: 200,
  workHours: 40,
  weeks: null,
  billHours: 25,
  billPct: 62.5,
  fee: 10,
}).value;

const connectsExample = computeConnects({
  costPerConnect: 0.15,
  connectsPerProposal: 12,
  proposals: 40,
  replies: 8,
  interviews: 5,
  contracts: 2,
  otherCosts: 20,
}).value;

const fiverrExample = computeFiverrFee({
  price: 100,
  extras: 0,
  tip: 0,
  payoutFee: 0,
});

if (!rateExample || !connectsExample) {
  throw new Error("Calculator example defaults failed to compute");
}

const costPerContract = connectsExample.perContract.total.value ?? 0;
const costPerReply = connectsExample.perReply.total.value ?? 0;
const costPerInterview = connectsExample.perInterview.total.value ?? 0;

/** Teaser cards. Figures come from each calculator's default example. */
export const HOME_TOOL_TEASERS: HomeToolTeaser[] = [
  {
    href: "/tools/upwork-fee-calculator",
    title: "Upwork Fee Calculator",
    example: "Example: $500 fixed-price job",
    figureLabel: "Estimated take-home",
    figure: formatMoney(feeExample.takeHome, USD),
    figureHint: "after fees",
    rows: [
      { label: "Billed", value: formatMoney(feeExample.gross, USD) },
      {
        label: `Service fee (${feeExample.feePercent}%)`,
        value: minus(feeExample.serviceFee),
      },
      { label: "Withdrawal fee", value: minus(feeExample.extra) },
    ],
  },
  {
    href: "/tools/freelance-rate-calculator",
    title: "Freelance Rate Calculator",
    example: "Example: $1,500-a-month goal",
    figureLabel: "Minimum rate",
    figure: formatMoney(rateExample.hourly, USD),
    figureHint: "/hr",
    rows: [
      { label: "Day rate", value: formatMoney(rateExample.day, USD) },
      {
        label: `${rateExample.projectHours}-hour project`,
        value: formatMoney(rateExample.project, USD),
      },
      { label: "Bill each month", value: formatMoney(rateExample.gross, USD) },
    ],
  },
  {
    href: "/tools/upwork-connects-calculator",
    title: "Upwork Connects Calculator",
    example: "Example: 40 proposals in 30 days",
    figureLabel: "Cost per contract",
    figure: formatMoney(costPerContract, USD),
    figureHint: "per contract",
    rows: [
      { label: "Total cost", value: formatMoney(connectsExample.total, USD) },
      { label: "Cost per reply", value: formatMoney(costPerReply, USD) },
      {
        label: "Cost per interview",
        value: formatMoney(costPerInterview, USD),
      },
    ],
  },
  {
    href: "/tools/fiverr-fee-calculator",
    title: "Fiverr Fee Calculator",
    example: "Example: $100 order, PayPal",
    figureLabel: "Estimated withdrawn",
    figure: formatMoney(fiverrExample.received, USD),
    figureHint: `from ${formatMoney(fiverrExample.gross, USD)}`,
    rows: [
      { label: "Order total", value: formatMoney(fiverrExample.gross, USD) },
      {
        label: `Fiverr fee (${FIVERR_SELLER_FEE_PERCENT}%)`,
        value: minus(fiverrExample.fiverrFee),
      },
      {
        label: "Clears after",
        value: `${CLEARANCE_DAYS.standard} days`,
      },
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
