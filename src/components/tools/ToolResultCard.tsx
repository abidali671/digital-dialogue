import type { ReactNode } from "react";
import { CALCULATOR_CURRENCIES } from "@/components/tools/CalculatorCurrencyFields";

const CURRENCY_LABELS: Record<string, string> = {
  USD: "USD ($)",
  PKR: "PKR (Rs)",
  EUR: "EUR (€)",
  GBP: "GBP (£)",
  AED: "AED",
  CAD: "CAD ($)",
  AUD: "AUD ($)",
  INR: "INR (₹)",
};

export type ResultRow = {
  label: ReactNode;
  value: string;
  keep?: boolean;
};

export function Swatch({ color, ring }: { color: string; ring?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="fee-swatch"
      style={{
        background: color,
        boxShadow: ring ? "0 0 0 1px rgb(217 119 6 / 0.4)" : undefined,
      }}
    />
  );
}

export function ToolResultCard({
  currencyId,
  currency,
  onCurrencyChange,
  kicker,
  beforeFigure,
  figure,
  unit,
  afterFigure,
  sentence,
  bar,
  legend,
  rows,
  extra,
  fine,
  onReset,
  announcement,
}: {
  currencyId: string;
  currency: string;
  onCurrencyChange: (currency: string) => void;
  kicker: ReactNode;
  beforeFigure?: ReactNode;
  figure: string;
  unit?: string;
  afterFigure?: ReactNode;
  sentence: ReactNode;
  bar?: { color: string; width: number }[];
  legend?: ReactNode;
  rows: ResultRow[];
  extra?: ReactNode;
  fine: string;
  onReset: () => void;
  announcement: string;
}) {
  return (
    <>
      <div className="fee-result">
        <div id="result" tabIndex={-1}>
          <div className="fee-result-head">
            <h3 className="fee-result-kicker">{kicker}</h3>
            <label className="sr-only" htmlFor={currencyId}>
              Currency
            </label>
            <select
              id={currencyId}
              value={currency}
              onChange={(event) => onCurrencyChange(event.target.value)}
            >
              {CALCULATOR_CURRENCIES.map(([code]) => (
                <option key={code} value={code}>
                  {CURRENCY_LABELS[code] || code}
                </option>
              ))}
            </select>
          </div>
          {beforeFigure}
          <p className="fee-figure-row">
            <span className="fee-take font-display">{figure}</span>
            {unit ? <span className="fee-unit">{unit}</span> : null}
          </p>
          {afterFigure}
          {sentence}
          {bar && bar.length > 0 && (
            <div className="fee-hero-bar" aria-hidden="true">
              {bar.map((segment) => (
                <span
                  key={segment.color}
                  style={{ width: `${segment.width}%`, background: segment.color }}
                />
              ))}
            </div>
          )}
          {legend}
          <dl className="fee-block">
            {rows.map((row, index) => (
              <div key={index} className={row.keep ? "fee-split fee-split-keep" : "fee-split"}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
          {extra}
          <div className="fee-result-foot">
            <p className="fee-fine">{fine}</p>
            <button type="button" className="fee-link shrink-0 bg-transparent" onClick={onReset}>
              Reset to example
            </button>
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </>
  );
}
