"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { CalculatorField as Field, Chevron } from "@/components/tools/CalculatorField";
import PkrRateHint from "@/components/tools/PkrRateHint";
import { Swatch, ToolResultCard } from "@/components/tools/ToolResultCard";
import {
  CLEARANCE_DAYS,
  FIVERR_SELLER_FEE_PERCENT,
  PAYOUT_METHODS,
  addDays,
  computeFiverrFee,
  formatDay,
  parseIsoDay,
  payoutMethod,
  type ClearanceTier,
  type PayoutMethodId,
} from "@/lib/fiverrFee";
import { fieldError, formatMoney, formatNum, formatPercent, parseDecimal, roundPercent, type FieldRule } from "@/lib/upworkFee";
import { entrySymbol, formatCalculatorMoney, usdPkrFieldError, usdPkrRateNumber } from "@/lib/usdPkr";

type Values = {
  price: string;
  extras: string;
  tip: string;
  tier: ClearanceTier;
  completed: string;
  method: PayoutMethodId;
  payoutFee: string;
  currency: string;
  usdPkr: string;
};

const EXAMPLE: Values = {
  price: "100",
  extras: "",
  tip: "",
  tier: "standard",
  completed: "",
  method: "paypal",
  payoutFee: "0",
  currency: "USD",
  usdPkr: "",
};

type FieldName = "price" | "extras" | "tip" | "payoutFee" | "usdPkr";

const RULES: Record<Exclude<FieldName, "usdPkr">, FieldRule> = {
  price: { label: "Gig price", required: true, gt0: true },
  extras: { label: "Gig extras", required: false },
  tip: { label: "Tip", required: false },
  payoutFee: { label: "Withdrawal fee", required: false },
};

export default function FiverrFeeCalculator() {
  const [values, setValues] = useState<Values>(EXAMPLE);
  const [showExample, setShowExample] = useState(true);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [announcement, setAnnouncement] = useState("");
  const priceRef = useRef<HTMLInputElement>(null);
  const ready = useRef(false);
  const formId = useId();
  const symbol = entrySymbol(values.currency);
  const method = payoutMethod(values.method);

  const messages: Partial<Record<FieldName, string>> = {};
  for (const key of Object.keys(RULES) as Array<keyof typeof RULES>) {
    const message = fieldError(RULES[key], values[key]);
    if (message) messages[key] = message;
  }
  if (values.currency === "PKR" && values.usdPkr.trim() !== "") {
    const message = usdPkrFieldError(values.usdPkr);
    if (message) messages.usdPkr = message;
  }
  const visibleErrors = Object.fromEntries(
    Object.entries(messages).filter(([key]) => touched[key as FieldName])
  ) as Partial<Record<FieldName, string>>;

  const invalid = Boolean(messages.price || messages.extras || messages.tip || messages.payoutFee);
  const result = invalid
    ? null
    : computeFiverrFee({
        price: parseDecimal(values.price) || 0,
        extras: parseDecimal(values.extras) || 0,
        tip: parseDecimal(values.tip) || 0,
        payoutFee: parseDecimal(values.payoutFee) || 0,
      });

  const pkrRate = values.currency === "PKR" ? usdPkrRateNumber(values.usdPkr) : null;
  const showingUsdBecausePkr = values.currency === "PKR" && pkrRate == null;
  const displayCurrency = showingUsdBecausePkr ? "USD" : values.currency;
  const money = (amount: number) => formatCalculatorMoney(amount, values.currency, values.usdPkr);
  const receivedText = result ? money(result.received) : "—";

  const days = CLEARANCE_DAYS[values.tier];
  const completedDay = parseIsoDay(values.completed);
  const clearsText = completedDay
    ? `${formatDay(addDays(completedDay, days))} (${days} days)`
    : `${days} days after completion`;
  const belowMinimum =
    result != null && method.minimum != null && result.earnings < method.minimum;

  useEffect(() => {
    const id = window.setTimeout(() => {
      ready.current = true;
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!ready.current) return;
    const id = window.setTimeout(() => {
      setAnnouncement(invalid ? "Enter a valid Gig price" : `Estimated amount withdrawn ${receivedText}`);
    }, 500);
    return () => window.clearTimeout(id);
  }, [invalid, receivedText]);

  function setField(key: keyof Values, value: string) {
    setShowExample(false);
    setValues((current) => ({ ...current, [key]: value }));
    if (key in RULES || key === "usdPkr") {
      setTouched((current) => ({ ...current, [key]: true }));
    }
  }

  function setMethod(id: PayoutMethodId) {
    const next = payoutMethod(id);
    setShowExample(false);
    setValues((current) => ({
      ...current,
      method: id,
      payoutFee: next.fee == null ? current.payoutFee : String(next.fee),
    }));
  }

  function resetExample() {
    setValues(EXAMPLE);
    setShowExample(true);
    setTouched({});
    setAnnouncement("");
    window.setTimeout(() => priceRef.current?.focus(), 0);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
  }

  function describedBy(field: FieldName, hintId?: string) {
    const ids = [hintId, visibleErrors[field] ? `${formId}-${field}-error` : ""].filter(Boolean).join(" ");
    return ids || undefined;
  }

  const gross = result?.gross ?? 0;
  const keepShare = result && gross > 0 ? (result.received / gross) * 100 : 0;
  const feeShare = result && gross > 0 ? (result.fiverrFee / gross) * 100 : 0;
  const payoutShare = result && gross > 0 ? (result.payoutFee / gross) * 100 : 0;
  const extrasValue = parseDecimal(values.extras);
  const tipValue = parseDecimal(values.tip);
  const addOns = [
    extrasValue && extrasValue > 0 ? `${formatMoney(extrasValue, "USD")} extras` : "",
    tipValue && tipValue > 0 ? `${formatMoney(tipValue, "USD")} tip` : "",
  ].filter(Boolean);

  return (
    <section aria-labelledby="calc-title" className="fee-hero-card">
      <form onSubmit={onSubmit} noValidate>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 id="calc-title" className="fee-contract-title">
            Your order
          </h2>
          <p className="fee-example-kicker" hidden={!showExample}>
            Example: $100 order, PayPal
          </p>
        </div>

        <a href="#result" className="fee-mobile-summary">
          <span>Estimated withdrawn</span>
          <span className="flex items-center gap-2">
            <b className="text-copy tabular-nums">{receivedText}</b>
            <span className="underline underline-offset-4">Breakdown</span>
          </span>
        </a>

        <div className="mt-4">
          <Field
            id={`${formId}-price`}
            label="Gig price"
            value={values.price}
            symbol={symbol}
            placeholder="e.g. 100"
            hint="The package price you set, not the buyer's checkout total."
            hintId={`${formId}-price-hint`}
            describedBy={describedBy("price", `${formId}-price-hint`)}
            error={visibleErrors.price}
            errorId={`${formId}-price-error`}
            inputRef={priceRef}
            onChange={(value) => setField("price", value)}
            onBlur={() => setTouched((current) => ({ ...current, price: true }))}
          />
        </div>

        <details className="fee-details">
          <summary>
            <span>
              Add Gig extras or a tip{" "}
              {addOns.length > 0 && <span className="font-normal text-[#64748b]">({addOns.join(", ")})</span>}
            </span>
            <Chevron />
          </summary>
          <div className="grid grid-cols-2 gap-3 px-3 pb-3">
            <Field
              id={`${formId}-extras`}
              label="Gig extras"
              value={values.extras}
              symbol={symbol}
              error={visibleErrors.extras}
              errorId={`${formId}-extras-error`}
              onChange={(value) => setField("extras", value)}
              onBlur={() => setTouched((current) => ({ ...current, extras: true }))}
            />
            <Field
              id={`${formId}-tip`}
              label="Tip"
              value={values.tip}
              symbol={symbol}
              error={visibleErrors.tip}
              errorId={`${formId}-tip-error`}
              onChange={(value) => setField("tip", value)}
              onBlur={() => setTouched((current) => ({ ...current, tip: true }))}
            />
          </div>
        </details>

        <fieldset className="mt-4">
          <legend className="fee-label">Clearance period</legend>
          <div className="fee-segmented mt-1.5" style={{ border: 0, background: "#eef2f6" }}>
            <label>
              <input
                type="radio"
                name={`${formId}-tier`}
                value="standard"
                checked={values.tier === "standard"}
                onChange={() => setField("tier", "standard")}
              />
              14 days
            </label>
            <label>
              <input
                type="radio"
                name={`${formId}-tier`}
                value="fast"
                checked={values.tier === "fast"}
                onChange={() => setField("tier", "fast")}
              />
              7 days
            </label>
          </div>
          <p className="fee-hint">7 days applies to Seller Plus, Top Rated and Pro sellers.</p>
        </fieldset>

        <div className="mt-3">
          <label className="fee-label" htmlFor={`${formId}-completed`}>
            Order completed on (optional)
          </label>
          <div className="fee-field mt-1.5">
            <input
              id={`${formId}-completed`}
              type="date"
              className="fee-input"
              value={values.completed}
              aria-describedby={`${formId}-completed-hint`}
              onChange={(event) => setField("completed", event.target.value)}
            />
          </div>
          <p id={`${formId}-completed-hint`} className="fee-hint">
            Clearance starts when the order is marked complete, not when you deliver.
          </p>
        </div>

        <div className="mt-3 grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-3">
          <div>
            <label className="fee-label" htmlFor={`${formId}-method`}>
              Payout method
            </label>
            <div className="fee-field mt-1.5">
              <select
                id={`${formId}-method`}
                className="fee-input"
                value={values.method}
                onChange={(event) => setMethod(event.target.value as PayoutMethodId)}
              >
                {PAYOUT_METHODS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
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
          </div>
          <Field
            id={`${formId}-payout-fee`}
            label="Withdrawal fee"
            value={values.payoutFee}
            symbol={symbol}
            error={visibleErrors.payoutFee}
            errorId={`${formId}-payoutFee-error`}
            onChange={(value) => setField("payoutFee", value)}
            onBlur={() => setTouched((current) => ({ ...current, payoutFee: true }))}
          />
        </div>
        <p className="fee-hint">
          {method.id === "custom"
            ? "Enter the fee shown on your withdrawal screen."
            : `Fiverr lists ${method.fee ? `a $${formatNum(method.fee)} fee` : "no fee"}, a $${formatNum(method.minimum ?? 0)} minimum and ${method.time}. Check the confirm screen.`}
        </p>

        <noscript>
          <p className="fee-noscript">
            Turn on JavaScript to calculate your own figures. The example above shows a $100 order: a $20 Fiverr fee leaves $80, and a PayPal withdrawal has no Fiverr fee.
          </p>
        </noscript>
      </form>

      <ToolResultCard
        currencyId={`${formId}-currency`}
        currency={values.currency}
        onCurrencyChange={(currency) => setField("currency", currency)}
        kicker="Estimated amount withdrawn"
        beforeFigure={
          values.currency === "PKR" ? (
            <div className="fee-block">
              <Field
                id={`${formId}-fx`}
                label="Exchange rate (PKR per US$)"
                value={values.usdPkr}
                suffix="Rs"
                placeholder="e.g. rate from your bank"
                hint={<PkrRateHint />}
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
        figure={receivedText}
        unit={displayCurrency}
        afterFigure={
          showingUsdBecausePkr ? (
            <p className="fee-pkr-note">Enter an exchange rate to see rupees. Showing US dollars until then.</p>
          ) : null
        }
        sentence={
          <p className="fee-keep-copy">
            {result
              ? `You keep ${formatPercent(roundPercent(keepShare, 1), 1)} of the order. It clears ${completedDay ? `on ${clearsText}` : clearsText}.`
              : "Enter a valid Gig price to see the estimate."}
            {belowMinimum && (
              <span className="fee-warn block">
                {` Below the $${formatNum(method.minimum ?? 0)} minimum for this method. Wait for more cleared earnings before withdrawing.`}
              </span>
            )}
          </p>
        }
        bar={[
          { color: "#0f766e", width: keepShare },
          { color: "#0f172a", width: feeShare },
          { color: "#f5c451", width: payoutShare },
        ]}
        rows={[
          { label: "Order total", value: result ? money(result.gross) : "—" },
          {
            label: (
              <>
                <Swatch color="#0f172a" />
                <span>
                  Fiverr fee <span className="ml-1 font-normal">{FIVERR_SELLER_FEE_PERCENT}%</span>
                </span>
              </>
            ),
            value: result ? `−${money(result.fiverrFee)}` : "—",
          },
          { label: "Your earnings", value: result ? money(result.earnings) : "—" },
          {
            label: (
              <>
                <Swatch color="#f5c451" />
                <span>Withdrawal fee</span>
              </>
            ),
            value: result ? `−${money(result.payoutFee)}` : "—",
          },
          { label: "Available to withdraw", value: result ? clearsText : "—" },
          {
            label: (
              <>
                <Swatch color="#0f766e" />
                <span>Amount withdrawn</span>
              </>
            ),
            value: receivedText,
            keep: true,
          },
        ]}
        fine="Estimates only. Not affiliated with Fiverr. Taxes and your bank's own charges not included."
        onReset={resetExample}
        announcement={announcement}
      />
    </section>
  );
}
