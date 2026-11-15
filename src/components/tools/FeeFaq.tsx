import type { ReactNode } from "react";
import { Plus } from "lucide-react";

export type FaqItem = {
  question: string;
  answer: ReactNode;
  extra?: ReactNode;
};

export default function FeeFaq({
  items,
  openFirst = true,
}: {
  items: FaqItem[];
  openFirst?: boolean;
}) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const panelId = `faq-panel-${index + 1}`;
        const buttonId = `faq-btn-${index + 1}`;
        return (
          <details
            key={item.question}
            className="group"
            open={openFirst && index === 0}
          >
            <summary
              className="flex min-h-[var(--control-h)] cursor-pointer list-none items-center justify-between gap-4 rounded py-1 text-[18px] font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden"
              id={buttonId}
              aria-controls={panelId}
            >
              <h3 className="m-0 flex-1 text-[18px] font-semibold leading-snug">
                {item.question}
              </h3>
              <span
                aria-hidden="true"
                className="grid h-8 w-8 flex items-center justify-center rounded-full border border-[#cbd5e1] text-[#334155] transition group-open:rotate-45"
              >
                <Plus className="h-4 w-4" />
              </span>
            </summary>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="home-body pb-4 pr-10 text-[16px] leading-relaxed"
            >
              {typeof item.answer === "string" ? (
                <p>{item.answer}</p>
              ) : (
                item.answer
              )}
              {item.extra}
            </div>
          </details>
        );
      })}
    </div>
  );
}
