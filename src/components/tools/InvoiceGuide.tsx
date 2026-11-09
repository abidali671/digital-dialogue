import { In } from "@/components/tools/ToolGuide";

export default function InvoiceGuide() {
  return (
    <div className="fee-guide">
      <h2 className="fee-section">How to use the invoice generator</h2>
      <ol>
        <li>
          <strong>Fill in who is sending and who is paying.</strong> The preview on the right updates as you type. Your name, email, address, tax ID and payment details stay in this browser only.
        </li>
        <li>
          <strong>Add line items.</strong> One line per deliverable, with quantity and rate. The amount is quantity × rate. Add a flat discount or a tax percentage only if they apply.
        </li>
        <li>
          <strong>Download the PDF.</strong> Use Download PDF, then choose Save as PDF in the print dialog. Nothing is uploaded. Send the file by email or WhatsApp.
        </li>
      </ol>

      <h2 className="fee-section">What belongs on a freelance invoice</h2>
      <p>
        A usable invoice names both parties, uses a unique number, has an issue date and a due date, lists the work with amounts, and says how to pay. Add a tax ID or NTN if a client asks for it. For software that also keeps a ledger, see{" "}
        <In href="/blogs/freelancing/accounting-software-for-freelancers">accounting software for freelancers</In>.
      </p>

      <h2 className="fee-section">Marketplace work stays on the marketplace</h2>
      <p>
        Do not invoice an Upwork or Fiverr client off-platform. Those platforms already issue the payment record. Use this generator for direct clients. To record what a marketplace paid after fees, use the{" "}
        <In href="/tools/upwork-fee-calculator">Upwork fee calculator</In> or the{" "}
        <In href="/tools/fiverr-fee-calculator">Fiverr fee calculator</In>, then enter the net figure in a ledger.
      </p>

      <h2 className="fee-section">The optional PKR line</h2>
      <p>
        Invoices stay in one currency. If the invoice is in US dollars, you can add an “about in PKR” total for your own records. Enter the rate your bank or wallet actually uses. It is a reference, not a second amount due.
      </p>

      <h2 className="fee-section">What this tool is not</h2>
      <p>
        It is not FBR e-invoicing software. Sales-tax-registered businesses in Pakistan that must issue integrated e-invoices need licensed software for that. This page makes a numbered PDF bill for freelancers and small service providers who are not on that system. It is general information, not tax advice.
      </p>
    </div>
  );
}
