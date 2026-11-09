"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PkrRateHint from "@/components/tools/PkrRateHint";
import InvoiceSheet from "@/components/tools/InvoiceSheet";
import {
  computeInvoice,
  defaultDraft,
  emptyLine,
  INVOICE_CURRENCIES,
  INVOICE_TEMPLATES,
  parseInvoiceTemplate,
  lineAmount,
  money,
  type InvoiceDraft,
} from "@/lib/invoice";
import {
  downloadInvoice,
  invoiceFileStem,
  printInvoice,
  type InvoiceExportAction,
} from "@/lib/invoiceDownload";
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
      template: parseInvoiceTemplate(data.template),
    };
  } catch {
    return {};
  }
}

export default function InvoiceGenerator() {
  const [draft, setDraft] = useState<InvoiceDraft>(defaultDraft);
  const [hydrated, setHydrated] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const captureRef = useRef<HTMLDivElement>(null);
  const fullScreenCloseRef = useRef<HTMLButtonElement>(null);
  const fullScreenOpenRef = useRef<HTMLButtonElement>(null);

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
        template: draft.template,
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
    draft.template,
  ]);

  useEffect(() => {
    if (!fullScreen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    fullScreenCloseRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullScreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      fullScreenOpenRef.current?.focus();
    };
  }, [fullScreen]);

  const totals = useMemo(() => computeInvoice(draft), [draft]);
  const templateMeta =
    INVOICE_TEMPLATES.find((item) => item.id === draft.template) ??
    INVOICE_TEMPLATES[0];
  const fileStem = invoiceFileStem(draft);

  async function handleExport(action: InvoiceExportAction) {
    if (action === "print") {
      printInvoice();
      return;
    }
    if (downloading) return;
    if (action === "pdf" && !captureRef.current) return;
    setDownloadError("");
    setDownloading(true);
    try {
      await downloadInvoice(captureRef.current, draft, action);
    } catch {
      setDownloadError("Could not download the invoice. Try again.");
    } finally {
      setDownloading(false);
    }
  }

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
        className="inv-form fee-card"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <section className="inv-section">
          <p className="inv-section-title">Template</p>
          <div
            className="inv-templates"
            role="radiogroup"
            aria-label="Document template"
          >
            {INVOICE_TEMPLATES.map((item) => (
              <button
                key={item.id}
                type="button"
                role="radio"
                className="inv-template"
                aria-checked={draft.template === item.id}
                onClick={() => patch({ template: item.id })}
              >
                <span className="inv-template-name">{item.label}</span>
                <span className="inv-template-hint">{item.hint}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="inv-section">
          <p className="inv-section-title">From</p>
          <div className="inv-grid-2">
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
          </div>
          <Area
            id="from-address"
            label="Address (optional)"
            rows={2}
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
        </section>

        <section className="inv-section">
          <p className="inv-section-title">Bill to</p>
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
            rows={2}
            value={draft.clientAddress}
            placeholder="Client address"
            onChange={(clientAddress) => patch({ clientAddress })}
          />
        </section>

        <section className="inv-section">
          <p className="inv-section-title">Invoice details</p>
          <div className="inv-grid-3">
            <Field
              id="inv-number"
              label="Invoice number"
              value={draft.number}
              onChange={(number) => patch({ number })}
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
        </section>

        <section className="inv-section">
          <div className="inv-section-head">
            <p className="inv-section-title">Line items</p>
            <button
              type="button"
              className="fee-btn fee-btn-secondary inv-add-line"
              onClick={() =>
                setDraft((current) => ({
                  ...current,
                  lines: [...current.lines, emptyLine()],
                }))
              }
            >
              Add line
            </button>
          </div>
          <div className="inv-lines">
            {draft.lines.map((line, index) => (
              <div key={line.id} className="inv-line">
                <Field
                  id={`${line.id}-desc`}
                  label="Description"
                  labelClassName="inv-line-label"
                  value={line.description}
                  placeholder="Description of work"
                  onChange={(description) => updateLine(line.id, { description })}
                />
                <Field
                  id={`${line.id}-qty`}
                  label="Qty"
                  labelClassName="inv-line-label"
                  inputMode="decimal"
                  value={line.qty}
                  onChange={(qty) => updateLine(line.id, { qty })}
                />
                <Field
                  id={`${line.id}-rate`}
                  label="Rate"
                  labelClassName="inv-line-label"
                  inputMode="decimal"
                  value={line.rate}
                  onChange={(rate) => updateLine(line.id, { rate })}
                />
                <div className="inv-line-amt">
                  <span className="inv-line-label">Amount</span>
                  <p>{money(lineAmount(line), draft.currency)}</p>
                </div>
                <button
                  type="button"
                  className="fee-btn fee-btn-secondary inv-remove"
                  disabled={draft.lines.length === 1}
                  aria-label={`Remove line ${index + 1}`}
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
            ))}
          </div>
        </section>

        <section className="inv-section">
          <p className="inv-section-title">Notes and payment</p>
          <Area
            id="notes"
            label="Notes (optional)"
            rows={3}
            value={draft.notes}
            placeholder="Payment terms, a thank-you, NTN if not in the field above"
            onChange={(notes) => patch({ notes })}
          />
          <Area
            id="payment"
            label="Payment details (optional)"
            rows={3}
            value={draft.paymentDetails}
            placeholder="IBAN, JazzCash, Payoneer or Wise details"
            onChange={(paymentDetails) => patch({ paymentDetails })}
          />

          {draft.currency === "USD" && (
            <div className="inv-pkr">
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
        </section>

        <div className="inv-actions">
          <DownloadMenu
            variant="primary"
            disabled={downloading}
            filename={fileStem}
            onPick={handleExport}
          />
          <p className="fee-hint m-0">
            {downloadError ||
              "Print, or save as PDF or Word on this device. Nothing is uploaded."}
          </p>
        </div>
      </form>

      <div className="inv-preview-col">
        <div className="inv-preview-bar">
          <p className="inv-preview-label">Live preview · {templateMeta.label}</p>
          <div className="inv-preview-actions">
            <DownloadMenu
              variant="link"
              disabled={downloading}
              filename={fileStem}
              onPick={handleExport}
            />
            <button
              ref={fullScreenOpenRef}
              type="button"
              className="inv-preview-link"
              onClick={() => setFullScreen(true)}
            >
              Full screen
            </button>
          </div>
        </div>
        <div className="inv-preview-frame">
          <div className="inv-preview-scale">
            <InvoiceSheet draft={draft} totals={totals} id="invoice-preview" />
          </div>
        </div>
      </div>

      {fullScreen && (
        <div
          className="inv-preview-fs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="inv-preview-fs-title"
        >
          <div className="inv-preview-fs-panel">
            <div className="inv-preview-bar">
              <p id="inv-preview-fs-title" className="inv-preview-label">
                Live preview · {templateMeta.label}
              </p>
              <div className="inv-preview-actions">
                <DownloadMenu
                  variant="link"
                  disabled={downloading}
                  filename={fileStem}
                  onPick={handleExport}
                />
                <button
                  ref={fullScreenCloseRef}
                  type="button"
                  className="inv-preview-link"
                  onClick={() => setFullScreen(false)}
                >
                  Close
                </button>
              </div>
            </div>
            <div className="inv-preview-fs-paper">
              <div className="inv-preview-scale">
                <InvoiceSheet draft={draft} totals={totals} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={captureRef} className="inv-capture" aria-hidden="true">
        <InvoiceSheet draft={draft} totals={totals} />
      </div>
    </div>
  );
}

function DownloadMenu({
  variant,
  disabled,
  filename,
  onPick,
}: {
  variant: "primary" | "link";
  disabled: boolean;
  filename: string;
  onPick: (action: InvoiceExportAction) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={variant === "primary" ? "inv-dl inv-dl-primary" : "inv-dl"}
    >
      <button
        type="button"
        className={variant === "primary" ? "fee-btn fee-btn-primary" : "inv-preview-link"}
        aria-haspopup="menu"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
      >
        {disabled ? "Downloading…" : "Download"}
      </button>
      {open && (
        <div className="inv-dl-menu" role="menu">
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onPick("print");
            }}
          >
            Print
            <span>A4, this device</span>
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onPick("pdf");
            }}
          >
            Download PDF
            <span>{filename}.pdf</span>
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onPick("docx");
            }}
          >
            Download Word
            <span>{filename}.docx</span>
          </button>
        </div>
      )}
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
  labelClassName,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "decimal";
  labelClassName?: string;
}) {
  return (
    <div>
      <label className={labelClassName ?? "fee-label"} htmlFor={id}>
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
  rows = 3,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="fee-label" htmlFor={id}>
        {label}
      </label>
      <div className="fee-field mt-1.5 items-start">
        <textarea
          id={id}
          className="fee-input"
          rows={rows}
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}
