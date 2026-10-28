import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import FaqSection from "@/components/tools/FaqSection";
import RateCalculator from "@/components/tools/RateCalculator";
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

const TITLE = "Freelance Rate Calculator: Hourly Rate | Digital Dialogue";
const DESCRIPTION = "Work out the hourly rate you need to hit your freelance income goal after business expenses, platform fees and unpaid hours. Free, no sign-up required.";
const PATH = "/tools/freelance-rate-calculator";
const FEE_HELP = "https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee";

const FAQ = [
  { question: "How do I calculate my freelance hourly rate?", text: "Add your take-home goal and business expenses, then gross that up for platform and payment fees by dividing by (1 − fee%). Divide the result by the hours you can actually bill in a month. That’s the minimum hourly rate that covers your goal." },
  { question: "What’s the difference between billable and working hours?", text: "Working hours are all the time you spend on your business. Billable hours are only the hours a client pays for. Writing proposals, marketing, admin, invoicing, meetings and learning are real work but usually unpaid, so your rate has to cover them." },
  { question: "Why divide by (1 − fee) instead of adding the fee?", text: "Platforms take their fee from what you bill. If you need $900 and the fee is 10%, adding 10% gives $990, but 10% of $990 is $99, leaving $891. Dividing $900 by 0.9 gives $1,000, and after the $100 fee you keep exactly $900." },
  { question: "Does this include tax?", text: "No. Tax depends on where you live and how you’re registered, so the calculator leaves it out. If you pay tax on freelance income, raise your take-home goal to allow for it, or check with a qualified tax adviser." },
  { question: "What fee percentage should I use?", text: "Use the fees you actually pay. On Upwork, the freelancer service fee is shown on each offer and ranges from 0% to 15% per contract. The calculator starts at 10% as an estimate." },
  { question: "Should I charge exactly this rate?", text: "Treat it as a floor, not a price. It’s the least you can charge and still meet your goal if you bill the hours you entered. Your market, experience and the value you deliver may support a higher rate, and slow months happen." },
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
        { "@context": "https://schema.org", "@type": "WebApplication", name: "Freelance Rate Calculator", applicationCategory: "FinanceApplication", operatingSystem: "Web", url: `${config.BASE_URL}${PATH}`, description: DESCRIPTION, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, provider: { "@type": "Organization", name: config.SITE_NAME, url: config.BASE_URL } },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.text } })) },
      ]} />
      <section className="fee-hero bg-[#f4f6f8]">
        <div className="fee-hero-grid mx-auto w-full max-w-[1200px] px-4 pb-10 pt-4 sm:px-5 min-[1024px]:px-8 min-[1024px]:pb-14 min-[1024px]:pt-10">
          <div className="min-[1024px]:pt-10">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Freelance Rate Calculator" }]} />
            <ToolHero
              title="Freelance Rate Calculator"
              intro="Work out the hourly rate that still hits your income goal after expenses, platform fees and the hours nobody pays for."
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
              <p className="mt-4 max-w-3xl leading-relaxed text-[#475569]">A fictional freelancer wants $1,500 take-home plus $200 of expenses, works 40 hours and bills 25 of them, with a 10% fee and 48 working weeks. The gross-up is $1,888.89 a month across 100 billable hours, so the minimum rate is $18.89 an hour. A day is $94.44 and a 10-hour project is $188.89.</p>
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
          <p className="text-sm leading-relaxed text-[#475569]">
            <strong className="font-semibold text-ink">Disclaimer:</strong> Digital Dialogue is an independent publication and is not affiliated with Upwork. Estimates only. Tax is not included. PKR converts US dollar amounts into rupees. Other currencies only change the symbol.
          </p>
        </div>
      </section>
    </div>
  );
}
