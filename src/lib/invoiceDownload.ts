import type { InvoiceDraft } from "@/lib/invoice";
import { invoiceDocxBlob } from "@/lib/invoiceDocx";

export type InvoiceDownloadFormat = "pdf" | "docx";
export type InvoiceExportAction = InvoiceDownloadFormat | "print";

export function invoiceFileStem(draft: InvoiceDraft): string {
  const number = sanitizeFilePart(draft.number.trim() || "invoice");
  return number || "invoice";
}

function sanitizeFilePart(value: string): string {
  return value
    .replace(/[<>:"/\\|?*\u0000-\u001f]+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function bytes(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}

function concat(parts: Uint8Array[]): Uint8Array {
  const length = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

function jpegToA4Pdf(jpeg: Uint8Array, imgWidth: number, imgHeight: number): Blob {
  const pageW = 595.28;
  const pageH = 841.89;
  let drawW = pageW;
  let drawH = (imgHeight * pageW) / imgWidth;
  if (drawH > pageH) {
    drawH = pageH;
    drawW = (imgWidth * pageH) / imgHeight;
  }
  const x = (pageW - drawW) / 2;
  const y = (pageH - drawH) / 2;
  const content = `q\n${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm\n/Im0 Do\nQ\n`;
  const contentBytes = bytes(content);

  const objects: Uint8Array[] = [
    bytes("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"),
    bytes("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"),
    bytes(
      `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Contents 4 0 R /Resources << /XObject << /Im0 5 0 R >> >> >>\nendobj\n`,
    ),
    concat([
      bytes(`4 0 obj\n<< /Length ${contentBytes.length} >>\nstream\n`),
      contentBytes,
      bytes("endstream\nendobj\n"),
    ]),
    concat([
      bytes(
        `5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imgWidth} /Height ${imgHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`,
      ),
      jpeg,
      bytes("\nendstream\nendobj\n"),
    ]),
  ];

  const header = bytes("%PDF-1.4\n");
  const chunks: Uint8Array[] = [header];
  const offsets = [0];
  let cursor = header.length;
  for (const object of objects) {
    offsets.push(cursor);
    chunks.push(object);
    cursor += object.length;
  }
  const xrefStart = cursor;
  const xrefLines = ["xref\n0 6\n0000000000 65535 f \n"];
  for (let i = 1; i <= 5; i += 1) {
    xrefLines.push(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
  }
  chunks.push(bytes(xrefLines.join("")));
  chunks.push(
    bytes(
      `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`,
    ),
  );
  return new Blob([concat(chunks)], { type: "application/pdf" });
}

async function canvasToJpeg(canvas: HTMLCanvasElement): Promise<Uint8Array> {
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((file) => resolve(file), "image/jpeg", 0.92),
  );
  if (!blob) throw new Error("Could not build the JPEG.");
  return new Uint8Array(await blob.arrayBuffer());
}

export function printInvoice(): void {
  const previous = document.title;
  document.title = " ";
  const restore = () => {
    document.title = previous;
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);
  window.print();
}

export async function downloadInvoice(
  source: HTMLElement | null,
  draft: InvoiceDraft,
  format: InvoiceDownloadFormat,
): Promise<void> {
  const stem = invoiceFileStem(draft);

  if (format === "docx") {
    saveBlob(invoiceDocxBlob(draft), `${stem}.docx`);
    return;
  }

  if (!source) throw new Error("Invoice preview is not ready.");
  const html2canvas = (await import("html2canvas")).default;
  const canvas = await html2canvas(source, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,
    logging: false,
    width: source.scrollWidth,
    height: Math.max(source.scrollHeight, 1123),
  });
  const jpeg = await canvasToJpeg(canvas);
  const pdf = jpegToA4Pdf(jpeg, canvas.width, canvas.height);
  saveBlob(pdf, `${stem}.pdf`);
}
