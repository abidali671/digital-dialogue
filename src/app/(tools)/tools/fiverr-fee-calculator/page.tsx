import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import FiverrFeeCalculator from "@/components/tools/FiverrFeeCalculator";
import FiverrFeeGuide from "@/components/tools/FiverrFeeGuide";
import ToolHero from "@/components/tools/ToolHero";
import FaqSection from "@/components/tools/FaqSection";
import RelatedResources, { CALCULATOR_RESOURCES } from "@/components/tools/RelatedResources";
import config from "@/lib/config";
import { breadcrumbSchema, JsonLdScript } from "@/lib/schema";

const OG_IMAGE = {
  url: "/fiverr-fee-calculator.png",
  width: 1200,
  height: 630,
  alt: "Fiverr Fee Calculator: see what you keep after the 20% fee and when it clears",
};

/** Includes the year. Update every January (next: January 2027 → "2027"). */
const TITLE = "Fiverr Fee Calculator 2026 for Sellers | Digital Dialogue";
const DESCRIPTION =
  "See what you keep from a Fiverr order after the 20% seller fee and withdrawal fees, and when it clears. In US dollars or rupees. Free, no sign-up.";
const PATH = "/tools/fiverr-fee-calculator";
const FIVERR_HELP = "https://help.fiverr.com/hc/en-us";

const FAQ = [
  {
    question: "How much does Fiverr take from sellers?",
    text: "Fiverr keeps 20% of every order, so the seller receives 80%. The same 20% applies to Gig extras and tips. It does not change with your seller level or the size of the order.",
  },
  {
    question: "How much do I get from a $100 Fiverr order?",
    text: "$80. Fiverr keeps $20 of a $100 order. A PayPal withdrawal has no Fiverr fee, so $80 is what leaves Fiverr. A Payoneer account withdrawal costs $3, which leaves $77.",
  },
  {
    question: "Does the buyer's service fee come out of my earnings?",
    text: "No. Buyers pay a separate service fee at checkout, on top of your Gig price. It goes to Fiverr and is never deducted from what you earn, so do not enter it in the calculator.",
  },
  {
    question: "How long does Fiverr take to clear my earnings?",
    text: "14 days after the order is marked complete for most sellers, and 7 days for Seller Plus, Top Rated and Pro sellers. The money then moves to your available balance and can be withdrawn.",
  },
  {
    question: "What does it cost to withdraw money from Fiverr?",
    text: "It depends on the payout method. Fiverr lists no fee for PayPal and $3 for a Payoneer account. Bank transfer via Payoneer is listed at $1 or $3 depending on the page and the transfer type, so check the confirm screen. PayPal, Payoneer or your bank can charge their own fees after that.",
  },
  {
    question: "How do I price a Gig to keep a set amount?",
    text: "Divide the amount you want to keep by 0.80. To keep $50, price the Gig at $62.50. Add any withdrawal fee to the target first if you withdraw after every order.",
  },
  {
    question: "Can I see my Fiverr earnings in Pakistani rupees?",
    text: "Yes. Choose PKR, keep entering amounts in US dollars, then enter the exchange rate your bank or wallet gives you. The calculator shows the State Bank of Pakistan weighted average and its date as a reference. Until you enter a rate, results stay in US dollars.",
  },
] as const;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function FiverrFeeCalculatorPage() {
  return (
    <div className="fee-page">
      <JsonLdScript
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Fiverr Fee Calculator", path: PATH },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Fiverr Fee Calculator",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            url: `${config.BASE_URL}${PATH}`,
            description: DESCRIPTION,
            dateModified: "2026-11-01",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            provider: {
              "@type": "Organization",
              name: config.SITE_NAME,
              url: config.BASE_URL,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.text },
            })),
          },
        ]}
      />

      <section className="fee-hero bg-[#f4f6f8]">
        <div className="fee-hero-grid mx-auto w-full max-w-[1200px] px-4 pb-10 pt-4 sm:px-5 min-[1024px]:px-8 min-[1024px]:pb-14 min-[1024px]:pt-10">
          <div className="min-[1024px]:pt-10">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Tools", href: "/tools" },
                { label: "Fiverr Fee Calculator" },
              ]}
            />
            <ToolHero
              title="Fiverr Fee Calculator"
              intro={
                <>
                  <p className="fee-hero-intro">
                    Find out what you keep from a Fiverr order and when you can withdraw it. Enter your Gig price, any extras or tip, and your payout method. The calculator takes off Fiverr’s 20% seller fee and the withdrawal fee, then shows the amount that leaves Fiverr and the day it clears. It can also show the result in Pakistani rupees (PKR) at an exchange rate you enter.
                  </p>
                  <p className="fee-hero-intro">
                    The 20% is the same for every seller level. What changes is the wait: 14 days for most sellers, 7 for Seller Plus, Top Rated and Pro.
                  </p>
                </>
              }
              points={[
                <>
                  <b className="font-semibold text-ink">How it’s calculated:</b> order total, minus 20%, minus one withdrawal fee.{" "}
                  <a className="fee-link" href="#ex">See the $100 example</a>
                </>,
                <>
                  <b className="font-semibold text-ink">Fee source:</b> Fiverr’s help pages, checked 1 November 2026.
                </>,
                <>
                  <b className="font-semibold text-ink">Independent:</b> not affiliated with or endorsed by Fiverr.
                </>,
              ]}
            />
          </div>
          <FiverrFeeCalculator />
        </div>
      </section>

      <section id="ex" aria-labelledby="example-title" className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
          <div className="fee-card grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
            <div>
              <p className="mb-3 inline-flex items-center rounded-md border border-dashed border-[#cbd5e1] bg-mist px-2 py-1 font-mono text-caption uppercase tracking-[0.1em] text-[#475569]">
                Illustrative example
              </p>
              <h2 id="example-title" className="fee-section">
                Example: a $100 order withdrawn to Payoneer
              </h2>
              <p className="mt-4 text-copy text-[#475569]">
                This example is for illustration only. It uses Fiverr’s 20% seller fee, the standard 14-day clearance and the $3 Payoneer account fee Fiverr lists. Your payout method and its fees may be different.
              </p>
            </div>
            <table className="w-full text-copy">
              <caption className="sr-only">Illustrative example calculation</caption>
              <tbody>
                <ExampleRow label="Gig price" value="$100.00" />
                <ExampleRow label="Fiverr fee (20%)" detail="$100 × 20%" value="−$20.00" />
                <ExampleRow label="Your earnings" detail="available 14 days after completion" value="$80.00" />
                <ExampleRow label="Withdrawal fee" detail="Payoneer account" value="−$3.00" />
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row" className="pt-4 pr-4 text-left font-bold text-ink">
                    Amount withdrawn
                    <span className="block text-ui font-normal text-[#475569]">
                      Effective deduction: 23%
                    </span>
                  </th>
                  <td className="pt-4 text-right font-display text-figure-sm text-ink tabular-nums">
                    $77.00
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <FiverrFeeGuide />
      </section>

      <FaqSection
        title="Fiverr fee questions"
        intro={
          <>
            Short answers to common questions. For official, up-to-date details, see{" "}
            <a className="fee-link" href={FIVERR_HELP} target="_blank" rel="noopener noreferrer">
              Fiverr Help
              <span className="sr-only"> (opens Fiverr Help in a new tab)</span>
            </a>
            .
          </>
        }
        items={FAQ.map((item) => ({ question: item.question, answer: <p>{item.text}</p> }))}
      />

      <RelatedResources
        items={[CALCULATOR_RESOURCES.fiverrFees, CALCULATOR_RESOURCES.fiverrPayout, CALCULATOR_RESOURCES.rate]}
      />

      <section className="border-t border-line bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6">
          <p className="text-ui text-[#475569]">
            <strong className="font-semibold text-ink">Disclaimer:</strong> Digital Dialogue is an independent publication. This calculator is not affiliated with, endorsed by, or sponsored by Fiverr. All results are estimates for planning only. Your actual fees, clearance dates, withdrawal charges, exchange rates and taxes may differ. The PKR figure uses the rate you enter. Always check the amounts on your Fiverr Earnings page and Fiverr’s official help pages.
          </p>
        </div>
      </section>
    </div>
  );
}

function ExampleRow({
  label,
  detail,
  value,
}: {
  label: string;
  detail?: string;
  value: string;
}) {
  return (
    <tr className="border-b border-line">
      <th scope="row" className="py-3 pr-4 text-left font-normal text-[#334155]">
        {label}
        {detail && <span className="block text-ui text-[#475569]">{detail}</span>}
      </th>
      <td className="py-3 text-right font-semibold text-ink tabular-nums">{value}</td>
    </tr>
  );
}
