import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import FeeCalculator from "@/components/tools/FeeCalculator";
import FeeGuide from "@/components/tools/FeeGuide";
import ToolHero from "@/components/tools/ToolHero";
import FaqSection from "@/components/tools/FaqSection";
import RelatedResources, { CALCULATOR_RESOURCES } from "@/components/tools/RelatedResources";
import config from "@/lib/config";
import { breadcrumbSchema, JsonLdScript } from "@/lib/schema";

const OG_IMAGE = {
  url: "/upwork-fee-calculator.png",
  width: 1200,
  height: 630,
  alt: "Upwork Fee Calculator — see what you keep after the service fee and withdrawal costs",
};

/** Includes the year. Update every January (next: January 2027 → "2027"). */
const TITLE = "Upwork Fee Calculator 2026: Take-Home Pay | Digital Dialogue";
const DESCRIPTION =
  "See what you keep from an Upwork contract after the 0–15% Freelancer Service Fee and withdrawal costs, in US dollars or rupees. Free, no sign-up.";
const PATH = "/tools/upwork-fee-calculator";
const FEE_HELP =
  "https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee";

const FAQ = [
  {
    question: "How much does Upwork take from freelancers?",
    text: "Upwork charges a Freelancer Service Fee of 0% to 15% on each contract. The exact rate is shown on the job offer or proposal and is locked once it is sent, so two of your contracts can have different fees. Withdrawal fees and your bank’s charges are extra.",
  },
  {
    question: "Is the Upwork fee still 10%?",
    text: "Not always. Upwork used to charge a flat 10%, but new contracts now have a variable fee between 0% and 15%. 10% is still common, which is why the calculator’s example uses it. Each contract keeps the fee it was created with, so check the fee in your contract details.",
  },
  {
    question: "How do I work out what to charge on Upwork to get a set amount?",
    text: "Divide the amount you want to keep by (1 − the fee as a decimal). At a 10% fee, to keep $500 you bill $500 ÷ 0.90 = $555.56. Add any fixed withdrawal fee to your target first. Adding 10% on top is not enough, because the fee is taken from the larger amount.",
  },
  {
    question: "Does Upwork charge fees on bonuses and hourly contracts?",
    text: "Yes. The Freelancer Service Fee applies to all earnings on a contract, including hourly payments, fixed-price milestones and bonuses.",
  },
  {
    question: "How much does it cost to withdraw money from Upwork?",
    text: "It depends on the method. Upwork lists $0.99 per transfer for Direct to Local Bank, $50 for a U.S. Dollar Wire, and $2.99 for Direct to U.S. Bank (ACH) for freelancers with an international tax address. Your bank, PayPal or Payoneer may add their own fees or exchange rate margin.",
  },
  {
    question: "Does the client also pay a fee on Upwork?",
    text: "Yes, but it is charged to the client on top of your rate, not taken from your earnings. Clients pay a one-time contract initiation fee of $0.99 to $14.99 and a marketplace fee of about 5% to 10%, depending on their plan.",
  },
  {
    question: "Can I see my Upwork earnings in Pakistani rupees?",
    text: "Yes. Choose PKR, enter amounts in US dollars, then enter the exchange rate your bank or wallet gives you. The calculator shows the State Bank of Pakistan weighted average and its date as a reference. Until you enter a rate, results stay in US dollars.",
  },
  {
    question: "Are Upwork fees tax-deductible?",
    text: "Upwork says its fees may be deductible as business expenses, but that depends on your country’s tax rules. This calculator does not include tax, so check with a tax adviser where you live.",
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

export default function UpworkFeeCalculatorPage() {
  return (
    <div className="fee-page">
      <JsonLdScript
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Upwork Fee Calculator", path: PATH },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Upwork Fee Calculator",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            url: `${config.BASE_URL}${PATH}`,
            description: DESCRIPTION,
            dateModified: "2026-10-29",
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
                { label: "Upwork Fee Calculator" },
              ]}
            />
            <ToolHero
              title="Upwork Fee Calculator"
              intro={
                <>
                  <p className="fee-hero-intro">
                    Find out what you actually keep from an Upwork contract. Enter your rate or fixed price and the fee shown on your contract. The calculator takes off the Freelancer Service Fee and any withdrawal or other costs you add, then shows your take-home pay. It can also show the result in Pakistani rupees (PKR) at an exchange rate you enter.
                  </p>
                  <p className="fee-hero-intro">
                    Upwork’s fee is now between 0% and 15%, and it can be different on each contract. So check the exact percentage on your offer or proposal before you rely on any number.
                  </p>
                </>
              }
              points={[
                <>
                  <b className="font-semibold text-ink">How it’s calculated:</b> your amount, minus the service fee % and any withdrawal costs you add.{" "}
                  <a className="fee-link" href="#ex">See the $500 example</a>
                </>,
                <>
                  <b className="font-semibold text-ink">Fee source:</b> the % on your Upwork offer and Upwork’s help pages.
                </>,
                <>
                  <b className="font-semibold text-ink">Independent:</b> not affiliated with or endorsed by Upwork.
                </>,
              ]}
            />
          </div>
          <FeeCalculator />
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
                Example: a $500 fixed-price milestone
              </h2>
              <p className="mt-4 text-copy text-[#475569]">
                This example is for illustration only. It uses a 10% service fee and a $2 withdrawal fee. Your contract’s fee and your payment method’s charges may be different.
              </p>
            </div>
            <table className="w-full text-copy">
              <caption className="sr-only">Illustrative example calculation</caption>
              <tbody>
                <ExampleRow label="Fixed-price milestone billed" value="$500.00" />
                <ExampleRow label="Estimated service fee (10%)" detail="$500 × 10%" value="−$50.00" />
                <ExampleRow label="Amount after service fee" value="$450.00" />
                <ExampleRow label="Example withdrawal fee (flat)" detail="your provider’s fee" value="−$2.00" />
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row" className="pt-4 pr-4 text-left font-bold text-ink">
                    Estimated take-home
                    <span className="block text-ui font-normal text-[#475569]">
                      Effective deduction: 10.4%
                    </span>
                  </th>
                  <td className="pt-4 text-right font-display text-figure-sm text-ink tabular-nums">
                    $448.00
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <FeeGuide />
      </section>

      <FaqSection
        title="Upwork fee questions"
        intro={
          <>
            Short answers to common questions. For official, up-to-date details, see{" "}
            <a className="fee-link" href={FEE_HELP} target="_blank" rel="noopener noreferrer">
              Upwork Help
              <span className="sr-only"> (opens Upwork Help in a new tab)</span>
            </a>
            .
          </>
        }
        items={FAQ.map((item) => ({ question: item.question, answer: <p>{item.text}</p> }))}
      />

      <RelatedResources
        items={[CALCULATOR_RESOURCES.connects, CALCULATOR_RESOURCES.rate, CALCULATOR_RESOURCES.guide]}
      />

      <section className="border-t border-line bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6">
          <p className="text-ui text-[#475569]">
            <strong className="font-semibold text-ink">Disclaimer:</strong> Digital Dialogue is an independent publication. This calculator is not affiliated with, endorsed by, or sponsored by Upwork. All results are estimates for planning only. Your actual fees, rounding, withdrawal charges, exchange rates and taxes may differ. The PKR figure uses the rate shown in the calculator, which you can edit. Always check the fee shown on your Upwork offer or contract and Upwork’s official help pages.
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

