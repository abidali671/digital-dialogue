"use client";

import { useState, type ReactNode } from "react";

export type FaqItem = {
  question: string;
  answer: ReactNode;
};

export default function FeeFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const expanded = open === index;
        const panelId = `faq-panel-${index + 1}`;
        const buttonId = `faq-btn-${index + 1}`;
        return (
          <div key={item.question} className="border-b border-line">
            <h3>
              <button
                type="button"
                className="fee-acc-btn"
                id={buttonId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
              >
                {item.question}
                <span className="fee-acc-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!expanded}
              className="max-w-3xl space-y-3 pb-6 leading-relaxed text-[#334155]"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
