export const DEFAULT_WEEKS = 48;
export const DAYS_PER_WEEK = 5;
export const PROJECT_HOURS = 10;

export type RatePeriod = "month" | "year";
export type BillMode = "hours" | "pct";

export type RateInput = {
  period: RatePeriod;
  billMode: BillMode;
  takeHome: number;
  expenses: number;
  workHours: number;
  weeks: number | null;
  billHours: number;
  billPct: number;
  fee: number;
};

export type RateResult = {
  period: RatePeriod;
  takeHome: number;
  expenses: number;
  net: number;
  feePct: number;
  weeks: number;
  billWeek: number;
  billPct: number | null;
  billMonth: number;
  gross: number;
  fees: number;
  hourly: number;
  day: number;
  projectHours: number;
  project: number;
};

export function computeRate(input: RateInput): { value: RateResult | null; reason: string | null } {
  const div = input.period === "year" ? 12 : 1;
  const takeHome = input.takeHome / div;
  const expenses = input.expenses / div;
  const weeks = input.weeks == null ? DEFAULT_WEEKS : input.weeks;
  const feePct = input.fee;
  const billWeek =
    input.billMode === "pct"
      ? input.workHours * input.billPct / 100
      : input.billHours;
  const billPct = input.workHours > 0 ? (billWeek / input.workHours) * 100 : null;

  if (feePct >= 100) {
    return { value: null, reason: "A 100% fee leaves nothing to take home. Enter a fee below 100%." };
  }
  if (!(billWeek > 0)) {
    return { value: null, reason: "Add at least 1 billable hour a week." };
  }
  if (!(weeks > 0)) {
    return { value: null, reason: "Add at least 1 working week a year." };
  }

  const net = takeHome + expenses;
  const billMonth = (billWeek * weeks) / 12;
  const gross = net / (1 - feePct / 100);
  const fees = gross - net;
  const hourly = gross / billMonth;

  return {
    value: {
      period: input.period,
      takeHome,
      expenses,
      net,
      feePct,
      weeks,
      billWeek,
      billPct,
      billMonth,
      gross,
      fees,
      hourly,
      day: hourly * (billWeek / DAYS_PER_WEEK),
      projectHours: PROJECT_HOURS,
      project: hourly * PROJECT_HOURS,
    },
    reason: null,
  };
}

export function ceilCents(amount: number): number {
  return Math.ceil(amount * 100 - 1e-6) / 100;
}
