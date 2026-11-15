import { ToolResultCard } from "@/components/tools/ToolResultCard";
import { HOME_TOOL_TEASERS } from "@/lib/homeTools";
import type { ToolKey } from "@/lib/tool-examples";

const FEE_COPY = {
  eyebrow: "Free calculator",
  heading: "What does a $500 job leave after Upwork’s fees?",
  body: "The service fee is separate from the withdrawal cost. Try your own amount in the calculator.",
  note: "Example from the calculator page. Wallet withdrawal fees vary, so check your own preview.",
};

export function getInlineTeaser(href: string) {
  return HOME_TOOL_TEASERS.find((tool) => tool.href === href) ?? null;
}

export default function InlineToolTeaser({
  href,
}: {
  href: string;
  tool?: ToolKey;
}) {
  const tool = getInlineTeaser(href);
  if (!tool) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`InlineToolTeaser: unknown tool ${href}`);
    }
    return null;
  }

  const copy = href === "/tools/upwork-fee-calculator" ? FEE_COPY : null;

  return (
    <aside
      aria-labelledby={copy ? "tt-h" : undefined}
      className={`tool-inline not-prose !mb-2 !mt-10 rounded-2xl border border-[#e2e8f0] bg-[#f4f6f8] p-4 sm:p-6 ${
        copy
          ? "grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,340px)] md:items-center md:gap-8"
          : ""
      }`}
    >
      {copy ? (
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0f766e]">
            {copy.eyebrow}
          </p>
          <p
            id="tt-h"
            className="mt-2 font-display text-[20px] font-bold leading-snug text-ink md:text-[24px]"
          >
            {copy.heading}
          </p>
          <p className="mt-2 text-[16px] leading-relaxed text-[#334155]">
            {copy.body}
          </p>
          <p className="mt-3 text-[16px] leading-snug text-mute">{copy.note}</p>
        </div>
      ) : null}
      <div>
        <ToolResultCard variant="teaser" tool={tool} />
      </div>
    </aside>
  );
}
