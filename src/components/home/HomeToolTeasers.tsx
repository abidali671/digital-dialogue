import Link from "next/link";
import { ToolResultCard } from "@/components/tools/ToolResultCard";
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
              <ToolResultCard variant="teaser" tool={tool} />
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
