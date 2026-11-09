import { formatMoney, parseDecimal } from "@/lib/upworkFee";

export const INVOICE_CURRENCIES = [
  { id: "USD", label: "USD $" },
  { id: "PKR", label: "PKR Rs" },
  { id: "EUR", label: "EUR €" },
  { id: "GBP", label: "GBP £" },
  { id: "AED", label: "AED د.إ" },
  { id: "INR", label: "INR ₹" },
] as const;

export type InvoiceCurrency = (typeof INVOICE_CURRENCIES)[number]["id"];

export type InvoiceLine = {
  id: string;
  description: string;
  qty: string;
  rate: string;
};

export type InvoiceDraft = {
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  taxId: string;
  clientName: string;
  clientAddress: string;
  number: string;
  issueDate: string;
  dueDate: string;
  currency: InvoiceCurrency;
  taxPercent: string;
  discount: string;
  notes: string;
  paymentDetails: string;
  lines: InvoiceLine[];
  pkrRate: string;
  showPkrLine: boolean;
};

export type InvoiceTotals = {
  subtotal: number;
  discount: number;
  taxable: number;
  tax: number;
  total: number;
  pkrTotal: number | null;
};

export function isoDay(offsetDays = 0): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

export function nextLineId(): string {
  return `line-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function emptyLine(): InvoiceLine {
  return { id: nextLineId(), description: "", qty: "1", rate: "" };
}

export function defaultDraft(): InvoiceDraft {
  return {
    fromName: "",
    fromEmail: "",
    fromAddress: "",
    taxId: "",
    clientName: "",
    clientAddress: "",
    number: "INV-0001",
    issueDate: isoDay(0),
    dueDate: isoDay(14),
    currency: "USD",
    taxPercent: "0",
    discount: "0",
    notes: "",
    paymentDetails: "",
    lines: [emptyLine()],
    pkrRate: "",
    showPkrLine: false,
  };
}

export function lineAmount(line: InvoiceLine): number {
  const qty = parseDecimal(line.qty);
  const rate = parseDecimal(line.rate);
  if (qty === null || rate === null || Number.isNaN(qty) || Number.isNaN(rate)) {
    return 0;
  }
  return Math.max(0, qty) * Math.max(0, rate);
}

export function computeInvoice(draft: InvoiceDraft): InvoiceTotals {
  const subtotal = draft.lines.reduce((sum, line) => sum + lineAmount(line), 0);
  const discountRaw = parseDecimal(draft.discount);
  const discount =
    discountRaw === null || Number.isNaN(discountRaw)
      ? 0
      : Math.min(Math.max(0, discountRaw), subtotal);
  const taxable = subtotal - discount;
  const taxRaw = parseDecimal(draft.taxPercent);
  const taxRate =
    taxRaw === null || Number.isNaN(taxRaw) ? 0 : Math.min(Math.max(0, taxRaw), 100);
  const tax = (taxable * taxRate) / 100;
  const total = taxable + tax;
  const rate = parseDecimal(draft.pkrRate);
  const pkrTotal =
    draft.showPkrLine &&
    draft.currency === "USD" &&
    rate !== null &&
    !Number.isNaN(rate) &&
    rate > 0
      ? total * rate
      : null;
  return { subtotal, discount, taxable, tax, total, pkrTotal };
}

export function formatInvoiceDay(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(
    new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))),
  );
}

export function money(amount: number, currency: string): string {
  return formatMoney(amount, currency);
}
