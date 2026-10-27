import {
  USD_PKR,
  isDefaultUsdPkrRate,
  usdPkrAsOfLabel,
  usdPkrFieldError,
} from "@/lib/usdPkr";

export const CALCULATOR_CURRENCIES = [
  ["USD", "USD — US dollar ($)"],
  ["PKR", "PKR — Pakistani rupee (Rs)"],
  ["EUR", "EUR — Euro (€)"],
  ["GBP", "GBP — British pound (£)"],
  ["AED", "AED — UAE dirham"],
  ["CAD", "CAD — Canadian dollar ($)"],
  ["AUD", "AUD — Australian dollar ($)"],
  ["INR", "INR — Indian rupee (₹)"],
] as const;

function SourceLink() {
  return (
    <a
      className="fee-link"
      href={USD_PKR.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {USD_PKR.sourceName}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function RateSource({ rate }: { rate: string }) {
  const asOf = usdPkrAsOfLabel();
  if (isDefaultUsdPkrRate(rate)) {
    return (
      <>
        Rate: 1 USD = {USD_PKR.rate} PKR, <SourceLink />, as of {asOf}; edit if
        needed.
      </>
    );
  }
  const trimmed = rate.trim();
  if (!trimmed) {
    return (
      <>
        Default rate: 1 USD = {USD_PKR.rate} PKR, <SourceLink />, as of {asOf};
        edit if needed.
      </>
    );
  }
  return (
    <>
      Rate: 1 USD = {trimmed} PKR (your rate). Default: 1 USD = {USD_PKR.rate}{" "}
      PKR, <SourceLink />, as of {asOf}.
    </>
  );
}

export default function CalculatorCurrencyFields({
  id,
  currency,
  onCurrencyChange,
}: {
  id: string;
  currency: string;
  onCurrencyChange: (currency: string) => void;
}) {
  const pkr = currency === "PKR";
  const hintId = `${id}-hint`;

  return (
    <div>
      <label className="fee-label" htmlFor={id}>
        Currency
      </label>
      <div className="fee-field">
        <select
          className="fee-input"
          id={id}
          value={currency}
          aria-describedby={hintId}
          onChange={(event) => onCurrencyChange(event.target.value)}
        >
          {CALCULATOR_CURRENCIES.map(([code, label]) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="fee-svg-lg pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#475569]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p id={hintId} className="fee-hint">
        {pkr
          ? "Enter amounts in US dollars. Results are shown in Pakistani rupees."
          : "Changes the symbol and number format only. Choose PKR to convert US dollar amounts into rupees."}
      </p>
    </div>
  );
}

export function PkrRateField({
  id,
  currency,
  rate,
  rateError,
  onRateChange,
  onRateBlur,
}: {
  id: string;
  currency: string;
  rate: string;
  rateError?: string;
  onRateChange: (rate: string) => void;
  onRateBlur?: (rate: string) => void;
}) {
  if (currency !== "PKR") return null;
  const rateHintId = `${id}-hint`;
  const rateErrorId = `${id}-error`;

  return (
    <div className="max-w-xl">
      <label className="fee-label" htmlFor={id}>
        Exchange rate
      </label>
      <div className="fee-field">
        <span className="fee-affix fee-affix-l" aria-hidden="true">
          1 USD =
        </span>
        <input
          className="fee-input"
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          value={rate}
          aria-invalid={rateError ? true : undefined}
          aria-describedby={rateError ? `${rateErrorId} ${rateHintId}` : rateHintId}
          onChange={(event) => onRateChange(event.target.value)}
          onBlur={(event) => onRateBlur?.(event.target.value)}
        />
        <span className="fee-affix fee-affix-r" aria-hidden="true">
          PKR
        </span>
      </div>
      {rateError && (
        <p id={rateErrorId} className="fee-error">
          <span className="sr-only">Error: </span>
          {rateError}
        </p>
      )}
      <p id={rateHintId} className="fee-hint">
        <RateSource rate={rate} />
      </p>
    </div>
  );
}

export function PkrResultNote({
  currency,
  rate,
}: {
  currency: string;
  rate: string;
}) {
  if (currency !== "PKR") return null;
  const valid = usdPkrFieldError(rate) === "";
  return (
    <p className="mb-4 text-sm leading-relaxed text-[#475569]">
      {valid
        ? `Converted from US dollars at 1 USD = ${rate.trim()} PKR.`
        : "Enter an exchange rate above 0 to show rupee amounts."}
    </p>
  );
}
