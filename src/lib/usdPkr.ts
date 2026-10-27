import { currencySymbol, formatMoney, parseDecimal } from "@/lib/upworkFee";

/**
 * Default US dollar → Pakistani rupee rate for the calculators.
 *
 * Update `rate` and `asOf` together. `asOf` is the date the published rate
 * applies to (YYYY-MM-DD), not the day this file was edited.
 *
 * Source: State Bank of Pakistan, the “USD/PKR Rates” weighted average on
 * https://www.sbp.org.pk/ (not the bid printed beside it).
 * Read from that page on 27 October 2026: “As on 27-Oct-2026”,
 * weighted average 276.8022, bid 276.495.
 *
 * This is an interbank reference, not a bank-counter or Upwork payout rate.
 * The calculator field stays editable for that reason. It is not a placeholder.
 */
export const USD_PKR = {
  rate: "276.8022",
  sourceName: "State Bank of Pakistan",
  sourceUrl: "https://www.sbp.org.pk/",
  asOf: "2026-10-27",
} as const;

const AS_OF_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** “27 October 2026” for the date the default rate applies to. */
export function usdPkrAsOfLabel(iso: string = USD_PKR.asOf): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const date = new Date(
    Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  );
  return AS_OF_FORMAT.format(date);
}

export function usdPkrFieldError(raw: string): string {
  const value = parseDecimal(raw);
  if (value === null) return "Enter the exchange rate.";
  if (Number.isNaN(value)) return "Exchange rate must be a number, like 276.80.";
  if (value <= 0) return "Exchange rate must be more than 0.";
  return "";
}

/** Parsed PKR-per-USD rate, or null when the field is blank or not a positive number. */
export function usdPkrRateNumber(raw: string): number | null {
  if (usdPkrFieldError(raw)) return null;
  return parseDecimal(raw);
}

/**
 * Money inputs stay in US dollars when PKR is selected, because Upwork
 * amounts are entered in USD and only the results are converted.
 */
export function entrySymbol(currency: string): string {
  if (currency === "PKR") return "$";
  return currencySymbol(currency);
}

/** Display helper. Fee, Connects and rate maths stay in the entered units. */
export function formatConvertedMoney(
  amount: number,
  currency: string,
  rateRaw: string
): string {
  if (currency !== "PKR") return formatMoney(amount, currency);
  const rate = usdPkrRateNumber(rateRaw);
  if (rate == null) return "Rs —";
  return formatMoney(amount * rate, "PKR");
}

export function isDefaultUsdPkrRate(raw: string): boolean {
  const entered = usdPkrRateNumber(raw);
  const fallback = usdPkrRateNumber(USD_PKR.rate);
  return entered != null && fallback != null && entered === fallback;
}
