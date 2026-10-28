import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import FeeCalculator from "@/components/tools/FeeCalculator";
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

const TITLE = "Upwork Fee Calculator: Take-Home Pay | Digital Dialogue";
const DESCRIPTION =
  "Estimate your Upwork take-home pay after the freelancer service fee and withdrawal costs. Free calculator, no sign-up required.";
const PATH = "/tools/upwork-fee-calculator";
const FEE_HELP =
  "https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee";
const PAID_HELP =
  "https://support.upwork.com/hc/en-us/articles/211060918-How-to-get-paid-on-Upwork";

const FAQ = [
  {
    question: "How much does Upwork charge freelancers?",
    text: "According to Upwork’s help centre, the freelancer service fee ranges from 0% to 15% per contract. You see the percentage on the offer or when you submit a proposal, and it stays the same for that contract. This calculator starts at 10% as an estimate. Replace it with the percentage on your own offer for a closer result.",
  },
  {
    question: "Is the fee different for hourly and fixed-price contracts?",
    text: "The calculator applies the same percentage to both. For hourly work it uses your rate times hours billed. For fixed-price work it uses the contract or milestone amount. The fee is set per contract, so check the percentage in your contract details rather than assuming it matches a previous job.",
  },
  {
    question: "Does the calculator include taxes?",
    text: "No. It doesn’t estimate income tax, withholding, VAT or any other tax. Tax rules depend on where you live and how you’re registered, so check with a qualified tax adviser or your local tax authority.",
  },
  {
    question: "What about withdrawal and currency conversion costs?",
    text: "Withdrawal fees, bank charges and conversion margins depend on your payment method and provider, and they change over time. If you know them, add them under Additional costs as a flat amount, a percentage, or both. The percentage is applied to what’s left after the service fee. Upwork lists its current withdrawal options on its How to get paid page. Check your bank or provider for their conversion rates.",
  },
  {
    question: "Does choosing a currency convert my amounts?",
    text: "PKR does. Enter the contract amounts in US dollars, choose PKR, and enter the rupees per US dollar. Until you enter a rate, the result stays in US dollars. EUR, GBP and the other currencies only change the symbol and number format, so enter those amounts in the currency you want to see.",
  },
  {
    question: "How accurate is this calculator?",
    text: "It’s a planning estimate. Upwork may round fees to the nearest cent, and your actual fee, payment-method charges and exchange rates can differ from what you enter. For exact figures, check your contract details and transaction history on Upwork.",
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
            operatingSystem: "Web",
            url: `${config.BASE_URL}${PATH}`,
            description: DESCRIPTION,
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
              intro="Estimate what you actually keep from an Upwork contract after the service fee and any withdrawal or conversion costs."
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
              <p className="mb-3 inline-flex items-center rounded-md border border-dashed border-[#cbd5e1] bg-mist px-2 py-1 font-mono text-xs uppercase tracking-[0.1em] text-[#475569]">
                Illustrative example
              </p>
              <h2 id="example-title" className="fee-section">
                Example: a $500 fixed-price milestone
              </h2>
              <p className="mt-4 leading-relaxed text-[#475569]">
                This example is for illustration only. It uses a 10% service fee and a $2 withdrawal fee. Your contract’s fee and your payment method’s charges may be different.
              </p>
            </div>
            <table className="w-full text-[15px]">
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
                    <span className="block text-sm font-normal text-[#475569]">
                      Effective deduction: 10.4%
                    </span>
                  </th>
                  <td className="pt-4 text-right font-display text-3xl font-bold text-ink tabular-nums">
                    $448.00
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-title" className="border-y border-line bg-white py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-[#0f766e]">
            How to use
          </p>
          <h2 id="how-title" className="fee-section">
            Three steps to your estimate
          </h2>
          <ol className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {[
              ["Pick your contract type", "Choose Hourly to enter your rate and hours, or Fixed-price to enter the total contract or milestone amount."],
              ["Check the fee and extras", "Replace the estimated 10% with the service fee shown on your Upwork offer. Add withdrawal or conversion costs if you know them."],
              ["Read the estimate", "The take-home figure updates as you type, with the effective deduction and a breakdown you can use when setting rates. Choose PKR and enter a rate to show that payout in rupees."],
            ].map(([title, copy], index) => (
              <li key={title} className="flex gap-4 border-t border-line pt-5">
                <span className="font-mono text-sm text-[#0f766e]" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl">
                    <span className="sr-only">Step {index + 1}: </span>
                    {title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-[#475569]">{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
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
        items={[
          {
            question: FAQ[0].question,
            answer: (
              <>
                <p>
                  According to{" "}
                  <a className="fee-link" href={FEE_HELP} target="_blank" rel="noopener noreferrer">
                    Upwork’s help centre
                    <span className="sr-only"> (opens Upwork Help in a new tab)</span>
                  </a>
                  , the freelancer service fee ranges from 0% to 15% per contract. You see the percentage on the offer or when you submit a proposal, and it stays the same for that contract.
                </p>
                <p>
                  This calculator starts at <strong>10% as an estimate</strong>. Replace it with the percentage on your own offer for a closer result.
                </p>
              </>
            ),
          },
          { question: FAQ[1].question, answer: <p>{FAQ[1].text}</p> },
          { question: FAQ[2].question, answer: <p>{FAQ[2].text}</p> },
          {
            question: FAQ[3].question,
            answer: (
              <>
                <p>
                  Withdrawal fees, bank charges and conversion margins depend on your payment method and provider, and they change over time. If you know them, add them under <strong>Additional costs</strong> as a flat amount, a percentage, or both. The percentage is applied to what’s left after the service fee.
                </p>
                <p>
                  Upwork lists its current withdrawal options on{" "}
                  <a className="fee-link" href={PAID_HELP} target="_blank" rel="noopener noreferrer">
                    How to get paid on Upwork
                    <span className="sr-only"> (opens Upwork Help in a new tab)</span>
                  </a>
                  . Check your bank or provider for their conversion rates.
                </p>
              </>
            ),
          },
          { question: FAQ[4].question, answer: <p>{FAQ[4].text}</p> },
          { question: FAQ[5].question, answer: <p>{FAQ[5].text}</p> },
        ]}
      />

      <RelatedResources
        items={[CALCULATOR_RESOURCES.connects, CALCULATOR_RESOURCES.rate, CALCULATOR_RESOURCES.guide]}
      />

      <section className="border-t border-line bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6">
          <p className="text-sm leading-relaxed text-[#475569]">
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
        {detail && <span className="block text-sm text-[#475569]">{detail}</span>}
      </th>
      <td className="py-3 text-right font-semibold text-ink tabular-nums">{value}</td>
    </tr>
  );
}

