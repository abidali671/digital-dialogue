import type { ReactNode } from "react";
import FaqList, { type FaqItem } from "@/components/FaqList";

export default function FaqSection({
  title,
  intro,
  items,
  headingId = "faq-h",
  id,
  layout = "page",
  compact = false,
}: {
  title: string;
  intro?: ReactNode;
  items: FaqItem[];
  headingId?: string;
  id?: string;
  layout?: "page" | "inline";
  compact?: boolean;
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
          <FaqList items={items} />
        </div>
      </section>
    );
  }

  return (
    <section id={id} aria-labelledby={headingId} className="home-page bg-white">
      <div className={compact ? "home-inner py-10 lg:py-12" : "home-inner py-14 lg:py-20"}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
          <div>{heading}</div>
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}
