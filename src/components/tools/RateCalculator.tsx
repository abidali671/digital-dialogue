"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { CalculatorField as Field, Chevron } from "@/components/tools/CalculatorField";
import { Swatch, ToolResultCard } from "@/components/tools/ToolResultCard";
import { computeRate, type BillMode, type RatePeriod, type RateResult } from "@/lib/freelanceRate";
import { formatNum, formatPercent, parseDecimal } from "@/lib/upworkFee";
import { entrySymbol, formatCalculatorMoney, usdPkrFieldError, usdPkrRateNumber } from "@/lib/usdPkr";

const FEE_HELP =
  "https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee";

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

const EXAMPLE: Values = {
  period: "month",
  billMode: "hours",
  takeHome: "1500",
  expenses: "200",
  workHours: "40",
  weeks: "",
  billHours: "25",
  billPct: "62.5",
  fee: "10",
  currency: "USD",
  usdPkr: "",
};

type ErrorKey = "takeHome" | "expenses" | "workHours" | "weeks" | "billHours" | "billPct" | "fee" | "usdPkr";

function feeQuery(hourly: number, result: RateResult, currency: string, usdPkr: string) {
  const params = new URLSearchParams({
    rate: hourly.toFixed(2),
    hours: result.billMonth.toFixed(2),
    fee: String(result.feePct),
    currency,
  });
  if (currency === "PKR" && usdPkr.trim() && usdPkrFieldError(usdPkr) === "") {
    params.set("usdPkr", usdPkr.trim());
  }
  return params.toString();
}

export default function RateCalculator() {
  const [values, setValues] = useState<Values>(EXAMPLE);
  const [showExample, setShowExample] = useState(true);
  const [touched, setTouched] = useState<Partial<Record<ErrorKey, boolean>>>({});
  const [announcement, setAnnouncement] = useState("");
  const [detailsKey, setDetailsKey] = useState(0);
  const goalRef = useRef<HTMLInputElement>(null);
  const ready = useRef(false);
  const formId = useId();
  const symbol = entrySymbol(values.currency);
  const hoursMode = values.billMode === "hours";

  const messages: Partial<Record<ErrorKey, string>> = {};
  const take = parseDecimal(values.takeHome);
  if (take === null) messages.takeHome = "Enter take-home goal.";
  else if (Number.isNaN(take)) messages.takeHome = "Take-home goal must be a number, like 1500.";
  else if (take <= 0) messages.takeHome = "Take-home goal must be more than 0.";

  if (values.expenses.trim()) {
    const expenses = parseDecimal(values.expenses);
    if (expenses === null || Number.isNaN(expenses)) messages.expenses = "Business expenses must be a number, like 200.";
    else if (expenses < 0) messages.expenses = "Business expenses can’t be negative.";
  }

  const work = parseDecimal(values.workHours);
  if (work === null) messages.workHours = "Enter working hours.";
  else if (Number.isNaN(work)) messages.workHours = "Working hours must be a number, like 40.";
  else if (work <= 0) messages.workHours = "Working hours must be more than 0.";
  else if (work > 168) messages.workHours = "Working hours can’t be more than 168 a week.";

  if (values.weeks.trim()) {
    const weeks = parseDecimal(values.weeks);
    if (weeks === null || Number.isNaN(weeks) || weeks < 1 || weeks > 52) {
      messages.weeks = "Working weeks must be between 1 and 52.";
    }
  }

  if (hoursMode) {
    const hours = parseDecimal(values.billHours);
    if (hours === null) messages.billHours = "Enter your billable hours per week.";
    else if (Number.isNaN(hours)) messages.billHours = "Billable hours must be a number, like 25.";
    else if (hours <= 0) messages.billHours = "Add at least 1 billable hour a week.";
    else if (work != null && !Number.isNaN(work) && hours > work) {
      messages.billHours = `Billable hours can’t be more than the ${formatNum(work, 0)} hours you work.`;
    }
  } else {
    const pct = parseDecimal(values.billPct);
    if (pct === null) messages.billPct = "Enter billable share.";
    else if (Number.isNaN(pct)) messages.billPct = "Billable share must be a number, like 62.5.";
    else if (pct <= 0 || pct > 100) messages.billPct = "Billable share must be between 1% and 100%.";
    else if (work != null && !Number.isNaN(work) && work > 0 && (work * pct) / 100 <= 0) {
      messages.billPct = "Add at least 1 billable hour a week.";
    }
  }

  const fee = parseDecimal(values.fee);
  if (fee === null) messages.fee = "Enter fees.";
  else if (Number.isNaN(fee)) messages.fee = "Fees must be a number, like 10.";
  else if (fee < 0) messages.fee = "Fees can’t be negative.";
  else if (fee >= 100) messages.fee = "A 100% fee leaves nothing to take home. Enter a fee below 100%.";

  if (values.currency === "PKR" && values.usdPkr.trim()) {
    const rateMessage = usdPkrFieldError(values.usdPkr);
    if (rateMessage && rateMessage !== "Enter the exchange rate.") messages.usdPkr = rateMessage;
  }

  const visible: Partial<Record<ErrorKey, string>> = {};
  (Object.keys(messages) as ErrorKey[]).forEach((key) => {
    if (touched[key] && messages[key]) visible[key] = messages[key];
  });

  const blocking = Boolean(
    messages.takeHome ||
      messages.expenses ||
      messages.workHours ||
      messages.weeks ||
      (hoursMode ? messages.billHours : messages.billPct) ||
      messages.fee
  );

  const result = blocking
    ? null
    : computeRate({
        period: values.period,
        billMode: values.billMode,
        takeHome: take || 0,
        expenses: parseDecimal(values.expenses) || 0,
        workHours: work || 0,
        weeks: values.weeks.trim() ? parseDecimal(values.weeks) : null,
        billHours: parseDecimal(values.billHours) || 0,
        billPct: parseDecimal(values.billPct) || 0,
        fee: fee || 0,
      }).value;

  const money = (amount: number) => formatCalculatorMoney(amount, values.currency, values.usdPkr);
  const showingUsd = values.currency === "PKR" && usdPkrRateNumber(values.usdPkr) == null;
  const figure = result ? money(result.hourly) : "—";
  const problem =
    (hoursMode ? messages.billHours : messages.billPct) ||
    messages.fee ||
    messages.takeHome ||
    messages.workHours ||
    messages.weeks ||
    messages.expenses ||
    "Enter a valid amount to see the rate.";
  const announceText = result ? `Minimum rate ${figure} an hour` : problem;
  const feeHigh = fee != null && !Number.isNaN(fee) && fee > 15 && fee < 100;

  useEffect(() => {
    const id = window.setTimeout(() => {
      ready.current = true;
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!ready.current) return;
    const id = window.setTimeout(() => setAnnouncement(announceText), 500);
    return () => window.clearTimeout(id);
  }, [announceText]);

  function touch(key: ErrorKey) {
    setTouched((current) => ({ ...current, [key]: true }));
  }

  function setField<K extends keyof Values>(key: K, value: Values[K]) {
    setShowExample(false);
    setValues((current) => ({ ...current, [key]: value }));
    if (key !== "period" && key !== "billMode" && key !== "currency") touch(key as ErrorKey);
  }

  function describedBy(field: ErrorKey, hintId?: string) {
    return [hintId, visible[field] ? `${formId}-${field}-error` : ""].filter(Boolean).join(" ") || undefined;
  }

  function resetExample() {
    setValues(EXAMPLE);
    setShowExample(true);
    setTouched({});
    setAnnouncement("");
    setDetailsKey((key) => key + 1);
    window.setTimeout(() => goalRef.current?.focus(), 0);
  }

  const weeksNumber = values.weeks.trim() ? parseDecimal(values.weeks) : 48;
  const expenseNumber = parseDecimal(values.expenses);
  const summaryBits: string[] = [];
  if (expenseNumber != null && !Number.isNaN(expenseNumber) && expenseNumber > 0) {
    summaryBits.push(money(expenseNumber).replace(/\.00$/, ""));
  }
  if (weeksNumber != null && !Number.isNaN(weeksNumber)) summaryBits.push(`${formatNum(weeksNumber, 0)} wks`);

  const gross = result?.gross || 0;
  const share = (amount: number) => (gross > 0 ? (amount / gross) * 100 : 0);

  return (
    <section aria-labelledby="calc-title" className="fee-hero-card">
      <form onSubmit={(event: FormEvent) => event.preventDefault()} noValidate>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 id="calc-title" className="fee-contract-title">
            Your goals and hours
          </h2>
          <p className="fee-example-kicker" hidden={!showExample}>
            Example: $1,500-a-month goal
          </p>
        </div>

        <fieldset className="fee-block">
          <legend className="sr-only">Goal period</legend>
          <div className="fee-segmented" style={{ border: 0, background: "#eef2f6" }}>
            {(["month", "year"] as const).map((period) => (
              <label key={period}>
                <input
                  type="radio"
                  name={`${formId}-period`}
                  value={period}
                  checked={values.period === period}
                  onChange={() => setField("period", period)}
                />
                {period === "month" ? "Monthly" : "Yearly"}
              </label>
            ))}
          </div>
        </fieldset>

        <a href="#result" className="fee-mobile-summary">
          <span>Minimum rate</span>
          <span className="flex items-center gap-2">
            <b className="text-[16px] tabular-nums">{result ? `${figure}/hr` : "—"}</b>
            <span className="underline underline-offset-4">Breakdown</span>
          </span>
        </a>

        <div className="fee-two">
          <Field
            id={`${formId}-takeHome`}
            inputRef={goalRef}
            label="Take-home goal"
            value={values.takeHome}
            symbol={symbol}
            placeholder="e.g. 1500"
            error={visible.takeHome}
            errorId={`${formId}-takeHome-error`}
            onChange={(value) => setField("takeHome", value)}
            onBlur={() => touch("takeHome")}
          />
          <div>
            <p className="fee-label" aria-hidden="true">
              Billable time
            </p>
            <fieldset>
              <legend className="sr-only">Billable time</legend>
              <div className="fee-segmented" style={{ border: 0, background: "#eef2f6" }}>
                {(["hours", "pct"] as const).map((mode) => (
                  <label key={mode}>
                    <input
                      type="radio"
                      name={`${formId}-bill`}
                      value={mode}
                      checked={values.billMode === mode}
                      onChange={() => setField("billMode", mode)}
                    />
                    {mode === "hours" ? "Hours" : "Percent"}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <div className="fee-hours">
          <Field
            id={`${formId}-work`}
            label="Working hours"
            value={values.workHours}
            suffix="hrs"
            placeholder="e.g. 40"
            error={visible.workHours}
            errorId={`${formId}-workHours-error`}
            onChange={(value) => setField("workHours", value)}
            onBlur={() => touch("workHours")}
          />
          <div hidden={!hoursMode}>
            <Field
              id={`${formId}-billHours`}
              label="Billable hours"
              value={values.billHours}
              suffix="hrs"
              placeholder="e.g. 25"
              error={visible.billHours}
              errorId={`${formId}-billHours-error`}
              onChange={(value) => setField("billHours", value)}
              onBlur={() => touch("billHours")}
            />
          </div>
          <div hidden={hoursMode}>
            <Field
              id={`${formId}-billPct`}
              label="Billable time"
              value={values.billPct}
              suffix="%"
              placeholder="e.g. 62.5"
              error={visible.billPct}
              errorId={`${formId}-billPct-error`}
              onChange={(value) => setField("billPct", value)}
              onBlur={() => touch("billPct")}
            />
          </div>
          <div className="fee-hours-span">
            <Field
              id={`${formId}-fee`}
              label="Fees"
              value={values.fee}
              suffix="%"
              error={visible.fee}
              errorId={`${formId}-fee-error`}
              describedBy={
                [feeHigh ? `${formId}-fee-hint` : "", visible.fee ? `${formId}-fee-error` : ""]
                  .filter(Boolean)
                  .join(" ") || undefined
              }
              onChange={(value) => setField("fee", value)}
              onBlur={() => touch("fee")}
            />
          </div>
        </div>
        <p id={`${formId}-goal-hint`} className="fee-hint">
          Goal is take-home {values.period === "year" ? "each year" : "each month"}, before tax.{" "}
          {hoursMode
            ? "Hours are per week; billable is what a client pays for."
            : "Hours are per week; billable is the % of them a client pays for."}{" "}
          Fees:{" "}
          <a className="fee-link" href={FEE_HELP} target="_blank" rel="noopener noreferrer">
            Upwork Help
          </a>{" "}
          <span className="fee-kicker-note">(opens Upwork Help in a new tab)</span>
          {feeHigh ? <span id={`${formId}-fee-hint`}> Upwork&apos;s range is 0–15%.</span> : null}
        </p>

        <noscript>
          <p className="fee-noscript">
            Turn on JavaScript to update the estimate. The result below shows the $1,500-a-month example.
          </p>
        </noscript>

        <details key={detailsKey} className="fee-details">
          <summary>
            <span>
              Expenses and working weeks{" "}
              {summaryBits.length > 0 && (
                <span className="font-normal text-[#64748b]">({summaryBits.join(" · ")})</span>
              )}
            </span>
            <Chevron />
          </summary>
          <div className="fee-two px-3 pb-3">
            <Field
              id={`${formId}-expenses`}
              label="Business expenses"
              value={values.expenses}
              symbol={symbol}
              hint="Software, ads and other costs. Optional."
              hintId={`${formId}-expenses-hint`}
              describedBy={describedBy("expenses", `${formId}-expenses-hint`)}
              error={visible.expenses}
              errorId={`${formId}-expenses-error`}
              onChange={(value) => setField("expenses", value)}
              onBlur={() => touch("expenses")}
            />
            <Field
              id={`${formId}-weeks`}
              label="Working weeks"
              value={values.weeks}
              suffix="wks"
              placeholder="48"
              hint="Leave blank to use 48."
              hintId={`${formId}-weeks-hint`}
              describedBy={describedBy("weeks", `${formId}-weeks-hint`)}
              error={visible.weeks}
              errorId={`${formId}-weeks-error`}
              onChange={(value) => setField("weeks", value)}
              onBlur={() => touch("weeks")}
            />
          </div>
        </details>
      </form>

      <ToolResultCard
        currencyId={`${formId}-currency`}
        currency={values.currency}
        onCurrencyChange={(currency) => setField("currency", currency)}
        kicker="Minimum rate"
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
                error={visible.usdPkr}
                errorId={`${formId}-usdPkr-error`}
                onChange={(value) => setField("usdPkr", value)}
                onBlur={() => touch("usdPkr")}
              />
            </div>
          ) : null
        }
        figure={figure}
        unit={result ? "/hr" : undefined}
        afterFigure={
          showingUsd ? (
            <p className="fee-pkr-note">
              Enter an exchange rate to see rupees. Showing US dollars until then.
            </p>
          ) : null
        }
        sentence={
          <p className="fee-keep-copy">
            {result
              ? `Bill ${formatNum(result.billMonth, 1)} hours a month at this rate to keep ${money(result.takeHome)} after expenses and fees.`
              : problem}
          </p>
        }
        bar={
          result
            ? [
                { color: "#0f766e", width: share(result.takeHome) },
                { color: "#fde68a", width: share(result.expenses) },
                { color: "#1e293b", width: share(result.fees) },
              ]
            : undefined
        }
        legend={
          result ? (
            <p className="fee-legend" aria-hidden="true">
              <span>
                <Swatch color="#0f766e" />
                Take-home {money(result.takeHome)}
              </span>
              <span>
                <Swatch color="#fde68a" ring />
                Expenses
              </span>
              <span>
                <Swatch color="#1e293b" />
                Fees
              </span>
            </p>
          ) : null
        }
        rows={[
          {
            label: (
              <>
                Day rate <span className="fee-kicker-note">(5-day week)</span>
              </>
            ),
            value: result ? money(result.day) : "—",
          },
          { label: "10-hour project", value: result ? money(result.project) : "—" },
          {
            label: (
              <>
                <Swatch color="#1e293b" />
                <span>
                  Fees{result ? ` ${formatPercent(result.feePct)}` : ""}
                </span>
              </>
            ),
            value: result ? money(result.fees) : "—",
          },
          {
            label: "Bill each month",
            value: result ? money(result.gross) : "—",
            keep: true,
          },
        ]}
        extra={
          result ? (
            <p className="fee-extra">
              Check this rate in the{" "}
              <Link className="fee-link" href={`/tools/upwork-fee-calculator?${feeQuery(result.hourly, result, values.currency, values.usdPkr)}`}>
                Upwork Fee Calculator
              </Link>
              .
            </p>
          ) : null
        }
        fine="Estimates only. Tax is not included."
        onReset={resetExample}
        announcement={announcement}
      />
    </section>
  );
}
