export type ContractType = "hourly" | "fixed";

export type FeeInput = {
  type: ContractType;
  rate: number;
  hours: number;
  amount: number;
  feePercent: number;
  extraFlat: number;
  extraPercent: number;
};

export type FeeResult = {
  gross: number;
  feePercent: number;
  serviceFee: number;
  afterFee: number;
  extra: number;
  extraRaw: number;
  capped: boolean;
  takeHome: number;
  effective: number;
  flat: number;
  extraPercent: number;
};

/**
 * gross = hourly rate × hours, or the fixed contract amount
 * service fee = gross × fee%
 * extra costs apply to the amount after the fee, and cannot exceed it
 */
export function computeFee(input: FeeInput): FeeResult {
  const gross =
    input.type === "hourly" ? input.rate * input.hours : input.amount;
  const serviceFee = (gross * input.feePercent) / 100;
  const afterFee = gross - serviceFee;
  const extraRaw = input.extraFlat + (afterFee * input.extraPercent) / 100;
  const extra = Math.min(extraRaw, afterFee);
  const takeHome = afterFee - extra;

  return {
    gross,
    feePercent: input.feePercent,
    serviceFee,
    afterFee,
    extra,
    extraRaw,
    capped: extraRaw > afterFee,
    takeHome,
    effective: gross > 0 ? ((gross - takeHome) / gross) * 100 : 0,
    flat: input.extraFlat,
    extraPercent: input.extraPercent,
  };
}

export function parseDecimal(value: string): number | null {
  const trimmed = value.trim().replace(/,/g, "");
  if (trimmed === "") return null;
  if (!/^-?\d*\.?\d+$/.test(trimmed) && !/^-?\d+\.$/.test(trimmed)) {
    return Number.NaN;
  }
  return Number.parseFloat(trimmed);
}

export type FieldRule = {
  label: string;
  required: boolean;
  gt0?: boolean;
  max?: number;
  unit?: "%";
};

export const FIELD_RULES: Record<string, FieldRule> = {
  rate: { label: "Hourly rate", required: true, gt0: true },
  hours: { label: "Hours worked", required: true, gt0: true, max: 10000 },
  amount: { label: "Contract amount", required: true, gt0: true },
  fee: { label: "Service fee", required: true, max: 100, unit: "%" },
  extraFlat: { label: "Flat additional cost", required: false },
  extraPct: {
    label: "Percentage additional cost",
    required: false,
    max: 100,
    unit: "%",
  },
};

export function fieldError(rule: FieldRule, raw: string): string {
  const value = parseDecimal(raw);
  if (value === null) {
    return rule.required ? `Enter ${rule.label.toLowerCase()}.` : "";
  }
  if (Number.isNaN(value)) {
    return `${rule.label} must be a number, like 1250 or 12.5.`;
  }
  if (value < 0) return `${rule.label} can’t be negative.`;
  if (rule.gt0 && value === 0) return `${rule.label} must be more than 0.`;
  if (rule.max !== undefined && value > rule.max) {
    return rule.unit === "%"
      ? `${rule.label} must be between 0% and ${rule.max}%.`
      : `${rule.label} must be ${rule.max.toLocaleString("en-US")} or less.`;
  }
  return "";
}

const NUMBER = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function currencySymbol(currency: string): string {
  if (currency === "PKR") return "Rs";
  const part = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  })
    .formatToParts(0)
    .find((item) => item.type === "currency");
  return part?.value || currency;
}

export function formatMoney(amount: number, currency: string): string {
  if (currency === "PKR") return `Rs ${NUMBER.format(amount)}`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercent(amount: number, maxDigits = 2): string {
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: maxDigits }).format(amount)}%`;
}

export function formatNum(amount: number, maxDigits = 2): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: maxDigits }).format(amount);
}

export function roundPercent(amount: number, places: number): number {
  const factor = 10 ** places;
  return Math.round(amount * factor) / factor;
}
