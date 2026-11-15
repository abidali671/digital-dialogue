import {
  CLEARANCE_DAYS,
  FIVERR_SELLER_FEE_PERCENT,
  computeFiverrFee,
} from "@/lib/fiverrFee";
import { computeRate } from "@/lib/freelanceRate";
import { computeConnects } from "@/lib/upworkConnects";
import { computeFee, formatMoney } from "@/lib/upworkFee";

export type ToolKey =
  | "upwork-fee"
  | "freelance-rate"
  | "upwork-connects"
  | "fiverr-fee";

export type ToolExampleRow = { label: string; value: string };

export type ToolExample = {
  key: ToolKey;
  href: string;
  title: string;
  meta: string;
  label: string;
  figure: string;
  unit?: string;
  rows: ToolExampleRow[];
  keywords: string;
};

const USD = "USD";

function minus(amount: number) {
  return `−${formatMoney(amount, USD)}`;
}

/** Live calculator defaults (verified against each tool page). */
export const EXAMPLE_INPUTS = {
  "upwork-fee": {
    type: "fixed" as const,
    rate: 35,
    hours: 40,
    amount: 500,
    feePercent: 10,
    extraFlat: 2,
    extraPercent: 0,
  },
  "freelance-rate": {
    period: "month" as const,
    billMode: "hours" as const,
    takeHome: 1500,
    expenses: 200,
    workHours: 40,
    weeks: null as number | null,
    billHours: 25,
    billPct: 62.5,
    fee: 10,
  },
  "upwork-connects": {
    costPerConnect: 0.15,
    connectsPerProposal: 12,
    proposals: 40,
    replies: 8,
    interviews: 5,
    contracts: 2,
    otherCosts: 20,
  },
  "fiverr-fee": {
    price: 100,
    extras: 0,
    tip: 0,
    payoutFee: 0,
  },
} as const;

const EXPECTED = {
  "upwork-fee": {
    figure: "$448.00",
    rows: ["$500.00", "−$50.00", "−$2.00"],
  },
  "freelance-rate": {
    figure: "$18.89",
    rows: ["$94.44", "$188.89", "$1,888.89"],
  },
  "upwork-connects": {
    figure: "$46.00",
    rows: ["$92.00", "$11.50", "$18.40"],
  },
  "fiverr-fee": {
    figure: "$80.00",
    rows: ["$100.00", "−$20.00", "14 days"],
  },
} as const;

function assertExamples(examples: ToolExample[]) {
  for (const example of examples) {
    const expected = EXPECTED[example.key];
    if (example.figure !== expected.figure) {
      throw new Error(
        `${example.key} figure ${example.figure} !== ${expected.figure}`,
      );
    }
    expected.rows.forEach((value, index) => {
      if (example.rows[index]?.value !== value) {
        throw new Error(
          `${example.key} row ${index} ${example.rows[index]?.value} !== ${value}`,
        );
      }
    });
  }
}

export function getToolExamples(): ToolExample[] {
  const fee = computeFee(EXAMPLE_INPUTS["upwork-fee"]);
  const rate = computeRate(EXAMPLE_INPUTS["freelance-rate"]).value;
  const connects = computeConnects(EXAMPLE_INPUTS["upwork-connects"]).value;
  const fiverr = computeFiverrFee(EXAMPLE_INPUTS["fiverr-fee"]);

  if (!rate || !connects) {
    throw new Error("Calculator example defaults failed to compute");
  }

  const costPerContract = connects.perContract.total.value ?? 0;
  const costPerReply = connects.perReply.total.value ?? 0;
  const costPerInterview = connects.perInterview.total.value ?? 0;

  const examples: ToolExample[] = [
    {
      key: "upwork-fee",
      href: "/tools/upwork-fee-calculator",
      title: "Upwork Fee Calculator",
      meta: "Example: $500 fixed-price job",
      label: "Estimated take-home",
      figure: formatMoney(fee.takeHome, USD),
      unit: "after fees",
      keywords:
        "fee fees upwork keep take-home withdraw service calculator tool earn billed",
      rows: [
        { label: "Billed", value: formatMoney(fee.gross, USD) },
        {
          label: `Service fee (${fee.feePercent}%)`,
          value: minus(fee.serviceFee),
        },
        { label: "Withdrawal fee", value: minus(fee.extra) },
      ],
    },
    {
      key: "freelance-rate",
      href: "/tools/freelance-rate-calculator",
      title: "Freelance Rate Calculator",
      meta: "Example: $1,500-a-month goal",
      label: "Minimum rate",
      figure: formatMoney(rate.hourly, USD),
      unit: "/hr",
      keywords:
        "rate rates charge hourly price pricing income goal calculator tool much freelance",
      rows: [
        { label: "Day rate", value: formatMoney(rate.day, USD) },
        {
          label: `${rate.projectHours}-hour project`,
          value: formatMoney(rate.project, USD),
        },
        { label: "Bill each month", value: formatMoney(rate.gross, USD) },
      ],
    },
    {
      key: "upwork-connects",
      href: "/tools/upwork-connects-calculator",
      title: "Upwork Connects Calculator",
      meta: "Example: 40 proposals in 30 days",
      label: "Cost per contract",
      figure: formatMoney(costPerContract, USD),
      unit: "per contract",
      keywords:
        "connect connects proposal proposals bid bids cost calculator tool upwork",
      rows: [
        { label: "Total cost", value: formatMoney(connects.total, USD) },
        { label: "Cost per reply", value: formatMoney(costPerReply, USD) },
        {
          label: "Cost per interview",
          value: formatMoney(costPerInterview, USD),
        },
      ],
    },
    {
      key: "fiverr-fee",
      href: "/tools/fiverr-fee-calculator",
      title: "Fiverr Fee Calculator",
      meta: "Example: $100 order, PayPal",
      label: "Estimated withdrawn",
      figure: formatMoney(fiverr.received, USD),
      unit: "from $100",
      keywords:
        "fiverr fee fees seller gig order calculator tool withdraw paypal",
      rows: [
        { label: "Order total", value: formatMoney(fiverr.gross, USD) },
        {
          label: `Fiverr fee (${FIVERR_SELLER_FEE_PERCENT}%)`,
          value: minus(fiverr.fiverrFee),
        },
        {
          label: "Clears after",
          value: `${CLEARANCE_DAYS.standard} days`,
        },
      ],
    },
  ];

  assertExamples(examples);
  return examples;
}

export const TOOL_EXAMPLES = getToolExamples();
