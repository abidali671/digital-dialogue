import {
  computeInvoice,
  formatInvoiceDay,
  lineAmount,
  money,
  type InvoiceDraft,
  type InvoiceTemplate,
} from "@/lib/invoice";
import { parseDecimal } from "@/lib/upworkFee";

const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const PAGE_W = 11906;
const MARGIN = 1080;
const CONTENT_W = PAGE_W - MARGIN * 2;

type Theme = {
  font: string;
  accent: string;
  mute: string;
  ink: string;
  kicker: string;
  kickerSize: number;
  kickerItalic?: boolean;
  headerFill?: string;
  headerInk?: string;
  headerMute?: string;
  headFill?: string;
  headInk: string;
  border: string;
  borderStyle: "single" | "dashed";
  stripe?: string;
  totalFill: string;
};

const THEMES: Record<InvoiceTemplate, Theme> = {
  classic: {
    font: "Calibri",
    accent: "0F766E",
    mute: "64748B",
    ink: "0F172A",
    kicker: "0F766E",
    kickerSize: 22,
    headFill: "0F766E",
    headInk: "FFFFFF",
    border: "E2E8F0",
    borderStyle: "single",
    totalFill: "F0FDFA",
  },
  minimalist: {
    font: "Calibri",
    accent: "64748B",
    mute: "94A3B8",
    ink: "0F172A",
    kicker: "94A3B8",
    kickerSize: 28,
    headInk: "64748B",
    border: "F1F5F9",
    borderStyle: "single",
    totalFill: "F8FAFC",
  },
  modern: {
    font: "Calibri",
    accent: "5EEAD4",
    mute: "94A3B8",
    ink: "0F172A",
    kicker: "5EEAD4",
    kickerSize: 22,
    headerFill: "0F172A",
    headerInk: "F8FAFC",
    headerMute: "94A3B8",
    headFill: "0F172A",
    headInk: "F8FAFC",
    border: "E2E8F0",
    borderStyle: "single",
    totalFill: "F1F5F9",
  },
  corporate: {
    font: "Calibri",
    accent: "1E293B",
    mute: "64748B",
    ink: "0F172A",
    kicker: "0F172A",
    kickerSize: 20,
    headFill: "1E293B",
    headInk: "F8FAFC",
    border: "E2E8F0",
    borderStyle: "single",
    stripe: "F8FAFC",
    totalFill: "F1F5F9",
  },
  boutique: {
    font: "Georgia",
    accent: "0F172A",
    mute: "64748B",
    ink: "0F172A",
    kicker: "0F172A",
    kickerSize: 32,
    kickerItalic: true,
    headInk: "0F172A",
    border: "E2E8F0",
    borderStyle: "single",
    totalFill: "FAFAF9",
  },
  midnight: {
    font: "Calibri",
    accent: "93C5FD",
    mute: "64748B",
    ink: "0F172A",
    kicker: "93C5FD",
    kickerSize: 22,
    headerFill: "1E3A5F",
    headerInk: "F8FAFC",
    headerMute: "BFDBFE",
    headFill: "1E3A5F",
    headInk: "F8FAFC",
    border: "DBEAFE",
    borderStyle: "single",
    totalFill: "EFF6FF",
  },
  ledger: {
    font: "Calibri",
    accent: "15803D",
    mute: "64748B",
    ink: "14532D",
    kicker: "15803D",
    kickerSize: 22,
    headInk: "14532D",
    border: "15803D",
    borderStyle: "single",
    stripe: "F0FDF4",
    totalFill: "F0FDF4",
  },
  mono: {
    font: "Consolas",
    accent: "0F172A",
    mute: "475569",
    ink: "0F172A",
    kicker: "0F172A",
    kickerSize: 22,
    headInk: "0F172A",
    border: "0F172A",
    borderStyle: "dashed",
    totalFill: "F8FAFC",
  },
  gold: {
    font: "Calibri",
    accent: "B45309",
    mute: "92400E",
    ink: "0F172A",
    kicker: "B45309",
    kickerSize: 22,
    headerFill: "FFFBEB",
    headerInk: "0F172A",
    headerMute: "92400E",
    headFill: "B45309",
    headInk: "FFFBEB",
    border: "E8D5A3",
    borderStyle: "single",
    totalFill: "FFFBEB",
  },
};

export function invoiceDocxBlob(draft: InvoiceDraft): Blob {
  const files: Record<string, string> = {
    "[Content_Types].xml": CONTENT_TYPES,
    "_rels/.rels": RELS,
    "word/_rels/document.xml.rels": DOCUMENT_RELS,
    "word/document.xml": documentXml(draft),
  };
  return zipStore(files);
}

function themeOf(draft: InvoiceDraft): Theme {
  return THEMES[draft.template] ?? THEMES.classic;
}

function documentXml(draft: InvoiceDraft): string {
  const theme = themeOf(draft);
  const totals = computeInvoice(draft);
  const lines = draft.lines.filter(
    (line) => line.description.trim() || lineAmount(line) > 0,
  );
  const rows = lines.length ? lines : draft.lines;
  const fromBits = [
    draft.fromName.trim() || "Your name",
    draft.fromEmail.trim(),
    draft.fromAddress.trim(),
    draft.taxId.trim() ? `Tax ID / NTN: ${draft.taxId.trim()}` : "",
  ].filter(Boolean);
  const clientBits = [
    draft.clientName.trim() || "Client name",
    draft.clientAddress.trim(),
  ].filter(Boolean);
  const meta: [string, string][] = [
    ["Number", draft.number.trim() || "—"],
    ["Issued", formatInvoiceDay(draft.issueDate)],
    ["Due", formatInvoiceDay(draft.dueDate)],
  ];

  const body = [
    headerBlock(theme, fromBits, meta),
    para(theme, "Bill to", {
      bold: true,
      size: 18,
      color: theme.accent,
      spaceBefore: 280,
      spaceAfter: 60,
    }),
    ...clientBits.map((line, index) =>
      para(theme, line, { size: index === 0 ? 24 : 21, bold: index === 0, color: theme.ink }),
    ),
    itemsTable(theme, draft, rows),
    totalsTable(theme, draft, totals),
    ...block(theme, "Payment details", draft.paymentDetails),
    ...block(theme, "Notes", draft.notes),
    `<w:sectPr><w:pgSz w:w="${PAGE_W}" w:h="16838"/><w:pgMar w:top="${MARGIN}" w:right="${MARGIN}" w:bottom="${MARGIN}" w:left="${MARGIN}"/></w:sectPr>`,
  ].join("");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="${W_NS}"><w:body>${body}</w:body></w:document>`;
}

function headerBlock(theme: Theme, fromBits: string[], meta: [string, string][]): string {
  const kicker = para(theme, "INVOICE", {
    bold: !theme.kickerItalic,
    italic: theme.kickerItalic,
    size: theme.kickerSize,
    color: theme.headerFill ? theme.kicker : theme.kicker,
    spaceAfter: 120,
  });
  const identity = twoColTable(theme, fromBits, meta, {
    ink: theme.headerInk ?? theme.ink,
    mute: theme.headerMute ?? theme.mute,
  });
  if (!theme.headerFill) return kicker + identity;
  return tbl(
    [CONTENT_W],
    [`<w:tr>${tc(CONTENT_W, kicker + identity, theme.headerFill)}</w:tr>`],
    "single",
    theme.headerFill,
  );
}

function block(theme: Theme, label: string, value: string): string[] {
  const text = value.trim();
  if (!text) return [];
  return [
    para(theme, label, {
      bold: true,
      size: 18,
      color: theme.accent,
      spaceBefore: 280,
      spaceAfter: 60,
    }),
    ...text.split(/\r?\n/).map((line) => para(theme, line || " ", { size: 21, color: theme.ink })),
  ];
}

function para(
  theme: Theme,
  text: string,
  opts: {
    bold?: boolean;
    italic?: boolean;
    size?: number;
    color?: string;
    align?: "left" | "right" | "center";
    spaceBefore?: number;
    spaceAfter?: number;
  } = {},
): string {
  const size = opts.size ?? 22;
  const align = opts.align ? `<w:jc w:val="${opts.align}"/>` : "";
  const spacing = `<w:spacing w:before="${opts.spaceBefore ?? 0}" w:after="${opts.spaceAfter ?? 80}"/>`;
  const run = `<w:r><w:rPr><w:rFonts w:ascii="${theme.font}" w:hAnsi="${theme.font}"/>${opts.bold ? "<w:b/>" : ""}${opts.italic ? "<w:i/>" : ""}<w:sz w:val="${size}"/><w:szCs w:val="${size}"/>${opts.color ? `<w:color w:val="${opts.color}"/>` : ""}</w:rPr><w:t xml:space="preserve">${esc(text)}</w:t></w:r>`;
  return `<w:p><w:pPr>${align}${spacing}</w:pPr>${run}</w:p>`;
}

function twoColTable(
  theme: Theme,
  left: string[],
  meta: [string, string][],
  colors: { ink: string; mute: string },
): string {
  const leftW = Math.round(CONTENT_W * 0.58);
  const rightW = CONTENT_W - leftW;
  const leftXml = left
    .map((line, index) =>
      para(theme, line, {
        size: index === 0 ? 24 : 21,
        bold: index === 0,
        color: colors.ink,
        spaceAfter: 40,
      }),
    )
    .join("");
  const rightXml = meta
    .map(
      ([label, value]) =>
        `${para(theme, label, { size: 16, color: colors.mute, spaceAfter: 0 })}${para(theme, value, { bold: true, size: 21, color: colors.ink, spaceAfter: 80 })}`,
    )
    .join("");
  return tbl(
    [leftW, rightW],
    [`<w:tr>${tc(leftW, leftXml || para(theme, " "))}${tc(rightW, rightXml)}</w:tr>`],
    "single",
    undefined,
    true,
  );
}

function itemsTable(
  theme: Theme,
  draft: InvoiceDraft,
  rows: InvoiceDraft["lines"],
): string {
  const cols = [Math.round(CONTENT_W * 0.5), Math.round(CONTENT_W * 0.14), Math.round(CONTENT_W * 0.18)];
  cols.push(CONTENT_W - cols.reduce((a, b) => a + b, 0));
  const head = ["Description", "Qty", "Rate", "Amount"].map((label, i) =>
    tc(
      cols[i],
      para(theme, label, { bold: true, size: 18, color: theme.headInk, spaceAfter: 0, align: i > 0 ? "right" : "left" }),
      theme.headFill,
      i > 0,
    ),
  );
  const body = rows.map((line, row) => {
    const cells = [
      line.description.trim() || "—",
      line.qty.trim() || "—",
      money(Math.max(0, parseDecimal(line.rate) || 0), draft.currency),
      money(lineAmount(line), draft.currency),
    ];
    const fill = theme.stripe && row % 2 === 1 ? theme.stripe : undefined;
    return `<w:tr>${cells
      .map((value, i) =>
        tc(
          cols[i],
          para(theme, value, {
            size: 20,
            color: theme.ink,
            spaceAfter: 0,
            align: i > 0 ? "right" : "left",
          }),
          fill,
          i > 0,
        ),
      )
      .join("")}</w:tr>`;
  });
  return `<w:p><w:pPr><w:spacing w:before="280" w:after="0"/></w:pPr></w:p>${tbl(cols, [`<w:tr>${head.join("")}</w:tr>`, ...body], theme.borderStyle, theme.border)}`;
}

function totalsTable(
  theme: Theme,
  draft: InvoiceDraft,
  totals: ReturnType<typeof computeInvoice>,
): string {
  const labelW = Math.round(CONTENT_W * 0.68);
  const valueW = CONTENT_W - labelW;
  const rows: [string, string, boolean][] = [["Subtotal", money(totals.subtotal, draft.currency), false]];
  if (totals.discount > 0) {
    rows.push(["Discount", `−${money(totals.discount, draft.currency)}`, false]);
  }
  if (totals.tax > 0) {
    rows.push([`Tax (${draft.taxPercent.trim() || "0"}%)`, money(totals.tax, draft.currency), false]);
  }
  rows.push(["Total due", money(totals.total, draft.currency), true]);
  if (totals.pkrTotal !== null) {
    rows.push(["About in PKR", money(totals.pkrTotal, "PKR"), false]);
  }
  const xml = rows.map(([label, value, strong]) => {
    const fill = strong ? theme.totalFill : undefined;
    return `<w:tr>${tc(labelW, para(theme, label, { bold: strong, size: strong ? 24 : 20, color: strong ? theme.accent : theme.ink, spaceAfter: 0 }), fill, true)}${tc(valueW, para(theme, value, { bold: strong, size: strong ? 24 : 20, color: strong ? theme.accent : theme.ink, spaceAfter: 0, align: "right" }), fill, true)}</w:tr>`;
  });
  return `<w:p><w:pPr><w:spacing w:before="160" w:after="0"/></w:pPr></w:p>${tbl([labelW, valueW], xml, "single", undefined, true)}`;
}

function tbl(
  cols: number[],
  rows: string[],
  borderStyle: "single" | "dashed",
  borderColor?: string,
  hideBorders = false,
): string {
  const grid = cols.map((w) => `<w:gridCol w:w="${w}"/>`).join("");
  const color = borderColor ?? "E2E8F0";
  const val = hideBorders ? "nil" : borderStyle;
  const sz = borderStyle === "dashed" ? "8" : "4";
  const border = `<w:tblBorders><w:top w:val="${val}" w:sz="${sz}" w:color="${color}"/><w:left w:val="${val}" w:sz="${sz}" w:color="${color}"/><w:bottom w:val="${val}" w:sz="${sz}" w:color="${color}"/><w:right w:val="${val}" w:sz="${sz}" w:color="${color}"/><w:insideH w:val="${val}" w:sz="${sz}" w:color="${color}"/><w:insideV w:val="${val}" w:sz="${sz}" w:color="${color}"/></w:tblBorders>`;
  return `<w:tbl><w:tblPr><w:tblW w:w="${CONTENT_W}" w:type="dxa"/><w:tblLayout w:type="fixed"/>${border}</w:tblPr><w:tblGrid>${grid}</w:tblGrid>${rows.join("")}</w:tbl>`;
}

function tc(width: number, inner: string, fill?: string, right = false): string {
  const shd = fill ? `<w:shd w:val="clear" w:color="auto" w:fill="${fill}"/>` : "";
  const align = right ? `<w:vAlign w:val="center"/>` : "";
  return `<w:tc><w:tcPr><w:tcW w:w="${width}" w:type="dxa"/>${shd}${align}<w:tcMar><w:top w:w="60"/><w:left w:w="80"/><w:bottom w:w="60"/><w:right w:w="80"/></w:tcMar></w:tcPr>${inner}</w:tc>`;
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const CONTENT_TYPES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`;

const RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`;

const DOCUMENT_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>`;

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(data: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < data.length; i += 1) {
    c = CRC_TABLE[(c ^ data[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function u16(n: number): Uint8Array {
  return Uint8Array.of(n & 0xff, (n >>> 8) & 0xff);
}

function u32(n: number): Uint8Array {
  return Uint8Array.of(n & 0xff, (n >>> 8) & 0xff, (n >>> 16) & 0xff, (n >>> 24) & 0xff);
}

function concat(parts: Uint8Array[]): Uint8Array {
  const out = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0));
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

function zipStore(files: Record<string, string>): Blob {
  const encoder = new TextEncoder();
  const locals: Uint8Array[] = [];
  const centrals: Uint8Array[] = [];
  let offset = 0;
  for (const [name, text] of Object.entries(files)) {
    const filename = encoder.encode(name);
    const data = encoder.encode(text);
    const crc = crc32(data);
    const local = concat([
      u32(0x04034b50),
      u16(20),
      u16(0x0800),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(data.length),
      u32(data.length),
      u16(filename.length),
      u16(0),
      filename,
      data,
    ]);
    locals.push(local);
    centrals.push(
      concat([
        u32(0x02014b50),
        u16(20),
        u16(20),
        u16(0x0800),
        u16(0),
        u16(0),
        u16(0),
        u32(crc),
        u32(data.length),
        u32(data.length),
        u16(filename.length),
        u16(0),
        u16(0),
        u16(0),
        u16(0),
        u32(0),
        u32(offset),
        filename,
      ]),
    );
    offset += local.length;
  }
  const central = concat(centrals);
  const end = concat([
    u32(0x06054b50),
    u16(0),
    u16(0),
    u16(centrals.length),
    u16(centrals.length),
    u32(central.length),
    u32(offset),
    u16(0),
  ]);
  return new Blob([concat([...locals, central, end])], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
}
