import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import FaqSection from "@/components/tools/FaqSection";
import RateCalculator from "@/components/tools/RateCalculator";
import RateGuide from "@/components/tools/RateGuide";
import ToolHero from "@/components/tools/ToolHero";
import RelatedResources, { CALCULATOR_RESOURCES } from "@/components/tools/RelatedResources";
import config from "@/lib/config";
import { breadcrumbSchema, JsonLdScript } from "@/lib/schema";

const OG_IMAGE = {
  url: "/freelance-rate-calculator.png",
  width: 1200,
  height: 630,
  alt: "Freelance Rate Calculator — find the hourly rate that hits your income goal after expenses, fees and unpaid hours",
};

const TITLE = "Freelance Rate Calculator: What to Charge | Digital Dialogue";
const DESCRIPTION = "Find the hourly rate you need to charge as a freelancer after expenses, platform fees like Upwork's, and unpaid hours. Day and project rates too. Free.";
const PATH = "/tools/freelance-rate-calculator";
const FEE_HELP = "https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee";

const FAQ = [
  { question: "How do I calculate my freelance hourly rate?", text: "Add the take-home pay you want to your business expenses, divide by (1 − your platform fee), then divide by the hours you can bill in a month. For example, $2,250 at a 10% fee is $2,500 to bill. Over 92 billable hours, that is $27.17 an hour." },
  { question: "How many billable hours should I plan for?", text: "Fewer than you work. Proposals, admin, calls and learning are unpaid, so many freelancers can bill only part of a 40-hour week. Track your own time for a few weeks and use that number. The calculator lets you enter billable hours or a billable percentage." },
  { question: "How do Upwork fees affect my hourly rate?", text: "Upwork takes 0% to 15% of what you bill on each contract. To keep the same take-home, divide your needed income by (1 − the fee). In the example above, a 15% fee instead of 0% raises the minimum rate from $24.46 to $28.77 an hour." },
  { question: "Should I just add the fee percentage to my rate?", text: "No. The fee is taken from the full amount you bill, so adding the percentage leaves you a little short. Dividing by (1 − fee) gives the exact amount. At 10%, divide by 0.90." },
  { question: "How do I turn an hourly rate into a day rate or project price?", text: "Multiply your hourly rate by the billable hours in a day for a day rate. For a project, estimate the hours and multiply by your rate, then add room for revisions. The calculator shows a day rate and a 10-hour project price as examples." },
  { question: "Does the rate calculator include tax?", text: "No. Tax depends on where you live. Add your expected tax to your take-home goal, or check with a tax adviser in your country." },
  { question: "Can I use the calculator in Pakistani rupees?", text: "Yes. Choose PKR, enter amounts in US dollars, then enter the exchange rate your bank or wallet gives you. The calculator shows the State Bank of Pakistan weighted average and its date as a reference. Until you enter a rate, results stay in US dollars." },
  { question: "Is this rate what I should charge every client?", text: "It is your minimum. Clients pay for results and skill, so charge more where the market allows, and use this number to know when a job is too cheap to take." },
] as const;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, images: [OG_IMAGE] },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function FreelanceRateCalculatorPage() {
  return (
    <div className="fee-page">
      <JsonLdScript data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Freelance Rate Calculator", path: PATH }]),
        { "@context": "https://schema.org", "@type": "WebApplication", name: "Freelance Rate Calculator", applicationCategory: "FinanceApplication", operatingSystem: "Any", dateModified: "2026-10-29", url: `${config.BASE_URL}${PATH}`, description: DESCRIPTION, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, provider: { "@type": "Organization", name: config.SITE_NAME, url: config.BASE_URL } },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.text } })) },
      ]} />
      <section className="fee-hero bg-[#f4f6f8]">
        <div className="fee-hero-grid mx-auto w-full max-w-[1200px] px-4 pb-10 pt-4 sm:px-5 min-[1024px]:px-8 min-[1024px]:pb-14 min-[1024px]:pt-10">
          <div className="min-[1024px]:pt-10">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Freelance Rate Calculator" }]} />
            <ToolHero
              title="Freelance Rate Calculator"
              intro={
                <>
                  <p className="fee-hero-intro">
                    Work out the lowest hourly rate you can charge and still reach your income goal. Enter the take-home pay you want, your business costs, the platform fee, and the hours you can actually bill. The calculator then shows your minimum hourly rate, plus a day rate and a 10-hour project price.
                  </p>
                  <p className="fee-hero-intro">
                    It is a floor, not a target. Charge more where your skills, results and market allow.
                  </p>
                </>
              }
              points={[
                <>
                  <b className="font-semibold text-ink">How it’s calculated:</b> (take-home + expenses) ÷ (1 − fee %), spread over the hours you can bill.{" "}
                  <a className="fee-link" href="#ex">See the $1,500 example</a>
                </>,
                <>
                  <b className="font-semibold text-ink">Fee source:</b> the fees you actually pay. Upwork shows its service fee on each offer.
                </>,
                <>
                  <b className="font-semibold text-ink">Independent:</b> not affiliated with or endorsed by Upwork.
                </>,
              ]}
            />
          </div>
          <RateCalculator />
        </div>
      </section>
      <section id="ex" aria-labelledby="example-title" className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">
          <div className="fee-example-grid">
            <div>
              <p className="fee-kicker">How the rate is calculated</p>
              <h2 id="example-title" className="fee-section">Example: a $1,500-a-month goal</h2>
              <p className="mt-4 max-w-3xl text-copy text-[#475569]">A fictional freelancer wants $1,500 take-home plus $200 of expenses, works 40 hours and bills 25 of them, with a 10% fee and 48 working weeks. The gross-up is $1,888.89 a month across 100 billable hours, so the minimum rate is $18.89 an hour. A day is $94.44 and a 10-hour project is $188.89.</p>
            </div>
            <table className="fee-example-table">
              <caption className="sr-only">Example: a $1,500-a-month goal</caption>
              <tbody>
                <tr>
                  <th scope="row">Take-home goal + expenses<span className="fee-example-note">$1,500 + $200</span></th>
                  <td>$1,700.00</td>
                </tr>
                <tr>
                  <th scope="row">Gross-up for a 10% fee<span className="fee-example-note">$1,700 ÷ (1 − 10%)</span></th>
                  <td>$1,888.89</td>
                </tr>
                <tr>
                  <th scope="row">Billable hours a month<span className="fee-example-note">25 hrs × 48 weeks ÷ 12</span></th>
                  <td>100</td>
                </tr>
                <tr>
                  <th scope="row">Minimum hourly rate<span className="fee-example-note">Day $94.44 · 10-hour project $188.89</span></th>
                  <td>$18.89</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="border-y border-line bg-white">
        <RateGuide />
      </section>
      <FaqSection
        title="Freelance rate questions"
        intro={
          <>
            For the current Upwork fee, see{" "}
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
        items={[CALCULATOR_RESOURCES.fee, CALCULATOR_RESOURCES.connects, CALCULATOR_RESOURCES.guide]}
      />
      <section className="border-t border-line bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6">
          <p className="text-ui text-[#475569]">
            <strong className="font-semibold text-ink">Disclaimer:</strong> Digital Dialogue is an independent publication and is not affiliated with Upwork. Estimates only. Tax is not included. PKR converts US dollar amounts into rupees. Other currencies only change the symbol.
          </p>
        </div>
      </section>
    </div>
  );
}
