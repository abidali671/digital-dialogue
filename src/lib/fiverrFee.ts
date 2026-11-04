/**
 * Fiverr seller-side figures, checked on Fiverr's help pages on 1 November 2026.
 *
 * - Seller fee: the freelancer receives 80% of the client's cleared payment,
 *   including Gig extras and tips ("How Fiverr works for freelancers").
 * - Clearance: 14 days after the order is completed, or 7 days for Seller Plus,
 *   Top Rated and Pro Talent freelancers ("A freelancer's guide to the Fiverr
 *   order process").
 * - Payout methods ("Withdrawing your earnings & managing payout methods" and
 *   "Setting up Payoneer as a payout method"). The two pages disagree on bank
 *   transfer via Payoneer: $1 on the withdrawal page, $3 for local currency
 *   and $1 for a USD wire on the Payoneer page. The presets follow the
 *   Payoneer page, and the fee field stays editable.
 */
export const FIVERR_SELLER_FEE_PERCENT = 20;

export const CLEARANCE_DAYS = { standard: 14, fast: 7 } as const;
export type ClearanceTier = keyof typeof CLEARANCE_DAYS;

export type PayoutMethodId = "paypal" | "payoneer" | "bank-local" | "bank-usd" | "custom";

export type PayoutMethod = {
  id: PayoutMethodId;
  label: string;
  fee: number | null;
  minimum: number | null;
  time: string;
};

export const PAYOUT_METHODS: PayoutMethod[] = [
  { id: "paypal", label: "PayPal", fee: 0, minimum: 1, time: "up to 24 hours" },
  { id: "payoneer", label: "Payoneer account", fee: 3, minimum: 10, time: "up to 2 business days" },
  {
    id: "bank-local",
    label: "Bank transfer via Payoneer (local currency)",
    fee: 3,
    minimum: 20,
    time: "1 to 3 business days",
  },
  {
    id: "bank-usd",
    label: "Bank transfer via Payoneer (USD wire)",
    fee: 1,
    minimum: 20,
    time: "5 to 7 business days",
  },
  { id: "custom", label: "Other (enter the fee)", fee: null, minimum: null, time: "" },
];

export function payoutMethod(id: string): PayoutMethod {
  return PAYOUT_METHODS.find((method) => method.id === id) ?? PAYOUT_METHODS[0];
}

export type FiverrFeeInput = {
  price: number;
  extras: number;
  tip: number;
  payoutFee: number;
};

export type FiverrFeeResult = {
  gross: number;
  fiverrFee: number;
  earnings: number;
  payoutFee: number;
  received: number;
  effective: number;
};

/**
 * gross = Gig price + extras + tip
 * Fiverr fee = gross × 20%
 * earnings = gross − Fiverr fee
 * received = earnings − one withdrawal fee (never below 0)
 */
export function computeFiverrFee(input: FiverrFeeInput): FiverrFeeResult {
  const gross = input.price + input.extras + input.tip;
  const fiverrFee = (gross * FIVERR_SELLER_FEE_PERCENT) / 100;
  const earnings = gross - fiverrFee;
  const payoutFee = Math.min(input.payoutFee, earnings);
  const received = earnings - payoutFee;

  return {
    gross,
    fiverrFee,
    earnings,
    payoutFee,
    received,
    effective: gross > 0 ? ((gross - received) / gross) * 100 : 0,
  };
}

/** Parses a YYYY-MM-DD date input as a calendar day, with no time-zone shift. */
export function parseIsoDay(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

const DAY_FORMAT = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDay(date: Date): string {
  return DAY_FORMAT.format(date);
}
