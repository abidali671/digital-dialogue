import Link from "next/link";

export type ResourceItem = {
  kind: string;
  note?: string;
  title: string;
  copy: string;
  href: string;
  hrefLabel: string;
  titleIsLink?: boolean;
  action?: "footer" | "arrow";
};

export const CALCULATOR_RESOURCES = {
  fee: {
    kind: "Tool",
    title: "Upwork Fee Calculator",
    copy: "Estimate take-home pay after the freelancer service fee.",
    href: "/tools/upwork-fee-calculator",
    hrefLabel: "Open calculator",
  },
  connects: {
    kind: "Tool",
    title: "Connects Calculator",
    copy: "Work out what a proposal costs in Connects and whether a job is worth bidding on.",
    href: "/tools/upwork-connects-calculator",
    hrefLabel: "Open calculator",
  },
  rate: {
    kind: "Tool",
    title: "Freelance Rate Calculator",
    copy: "Turn a monthly income goal into an hourly or project rate that covers fees and time off.",
    href: "/tools/freelance-rate-calculator",
    hrefLabel: "Open calculator",
  },
  guide: {
    kind: "Guide",
    title: "Upwork Proposal Writing Guide",
    copy: "A clear proposal structure, what to cut, pricing tips and beginner mistakes that waste Connects.",
    href: "/blogs/freelancing/how-to-write-an-upwork-proposal-that-wins-jobs",
    hrefLabel: "Read guide",
    titleIsLink: true,
    action: "arrow",
  },
} satisfies Record<string, ResourceItem>;

export default function RelatedResources({ items }: { items: ResourceItem[] }) {
  return (
    <section aria-labelledby="related-title" className="border-t border-line bg-white py-14 md:py-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 sm:px-6">
        <div className="flex flex-col gap-3">
          <h2 id="related-title" className="fee-section">
            Related resources
          </h2>
          <hr className="m-0 h-1 w-14 border-0 bg-accent" aria-hidden="true" />
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <ResourceCard key={item.href} {...item} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ResourceCard({
  kind,
  note,
  title,
  copy,
  href,
  hrefLabel,
  titleIsLink,
  action = "footer",
}: ResourceItem) {
  return (
    <li className={`fee-card flex flex-col p-6${action === "arrow" ? " relative" : ""}`}>
      <p className="font-mono text-caption uppercase tracking-[0.1em] text-[#475569]">
        {kind}
        {note && (
          <span className="ml-2 inline-flex rounded border border-dashed border-[#a16207] bg-[#fffbeb] px-1.5 py-0.5 align-middle font-mono text-caption font-medium uppercase tracking-wide text-[#92400e]">
            {note}
          </span>
        )}
      </p>
      <h3 className={`mt-3 text-h4${titleIsLink ? "" : " text-ink"}`}>
        {titleIsLink ? (
          <Link className="hover:text-[#0f766e]" href={href}>
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      <p className="mt-2 flex-1 text-copy text-[#475569]">{copy}</p>
      {action === "arrow" ? (
        <p className="mt-5 text-ui font-bold text-[#0f766e]">
          <Link href={href} className="inline-flex items-center gap-1.5 hover:text-[#0f766e]">
            {hrefLabel} <Arrow />
          </Link>
        </p>
      ) : (
        <p className="mt-4 border-t border-line pt-4 text-ui">
          <Link className="fee-link" href={href}>
            {hrefLabel}
          </Link>
        </p>
      )}
    </li>
  );
}

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10h12m-5-5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
