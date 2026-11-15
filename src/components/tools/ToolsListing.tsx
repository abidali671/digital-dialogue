import Link from "next/link";
import InvoiceSketch from "@/components/tools/InvoiceSketch";
import FaqSection from "@/components/tools/FaqSection";
import { ToolResultCard } from "@/components/tools/ToolResultCard";
import {
  HUB_TOOLS,
  TOOL_ARTICLES,
  TOOL_FAQS,
  TOOLS_INTRO,
} from "@/lib/toolsHub";
import { TOOL_EXAMPLES } from "@/lib/tool-examples";

type ListingCard = {
  href: string;
  title: string;
  copy: string;
  meta: string;
  keywords: string;
} & (
  | {
      kind: "figure";
      label: string;
      figure: string;
      unit?: string;
      rows: { label: string; value: string }[];
      ctaLabel: string;
    }
  | {
      kind: "preview";
      label: string;
      rows: { label: string; value: string }[];
      ctaLabel: string;
    }
);

const INVOICE_KEYWORDS =
  "invoice invoices invoicing bill billing pdf word client clients generator template templates pkr tool";

const LISTING_CARDS: ListingCard[] = HUB_TOOLS.map((tool) => {
  if (tool.href === "/tools/freelance-invoice-generator") {
    return {
      kind: "preview",
      href: tool.href,
      title: tool.title,
      copy: tool.copy,
      meta: "Free to use · No sign-up required",
      keywords: INVOICE_KEYWORDS,
      label: "Live preview",
      ctaLabel: "Open invoice generator",
      rows: [
        { label: "Templates", value: "Nine" },
        { label: "Download", value: "PDF or Word" },
        { label: "Your data", value: "On this device" },
      ],
    };
  }

  const example = TOOL_EXAMPLES.find((item) => item.href === tool.href);
  if (!example) {
    throw new Error(`Missing tool example for ${tool.href}`);
  }

  return {
    kind: "figure",
    href: tool.href,
    title: tool.title,
    copy: tool.copy,
    meta: example.meta,
    keywords: example.keywords,
    label: example.label,
    figure: example.figure,
    unit: example.unit,
    rows: example.rows,
    ctaLabel: "Open calculator",
  };
});

const GROUPS = [
  { id: "fees", name: "Fees and costs", hrefs: LISTING_CARDS.slice(0, 3).map((c) => c.href) },
  { id: "pricing", name: "Pricing and invoicing", hrefs: LISTING_CARDS.slice(3).map((c) => c.href) },
];

const TRUST = [
  "Free, in your browser, no sign-up",
  "Amounts in US dollars, PKR optional",
  "Each page names its fee sources and check date",
  "Invoice PDF made on this device",
];

function haystack(card: ListingCard) {
  return [card.title, card.copy, card.meta, card.keywords].join(" ").toLowerCase();
}

function matchesQuery(card: ListingCard, query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const text = haystack(card);
  return words.every((word) => text.includes(word));
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="mt-1 h-4 w-4 flex-none text-[#0f766e]"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0z" />
    </svg>
  );
}

function GuideArrow() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 transition group-hover:translate-x-0.5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4-1.4l4.3-4.3H3a1 1 0 1 1 0-2h11.6l-4.3-4.3a1 1 0 0 1 0-1.4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function renderCard(card: ListingCard, options: { wide: boolean; span: boolean }) {
  if (card.kind === "preview") {
    return (
      <ToolResultCard
        variant="preview"
        title={card.title}
        href={card.href}
        ctaLabel={card.ctaLabel}
        description={card.copy}
        meta={card.meta}
        rows={card.rows}
        layout={options.wide ? "wide" : "stack"}
        headingLevel="h3"
        label={card.label}
        preview={<InvoiceSketch />}
        span={options.span}
      />
    );
  }

  return (
    <ToolResultCard
      variant="figure"
      title={card.title}
      href={card.href}
      ctaLabel={card.ctaLabel}
      description={card.copy}
      meta={card.meta}
      rows={card.rows}
      layout={options.wide ? "wide" : "stack"}
      headingLevel="h3"
      label={card.label}
      figure={card.figure}
      unit={card.unit}
      span={options.span}
    />
  );
}

export default function ToolsListing({ searchQuery }: { searchQuery: string }) {
  const matched = LISTING_CARDS.filter((card) => matchesQuery(card, searchQuery));
  const groups = GROUPS.map((group) => ({
    ...group,
    cards: matched.filter((card) => group.hrefs.includes(card.href)),
  })).filter((group) => group.cards.length > 0);
  const count = matched.length;
  const status =
    searchQuery && count
      ? `${count} ${count === 1 ? "tool" : "tools"} found for ${searchQuery}`
      : searchQuery
        ? `No tools found for ${searchQuery}`
        : "";

  return (
    <div className="home-page bg-mist">
      <section
        aria-labelledby="h1"
        className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)] gap-5 px-4 pb-6 pt-4 sm:px-5 md:pt-8 min-[1024px]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] min-[1024px]:items-end min-[1024px]:gap-x-14 min-[1024px]:px-8 min-[1024px]:pb-6 min-[1024px]:pt-10"
      >
        <div>
          <nav aria-label="Breadcrumb">
            <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0 text-[16px] font-semibold text-mute">
              <li className="m-0">
                <Link
                  href="/"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center rounded hover:text-ink hover:underline underline-offset-4"
                >
                  Home
                </Link>
              </li>
              <li className="m-0" aria-hidden="true">
                /
              </li>
              <li className="m-0 text-[#0f766e]" aria-current="page">
                Tools
              </li>
            </ol>
          </nav>
          <h1
            id="h1"
            className="text-balance font-display text-[30px] font-bold leading-[1.2] tracking-tight text-ink md:mt-1 md:text-[44px] md:leading-[1.15]"
          >
            Freelance calculators and invoice tools
          </h1>
          <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-[#334155] md:mt-4 md:text-[18px]">
            {TOOLS_INTRO[0]}
          </p>
        </div>
        <div>
          <form role="search" action="/tools" method="get">
            <label htmlFor="q" className="sr-only">
              Search tools
            </label>
            <div className="flex gap-2">
              <input
                id="q"
                name="q"
                type="search"
                defaultValue={searchQuery}
                autoComplete="off"
                placeholder="Search tools"
                className="h-12 min-w-0 flex-1 rounded-lg border border-[#7b8798] bg-white px-4 text-[16px] text-ink placeholder:text-[#64748b]"
              />
              <button
                type="submit"
                className="inline-flex h-12 max-h-12 shrink-0 items-center justify-center rounded-lg bg-[#0f766e] px-5 text-[16px] font-semibold leading-none text-white transition hover:bg-[#115e59] hover:text-white"
              >
                Search
              </button>
            </div>
          </form>
          <ul
            className="mt-5 hidden list-none space-y-2 p-0 text-[16px] leading-snug text-[#334155] min-[1024px]:block"
            aria-label="How these tools work, in short"
          >
            {TRUST.map((item) => (
              <li key={item} className="m-0 flex gap-2.5">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 pb-14 pt-4 sm:px-5 min-[1024px]:px-8 min-[1024px]:pb-16 min-[1024px]:pt-2">
        <p className="sr-only" role="status" aria-live="polite">
          {status}
        </p>
        {searchQuery ? (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 rounded-xl border border-[#e2e8f0] bg-white px-4 py-2">
            <p className="text-[16px] text-[#334155]">
              Showing results for “
              <span className="font-semibold text-ink">{searchQuery}</span>”
            </p>
            <Link
              href="/tools"
              className="inline-flex min-h-[44px] items-center text-[16px] font-semibold text-[#0f766e] underline underline-offset-4 hover:text-[#115e59]"
            >
              Clear search
            </Link>
          </div>
        ) : null}

        {count > 0 ? (
          <div id="tools">
            {groups.map((group) => {
              const wide = group.cards.length === 2;
              const cols = wide
                ? "md:grid-cols-2"
                : "md:grid-cols-2 min-[1024px]:grid-cols-3";
              const n = group.cards.length;
              const countText = searchQuery
                ? n === 1
                  ? "1 tool match"
                  : `${n} tools match`
                : `${n} tools`;
              return (
                <section
                  key={group.id}
                  id={`g-${group.id}`}
                  aria-labelledby={`g-${group.id}-h`}
                  className={group.id === "fees" ? "" : "mt-10 md:mt-12"}
                >
                  <div className="flex items-center gap-3">
                    <h2
                      id={`g-${group.id}-h`}
                      className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0f766e]"
                    >
                      {group.name}
                    </h2>
                    <span aria-hidden="true" className="h-px flex-1 bg-[#cbd5e1]" />
                    <p className="text-[14px] text-mute">{countText}</p>
                  </div>
                  <ul
                    className={`mt-4 m-0 grid list-none grid-cols-[minmax(0,1fr)] gap-5 ${cols}`}
                  >
                    {group.cards.map((card, index) => {
                      const span = !wide && group.cards.length === 3 && index === 2;
                      return (
                        <li
                          key={card.href}
                          className={`m-0 list-none ${
                            span ? "md:col-span-2 min-[1024px]:col-span-1" : ""
                          }`}
                        >
                          {renderCard(card, { wide, span })}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#7b8798] bg-white p-6 text-center sm:p-10">
            <h2 className="font-display text-[24px] font-bold text-ink md:text-[30px]">
              No tools match “{searchQuery}”
            </h2>
            <p className="mx-auto mt-2 max-w-[52ch] text-[16px] leading-relaxed text-[#334155]">
              Try one word, such as “fee”, “Connects”, “rate” or “invoice”. Or
              search the guides for the same words.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/tools"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0f766e] px-5 text-[16px] font-semibold text-white hover:bg-[#115e59] hover:text-white"
              >
                Show all tools
              </Link>
              <Link
                href={`/blogs?q=${encodeURIComponent(searchQuery)}`}
                className="inline-flex h-12 items-center justify-center rounded-lg border border-[#0f766e] bg-white px-5 text-[16px] font-semibold text-[#0f766e] hover:bg-[#f0fdfa] hover:text-[#115e59]"
              >
                Search the guides
              </Link>
            </div>
          </div>
        )}
      </div>

      <section aria-labelledby="how-h" className="border-t border-[#e2e8f0] bg-white">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-4 py-14 sm:px-5 min-[1024px]:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] min-[1024px]:gap-14 min-[1024px]:px-8 min-[1024px]:py-16">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0f766e]">
              Before you start
            </p>
            <h2
              id="how-h"
              className="mt-2 font-display text-[24px] font-bold leading-tight text-ink md:text-[30px]"
            >
              How these tools work
            </h2>
          </div>
          <p className="text-[16px] leading-relaxed text-[#334155] md:text-[18px]">
            {TOOLS_INTRO[1]}
          </p>
        </div>
      </section>

      <section aria-labelledby="guides-h" className="border-t border-[#e2e8f0] bg-[#f4f6f8]">
        <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-5 min-[1024px]:px-8 min-[1024px]:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0f766e]">
                Read next
              </p>
              <h2
                id="guides-h"
                className="mt-2 font-display text-[24px] font-bold leading-tight text-ink md:text-[30px]"
              >
                Freelancing guides
              </h2>
              <p className="mt-2 max-w-[62ch] text-[16px] leading-relaxed text-[#334155]">
                Articles on the site that sit next to these calculators: fees,
                Connects, pricing and proposals.
              </p>
            </div>
            <Link
              href="/blogs"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-[#0f766e] bg-white px-5 text-[16px] font-semibold text-[#0f766e] hover:bg-[#f0fdfa] hover:text-[#115e59]"
            >
              View all guides
            </Link>
          </div>
          <ul className="mt-8 m-0 grid list-none gap-5 md:grid-cols-2 min-[1024px]:grid-cols-3">
            {TOOL_ARTICLES.map((article) => (
              <li key={article.href} className="m-0 h-full list-none">
                <Link
                  href={article.href}
                  className="home-pc group flex h-full flex-col rounded-xl p-5"
                >
                  <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0f766e]">
                    Guide
                  </span>
                  <h3 className="home-pc-t mt-2 font-display text-[18px] font-semibold leading-snug text-ink md:text-[20px]">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-[#334155]">
                    {article.copy}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[16px] font-semibold text-[#0f766e] group-hover:text-[#115e59]">
                    Read guide
                    <GuideArrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection
        title="Calculator questions"
        intro="Short answers on take-home pay, Connects, hourly rates and currency."
        items={TOOL_FAQS}
      />
    </div>
  );
}
