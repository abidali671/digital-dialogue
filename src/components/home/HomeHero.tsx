import Link from "next/link";
import config from "@/lib/config";

const HomeHero = () => {
  return (
    <section aria-labelledby="h1" className="bg-mist">
      <div className="home-inner grid gap-5 pb-4 pt-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-x-14 lg:pb-6 lg:pt-14">
        <div>
          <p className="home-eyebrow hidden lg:block">{config.SITE_NAME}</p>
          <h1
            id="h1"
            className="text-balance font-display text-[30px] font-bold leading-[1.2] tracking-tight text-ink md:text-[44px] md:leading-[1.15] lg:mt-3"
          >
            Practical Freelancing tips for Beginners on Upwork, Fiverr
          </h1>
        </div>
        <div>
          <p className="home-body text-[16px] leading-relaxed md:text-[18px]">
            Profiles, proposals, platforms, and fees — based on real client
            work, not theory dumps. Plus free calculators to check the numbers
            before you bid.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href="#tools" className="home-btn-primary home-btn-lg">
              Open the calculators
            </Link>
            <Link href="/blogs" className="home-btn-secondary home-btn-lg">
              Read the guides
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
