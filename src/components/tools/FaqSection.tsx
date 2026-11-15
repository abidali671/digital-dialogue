import type { ReactNode } from "react";
import FeeFaq, { type FaqItem } from "@/components/tools/FeeFaq";

export default function FaqSection({
  title,
  intro,
  items,
  headingId = "faq-h",
}: {
  title: string;
  intro?: ReactNode;
  items: FaqItem[];
  headingId?: string;
}) {
  return (
    <section aria-labelledby={headingId} className="home-page bg-white">
      <div className="home-inner py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
          <div>
            <p className="home-eyebrow">FAQ</p>
            <h2 id={headingId} className="home-h2">
              {title}
            </h2>
            {intro ? (
              <p className="home-body mt-2 text-[16px] leading-relaxed">
                {intro}
              </p>
            ) : null}
          </div>
          <FeeFaq items={items} />
        </div>
      </div>
    </section>
  );
}
