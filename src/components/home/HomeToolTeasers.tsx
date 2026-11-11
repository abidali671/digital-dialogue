import Link from "next/link";
import { HOME_TOOL_TEASERS } from "@/lib/homeTools";

type Props = {
  heading?: string;
  sub?: string;
  className?: string;
};

const HomeToolTeasers = ({
  heading = "Free calculators for fees, rates and Connects",
  sub = "Each card shows the example from its own calculator page. Open one to try your own numbers.",
  className = "",
}: Props) => {
  return (
    <section
      id="tools"
      aria-labelledby="tools-h"
      className={`scroll-mt-20 bg-mist ${className}`.trim()}
    >
      <div className="home-inner pb-12 pt-6 lg:pb-16 lg:pt-8">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <p className="home-eyebrow">Free calculators</p>
            <h2 id="tools-h" className="home-h2">
              {heading}
            </h2>
            <p className="home-body mt-2 hidden max-w-[62ch] text-[16px] leading-snug sm:block">
              {sub}
            </p>
          </div>
          <Link
            href="/tools"
            className="home-link hidden text-[16px] sm:inline-flex"
          >
            All tools
            <span className="sr-only"> on Digital Dialogue</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="mt-6 m-0 grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {HOME_TOOL_TEASERS.map((tool) => (
            <li key={tool.href} className="m-0 list-none">
              <article className="home-tcard group">
                <h3 className="text-[18px] font-semibold leading-snug text-ink md:text-[20px]">
                  {tool.title}
                </h3>
                <p className="home-mute mt-1 text-[16px] leading-snug xl:min-h-[2.75rem]">
                  {tool.example}
                </p>
                <p className="home-body mt-4 text-[16px] font-semibold">
                  {tool.figureLabel}
                </p>
                <p className="mt-1 flex items-baseline gap-2">
                  <span className="font-display text-[30px] font-semibold leading-none tracking-tight text-ink tabular-nums md:text-[36px]">
                    {tool.figure}
                  </span>
                  <span className="home-mute text-[16px]">{tool.figureHint}</span>
                </p>
                <dl className="mb-5 mt-4 space-y-1.5 border-t border-line pt-3 text-[16px]">
                  {tool.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between gap-3"
                    >
                      <dt className="home-body">{row.label}</dt>
                      <dd className="text-right font-semibold tabular-nums text-ink">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href={tool.href}
                  className="home-btn-secondary relative z-[1] mt-auto w-full px-4 group-hover:bg-[#f0fdfa]"
                >
                  Open calculator
                  <span className="sr-only">: {tool.title}</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
        <Link
          href="/tools"
          className="home-link mt-4 text-[16px] sm:hidden"
        >
          All tools
          <span className="sr-only"> on Digital Dialogue</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};

export default HomeToolTeasers;
