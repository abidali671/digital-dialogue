"use client";

import { FormEvent, useId, useRef, useState, type ReactNode, type Ref } from "react";
import CalculatorCurrencyFields, { PkrRateField, PkrResultNote } from "@/components/tools/CalculatorCurrencyFields";
import { computeConnects, type ConnectsResult, type Ratio } from "@/lib/upworkConnects";
import { formatNum, formatPercent, parseDecimal } from "@/lib/upworkFee";
import { USD_PKR, entrySymbol, formatConvertedMoney, usdPkrFieldError } from "@/lib/usdPkr";

const CONNECTS_HELP = "https://support.upwork.com/hc/en-us/articles/211062898-Understanding-and-using-Connects";

type Values = {
  cost: string;
  cpp: string;
  proposals: string;
  replies: string;
  interviews: string;
  contracts: string;
  other: string;
  currency: string;
  usdPkr: string;
};

const INITIAL: Values = {
  cost: "",
  cpp: "",
  proposals: "",
  replies: "",
  interviews: "",
  contracts: "",
  other: "",
  currency: "USD",
  usdPkr: USD_PKR.rate,
};

type Key = "cost" | "cpp" | "proposals" | "replies" | "interviews" | "contracts" | "other";
type Errors = Partial<Record<Key, string>>;

export default function ConnectsCalculator() {
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState<{ id: string; msg: string }[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [result, setResult] = useState<ConnectsResult | null>(null);
  const formId = useId();
  const [rateError, setRateError] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);
  const symbol = entrySymbol(values.currency);

  function collect(current: Values) {
    const found: { id: string; msg: string; key: Key }[] = [];
    const push = (key: Key, msg: string) => {
      if (msg) found.push({ id: `${formId}-${key}`, msg, key });
    };
    const cost = parseDecimal(current.cost);
    if (cost === null) push("cost", "Enter what you pay per Connect. We don’t assume a price.");
    else if (Number.isNaN(cost)) push("cost", "Price per Connect must be a number, like 0.15.");
    else if (cost <= 0) push("cost", "Price per Connect must be more than 0.");

    const cpp = parseDecimal(current.cpp);
    if (cpp === null) push("cpp", "Enter Connects per proposal.");
    else if (Number.isNaN(cpp) || !Number.isInteger(cpp)) push("cpp", "Connects per proposal must be a whole number.");
    else if (cpp <= 0) push("cpp", "Connects per proposal must be more than 0.");
    else if (cpp > 1000) push("cpp", "Connects per proposal must be 1,000 or less.");

    const counts: [Key, string][] = [
      ["proposals", "Proposals sent"],
      ["replies", "Client replies"],
      ["interviews", "Interviews"],
      ["contracts", "Contracts won"],
    ];
    const parsed: Partial<Record<Key, number>> = {};
    for (const [key, label] of counts) {
      const value = parseDecimal(current[key]);
      if (value === null) push(key, key === "proposals" ? `Enter ${label.toLowerCase()}.` : `Enter ${label.toLowerCase()} (0 if none).`);
      else if (Number.isNaN(value) || !Number.isInteger(value)) push(key, `${label} must be a whole number.`);
      else if (value < 0) push(key, `${label} can’t be negative.`);
      else if (value > 1000000) push(key, `${label} must be 1,000,000 or less.`);
      else parsed[key] = value;
    }
    const proposals = parsed.proposals;
    if (proposals != null) {
      for (const [key, label] of counts.slice(1)) {
        const value = parsed[key];
        if (value != null && value > proposals) push(key, `${label} can’t be more than the ${formatNum(proposals, 0)} proposals you sent.`);
      }
    }
    if (current.other.trim()) {
      const other = parseDecimal(current.other);
      if (other === null || Number.isNaN(other)) push("other", "Other proposal costs must be a number, like 20.");
      else if (other < 0) push("other", "Other proposal costs can’t be negative.");
    }
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
      setWarnings([]);
      summaryRef.current?.focus();
      return;
    }
    const proposals = parseDecimal(values.proposals) || 0;
    const replies = parseDecimal(values.replies) || 0;
    const interviews = parseDecimal(values.interviews) || 0;
    const contracts = parseDecimal(values.contracts) || 0;
    const notes: string[] = [];
    if (interviews > replies) notes.push("More interviews than replies. Did you count invites? That’s fine; just check the numbers.");
    if (contracts > interviews) notes.push("More contracts than interviews. Fine if some clients hired you directly; just check the numbers.");
    setWarnings(notes);
    const computed = computeConnects({
      costPerConnect: parseDecimal(values.cost) || 0,
      connectsPerProposal: parseDecimal(values.cpp) || 0,
      proposals,
      replies,
      interviews,
      contracts,
      otherCosts: parseDecimal(values.other) || 0,
    });
    setResult(computed.value);
  }

  function onReset() {
    setValues(INITIAL);
    setErrors({});
    setSummary([]);
    setWarnings([]);
    setResult(null);
    setRateError("");
    firstRef.current?.focus();
  }

  const money = (amount: number) => formatConvertedMoney(amount, values.currency, values.usdPkr);
  const show = (metric: Ratio | undefined) => (metric?.value == null ? "Not available yet" : money(metric.value));
  const showPct = (metric: Ratio | undefined) => (metric?.value == null ? "Not available yet" : formatPercent(metric.value, 1));

  return (
    <section id="calculator" aria-labelledby="calc-title" className="py-10 md:py-14">
      <div className="mx-auto grid w-full max-w-7xl items-start gap-6 px-5 sm:px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
        <div className="fee-card p-5 sm:p-8">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="calc-title">Your Connects and results</h2>
            <p className="text-sm text-[#475569]"><span aria-hidden="true">*</span> Required</p>
          </div>
          <div ref={summaryRef} className="mb-6 rounded-lg border-2 border-[#b91c1c] bg-[#fef2f2] p-4" tabIndex={-1} role="alert" hidden={summary.length === 0}>
            <h3 className="font-body text-base font-bold tracking-normal text-[#b91c1c]">
              {summary.length === 1 ? "There is 1 problem to fix" : `There are ${summary.length} problems to fix`}
            </h3>
            <ul className="fee-error-list mt-2 space-y-1 text-[15px]">
              {summary.map((item) => (
                <li key={item.id}><a className="fee-link" href={`#${item.id}`} onClick={(event) => { event.preventDefault(); document.getElementById(item.id)?.focus(); }}>{item.msg}</a></li>
              ))}
            </ul>
          </div>
          <form className="flex flex-col gap-6" noValidate onSubmit={onSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id={`${formId}-cost`} inputRef={firstRef} label="Price per Connect" required symbol={symbol} value={values.cost} placeholder="e.g. 0.15" error={errors.cost} onChange={(value) => setValues((c) => ({ ...c, cost: value }))} hint={<>What you pay. We don’t assume a price. <a className="fee-link" href={CONNECTS_HELP} target="_blank" rel="noopener noreferrer">Upwork Help<span className="sr-only"> (opens Upwork Help in a new tab)</span></a></>} />
              <Field id={`${formId}-cpp`} label="Connects per proposal" required value={values.cpp} placeholder="e.g. 12" error={errors.cpp} onChange={(value) => setValues((c) => ({ ...c, cpp: value }))} hint="The number shown on the job you bid on." />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id={`${formId}-proposals`} label="Proposals sent" required value={values.proposals} placeholder="e.g. 40" error={errors.proposals} onChange={(value) => setValues((c) => ({ ...c, proposals: value }))} hint="Proposals in the period you’re measuring." />
              <Field id={`${formId}-replies`} label="Client replies" required value={values.replies} placeholder="0" error={errors.replies} onChange={(value) => setValues((c) => ({ ...c, replies: value }))} hint="Use 0 if nobody replied." />
              <Field id={`${formId}-interviews`} label="Interviews" required value={values.interviews} placeholder="0" error={errors.interviews} onChange={(value) => setValues((c) => ({ ...c, interviews: value }))} hint="Calls or messages that moved past a reply." />
              <Field id={`${formId}-contracts`} label="Contracts won" required value={values.contracts} placeholder="0" error={errors.contracts} onChange={(value) => setValues((c) => ({ ...c, contracts: value }))} hint="Use 0 if you haven’t won one yet." />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id={`${formId}-other`} label="Other proposal costs" symbol={symbol} value={values.other} placeholder="0.00" error={errors.other} onChange={(value) => setValues((c) => ({ ...c, other: value }))} hint="Membership or tools for this period. Optional, and kept separate from Connects." />
              <CalculatorCurrencyFields
                id={`${formId}-currency`}
                currency={values.currency}
                onCurrencyChange={(currency) => {
                  setValues((current) => ({ ...current, currency }));
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
                setValues((current) => ({ ...current, usdPkr }));
                if (rateError) setRateError(usdPkrFieldError(usdPkr));
              }}
              onRateBlur={(usdPkr) => {
                if (usdPkr.trim() === "" && !rateError) return;
                setRateError(values.currency === "PKR" ? usdPkrFieldError(usdPkr) : "");
              }}
            />
            {warnings.map((note) => <p key={note} className="rounded-lg border border-[#d97706]/50 bg-[#fffbeb] px-3 py-2.5 text-sm font-semibold text-[#92400e]">{note}</p>)}
            <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
              <button type="button" className="fee-btn fee-btn-secondary w-full sm:w-auto" onClick={onReset}>Reset</button>
              <button type="submit" className="fee-btn fee-btn-primary w-full sm:ml-auto sm:w-auto sm:min-w-48">Calculate costs</button>
            </div>
          </form>
        </div>
        <section aria-labelledby="results-title" className="fee-card p-5 sm:p-8 lg:sticky lg:top-24">
          <h2 id="results-title" className="mb-5">Your estimate</h2>
          {!result && (
            <div className="rounded-lg border border-dashed border-[#cbd5e1] bg-mist/60 px-5 py-8 text-center">
              <p className="font-semibold text-ink">No estimate yet</p>
              <p className="mt-1 text-[15px] text-[#475569]">Enter your Connects and results, then select <strong className="font-semibold text-ink">Calculate costs</strong>.</p>
            </div>
          )}
          {result && (
            <div>
              <PkrResultNote currency={values.currency} rate={values.usdPkr} />
              <div className="rounded-xl border border-accent/40 bg-[#f0fdfa] p-5">
                <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#134e4a]">Cost per contract</p>
                <p className="fee-display mt-1 font-display text-[2.5rem] font-bold leading-[1.1] text-ink tabular-nums">{show(result.perContract.connects)}</p>
                <p className="mt-2 text-sm text-[#475569]">
                  {result.perContract.connects.value == null
                    ? `You used ${formatNum(result.totalConnects, 0)} Connects (${money(result.spend)}). ${result.perContract.connects.reason}`
                    : `Connects only. With other costs, each contract is ${money(result.perContract.total.value || 0)}.`}
                </p>
              </div>
              <dl className="mt-5 divide-y divide-line text-[15px]">
                <Row label="Connects used" detail={`${formatNum(parseDecimal(values.cpp) || 0, 0)} × ${formatNum(parseDecimal(values.proposals) || 0, 0)} proposals`} value={formatNum(result.totalConnects, 0)} />
                <Row label="Connects spending" value={money(result.spend)} />
                <Row label="Total acquisition cost" value={money(result.total)} strong />
                <Row label="Reply rate" value={showPct(result.rates.reply)} />
                <Row label="Interview rate" value={showPct(result.rates.interview)} />
                <Row label="Contract rate" value={showPct(result.rates.contract)} />
              </dl>
              <div className="mt-6 space-y-3">
                {result.funnel.map((step) => (
                  <div key={step.label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{step.label}</span>
                      <span className="tabular-nums">{formatNum(step.count, 0)}{step.share != null ? ` (${formatPercent(step.share, 1)})` : ""}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-mist">
                      <div className="h-full bg-[#0f766e]" style={{ width: `${step.share || 0}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-[#475569]">Estimates only. Connects prices and refunds change, so enter the price you pay. PKR converts US dollar amounts into rupees. Other currencies only change the symbol.</p>
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

function Field({ id, label, required, symbol, value, placeholder, hint, error, onChange, inputRef }: { id: string; label: string; required?: boolean; symbol?: string; value: string; placeholder: string; hint: ReactNode; error?: string; onChange: (value: string) => void; inputRef?: Ref<HTMLInputElement> }) {
  return (
    <div>
      <label className="fee-label" htmlFor={id}>{label} {required && <span aria-hidden="true">*</span>}</label>
      <div className="fee-field">
        {symbol && <span className="fee-affix fee-affix-l" aria-hidden="true">{symbol}</span>}
        <input ref={inputRef} className="fee-input" id={id} type="text" inputMode="decimal" autoComplete="off" spellCheck={false} placeholder={placeholder} value={value} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error ${id}-hint` : `${id}-hint`} onChange={(event) => onChange(event.target.value)} />
      </div>
      {error && <p id={`${id}-error`} className="fee-error"><span className="sr-only">Error: </span>{error}</p>}
      <p id={`${id}-hint`} className="fee-hint">{hint}</p>
    </div>
  );
}
