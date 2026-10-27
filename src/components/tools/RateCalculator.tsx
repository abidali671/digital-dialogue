"use client";

import { FormEvent, useId, useRef, useState, type ReactNode, type Ref } from "react";
import Link from "next/link";
import CalculatorCurrencyFields, { PkrRateField, PkrResultNote } from "@/components/tools/CalculatorCurrencyFields";
import { ceilCents, computeRate, type BillMode, type RatePeriod, type RateResult } from "@/lib/freelanceRate";
import { formatNum, formatPercent, parseDecimal } from "@/lib/upworkFee";
import { USD_PKR, entrySymbol, formatConvertedMoney, usdPkrFieldError } from "@/lib/usdPkr";

const FEE_HELP = "https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee";

function feeCalculatorQuery(
  hourly: number,
  result: RateResult,
  currency: string,
  usdPkr: string
) {
  const params = new URLSearchParams({
    rate: hourly.toFixed(2),
    hours: result.billMonth.toFixed(2),
    fee: String(result.feePct),
    currency,
  });
  if (currency === "PKR") params.set("usdPkr", usdPkr.trim());
  return params.toString();
}

type Values = {
  period: RatePeriod;
  billMode: BillMode;
  takeHome: string;
  expenses: string;
  workHours: string;
  weeks: string;
  billHours: string;
  billPct: string;
  fee: string;
  currency: string;
  usdPkr: string;
};

const INITIAL: Values = {
  period: "month",
  billMode: "hours",
  takeHome: "",
  expenses: "",
  workHours: "",
  weeks: "",
  billHours: "",
  billPct: "",
  fee: "10",
  currency: "USD",
  usdPkr: USD_PKR.rate,
};

type Errors = Partial<Record<"takeHome" | "expenses" | "workHours" | "weeks" | "billHours" | "billPct" | "fee", string>>;

export default function RateCalculator() {
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState<{ id: string; msg: string }[]>([]);
  const [result, setResult] = useState<RateResult | null>(null);
  const [warning, setWarning] = useState("");
  const formId = useId();
  const [rateError, setRateError] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);
  const symbol = entrySymbol(values.currency);

  function setField<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function collect(current: Values) {
    const found: { id: string; msg: string; key: keyof Errors }[] = [];
    const push = (key: keyof Errors, msg: string) => {
      if (msg) found.push({ id: `${formId}-${key}`, msg, key });
    };
    const take = parseDecimal(current.takeHome);
    if (take === null) push("takeHome", "Enter take-home goal.");
    else if (Number.isNaN(take)) push("takeHome", "Take-home goal must be a number, like 1500 or 1500.50.");
    else if (take <= 0) push("takeHome", "Take-home goal must be more than 0.");

    const expenses = parseDecimal(current.expenses);
    if (expenses !== null && Number.isNaN(expenses)) push("expenses", "Business expenses must be a number, like 200 or 12.5.");
    else if (expenses !== null && expenses < 0) push("expenses", "Business expenses can’t be negative.");

    const work = parseDecimal(current.workHours);
    if (work === null) push("workHours", "Enter working hours.");
    else if (Number.isNaN(work)) push("workHours", "Working hours must be a number, like 40.");
    else if (work <= 0) push("workHours", "Working hours must be more than 0.");
    else if (work > 168) push("workHours", "Working hours can’t be more than 168 a week.");

    if (current.weeks.trim()) {
      const weeks = parseDecimal(current.weeks);
      if (weeks === null || Number.isNaN(weeks) || weeks < 1 || weeks > 52) {
        push("weeks", "Working weeks must be between 1 and 52.");
      }
    }

    if (current.billMode === "hours") {
      const hours = parseDecimal(current.billHours);
      if (hours === null) push("billHours", "Enter your billable hours per week.");
      else if (Number.isNaN(hours)) push("billHours", "Billable hours must be a number, like 25.");
      else if (hours <= 0) push("billHours", "Enter at least 1 billable hour.");
      else if (work !== null && !Number.isNaN(work) && work > 0 && hours > work) {
        push("billHours", `Billable hours can’t be more than the ${formatNum(work, 0)} hours you work.`);
      }
    } else {
      const pct = parseDecimal(current.billPct);
      if (pct === null) push("billPct", "Enter billable share.");
      else if (Number.isNaN(pct)) push("billPct", "Billable share must be a number, like 60.");
      else if (pct <= 0 || pct > 100) push("billPct", "Billable share must be between 1% and 100%.");
    }

    const fee = parseDecimal(current.fee);
    if (fee === null) push("fee", "Enter fees.");
    else if (Number.isNaN(fee)) push("fee", "Fees must be a number, like 10 or 12.5.");
    else if (fee < 0) push("fee", "Fees can’t be negative.");
    else if (fee >= 100) push("fee", "Fees must be less than 100%. A 100% fee leaves nothing to take home.");

    return found;
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const found = collect(values);
    const next: Errors = {};
    for (const item of found) next[item.key] = item.msg;
    const fxMsg = values.currency === "PKR" ? usdPkrFieldError(values.usdPkr) : "";
    setRateError(fxMsg);
    setErrors(next);
    setSummary([
      ...found.map(({ id, msg }) => ({ id, msg })),
      ...(fxMsg ? [{ id: `${formId}-currency-usd-pkr`, msg: fxMsg }] : []),
    ]);
    if (found.length || fxMsg) {
      setResult(null);
      summaryRef.current?.focus();
      return;
    }
    const computed = computeRate({
      period: values.period,
      billMode: values.billMode,
      takeHome: parseDecimal(values.takeHome) || 0,
      expenses: parseDecimal(values.expenses) || 0,
      workHours: parseDecimal(values.workHours) || 0,
      weeks: values.weeks.trim() ? parseDecimal(values.weeks) : null,
      billHours: parseDecimal(values.billHours) || 0,
      billPct: parseDecimal(values.billPct) || 0,
      fee: parseDecimal(values.fee) || 0,
    });
    setResult(computed.value);
    const fee = parseDecimal(values.fee) || 0;
    setWarning(fee > 15 && fee < 100 ? "That’s above Upwork’s usual 0–15% service fee. Fine if it includes payment costs; just double-check." : "");
  }

  function onReset() {
    setValues(INITIAL);
    setErrors({});
    setSummary([]);
    setResult(null);
    setWarning("");
    setRateError("");
    firstRef.current?.focus();
  }

  const money = (amount: number) => formatConvertedMoney(amount, values.currency, values.usdPkr);
  const rate = result ? ceilCents(result.hourly) : 0;
  const goal = result && values.period === "year" ? parseDecimal(values.takeHome) || 0 : result?.takeHome || 0;

  return (
    <section id="calculator" aria-labelledby="calc-title" className="py-10 md:py-14">
      <div className="mx-auto grid w-full max-w-7xl items-start gap-6 px-5 sm:px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
        <div className="fee-card p-5 sm:p-8">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="calc-title">Your goals and hours</h2>
            <p className="text-sm text-[#475569]"><span aria-hidden="true">*</span> Required</p>
          </div>
          <div ref={summaryRef} className="mb-6 rounded-lg border-2 border-[#b91c1c] bg-[#fef2f2] p-4 sm:p-5" tabIndex={-1} role="alert" hidden={summary.length === 0}>
            <h3 className="font-body text-base font-bold tracking-normal text-[#b91c1c]">
              {summary.length === 1 ? "There is 1 problem to fix" : `There are ${summary.length} problems to fix`}
            </h3>
            <ul className="fee-error-list mt-2 space-y-1 text-[15px]">
              {summary.map((item) => (
                <li key={item.id}>
                  <a className="fee-link" href={`#${item.id}`} onClick={(event) => { event.preventDefault(); document.getElementById(item.id)?.focus(); }}>
                    {item.msg}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <form className="flex flex-col gap-6" noValidate onSubmit={onSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <fieldset>
                <legend className="fee-label">Goal period <span aria-hidden="true">*</span></legend>
                <div className="fee-segmented">
                  {(["month", "year"] as const).map((period) => (
                    <label key={period}>
                      <input type="radio" name="period" value={period} checked={values.period === period} onChange={() => setField("period", period)} />
                      <span className="fee-dot" aria-hidden="true" />
                      {period === "month" ? "Monthly" : "Yearly"}
                    </label>
                  ))}
                </div>
              </fieldset>
              <CalculatorCurrencyFields
                id={`${formId}-currency`}
                currency={values.currency}
                onCurrencyChange={(currency) => {
                  setField("currency", currency);
                  if (currency !== "PKR") setRateError("");
                }}
              />
            </div>
            <PkrRateField
              id={`${formId}-currency-usd-pkr`}
              currency={values.currency}
              rate={values.usdPkr}
              rateError={rateError}
              onRateChange={(usdPkr) => {
                setField("usdPkr", usdPkr);
                if (rateError) setRateError(usdPkrFieldError(usdPkr));
              }}
              onRateBlur={(usdPkr) => {
                if (usdPkr.trim() === "" && !rateError) return;
                setRateError(values.currency === "PKR" ? usdPkrFieldError(usdPkr) : "");
              }}
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id={`${formId}-takeHome`} inputRef={firstRef} label="Take-home goal" required symbol={symbol} value={values.takeHome} placeholder="e.g. 1500" hint={`What you want left each ${values.period}, before tax.`} error={errors.takeHome} onChange={(value) => setField("takeHome", value)} />
              <Field id={`${formId}-expenses`} label="Business expenses" symbol={symbol} value={values.expenses} placeholder="0.00" hint={`Software, ads and other costs each ${values.period}. Optional.`} error={errors.expenses} onChange={(value) => setField("expenses", value)} />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id={`${formId}-workHours`} label="Working hours" required value={values.workHours} placeholder="e.g. 40" hint="Hours you spend on the business each week, paid or not." error={errors.workHours} onChange={(value) => setField("workHours", value)} />
              <Field id={`${formId}-weeks`} label="Working weeks" value={values.weeks} placeholder="48" hint="Weeks you work in a year. Leave blank to use 48." error={errors.weeks} onChange={(value) => setField("weeks", value)} />
            </div>
            <fieldset>
              <legend className="fee-label">Billable time <span aria-hidden="true">*</span></legend>
              <div className="fee-segmented mb-4 max-w-md">
                {(["hours", "pct"] as const).map((mode) => (
                  <label key={mode}>
                    <input type="radio" name="billMode" value={mode} checked={values.billMode === mode} onChange={() => setField("billMode", mode)} />
                    <span className="fee-dot" aria-hidden="true" />
                    {mode === "hours" ? "Hours" : "Percent"}
                  </label>
                ))}
              </div>
              {values.billMode === "hours" ? (
                <Field id={`${formId}-billHours`} label="Billable hours" required value={values.billHours} placeholder="e.g. 25" hint="Hours a client pays for each week." error={errors.billHours} onChange={(value) => setField("billHours", value)} />
              ) : (
                <Field id={`${formId}-billPct`} label="Billable share" required suffix="%" value={values.billPct} placeholder="e.g. 60" hint="Share of working hours that clients pay for." error={errors.billPct} onChange={(value) => setField("billPct", value)} />
              )}
            </fieldset>
            <Field id={`${formId}-fee`} label="Fees" required suffix="%" value={values.fee} placeholder="10" hint={<>Platform and payment fees taken from what you bill. Default 10%. <a className="fee-link" href={FEE_HELP} target="_blank" rel="noopener noreferrer">Upwork Help<span className="sr-only"> (opens Upwork Help in a new tab)</span></a></>} error={errors.fee} onChange={(value) => setField("fee", value)} />
            {warning && <p className="rounded-lg border border-[#d97706]/50 bg-[#fffbeb] px-3 py-2.5 text-sm font-semibold text-[#92400e]">{warning}</p>}
            <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
              <button type="button" className="fee-btn fee-btn-secondary w-full sm:w-auto" onClick={onReset}>Reset</button>
              <button type="submit" className="fee-btn fee-btn-primary w-full sm:ml-auto sm:w-auto sm:min-w-48">Calculate my rate</button>
            </div>
          </form>
        </div>
        <section id="rate-results" aria-labelledby="results-title" className="fee-card scroll-mt-24 p-5 sm:p-8 lg:sticky lg:top-24">
          <h2 id="results-title" className="mb-5">Your rate</h2>
          {!result && (
            <div className="rounded-lg border border-dashed border-[#cbd5e1] bg-mist/60 px-5 py-8 text-center">
              <p className="font-semibold text-ink">No rate yet</p>
              <p className="mt-1 text-[15px] text-[#475569]">Enter your goal and hours, then select <strong className="font-semibold text-ink">Calculate my rate</strong>.</p>
            </div>
          )}
          {result && (
            <div>
              <PkrResultNote currency={values.currency} rate={values.usdPkr} />
              <div className="rounded-xl border border-accent/40 bg-[#f0fdfa] p-5">
                <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#134e4a]">Minimum hourly rate</p>
                <p className="fee-display mt-1 font-display text-[2.5rem] font-bold leading-[1.1] text-ink tabular-nums">{money(rate)}<span className="text-2xl">/hr</span></p>
                <p className="mt-2 text-sm text-[#475569]">To take home {money(goal)} a {values.period}, billing {formatNum(result.billWeek, 1)} hours a week ({formatPercent(result.billPct || 0, 1)} of your time).</p>
              </div>
              <dl className="mt-5 divide-y divide-line text-[15px]">
                <Row label="Day rate" detail={`${formatNum(result.billWeek / 5, 1)} billable hrs a day × 5 days`} value={money(result.day)} />
                <Row label="10-hour project" value={money(result.project)} />
                <Row label="Monthly take-home" value={money(result.takeHome)} />
                <Row label="Monthly expenses" value={money(result.expenses)} />
                <Row label={`Fees (${formatPercent(result.feePct)})`} value={money(result.fees)} />
                <Row label="Gross to bill each month" value={money(result.gross)} strong />
                <Row label="Billable hours a month" detail={`${formatNum(result.billWeek, 1)} hrs/wk × ${formatNum(result.weeks, 0)} weeks ÷ 12`} value={`${formatNum(result.billMonth, 1)} hrs`} />
              </dl>
              <p className="mt-4 text-sm text-[#475569]">
                Check this rate in the{" "}
                <Link className="fee-link" href={`/tools/upwork-fee-calculator?${feeCalculatorQuery(rate, result, values.currency, values.usdPkr)}`}>
                  Upwork Fee Calculator
                </Link>
                .
              </p>
            </div>
          )}
          <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-[#475569]">Estimates only. Tax is not included. PKR converts US dollar amounts into rupees. Other currencies only change the symbol.</p>
        </section>
      </div>
    </section>
  );
}

function Row({ label, detail, value, strong }: { label: string; detail?: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-[#334155]">{label}{detail && <span className="block text-sm text-[#475569]">{detail}</span>}</dt>
      <dd className={`${strong ? "font-bold" : "font-semibold"} text-ink tabular-nums`}>{value}</dd>
    </div>
  );
}

function Field({ id, label, required, symbol, suffix, value, placeholder, hint, error, onChange, inputRef }: { id: string; label: string; required?: boolean; symbol?: string; suffix?: string; value: string; placeholder: string; hint: ReactNode; error?: string; onChange: (value: string) => void; inputRef?: Ref<HTMLInputElement> }) {
  return (
    <div>
      <label className="fee-label" htmlFor={id}>{label} {required && <span aria-hidden="true">*</span>}</label>
      <div className="fee-field">
        {symbol && <span className="fee-affix fee-affix-l" aria-hidden="true">{symbol}</span>}
        <input ref={inputRef} className="fee-input" id={id} type="text" inputMode="decimal" autoComplete="off" spellCheck={false} placeholder={placeholder} value={value} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error ${id}-hint` : `${id}-hint`} onChange={(event) => onChange(event.target.value)} />
        {suffix && <span className="fee-affix fee-affix-r" aria-hidden="true">{suffix}</span>}
      </div>
      {error && <p id={`${id}-error`} className="fee-error"><span className="sr-only">Error: </span>{error}</p>}
      <p id={`${id}-hint`} className="fee-hint">{hint}</p>
    </div>
  );
}
