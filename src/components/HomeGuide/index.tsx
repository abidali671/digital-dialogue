import Link from "next/link";
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
      <section aria-labelledby="faq-h" className="bg-white">
        <div className="home-inner py-14 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
            <div>
              <p className="home-eyebrow">FAQ</p>
              <h2 id="faq-h" className="home-h2">
                Frequently asked questions
              </h2>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {HOME_FAQS.map((faq, index) => {
                const tryLinks = HOME_FAQ_TRY[faq.question];
                return (
                  <details key={faq.question} className="group" open={index === 0}>
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded py-4 text-[18px] font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                      <h3>{faq.question}</h3>
                      <span
                        aria-hidden="true"
                        className="grid h-8 w-8 flex-none place-items-center rounded-full border border-[#cbd5e1] text-[18px] text-[#334155] transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="home-body pb-4 pr-10 text-[16px] leading-relaxed">
                      {faq.answer}
                    </p>
                    {tryLinks && (
                      <p className="home-body pb-2 pr-10 text-[16px]">
                        <span className="font-semibold text-ink">Try it:</span>{" "}
                        {tryLinks.map((link, i) => (
                          <span key={link.href}>
                            {i > 0 ? " · " : null}
                            <Link href={link.href} className="home-link">
                              {link.label}
                            </Link>
                          </span>
                        ))}
                      </p>
                    )}
                  </details>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeGuide;
