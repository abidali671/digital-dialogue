"use client";

import { FormEvent, useEffect, useId, useRef, useState, type ReactNode, type Ref } from "react";
import {
  FIELD_RULES,
  FeeResult,
  computeFee,
  currencySymbol,
  fieldError,
  formatMoney,
  formatPercent,
  parseDecimal,
  roundPercent,
} from "@/lib/upworkFee";

const CURRENCIES = [
  ["USD", "USD — US dollar ($)"],
  ["PKR", "PKR — Pakistani rupee (Rs)"],
  ["EUR", "EUR — Euro (€)"],
  ["GBP", "GBP — British pound (£)"],
  ["AED", "AED — UAE dirham"],
  ["CAD", "CAD — Canadian dollar ($)"],
  ["AUD", "AUD — Australian dollar ($)"],
  ["INR", "INR — Indian rupee (₹)"],
] as const;

const UPWORK_FEE_HELP =
  "https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee";

type Values = {
  type: "hourly" | "fixed";
  rate: string;
  hours: string;
  amount: string;
  fee: string;
  extraFlat: string;
  extraPct: string;
  currency: string;
};

const INITIAL: Values = {
  type: "hourly",
  rate: "",
  hours: "",
  amount: "",
  fee: "10",
  extraFlat: "",
  extraPct: "",
  currency: "USD",
};

const CHECKED_FIELDS = [
  "rate",
  "hours",
  "amount",
  "fee",
  "extraFlat",
  "extraPct",
] as const;

type FieldName = (typeof CHECKED_FIELDS)[number];

function track(name: string, params: Record<string, string>) {
  const gtag = (
    window as Window & { gtag?: (...args: unknown[]) => void }
  ).gtag;
  gtag?.("event", name, params);
}

function AlertIcon({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-11.5a.75.75 0 011.5 0v4a.75.75 0 01-1.5 0v-4zM10 14.75a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function FeeCalculator() {
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [summary, setSummary] = useState<{ id: string; msg: string }[]>([]);
  const [result, setResult] = useState<FeeResult | null>(null);
  const [stale, setStale] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const rateRef = useRef<HTMLInputElement>(null);
  const formId = useId();

  const symbol = currencySymbol(values.currency);
  const fixed = values.type === "fixed";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rate = params.get("rate");
    const hours = params.get("hours");
    const fee = params.get("fee");
    const currency = params.get("currency");
    if (!rate && !hours && !fee && !currency) return;
    const allowed = new Set<string>(CURRENCIES.map(([code]) => code));
    setValues((current) => ({
      ...current,
      type: "hourly",
      rate: rate || current.rate,
      hours: hours || current.hours,
      fee: fee || current.fee,
      currency: currency && allowed.has(currency) ? currency : current.currency,
    }));
  }, []);

  function setField(key: keyof Values, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    if (result) setStale(true);
    if (errors[key as FieldName]) {
      const message = fieldError(FIELD_RULES[key], value);
      setErrors((current) => ({ ...current, [key]: message }));
    }
  }

  function activeError(key: FieldName): string {
    if (key === "rate" || key === "hours") return fixed ? "" : fieldError(FIELD_RULES[key], values[key]);
    if (key === "amount") return fixed ? fieldError(FIELD_RULES.amount, values.amount) : "";
    return fieldError(FIELD_RULES[key], values[key]);
  }

  function collectErrors() {
    return CHECKED_FIELDS.flatMap((key) => {
      const msg = activeError(key);
      return msg ? [{ id: `${formId}-${key}`, msg, key }] : [];
    });
  }

  function blurField(key: FieldName) {
    if (values[key].trim() === "" && !errors[key]) return;
    setErrors((current) => ({ ...current, [key]: activeError(key) }));
  }

  function calculate(focusSummary = true) {
    const found = collectErrors();
    const nextErrors: Partial<Record<FieldName, string>> = {};
    for (const item of found) nextErrors[item.key] = item.msg;
    setErrors(nextErrors);
    setSummary(found.map(({ id, msg }) => ({ id, msg })));
    if (found.length) {
      setAnnouncement("");
      track("fee_calc_error", { type: values.type, currency: values.currency });
      if (focusSummary) summaryRef.current?.focus();
      return;
    }

    const computed = computeFee({
      type: values.type,
      rate: parseDecimal(values.rate) || 0,
      hours: parseDecimal(values.hours) || 0,
      amount: parseDecimal(values.amount) || 0,
      feePercent: parseDecimal(values.fee) || 0,
      extraFlat: parseDecimal(values.extraFlat) || 0,
      extraPercent: parseDecimal(values.extraPct) || 0,
    });
    setResult(computed);
    setStale(false);
    const effective = formatPercent(roundPercent(computed.effective, 2));
    setAnnouncement("");
    window.setTimeout(() => {
      setAnnouncement(
        `Estimated take-home: ${formatMoney(computed.takeHome, values.currency)} from ${formatMoney(computed.gross, values.currency)} gross. Service fee ${formatMoney(computed.serviceFee, values.currency)}, additional costs ${formatMoney(computed.extra, values.currency)}, total deduction ${effective}.`
      );
    }, 50);
    track("fee_calc_submit", { type: values.type, currency: values.currency });

    if (window.matchMedia("(max-width: 1099px)").matches) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("fee-results")?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    calculate(true);
  }

  function onReset() {
    setValues(INITIAL);
    setErrors({});
    setSummary([]);
    setResult(null);
    setStale(false);
    setAnnouncement("Calculator reset.");
    rateRef.current?.focus();
  }

  const money = (amount: number) => formatMoney(amount, values.currency);
  const shares = result
    ? {
        take: result.gross > 0 ? (result.takeHome / result.gross) * 100 : 0,
        fee: result.gross > 0 ? (result.serviceFee / result.gross) * 100 : 0,
        extra: result.gross > 0 ? (result.extra / result.gross) * 100 : 0,
      }
    : null;

  return (
    <section id="calculator" aria-labelledby="calc-title" className="py-10 md:py-14">
      <div className="mx-auto grid w-full max-w-7xl items-start gap-6 px-5 sm:px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
        <div className="fee-card p-5 sm:p-8">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="calc-title">Your contract</h2>
            <p className="text-sm text-[#475569]">
              <span aria-hidden="true">*</span> Required
            </p>
          </div>

          <div
            ref={summaryRef}
            className="mb-6 rounded-lg border-2 border-[#b91c1c] bg-[#fef2f2] p-4 sm:p-5"
            tabIndex={-1}
            role="alert"
            hidden={summary.length === 0}
          >
            <h3 className="flex items-center gap-2 font-body text-base font-bold tracking-normal text-[#b91c1c]">
              <AlertIcon className="fee-svg-lg shrink-0" />
              {summary.length === 1
                ? "There is 1 problem to fix"
                : `There are ${summary.length} problems to fix`}
            </h3>
            <ul className="fee-error-list mt-2 space-y-1 text-[15px] marker:text-[#b91c1c]">
              {summary.map((item) => (
                <li key={item.id}>
                  <a
                    className="fee-link"
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      document.getElementById(item.id)?.focus();
                    }}
                  >
                    {item.msg}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form className="flex flex-col gap-6" noValidate onSubmit={onSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <fieldset>
                <legend className="fee-label">
                  Contract type <span aria-hidden="true">*</span>
                </legend>
                <div className="fee-segmented">
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="hourly"
                      checked={values.type === "hourly"}
                      onChange={() => {
                        setValues((current) => ({ ...current, type: "hourly" }));
                        if (result) setStale(true);
                      }}
                    />
                    <span className="fee-dot" aria-hidden="true" />
                    Hourly
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="fixed"
                      checked={values.type === "fixed"}
                      onChange={() => {
                        setValues((current) => ({ ...current, type: "fixed" }));
                        if (result) setStale(true);
                      }}
                    />
                    <span className="fee-dot" aria-hidden="true" />
                    Fixed-price
                  </label>
                </div>
              </fieldset>

              <div>
                <label className="fee-label" htmlFor={`${formId}-currency`}>
                  Currency
                </label>
                <div className="fee-field">
                  <select
                    className="fee-input"
                    id={`${formId}-currency`}
                    value={values.currency}
                    aria-describedby={`${formId}-currency-hint`}
                    onChange={(event) => {
                      const currency = event.target.value;
                      setValues((current) => ({ ...current, currency }));
                      if (result && collectErrors().length === 0) {
                        setResult(
                          computeFee({
                            type: values.type,
                            rate: parseDecimal(values.rate) || 0,
                            hours: parseDecimal(values.hours) || 0,
                            amount: parseDecimal(values.amount) || 0,
                            feePercent: parseDecimal(values.fee) || 0,
                            extraFlat: parseDecimal(values.extraFlat) || 0,
                            extraPercent: parseDecimal(values.extraPct) || 0,
                          })
                        );
                        setStale(false);
                      }
                    }}
                  >
                    {CURRENCIES.map(([code, label]) => (
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
                <p id={`${formId}-currency-hint`} className="fee-hint">
                  Changes the symbol and format only. No exchange rates are applied.
                </p>
              </div>
            </div>

            {!fixed && (
              <div className="grid gap-6 sm:grid-cols-2">
                <MoneyField
                  id={`${formId}-rate`}
                  label="Hourly rate"
                  required
                  value={values.rate}
                  symbol={symbol}
                  placeholder="e.g. 35"
                  hint="What you bill the client per hour."
                  error={errors.rate}
                  inputRef={rateRef}
                  onChange={(value) => setField("rate", value)}
                  onBlur={() => blurField("rate")}
                />
                <TextField
                  id={`${formId}-hours`}
                  label="Hours worked"
                  required
                  value={values.hours}
                  suffix="hrs"
                  placeholder="e.g. 40"
                  hint="Total hours billed on this contract."
                  error={errors.hours}
                  onChange={(value) => setField("hours", value)}
                  onBlur={() => blurField("hours")}
                />
              </div>
            )}

            {fixed && (
              <MoneyField
                id={`${formId}-amount`}
                label="Contract amount"
                required
                value={values.amount}
                symbol={symbol}
                placeholder="e.g. 500"
                hint="Total fixed price or milestone amount billed to the client."
                error={errors.amount}
                onChange={(value) => setField("amount", value)}
                onBlur={() => blurField("amount")}
              />
            )}

            <div className="sm:max-w-[calc(50%-0.75rem)]">
              <TextField
                id={`${formId}-fee`}
                label="Service fee (estimated)"
                required
                value={values.fee}
                suffix="%"
                placeholder="10"
                error={errors.fee}
                onChange={(value) => setField("fee", value)}
                onBlur={() => blurField("fee")}
                hint={
                  <>
                    Default 10%. Upwork shows your exact fee (0–15% per contract) on each
                    offer or proposal.{" "}
                    <a
                      className="fee-link"
                      href={UPWORK_FEE_HELP}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Upwork Help
                      <span className="sr-only"> (opens Upwork Help in a new tab)</span>
                    </a>
                  </>
                }
              />
            </div>

            <fieldset className="rounded-lg border border-line bg-mist/60 p-4 sm:p-5">
              <legend className="sr-only">Additional costs (optional)</legend>
              <p className="font-body text-base font-bold text-ink" aria-hidden="true">
                Additional costs <span className="font-normal text-[#475569]">(optional)</span>
              </p>
              <p className="fee-hint mb-4 mt-1">
                Withdrawal, transfer or currency conversion fees from your payment method
                or bank. Rates vary by provider, so check theirs.
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                <MoneyField
                  id={`${formId}-extraFlat`}
                  label="Flat amount"
                  value={values.extraFlat}
                  symbol={symbol}
                  placeholder="0.00"
                  hint="e.g. a per-withdrawal fee."
                  error={errors.extraFlat}
                  onChange={(value) => setField("extraFlat", value)}
                  onBlur={() => blurField("extraFlat")}
                />
                <TextField
                  id={`${formId}-extraPct`}
                  label="Percentage"
                  value={values.extraPct}
                  suffix="%"
                  placeholder="0"
                  hint="Applied to the amount left after the service fee."
                  error={errors.extraPct}
                  onChange={(value) => setField("extraPct", value)}
                  onBlur={() => blurField("extraPct")}
                />
              </div>
            </fieldset>

            <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
              <button type="button" className="fee-btn fee-btn-secondary w-full sm:w-auto" onClick={onReset}>
                Reset
              </button>
              <button type="submit" className="fee-btn fee-btn-primary w-full sm:ml-auto sm:w-auto sm:min-w-48">
                Calculate take-home
              </button>
            </div>
          </form>
        </div>

        <section
          id="fee-results"
          aria-labelledby="results-title"
          className="fee-card scroll-mt-24 p-5 sm:p-8 lg:sticky lg:top-24"
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <h2 id="results-title">Your estimate</h2>
            <span className="rounded-full border border-line bg-mist px-2.5 py-1 font-mono text-xs uppercase tracking-wide text-[#475569]">
              Estimate · {values.currency}
            </span>
          </div>
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {announcement}
          </div>

          {!result && (
            <div className="rounded-lg border border-dashed border-[#cbd5e1] bg-mist/60 px-5 py-8 text-center">
              <div
                className="mx-auto mb-4 flex h-10 w-full max-w-64 overflow-hidden rounded-md border border-[#cbd5e1]"
                aria-hidden="true"
              >
                <span className="w-[78%] bg-line" />
                <span className="w-[14%] bg-[#cbd5e1]" />
                <span className="w-[8%] bg-mist-soft" />
              </div>
              <p className="font-semibold text-ink">No estimate yet</p>
              <p className="mt-1 text-[15px] text-[#475569]">
                Enter your contract details and select{" "}
                <strong className="font-semibold text-ink">Calculate take-home</strong> to
                see your breakdown.
              </p>
            </div>
          )}

          {result && shares && (
            <div>
              {stale && (
                <p className="mb-4 flex items-start gap-2 rounded-lg border border-[#d97706]/50 bg-[#fffbeb] px-3 py-2.5 text-sm font-semibold text-[#92400e]">
                  <AlertIcon className="mt-0.5 shrink-0" />
                  <span>
                    Inputs changed. Select <em className="not-italic underline">Calculate take-home</em> to update.
                  </span>
                </p>
              )}
              <div className="rounded-xl border border-accent/40 bg-[#f0fdfa] p-5">
                <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#134e4a]">
                  Estimated take-home
                </p>
                <p className="fee-display mt-1 break-words font-display text-[2.5rem] font-bold leading-[1.1] tracking-tight text-ink tabular-nums">
                  {money(result.takeHome)}
                </p>
                <p className="mt-2 text-sm text-[#475569]">
                  After the estimated service fee and additional costs ·{" "}
                  {values.type === "hourly"
                    ? `${money(parseDecimal(values.rate) || 0)}/hr × ${(parseDecimal(values.hours) || 0).toLocaleString("en-US")} hrs`
                    : "Fixed-price contract"}
                </p>
              </div>

              <dl className="mt-5 divide-y divide-line text-[15px]">
                <Row label="Gross earnings" value={money(result.gross)} />
                <Row
                  label={`Estimated service fee (${formatPercent(result.feePercent)})`}
                  value={`−${money(result.serviceFee)}`}
                />
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt>
                    Additional costs
                    <span className="block text-sm text-[#475569]">
                      {result.flat || result.extraPercent
                        ? [
                            result.flat ? `${money(result.flat)} flat` : "",
                            result.extraPercent
                              ? `${formatPercent(result.extraPercent)} of payout`
                              : "",
                          ]
                            .filter(Boolean)
                            .join(" + ")
                        : "None added"}
                    </span>
                  </dt>
                  <dd className="font-semibold text-ink tabular-nums">
                    {result.extra > 0 ? `−${money(result.extra)}` : money(0)}
                  </dd>
                </div>
                <Row
                  label="Effective deduction"
                  value={formatPercent(roundPercent(result.effective, 2))}
                  strong
                />
              </dl>
              {result.capped && (
                <p className="mt-2 text-sm text-[#92400e]">
                  Additional costs were capped at the amount left after the service fee.
                </p>
              )}

              <div className="mt-6">
                <h3 className="font-body text-base font-bold tracking-normal">
                  Where the gross goes
                </h3>
                <div className="fee-bar mt-3" aria-hidden="true">
                  <BarSeg className="fee-pat-take" share={shares.take} />
                  <BarSeg className="fee-pat-fee" share={shares.fee} />
                  <BarSeg className="fee-pat-extra" share={shares.extra} />
                </div>
                <ul className="mt-4 grid gap-2.5 text-sm" aria-label="Breakdown of gross earnings">
                  <Legend
                    className="fee-pat-take"
                    label="Take-home (solid)"
                    amount={money(result.takeHome)}
                    share={shares.take}
                  />
                  <Legend
                    className="fee-pat-fee"
                    label="Service fee (striped)"
                    amount={money(result.serviceFee)}
                    share={shares.fee}
                  />
                  <Legend
                    className="fee-pat-extra"
                    label="Additional costs (dotted)"
                    amount={money(result.extra)}
                    share={shares.extra}
                  />
                </ul>
              </div>
            </div>
          )}

          <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-[#475569]">
            Estimates only. Not affiliated with or endorsed by Upwork. Taxes are not included.
          </p>
        </section>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-[#334155]">{label}</dt>
      <dd className={`${strong ? "font-bold" : "font-semibold"} text-ink tabular-nums`}>
        {value}
      </dd>
    </div>
  );
}

function BarSeg({ className, share }: { className: string; share: number }) {
  if (share <= 0) return null;
  return (
    <div className={`fee-bar-seg ${className}`} style={{ width: `${share}%` }}>
      <span>{share >= 12 ? formatPercent(roundPercent(share, 1)) : ""}</span>
    </div>
  );
}

function Legend({
  className,
  label,
  amount,
  share,
}: {
  className: string;
  label: string;
  amount: string;
  share: number;
}) {
  return (
    <li className="flex items-center gap-2.5">
      <span className={`fee-swatch ${className}`} />
      <span className="flex-1 text-[#334155]">{label}</span>
      <span className="tabular-nums text-[#475569]">{amount}</span>
      <span className="w-14 text-right font-semibold text-ink tabular-nums">
        {formatPercent(roundPercent(share, 1))}
      </span>
    </li>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="fee-error">
      <AlertIcon className="mt-0.5 shrink-0" />
      <span>
        <span className="sr-only">Error: </span>
        {message}
      </span>
    </p>
  );
}

function MoneyField({
  id,
  label,
  required,
  value,
  symbol,
  placeholder,
  hint,
  error,
  onChange,
  onBlur,
  inputRef,
}: {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  symbol: string;
  placeholder: string;
  hint: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  inputRef?: Ref<HTMLInputElement>;
}) {
  return (
    <div>
      <label className="fee-label" htmlFor={id}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <div className="fee-field">
        <span className="fee-affix fee-affix-l" aria-hidden="true">
          {symbol}
        </span>
        <input
          ref={inputRef}
          className="fee-input"
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error ${id}-hint` : `${id}-hint`}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
        />
      </div>
      <FieldError id={id} message={error} />
      <p id={`${id}-hint`} className="fee-hint">
        {hint}
      </p>
    </div>
  );
}

function TextField({
  id,
  label,
  required,
  value,
  suffix,
  placeholder,
  hint,
  error,
  onChange,
  onBlur,
}: {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  suffix?: string;
  placeholder: string;
  hint: ReactNode;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <label className="fee-label" htmlFor={id}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <div className="fee-field">
        <input
          className="fee-input"
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error ${id}-hint` : `${id}-hint`}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
        />
        {suffix && (
          <span className="fee-affix fee-affix-r" aria-hidden="true">
            {suffix}
          </span>
        )}
      </div>
      <FieldError id={id} message={error} />
      <p id={`${id}-hint`} className="fee-hint">
        {hint}
      </p>
    </div>
  );
}
