import type { ReactNode } from "react";
import Link from "next/link";
import { CALCULATOR_CURRENCIES } from "@/components/tools/CalculatorCurrencyFields";
import type { HomeToolTeaser } from "@/lib/homeTools";

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

type TeaserProps = { variant: "teaser"; tool: HomeToolTeaser };

type ResultProps = {
  variant?: "result";
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
};

function ToolTeaserCard({ tool }: { tool: HomeToolTeaser }) {
  return (
    <article className="home-tcard group">
      <h3 className="text-[18px] font-semibold leading-snug text-ink md:text-[20px]">
        {tool.title}
      </h3>
      <p className="home-mute mt-1 text-[16px] leading-snug xl:min-h-[2.75rem]">
        {tool.example}
      </p>
      <p className="home-body mt-4 text-[16px] font-semibold">{tool.figureLabel}</p>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-[30px] font-semibold leading-none tracking-tight text-ink tabular-nums md:text-[36px]">
          {tool.figure}
        </span>
        <span className="home-mute text-[16px]">{tool.figureHint}</span>
      </p>
      <dl className="mb-5 mt-4 space-y-1.5 border-t border-line pt-3 text-[16px]">
        {tool.rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-3">
            <dt className="home-body">{row.label}</dt>
            <dd className="text-right font-semibold tabular-nums text-ink">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      <Link
        href={tool.href}
        className="home-btn-secondary relative z-[1] mt-auto w-full px-4 group-hover:bg-[#f0fdfa]"
      >
        Open calculator
        <span className="sr-only">: {tool.title}</span>
      </Link>
    </article>
  );
}

export function ToolResultCard(props: TeaserProps | ResultProps) {
  if (props.variant === "teaser") {
    return <ToolTeaserCard tool={props.tool} />;
  }

  const {
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
  } = props;

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
