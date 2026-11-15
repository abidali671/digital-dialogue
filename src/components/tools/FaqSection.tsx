import type { ReactNode } from "react";
import FeeFaq, { type FaqItem } from "@/components/tools/FeeFaq";

export default function FaqSection({
  title,
  intro,
  items,
  headingId = "faq-h",
  id,
  layout = "page",
}: {
  title: string;
  intro?: ReactNode;
  items: FaqItem[];
  headingId?: string;
  id?: string;
  layout?: "page" | "inline";
}) {
  if (!items.length) return null;

  const heading = (
    <>
      {layout === "page" ? <p className="home-eyebrow">FAQ</p> : null}
      <h2 id={headingId} className="home-h2">
        {title}
      </h2>
      {intro ? (
        <p className="home-body mt-2 text-[16px] leading-relaxed">{intro}</p>
      ) : null}
    </>
  );

  if (layout === "inline") {
    return (
      <section
        id={id}
        aria-labelledby={headingId}
        className="mt-14 scroll-mt-[88px] border-t border-line pt-10"
      >
        {heading}
        <div className="mt-4 max-w-[68ch]">
          <FeeFaq items={items} />
        </div>
      </section>
    );
  }

  return (
    <section id={id} aria-labelledby={headingId} className="home-page bg-white">
      <div className="home-inner py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
          <div>{heading}</div>
          <FeeFaq items={items} />
        </div>
      </div>
    </section>
  );
}
