"use client";

import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import { CALCULATOR_CURRENCIES } from "@/components/tools/CalculatorCurrencyFields";
import { CalculatorField as Field, Chevron } from "@/components/tools/CalculatorField";
import { Swatch, ToolResultCard } from "@/components/tools/ToolResultCard";
import {
  FIELD_RULES,
  computeFee,
  currencySymbol,
  fieldError,
  formatMoney,
  formatNum,
  formatPercent,
  parseDecimal,
  roundPercent,
} from "@/lib/upworkFee";
import { formatCalculatorMoney, usdPkrFieldError, usdPkrRateNumber } from "@/lib/usdPkr";

const PRESETS = [0, 5, 10, 15] as const;

type Values = {
  type: "hourly" | "fixed";
  rate: string;
  hours: string;
  amount: string;
  fee: string;
  extraFlat: string;
  extraPct: string;
  currency: string;
  usdPkr: string;
};

const EXAMPLE: Values = {
  type: "fixed",
  rate: "35",
  hours: "40",
  amount: "500",
  fee: "10",
  extraFlat: "2",
  extraPct: "",
  currency: "USD",
  usdPkr: "",
};
type FieldName = "rate" | "hours" | "amount" | "fee" | "extraFlat" | "extraPct" | "usdPkr";

function entryMoney(amount: number, currency: string) {
  return formatMoney(amount, currency === "PKR" ? "USD" : currency);
}

export default function FeeCalculator() {
  const [values, setValues] = useState<Values>(EXAMPLE);
  const [showExample, setShowExample] = useState(true);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [announcement, setAnnouncement] = useState("");
  const amountRef = useRef<HTMLInputElement>(null);
  const ready = useRef(false);
  const formId = useId();

  const fixed = values.type === "fixed";
  const symbol = currencySymbol(values.currency === "PKR" ? "USD" : values.currency);
  const pkrRate = values.currency === "PKR" ? usdPkrRateNumber(values.usdPkr) : null;
  const showingUsdBecausePkr = values.currency === "PKR" && pkrRate == null;
  const displayCurrency = showingUsdBecausePkr ? "USD" : values.currency;

  const fieldMessages = useMemo(() => {
    const next: Partial<Record<FieldName, string>> = {};
    const check = (key: FieldName, active: boolean) => {
      if (!active) return;
      const message =
        key === "usdPkr"
          ? values.usdPkr.trim() === ""
            ? ""
            : usdPkrFieldError(values.usdPkr)
          : fieldError(FIELD_RULES[key], values[key]);
      if (message) next[key] = message;
    };
    check("amount", fixed);
    check("rate", !fixed);
    check("hours", !fixed);
    check("fee", true);
    check("extraFlat", values.extraFlat.trim() !== "");
    check("extraPct", values.extraPct.trim() !== "");
    check("usdPkr", values.currency === "PKR");
    return next;
  }, [fixed, values]);

  const visibleErrors = Object.fromEntries(
    Object.entries(fieldMessages).filter(([key]) => touched[key as FieldName])
  ) as Partial<Record<FieldName, string>>;

  const contractInvalid = Boolean(
    visibleErrors.amount ||
      visibleErrors.rate ||
      visibleErrors.hours ||
      visibleErrors.fee ||
      visibleErrors.extraFlat ||
      visibleErrors.extraPct
  );

  const feeNumber = parseDecimal(values.fee);
  const feeHint =
    feeNumber != null &&
    !Number.isNaN(feeNumber) &&
    feeNumber > 15 &&
    feeNumber <= 100 &&
    !visibleErrors.fee;

  const result = contractInvalid
    ? null
    : computeFee({
        type: values.type,
        rate: parseDecimal(values.rate) || 0,
        hours: parseDecimal(values.hours) || 0,
        amount: parseDecimal(values.amount) || 0,
        feePercent: parseDecimal(values.fee) || 0,
        extraFlat: parseDecimal(values.extraFlat) || 0,
        extraPercent: parseDecimal(values.extraPct) || 0,
      });

    const takeHomeText = result
    ? formatCalculatorMoney(result.takeHome, values.currency, values.usdPkr)
    : "—";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rate = params.get("rate");
    const hours = params.get("hours");
    const fee = params.get("fee");
    const currency = params.get("currency");
    const usdPkr = params.get("usdPkr");
    if (!rate && !hours && !fee && !currency && !usdPkr) return;
    const allowed = new Set<string>(CALCULATOR_CURRENCIES.map(([code]) => code));
    setValues((current) => {
      const nextCurrency =
        currency && allowed.has(currency) ? currency : current.currency;
      return {
        ...current,
        type: "hourly",
        rate: rate || current.rate,
        hours: hours || current.hours,
        fee: fee || current.fee,
        extraFlat: "",
        extraPct: "",
        currency: nextCurrency,
        usdPkr:
          nextCurrency === "PKR" && usdPkr && usdPkrFieldError(usdPkr) === ""
            ? usdPkr.trim()
            : "",
      };
    });
    setShowExample(false);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      ready.current = true;
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!ready.current) return;
    const id = window.setTimeout(() => {
      setAnnouncement(
        contractInvalid ? "Enter a valid amount" : `Estimated take-home ${takeHomeText}`
      );
    }, 500);
    return () => window.clearTimeout(id);
  }, [contractInvalid, takeHomeText]);

  function setField(key: keyof Values, value: string) {
    setShowExample(false);
    setValues((current) => ({ ...current, [key]: value }));
    if (key !== "type" && key !== "currency") {
      setTouched((current) => ({ ...current, [key]: true }));
    }
  }

  function resetExample() {
    setValues(EXAMPLE);
    setShowExample(true);
    setTouched({});
    setAnnouncement("");
    window.setTimeout(() => amountRef.current?.focus(), 0);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
  }

  const flatNumber = parseDecimal(values.extraFlat);
  const pctNumber = parseDecimal(values.extraPct);
  const extraBits: string[] = [];
  if (flatNumber != null && !Number.isNaN(flatNumber) && flatNumber > 0) {
    extraBits.push(`${entryMoney(flatNumber, values.currency)} flat`);
  }
  if (pctNumber != null && !Number.isNaN(pctNumber) && pctNumber > 0) {
    extraBits.push(`${formatNum(pctNumber)}%`);
  }

  const keepShare =
    result && result.gross > 0 ? (result.takeHome / result.gross) * 100 : 0;
  const feeShare =
    result && result.gross > 0 ? (result.serviceFee / result.gross) * 100 : 0;
  const extraShare =
    result && result.gross > 0 ? (result.extra / result.gross) * 100 : 0;
  const costs = result ? result.serviceFee + result.extra : 0;

  function describedBy(field: FieldName, hintId?: string) {
    const ids = [hintId, visibleErrors[field] ? `${formId}-${field}-error` : ""]
      .filter(Boolean)
      .join(" ");
    return ids || undefined;
  }

  return (
    <section aria-labelledby="calc-title" className="fee-hero-card">
      <form onSubmit={onSubmit} noValidate>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 id="calc-title" className="fee-contract-title">
            Your contract
          </h2>
          <p className="fee-example-kicker" hidden={!showExample}>
            Example: $500 fixed-price job
          </p>
        </div>

        <fieldset className="mt-4">
          <legend className="sr-only">Contract type</legend>
          <div className="fee-segmented" style={{ border: 0, background: "#eef2f6" }}>
            <label>
              <input
                type="radio"
                name={`${formId}-type`}
                value="hourly"
                checked={!fixed}
                onChange={() => setField("type", "hourly")}
              />
              Hourly
            </label>
            <label>
              <input
                type="radio"
                name={`${formId}-type`}
                value="fixed"
                checked={fixed}
                onChange={() => setField("type", "fixed")}
              />
              Fixed-price
            </label>
          </div>
        </fieldset>

        <a href="#result" className="fee-mobile-summary">
          <span>Estimated take-home</span>
          <span className="flex items-center gap-2">
            <b className="text-[16px] tabular-nums">{takeHomeText}</b>
            <span className="underline underline-offset-4">Breakdown</span>
          </span>
        </a>

        <div hidden={fixed} className="mt-3 grid grid-cols-2 gap-3">
          <Field
            id={`${formId}-rate`}
            label="Hourly rate"
            value={values.rate}
            symbol={symbol}
            placeholder="e.g. 35"
            error={visibleErrors.rate}
            errorId={`${formId}-rate-error`}
            onChange={(value) => setField("rate", value)}
            onBlur={() => setTouched((current) => ({ ...current, rate: true }))}
          />
          <Field
            id={`${formId}-hours`}
            label="Hours worked"
            value={values.hours}
            suffix="hrs"
            placeholder="e.g. 40"
            error={visibleErrors.hours}
            errorId={`${formId}-hours-error`}
            onChange={(value) => setField("hours", value)}
            onBlur={() => setTouched((current) => ({ ...current, hours: true }))}
          />
        </div>

        <div hidden={!fixed} className="mt-3">
          <Field
            id={`${formId}-amount`}
            label="Contract amount"
            value={values.amount}
            symbol={symbol}
            placeholder="e.g. 500"
            hint="Total contract or milestone."
            hintId={`${formId}-amount-hint`}
            describedBy={describedBy("amount", `${formId}-amount-hint`)}
            error={visibleErrors.amount}
            errorId={`${formId}-amount-error`}
            inputRef={amountRef}
            onChange={(value) => setField("amount", value)}
            onBlur={() => setTouched((current) => ({ ...current, amount: true }))}
          />
        </div>

        <div className="mt-3">
          <Field
            id={`${formId}-fee`}
            label="Service fee (estimated)"
            value={values.fee}
            suffix="%"
            error={visibleErrors.fee}
            errorId={`${formId}-fee-error`}
            describedBy={
              [feeHint ? `${formId}-fee-hint` : "", visibleErrors.fee ? `${formId}-fee-error` : ""]
                .filter(Boolean)
                .join(" ") || undefined
            }
            onChange={(value) => setField("fee", value)}
            onBlur={() => setTouched((current) => ({ ...current, fee: true }))}
          />
          <div className="mt-2 flex flex-wrap items-center gap-2" role="group" aria-label="Quick fee presets">
            {PRESETS.map((preset) => {
              const pressed = feeNumber === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  className="fee-preset"
                  aria-pressed={pressed}
                  onClick={() => setField("fee", String(preset))}
                >
                  {preset}%
                </button>
              );
            })}
            <p id={`${formId}-fee-hint`} className="fee-example-kicker">
              {feeHint ? "Upwork's range is 0–15%." : "Check the % on your offer."}
            </p>
          </div>
        </div>

        <noscript>
          <p className="fee-noscript">
            Turn on JavaScript to calculate your own figures. The example above shows a $500 fixed-price job at 10% plus a $2 flat fee: $448.00.
          </p>
        </noscript>

        <details className="fee-details">
          <summary>
            <span>
              Add withdrawal or transfer costs{" "}
              {extraBits.length > 0 && (
                <span className="font-normal text-[#64748b]">({extraBits.join(", ")})</span>
              )}
            </span>
            <Chevron />
          </summary>
          <div className="grid grid-cols-2 gap-3 px-3 pb-3">
            <Field
              id={`${formId}-flat`}
              label="Flat amount"
              value={values.extraFlat}
              symbol={symbol}
              hint="Per withdrawal fee."
              hintId={`${formId}-flat-hint`}
              describedBy={describedBy("extraFlat", `${formId}-flat-hint`)}
              error={visibleErrors.extraFlat}
              errorId={`${formId}-extraFlat-error`}
              onChange={(value) => setField("extraFlat", value)}
              onBlur={() => setTouched((current) => ({ ...current, extraFlat: true }))}
            />
            <Field
              id={`${formId}-xpct`}
              label="Percentage"
              value={values.extraPct}
              suffix="%"
              hint="Of the amount after fee."
              hintId={`${formId}-xpct-hint`}
              describedBy={describedBy("extraPct", `${formId}-xpct-hint`)}
              error={visibleErrors.extraPct}
              errorId={`${formId}-extraPct-error`}
              onChange={(value) => setField("extraPct", value)}
              onBlur={() => setTouched((current) => ({ ...current, extraPct: true }))}
            />
          </div>
        </details>
      </form>

      <ToolResultCard
        currencyId={`${formId}-currency`}
        currency={values.currency}
        onCurrencyChange={(currency) => setField("currency", currency)}
        kicker="Estimated take-home"
        beforeFigure={
          values.currency === "PKR" ? (
            <div className="fee-block">
              <Field
                id={`${formId}-fx`}
                label="Exchange rate (PKR per US$)"
                value={values.usdPkr}
                suffix="Rs"
                placeholder="e.g. rate from your bank"
                hint="Enter today’s rate. Your bank’s rate may differ."
                hintId={`${formId}-fx-hint`}
                describedBy={describedBy("usdPkr", `${formId}-fx-hint`)}
                error={visibleErrors.usdPkr}
                errorId={`${formId}-usdPkr-error`}
                onChange={(value) => setField("usdPkr", value)}
                onBlur={() => setTouched((current) => ({ ...current, usdPkr: true }))}
              />
            </div>
          ) : null
        }
        figure={takeHomeText}
        unit={displayCurrency}
        afterFigure={
          showingUsdBecausePkr ? (
            <p className="fee-pkr-note">
              Enter an exchange rate to see rupees. Showing US dollars until then.
            </p>
          ) : null
        }
        sentence={
          <p className="fee-keep-copy">
            {result
              ? `You keep ${formatPercent(roundPercent(keepShare, 1), 1)} of what you bill. ${formatCalculatorMoney(costs, values.currency, values.usdPkr)} goes to fees and costs.`
              : "Enter a valid amount to see the estimate."}
          </p>
        }
        bar={[
          { color: "#0f766e", width: keepShare },
          { color: "#0f172a", width: feeShare },
          { color: "#f5c451", width: extraShare },
        ]}
        rows={[
          {
            label: fixed ? "Billed (fixed-price)" : "Billed (hourly)",
            value: result ? formatCalculatorMoney(result.gross, values.currency, values.usdPkr) : "—",
          },
          {
            label: (
              <>
                <Swatch color="#0f172a" />
                <span>
                  Service fee
                  {result && <span className="ml-1 font-normal">{formatPercent(result.feePercent)}</span>}
                </span>
              </>
            ),
            value: result ? `−${formatCalculatorMoney(result.serviceFee, values.currency, values.usdPkr)}` : "—",
          },
          {
            label: (
              <>
                <Swatch color="#f5c451" />
                <span>Additional costs</span>
              </>
            ),
            value: result ? `−${formatCalculatorMoney(result.extra, values.currency, values.usdPkr)}` : "—",
          },
          {
            label: "Effective deduction",
            value: result ? formatPercent(roundPercent(result.effective, 2)) : "—",
          },
          {
            label: (
              <>
                <Swatch color="#0f766e" />
                <span>You keep</span>
              </>
            ),
            value: takeHomeText,
            keep: true,
          },
        ]}
        fine="Estimates only. Not affiliated with Upwork. Taxes not included."
        onReset={resetExample}
        announcement={announcement}
      />
    </section>
  );
}
