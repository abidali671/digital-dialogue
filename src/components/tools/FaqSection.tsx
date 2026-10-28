import type { ReactNode } from "react";
import FeeFaq, { type FaqItem } from "@/components/tools/FeeFaq";

export default function FaqSection({
  title,
  intro,
  items,
}: {
  title: string;
  intro: ReactNode;
  items: FaqItem[];
}) {
  return (
    <section aria-labelledby="faq-title" className="py-14 md:py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div>
          <p className="mb-3 font-mono text-caption uppercase tracking-[0.14em] text-[#0f766e]">
            FAQ
          </p>
          <h2 id="faq-title" className="fee-section">
            {title}
          </h2>
          <p className="mt-4 text-copy text-[#475569]">{intro}</p>
        </div>
        <FeeFaq items={items} />
      </div>
    </section>
  );
}
