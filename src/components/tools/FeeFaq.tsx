import type { ReactNode } from "react";

export type FaqItem = {
  question: string;
  answer: ReactNode;
};

export default function FeeFaq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const panelId = `faq-panel-${index + 1}`;
        const buttonId = `faq-btn-${index + 1}`;
        return (
          <details key={item.question} className="fee-acc border-b border-line">
            <summary className="fee-acc-btn" id={buttonId} aria-controls={panelId}>
              <h3>{item.question}</h3>
              <span className="fee-acc-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="max-w-3xl space-y-3 pb-6 text-[#334155]"
            >
              {item.answer}
            </div>
          </details>
        );
      })}
    </div>
  );
}
