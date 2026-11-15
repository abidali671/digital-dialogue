import Link from "next/link";
import FaqSection from "@/components/tools/FaqSection";
import { HOME_FAQS, HOME_FAQ_TRY } from "@/lib/homeFaqs";

const HomeGuide = () => {
  return (
    <>
      <section aria-labelledby="about-h" className="border-t border-line bg-mist">
        <div className="home-inner grid gap-6 py-14 lg:grid-cols-[1fr_1.6fr] lg:gap-14 lg:py-20">
          <div>
            <p className="home-eyebrow">About</p>
            <h2 id="about-h" className="home-h2">
              About Digital Dialogue
            </h2>
          </div>
          <div>
            <p className="home-body text-[16px] leading-relaxed md:text-[18px]">
              Digital Dialogue is a freelancing blog by{" "}
              <Link href="/authors/abid-ali" className="home-link py-3">
                Abid Ali
              </Link>
              , a full-stack web developer who freelances from Pakistan. The
              guides cover choosing a platform, building an Upwork profile,
              writing proposals and understanding fees and Connects. Each one is
              written to help you take the next step. Older posts about fees or
              platform rules may change, so check the date at the top of each
              article.
            </p>
            <Link href="/about" className="home-link mt-2 text-[16px]">
              Read more about the site →
            </Link>
          </div>
        </div>
      </section>
      <FaqSection
        title="Frequently asked questions"
        items={HOME_FAQS.map((faq) => {
          const tryLinks = HOME_FAQ_TRY[faq.question];
          return {
            question: faq.question,
            answer: faq.answer,
            extra: tryLinks ? (
              <p className="home-body mt-2 flex flex-wrap items-center gap-x-2 gap-y-2 pb-2 text-[16px]">
                <span className="font-semibold text-ink">Try it:</span>
                {tryLinks.map((link, i) => (
                  <span key={link.href} className="inline-flex items-center gap-x-2">
                    {i > 0 ? (
                      <span aria-hidden="true">·</span>
                    ) : null}
                    <Link href={link.href} className="home-link">
                      {link.label}
                    </Link>
                  </span>
                ))}
              </p>
            ) : undefined,
          };
        })}
      />
    </>
  );
};

export default HomeGuide;
