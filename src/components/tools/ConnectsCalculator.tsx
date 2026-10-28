"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { CalculatorField as Field, Chevron } from "@/components/tools/CalculatorField";
import PkrRateHint from "@/components/tools/PkrRateHint";
import { ToolResultCard } from "@/components/tools/ToolResultCard";
import { computeConnects } from "@/lib/upworkConnects";
import { formatMoney, formatNum, parseDecimal } from "@/lib/upworkFee";
import { entrySymbol, formatCalculatorMoney, usdPkrFieldError, usdPkrRateNumber } from "@/lib/usdPkr";

const CONNECTS_HELP =
  "https://support.upwork.com/hc/en-us/articles/211062898-Understanding-and-using-Connects";

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

const EXAMPLE: Values = {
  cost: "0.15",
  cpp: "12",
  proposals: "40",
  replies: "8",
  interviews: "5",
  contracts: "2",
  other: "20",
  currency: "USD",
  usdPkr: "",
};

type CountKey = "cpp" | "proposals" | "replies" | "interviews" | "contracts";
type ErrorKey = CountKey | "cost" | "other" | "usdPkr";

function wholeError(label: string, raw: string, max: number) {
  const value = parseDecimal(raw);
  if (value === null) return `Enter ${label.toLowerCase()}.`;
  if (Number.isNaN(value) || !Number.isInteger(value)) return `${label} must be a whole number.`;
  if (value < 0) return `${label} can’t be negative.`;
  if (value > max) return `${label} must be ${formatNum(max, 0)} or less.`;
  return "";
}

function oneDecimal(value: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export default function ConnectsCalculator() {
  const [values, setValues] = useState<Values>(EXAMPLE);
  const [showExample, setShowExample] = useState(true);
  const [touched, setTouched] = useState<Partial<Record<ErrorKey, boolean>>>({});
  const [announcement, setAnnouncement] = useState("");
  const [detailsKey, setDetailsKey] = useState(0);
  const priceRef = useRef<HTMLInputElement>(null);
  const ready = useRef(false);
  const formId = useId();
  const symbol = entrySymbol(values.currency);

  const messages: Partial<Record<ErrorKey, string>> = {};
  if (values.cost.trim() === "") {
    messages.cost = "Enter what you pay per Connect. We don’t assume a price.";
  } else {
    const cost = parseDecimal(values.cost);
    if (cost === null || Number.isNaN(cost)) messages.cost = "Price per Connect must be a number, like 0.15.";
    else if (cost < 0) messages.cost = "Price per Connect can’t be negative.";
  }
  const cppMessage = wholeError("Connects per proposal", values.cpp, 1000);
  if (cppMessage) messages.cpp = cppMessage;
  const proposalsMessage = wholeError("Proposals sent", values.proposals, 1000000);
  if (proposalsMessage) messages.proposals = proposalsMessage;
  const repliesMessage = wholeError("Client replies", values.replies, 1000000);
  if (repliesMessage) messages.replies = repliesMessage;
  const interviewsMessage = wholeError("Interviews", values.interviews, 1000000);
  if (interviewsMessage) messages.interviews = interviewsMessage;
  const contractsMessage = wholeError("Contracts won", values.contracts, 1000000);
  if (contractsMessage) messages.contracts = contractsMessage;
  if (values.other.trim()) {
    const other = parseDecimal(values.other);
    if (other === null || Number.isNaN(other)) messages.other = "Other proposal costs must be a number, like 20.";
    else if (other < 0) messages.other = "Other proposal costs can’t be negative.";
  }
  const proposals = parseDecimal(values.proposals);
  const replies = parseDecimal(values.replies);
  const interviews = parseDecimal(values.interviews);
  const contracts = parseDecimal(values.contracts);
  if (!messages.replies && proposals != null && replies != null && replies > proposals) {
    messages.replies = `Client replies can’t be more than the ${formatNum(proposals, 0)} proposals you sent.`;
  }
  if (!messages.interviews && proposals != null && interviews != null && interviews > proposals) {
    messages.interviews = `Interviews can’t be more than the ${formatNum(proposals, 0)} proposals you sent.`;
  }
  if (!messages.contracts && proposals != null && contracts != null && contracts > proposals) {
    messages.contracts = `Contracts won can’t be more than the ${formatNum(proposals, 0)} proposals you sent.`;
  }
  if (values.currency === "PKR" && values.usdPkr.trim()) {
    const rateMessage = usdPkrFieldError(values.usdPkr);
    if (rateMessage && rateMessage !== "Enter the exchange rate.") messages.usdPkr = rateMessage;
  }

  const visible: Partial<Record<ErrorKey, string>> = {};
  (Object.keys(messages) as ErrorKey[]).forEach((key) => {
    if (touched[key] && messages[key]) visible[key] = messages[key];
  });

  const priceMissing = values.cost.trim() === "";
  const blocking = Boolean(
    messages.cost || messages.cpp || messages.proposals || messages.replies || messages.interviews || messages.contracts || messages.other
  );
  const cpp = parseDecimal(values.cpp);
  const connectsKnown =
    cpp != null &&
    !Number.isNaN(cpp) &&
    proposals != null &&
    !Number.isNaN(proposals) &&
    !messages.cpp &&
    !messages.proposals;
  const connectsCount = connectsKnown ? cpp * proposals : null;

  const otherAmount = parseDecimal(values.other) || 0;
  const computed =
    blocking
      ? null
      : computeConnects({
          costPerConnect: parseDecimal(values.cost) || 0,
          connectsPerProposal: cpp || 0,
          proposals: proposals || 0,
          replies: replies || 0,
          interviews: interviews || 0,
          contracts: contracts || 0,
          otherCosts: otherAmount,
        }).value;

  const money = (amount: number) => formatCalculatorMoney(amount, values.currency, values.usdPkr);
  const showingUsd = values.currency === "PKR" && usdPkrRateNumber(values.usdPkr) == null;
  const unavailable = computed != null && (contracts || 0) <= 0;
  const figure = !computed ? "—" : unavailable ? "Not available yet" : money(computed.perContract.total.value || 0);
  const prompt = priceMissing
    ? "Add the price you pay per Connect to see your costs."
    : messages.cost || messages.cpp || messages.proposals || messages.replies || messages.interviews || messages.contracts || messages.other || "Enter a valid number in every required field.";

  const announceText = !computed
    ? prompt
    : unavailable
      ? "Cost per contract not available yet"
      : `Cost per contract ${figure}`;

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

  function setField(key: keyof Values, value: string) {
    setShowExample(false);
    setValues((current) => ({ ...current, [key]: value }));
    if (key !== "currency") touch(key as ErrorKey);
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
    window.setTimeout(() => priceRef.current?.focus(), 0);
  }

  const otherBits =
    otherAmount > 0 ? `(${formatMoney(otherAmount, values.currency === "PKR" ? "USD" : values.currency)})` : "(optional)";
  const ratio = (value: number | null | undefined) => (value == null ? "Not available yet" : money(value));

  return (
    <section aria-labelledby="calc-title" className="fee-hero-card">
      <form onSubmit={(event: FormEvent) => event.preventDefault()} noValidate>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 id="calc-title" className="fee-contract-title">
            Your Connects and results
          </h2>
          <p className="fee-example-kicker" hidden={!showExample}>
            Example: 40 proposals in 30 days
          </p>
        </div>

        <div className="fee-two">
          <Field
            id={`${formId}-cost`}
            inputRef={priceRef}
            label={
              <>
                Price per Connect <span className="fee-kicker-note">(example price)</span>
              </>
            }
            value={values.cost}
            symbol={symbol}
            placeholder="e.g. what you pay"
            describedBy={describedBy("cost", `${formId}-price-hint`)}
            error={visible.cost}
            errorId={`${formId}-cost-error`}
            onChange={(value) => setField("cost", value)}
            onBlur={() => touch("cost")}
          />
          <Field
            id={`${formId}-cpp`}
            label="Connects per proposal"
            value={values.cpp}
            suffix="Connects"
            inputMode="numeric"
            placeholder="e.g. 12"
            error={visible.cpp}
            errorId={`${formId}-cpp-error`}
            onChange={(value) => setField("cpp", value)}
            onBlur={() => touch("cpp")}
          />
        </div>
        <p id={`${formId}-price-hint`} className="fee-hint">
          What you pay; we don’t assume a price. The $0.15 figure is only an example.{" "}
          <a className="fee-link" href={CONNECTS_HELP} target="_blank" rel="noopener noreferrer">
            Upwork Help
          </a>{" "}
          <span className="fee-kicker-note">(opens Upwork Help in a new tab)</span>
        </p>

        <a href="#result" className="fee-mobile-summary">
          <span>Cost per contract</span>
          <span className="flex items-center gap-2">
            <b className="text-[16px] tabular-nums">{figure}</b>
            <span className="underline underline-offset-4">Breakdown</span>
          </span>
        </a>

        <fieldset className="fee-block">
          <legend className="sr-only">Your proposals and results</legend>
          <div className="fee-counts" style={{ marginTop: 0 }}>
            {(
              [
                ["proposals", "Proposals", values.proposals],
                ["replies", "Replies", values.replies],
                ["interviews", "Interviews", values.interviews],
                ["contracts", "Contracts", values.contracts],
              ] as const
            ).map(([key, label, value]) => (
              <Field
                key={key}
                id={`${formId}-${key}`}
                label={label}
                value={value}
                inputMode="numeric"
                describedBy={[`${formId}-counts-hint`, visible[key] ? `${formId}-${key}-error` : ""].filter(Boolean).join(" ")}
                error={visible[key]}
                errorId={`${formId}-${key}-error`}
                onChange={(next) => setField(key, next)}
                onBlur={() => touch(key)}
              />
            ))}
          </div>
          <p id={`${formId}-counts-hint`} className="fee-hint">
            Sent, client replies, interviews and contracts won in one period. Use 0 if none yet.
          </p>
        </fieldset>

        <noscript>
          <p className="fee-noscript">
            Turn on JavaScript to update the estimate. The result below shows the 40-proposal example.
          </p>
        </noscript>

        <details key={detailsKey} className="fee-details">
          <summary>
            <span>
              Add other proposal costs <span className="font-normal text-[#64748b]">{otherBits}</span>
            </span>
            <Chevron />
          </summary>
          <div className="px-3 pb-3">
            <Field
              id={`${formId}-other`}
              label="Other proposal costs"
              value={values.other}
              symbol={symbol}
              hint="Membership or tools for this period. Kept separate from Connects."
              hintId={`${formId}-other-hint`}
              describedBy={describedBy("other", `${formId}-other-hint`)}
              error={visible.other}
              errorId={`${formId}-other-error`}
              onChange={(value) => setField("other", value)}
              onBlur={() => touch("other")}
            />
          </div>
        </details>
      </form>

      <ToolResultCard
        currencyId={`${formId}-currency`}
        currency={values.currency}
        onCurrencyChange={(currency) => setField("currency", currency)}
        kicker={
          <>
            Cost per contract <span className="fee-kicker-note">(incl. other costs)</span>
          </>
        }
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
                error={visible.usdPkr}
                errorId={`${formId}-usdPkr-error`}
                onChange={(value) => setField("usdPkr", value)}
                onBlur={() => touch("usdPkr")}
              />
            </div>
          ) : null
        }
        figure={figure}
        unit={unavailable || !computed ? undefined : "per contract"}
        afterFigure={
          showingUsd ? (
            <p className="fee-pkr-note">
              Enter an exchange rate to see rupees. Showing US dollars until then.
            </p>
          ) : null
        }
        sentence={
          <p className="fee-keep-copy">
            {computed && unavailable && (
              <>
                <span className="fee-warn">Add at least 1 contract.</span> Your total so far is{" "}
                <strong>{money(computed.total)}</strong>.
              </>
            )}
            {computed && !unavailable && (
              <>
                <strong>{formatNum(computed.totalConnects, 0)} Connects</strong> cost{" "}
                <strong>{money(computed.spend)}</strong>. With <strong>{money(computed.other)}</strong> of other
                costs, that’s <strong>{money(computed.total)}</strong> in total.
              </>
            )}
            {!computed && prompt}
          </p>
        }
        rows={[
          { label: "Total acquisition cost", value: computed ? money(computed.total) : "—" },
          {
            label: (
              <>
                Cost per contract <span className="fee-kicker-note">(Connects only)</span>
              </>
            ),
            value: computed ? ratio(computed.perContract.connects.value) : "—",
          },
          {
            label: (
              <>
                Connects spending{" "}
                <span className="fee-kicker-note">
                  ({connectsCount == null ? "—" : `${formatNum(connectsCount, 0)} Connects`})
                </span>
              </>
            ),
            value: computed ? money(computed.spend) : "—",
          },
          { label: "Cost per reply", value: computed ? ratio(computed.perReply.total.value) : "—" },
          { label: "Cost per interview", value: computed ? ratio(computed.perInterview.total.value) : "—" },
          {
            label: "Reply rate · contract rate",
            value:
              computed && computed.rates.reply.value != null && computed.rates.contract.value != null
                ? `${oneDecimal(computed.rates.reply.value)}% · ${oneDecimal(computed.rates.contract.value)}%`
                : "Not available yet",
          },
        ]}
        fine="Estimates only. Connects prices and refunds change."
        onReset={resetExample}
        announcement={announcement}
      />
    </section>
  );
}
