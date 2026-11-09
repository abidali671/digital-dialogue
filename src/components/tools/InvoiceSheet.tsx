import {
  formatInvoiceDay,
  lineAmount,
  money,
  type InvoiceDraft,
  type InvoiceTotals,
} from "@/lib/invoice";
import { parseDecimal } from "@/lib/upworkFee";

export default function InvoiceSheet({
  draft,
  totals,
  id,
}: {
  draft: InvoiceDraft;
  totals: InvoiceTotals;
  id?: string;
}) {
  const filledLines = draft.lines.filter(
    (line) => line.description.trim() || lineAmount(line) > 0,
  );

  return (
    <div className="inv-sheet" data-template={draft.template} id={id}>
      <header className="inv-sheet-top">
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
      </header>
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
  );
}
