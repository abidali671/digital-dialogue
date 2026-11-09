import { formatMoney, parseDecimal } from "@/lib/upworkFee";

export const INVOICE_CURRENCIES = [
  { id: "USD", label: "USD $" },
  { id: "PKR", label: "PKR Rs" },
  { id: "AED", label: "AED د.إ" },
  { id: "AUD", label: "AUD $" },
  { id: "BDT", label: "BDT ৳" },
  { id: "BRL", label: "BRL R$" },
  { id: "CAD", label: "CAD $" },
  { id: "CHF", label: "CHF Fr" },
  { id: "CNY", label: "CNY ¥" },
  { id: "DKK", label: "DKK kr" },
  { id: "EUR", label: "EUR €" },
  { id: "GBP", label: "GBP £" },
  { id: "HKD", label: "HKD $" },
  { id: "IDR", label: "IDR Rp" },
  { id: "INR", label: "INR ₹" },
  { id: "JPY", label: "JPY ¥" },
  { id: "KRW", label: "KRW ₩" },
  { id: "MXN", label: "MXN $" },
  { id: "MYR", label: "MYR RM" },
  { id: "NOK", label: "NOK kr" },
  { id: "NZD", label: "NZD $" },
  { id: "PHP", label: "PHP ₱" },
  { id: "PLN", label: "PLN zł" },
  { id: "QAR", label: "QAR ر.ق" },
  { id: "SAR", label: "SAR ر.س" },
  { id: "SEK", label: "SEK kr" },
  { id: "SGD", label: "SGD $" },
  { id: "THB", label: "THB ฿" },
  { id: "TRY", label: "TRY ₺" },
  { id: "ZAR", label: "ZAR R" },
] as const;

export type InvoiceCurrency = (typeof INVOICE_CURRENCIES)[number]["id"];

export const INVOICE_TEMPLATES = [
  { id: "minimalist", label: "Minimalist", hint: "Clean and quiet" },
  { id: "modern", label: "Modern", hint: "Bold header, airy" },
  { id: "corporate", label: "Corporate", hint: "Formal, detailed" },
  { id: "classic", label: "Classic", hint: "Teal kicker" },
  { id: "boutique", label: "Boutique", hint: "Serif, airy" },
  { id: "midnight", label: "Midnight", hint: "Navy header" },
  { id: "ledger", label: "Ledger", hint: "Ruled, green" },
  { id: "mono", label: "Mono", hint: "Typewriter" },
  { id: "gold", label: "Gold", hint: "Warm accent" },
] as const;

export type InvoiceTemplate = (typeof INVOICE_TEMPLATES)[number]["id"];

const LEGACY_TEMPLATES: Record<string, InvoiceTemplate> = {
  bold: "modern",
  slate: "corporate",
  band: "boutique",
  minimal: "minimalist",
};

export function isInvoiceTemplate(value: unknown): value is InvoiceTemplate {
  return parseInvoiceTemplate(value) !== undefined;
}

export function parseInvoiceTemplate(value: unknown): InvoiceTemplate | undefined {
  if (typeof value !== "string") return undefined;
  if (INVOICE_TEMPLATES.some((item) => item.id === value)) {
    return value as InvoiceTemplate;
  }
  return LEGACY_TEMPLATES[value];
}

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
  template: InvoiceTemplate;
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

export function emptyLine(id = nextLineId()): InvoiceLine {
  return { id, description: "", qty: "1", rate: "" };
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
    template: "minimalist",
    taxPercent: "0",
    discount: "0",
    notes: "",
    paymentDetails: "",
    lines: [emptyLine("line-1")],
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
