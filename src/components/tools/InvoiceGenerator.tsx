"use client";

import { useEffect, useMemo, useState } from "react";
import PkrRateHint from "@/components/tools/PkrRateHint";
import {
  computeInvoice,
  defaultDraft,
  emptyLine,
  formatInvoiceDay,
  INVOICE_CURRENCIES,
  lineAmount,
  money,
  type InvoiceDraft,
} from "@/lib/invoice";
import { parseDecimal } from "@/lib/upworkFee";
import { USD_PKR } from "@/lib/usdPkr";

const STORAGE_KEY = "dd-invoice-from";

function loadSaved(): Partial<InvoiceDraft> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const data = JSON.parse(raw) as Partial<InvoiceDraft>;
    return {
      fromName: data.fromName ?? "",
      fromEmail: data.fromEmail ?? "",
      fromAddress: data.fromAddress ?? "",
      taxId: data.taxId ?? "",
      paymentDetails: data.paymentDetails ?? "",
      currency: data.currency,
    };
  } catch {
    return {};
  }
}

export default function InvoiceGenerator() {
  const [draft, setDraft] = useState<InvoiceDraft>(defaultDraft);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadSaved();
    setDraft((current) => ({ ...current, ...saved }));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        fromName: draft.fromName,
        fromEmail: draft.fromEmail,
        fromAddress: draft.fromAddress,
        taxId: draft.taxId,
        paymentDetails: draft.paymentDetails,
        currency: draft.currency,
      }),
    );
  }, [
    hydrated,
    draft.fromName,
    draft.fromEmail,
    draft.fromAddress,
    draft.taxId,
    draft.paymentDetails,
    draft.currency,
  ]);

  const totals = useMemo(() => computeInvoice(draft), [draft]);
  const filledLines = draft.lines.filter(
    (line) => line.description.trim() || lineAmount(line) > 0,
  );

  function patch(update: Partial<InvoiceDraft>) {
    setDraft((current) => ({ ...current, ...update }));
  }

  function updateLine(id: string, update: Partial<(typeof draft.lines)[0]>) {
    setDraft((current) => ({
      ...current,
      lines: current.lines.map((line) =>
        line.id === id ? { ...line, ...update } : line,
      ),
    }));
  }

  return (
    <div className="inv-layout">
      <form
        id="invoice-form"
        className="inv-form fee-card p-5 sm:p-6"
        onSubmit={(event) => {
          event.preventDefault();
          window.print();
        }}
      >
        <p className="fee-label">From</p>
        <Field
          id="from-name"
          label="Your name or business"
          value={draft.fromName}
          placeholder="Your business name"
          onChange={(fromName) => patch({ fromName })}
        />
        <Field
          id="from-email"
          label="Email (optional)"
          type="email"
          value={draft.fromEmail}
          placeholder="you@business.com"
          onChange={(fromEmail) => patch({ fromEmail })}
        />
        <Area
          id="from-address"
          label="Address (optional)"
          value={draft.fromAddress}
          placeholder="Street, city, country"
          onChange={(fromAddress) => patch({ fromAddress })}
        />
        <Field
          id="tax-id"
          label="Tax ID / NTN (optional)"
          value={draft.taxId}
          placeholder="Only if a client asks for it"
          onChange={(taxId) => patch({ taxId })}
        />

        <p className="fee-label mt-6">Bill to</p>
        <Field
          id="client-name"
          label="Client name"
          value={draft.clientName}
          placeholder="Client or company name"
          onChange={(clientName) => patch({ clientName })}
        />
        <Area
          id="client-address"
          label="Client address (optional)"
          value={draft.clientAddress}
          placeholder="Client address"
          onChange={(clientAddress) => patch({ clientAddress })}
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field
            id="inv-number"
            label="Invoice number"
            value={draft.number}
            onChange={(number) => patch({ number })}
          />
          <Field
            id="issue-date"
            label="Issue date"
            type="date"
            value={draft.issueDate}
            onChange={(issueDate) => patch({ issueDate })}
          />
          <Field
            id="due-date"
            label="Due date"
            type="date"
            value={draft.dueDate}
            onChange={(dueDate) => patch({ dueDate })}
          />
          <div>
            <label className="fee-label" htmlFor="inv-currency">
              Currency
            </label>
            <div className="fee-field mt-1.5">
              <select
                id="inv-currency"
                className="fee-input"
                value={draft.currency}
                onChange={(event) =>
                  patch({
                    currency: event.target.value as InvoiceDraft["currency"],
                    showPkrLine:
                      event.target.value === "USD" ? draft.showPkrLine : false,
                  })
                }
              >
                {INVOICE_CURRENCIES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Field
            id="tax-rate"
            label="Tax %"
            inputMode="decimal"
            value={draft.taxPercent}
            onChange={(taxPercent) => patch({ taxPercent })}
          />
          <Field
            id="discount"
            label="Discount (flat)"
            inputMode="decimal"
            value={draft.discount}
            onChange={(discount) => patch({ discount })}
          />
        </div>

        <p className="fee-label mt-6">Line items</p>
        <div className="inv-lines">
          {draft.lines.map((line, index) => (
            <div key={line.id} className="inv-line">
              <Field
                id={`${line.id}-desc`}
                label={index === 0 ? "Description" : `Line ${index + 1}`}
                value={line.description}
                placeholder="Description of work"
                onChange={(description) => updateLine(line.id, { description })}
              />
              <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                <Field
                  id={`${line.id}-qty`}
                  label="Qty"
                  inputMode="decimal"
                  value={line.qty}
                  onChange={(qty) => updateLine(line.id, { qty })}
                />
                <Field
                  id={`${line.id}-rate`}
                  label="Rate"
                  inputMode="decimal"
                  value={line.rate}
                  onChange={(rate) => updateLine(line.id, { rate })}
                />
                <button
                  type="button"
                  className="fee-btn fee-btn-secondary mt-7 min-h-12 px-3"
                  disabled={draft.lines.length === 1}
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      lines: current.lines.filter((item) => item.id !== line.id),
                    }))
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="fee-btn fee-btn-secondary mt-3"
          onClick={() =>
            setDraft((current) => ({
              ...current,
              lines: [...current.lines, emptyLine()],
            }))
          }
        >
          Add line
        </button>

        <Area
          id="notes"
          label="Notes (optional)"
          className="mt-6"
          value={draft.notes}
          placeholder="Payment terms, a thank-you, NTN if not in the field above"
          onChange={(notes) => patch({ notes })}
        />
        <Area
          id="payment"
          label="Payment details (optional)"
          value={draft.paymentDetails}
          placeholder="IBAN, JazzCash, Payoneer or Wise details"
          onChange={(paymentDetails) => patch({ paymentDetails })}
        />

        {draft.currency === "USD" && (
          <div className="mt-6">
            <label className="fee-check">
              <input
                type="checkbox"
                checked={draft.showPkrLine}
                onChange={(event) =>
                  patch({ showPkrLine: event.target.checked })
                }
              />
              Show a PKR total line
            </label>
            {draft.showPkrLine && (
              <div className="mt-3">
                <Field
                  id="pkr-rate"
                  label="USD to PKR rate"
                  inputMode="decimal"
                  value={draft.pkrRate}
                  placeholder={USD_PKR.rate}
                  onChange={(pkrRate) => patch({ pkrRate })}
                />
                <p className="fee-hint">
                  <PkrRateHint />
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="submit" className="fee-btn fee-btn-primary">
            Download PDF
          </button>
          <p className="fee-hint m-0 self-center">
            Choose Save as PDF in the print dialog. Nothing is uploaded.
          </p>
        </div>
      </form>

      <div className="inv-preview-col">
        <div className="inv-sheet" id="invoice-preview">
          <p className="inv-kicker">Invoice</p>
          <div className="inv-head">
            <div>
              <p className="inv-from">{draft.fromName.trim() || "Your name"}</p>
              {draft.fromEmail.trim() && <p>{draft.fromEmail.trim()}</p>}
              {draft.fromAddress.trim() && (
                <p className="whitespace-pre-line">{draft.fromAddress.trim()}</p>
              )}
              {draft.taxId.trim() && <p>Tax ID / NTN: {draft.taxId.trim()}</p>}
            </div>
            <dl className="inv-meta">
              <div>
                <dt>Number</dt>
                <dd>{draft.number.trim() || "—"}</dd>
              </div>
              <div>
                <dt>Issued</dt>
                <dd>{formatInvoiceDay(draft.issueDate)}</dd>
              </div>
              <div>
                <dt>Due</dt>
                <dd>{formatInvoiceDay(draft.dueDate)}</dd>
              </div>
            </dl>
          </div>
          <div className="inv-billto">
            <p className="inv-label">Bill to</p>
            <p className="inv-from">{draft.clientName.trim() || "Client name"}</p>
            {draft.clientAddress.trim() && (
              <p className="whitespace-pre-line">{draft.clientAddress.trim()}</p>
            )}
          </div>
          <table className="inv-table">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Qty</th>
                <th scope="col">Rate</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {(filledLines.length ? filledLines : draft.lines).map((line) => (
                <tr key={line.id}>
                  <td>{line.description.trim() || "—"}</td>
                  <td>{line.qty.trim() || "—"}</td>
                  <td>
                    {money(Math.max(0, parseDecimal(line.rate) || 0), draft.currency)}
                  </td>
                  <td>{money(lineAmount(line), draft.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <dl className="inv-totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{money(totals.subtotal, draft.currency)}</dd>
            </div>
            {totals.discount > 0 && (
              <div>
                <dt>Discount</dt>
                <dd>−{money(totals.discount, draft.currency)}</dd>
              </div>
            )}
            {totals.tax > 0 && (
              <div>
                <dt>Tax ({draft.taxPercent.trim() || "0"}%)</dt>
                <dd>{money(totals.tax, draft.currency)}</dd>
              </div>
            )}
            <div className="inv-total">
              <dt>Total due</dt>
              <dd>{money(totals.total, draft.currency)}</dd>
            </div>
            {totals.pkrTotal !== null && (
              <div>
                <dt>About in PKR</dt>
                <dd>{money(totals.pkrTotal, "PKR")}</dd>
              </div>
            )}
          </dl>
          {draft.paymentDetails.trim() && (
            <div className="inv-block">
              <p className="inv-label">Payment details</p>
              <p className="whitespace-pre-line">{draft.paymentDetails.trim()}</p>
            </div>
          )}
          {draft.notes.trim() && (
            <div className="inv-block">
              <p className="inv-label">Notes</p>
              <p className="whitespace-pre-line">{draft.notes.trim()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "decimal";
}) {
  return (
    <div>
      <label className="fee-label" htmlFor={id}>
        {label}
      </label>
      <div className="fee-field mt-1.5">
        <input
          id={id}
          className="fee-input"
          type={type}
          inputMode={inputMode}
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}

function Area({
  id,
  label,
  value,
  onChange,
  placeholder,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="fee-label" htmlFor={id}>
        {label}
      </label>
      <div className="fee-field mt-1.5 min-h-[4.5rem] items-start">
        <textarea
          id={id}
          className="fee-input min-h-[4.5rem] resize-y py-2"
          rows={3}
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}
