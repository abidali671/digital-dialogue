function Bar({ width, className = "bg-[#e2e8f0]" }: { width: string; className?: string }) {
  return (
    <span
      className={`block h-2 rounded-full ${className}`}
      style={{ width }}
    />
  );
}

function SketchRow({
  a,
  b,
  c,
  d,
}: {
  a: string;
  b: string;
  c: string;
  d: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_2rem_2.5rem_3.25rem] items-center gap-x-2 py-1.5">
      <Bar width={a} />
      <Bar width={b} />
      <Bar width={c} />
      <Bar width={d} />
    </div>
  );
}

/** Static invoice preview. No amounts — bars stand in for numbers. */
export default function InvoiceSketch() {
  return (
    <div
      role="img"
      aria-label="A blank invoice: Invoice, Your name, Bill to Client name, and a table with Description, Qty, Rate and Amount columns"
      className="invoice-sketch rounded-lg border border-[#cbd5e1] bg-white p-3 shadow-[0_6px_16px_-10px_rgba(15,23,42,.25)] sm:p-4 xl:p-3"
    >
      <div aria-hidden="true">
        <div className="flex items-start justify-between gap-3">
          <p className="font-display text-[20px] font-bold leading-none text-ink">
            Invoice
          </p>
          <div className="text-right text-[14px] leading-snug">
            <p className="font-semibold text-[#334155]">Your name</p>
            <p className="text-mute">
              Bill to{" "}
              <span className="font-semibold text-[#334155]">Client name</span>
            </p>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-[minmax(0,1fr)_2rem_2.5rem_3.25rem] gap-x-2 border-b border-[#cbd5e1] pb-1 text-[14px] font-semibold text-[#334155]">
          <span>Description</span>
          <span>Qty</span>
          <span>Rate</span>
          <span className="text-right">Amount</span>
        </div>
        <SketchRow a="80%" b="60%" c="80%" d="100%" />
        <div className="mt-1 flex items-center justify-end gap-2 border-t border-[#e2e8f0] pt-2">
          <Bar width="3rem" className="bg-[#cbd5e1]" />
          <span className="block h-2.5 w-14 rounded-full bg-[#0f766e]" />
        </div>
      </div>
    </div>
  );
}
