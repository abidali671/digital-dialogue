import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import FaqSection from "@/components/tools/FaqSection";
import RateCalculator from "@/components/tools/RateCalculator";
import RelatedResources, { CALCULATOR_RESOURCES } from "@/components/tools/RelatedResources";
import config from "@/lib/config";
import { breadcrumbSchema, JsonLdScript } from "@/lib/schema";

const OG_IMAGE = {
  url: "/freelance-rate-calculator.png",
  width: 1200,
  height: 630,
  alt: "Freelance Rate Calculator — find the hourly rate that hits your income goal after expenses, fees and unpaid hours",
};

const TITLE = "Freelance Rate Calculator: Find Your Hourly Rate | Digital Dialogue";
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
      <div className="border-b border-line bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 md:py-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Freelance Rate Calculator" }]} />
          <div className="max-w-3xl">
            <h1>Freelance Rate Calculator</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#475569] md:text-xl">Work out the hourly rate that still hits your income goal after expenses, platform fees and the hours nobody pays for.</p>
          </div>
        </div>
      </div>
      <RateCalculator />
      <section aria-labelledby="example-title" className="pb-14">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
          <div className="fee-card p-5 sm:p-8">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-[#475569]">Illustrative example</p>
            <h2 id="example-title" className="fee-section">Example: a $1,500-a-month goal</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-[#475569]">A fictional freelancer wants $1,500 take-home plus $200 of expenses, works 40 hours and bills 25 of them, with a 10% fee and 48 working weeks. The gross-up is $1,888.89 a month across 100 billable hours, so the minimum rate is $18.89 an hour. A day is $94.44 and a 10-hour project is $188.89.</p>
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
    </div>
  );
}
