import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import ConnectsCalculator from "@/components/tools/ConnectsCalculator";
import ConnectsGuide from "@/components/tools/ConnectsGuide";
import ToolHero from "@/components/tools/ToolHero";
import FaqSection from "@/components/tools/FaqSection";
import RelatedResources, { CALCULATOR_RESOURCES } from "@/components/tools/RelatedResources";
import config from "@/lib/config";
import { breadcrumbSchema, JsonLdScript } from "@/lib/schema";

const OG_IMAGE = {
  url: "/upwork-connects-calculator.png",
  width: 1200,
  height: 630,
  alt: "Upwork Connects Calculator — work out your cost per reply, interview and contract",
};

const TITLE = "Upwork Connects Calculator: Cost per Job | Digital Dialogue";
const DESCRIPTION = "Work out what your Upwork proposals cost in Connects and dollars, and your cost per reply, interview and contract. Optional PKR view. Free, no sign-up.";
const PATH = "/tools/upwork-connects-calculator";
const CONNECTS_HELP = "https://support.upwork.com/hc/en-us/articles/211062898-Understanding-and-using-Connects";

const FAQ = [
  { question: "How much do Upwork Connects cost?", text: "Upwork lists extra Connects at $0.15 each, sold in bundles (checked 29 Oct 2026). You need a verified billing method to buy them. Freelancer Plus, at $19.99 a month, includes 100 Connects a month." },
  { question: "How many Connects does a proposal need?", text: "It depends on the job. Each job post shows how many Connects it needs, and Upwork says the number can change while the job is posted. Boosting a proposal uses extra Connects on top." },
  { question: "How much are Upwork Connects in Pakistani rupees?", text: "Multiply the dollar price by your exchange rate. At $0.15 per Connect and an example rate of 280 PKR per USD, one Connect is Rs 42 and 100 Connects are Rs 4,200. Connects are billed in US dollars, so your card or bank’s rate and charges decide the final rupee amount." },
  { question: "Do I get my Connects back if I don’t get the job?", text: "Usually not. Upwork returns Connects only if the client cancels the job before hiring (not when it expires) or Upwork removes the post. They come back as Connects, not cash. A declined proposal or hiring someone else does not return them." },
  { question: "What is a good cost per contract on Upwork?", text: "There is no single number. Compare your cost per contract with what a typical contract leaves you after the Upwork fee. If winning a client costs a small share of what they pay you, and they may come back, the Connects are working." },
  { question: "Is Freelancer Plus cheaper than buying Connects?", text: "Only for Connects, no: 100 bought Connects cost $15, while Freelancer Plus is $19.99 a month. Plus also includes other features, such as a 0% fee on Direct Contracts, so it can make sense if you use those." },
  { question: "Can I get free Connects on Upwork?", text: "Yes, in some cases. Upwork lists a one-time new user bonus, onboarding tasks, badges, some interviews and a first-boost reward. The amounts vary by account and Upwork changes them from time to time." },
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

export default function UpworkConnectsCalculatorPage() {
  return (
    <div className="fee-page">
      <JsonLdScript data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Upwork Connects Calculator", path: PATH }]),
        { "@context": "https://schema.org", "@type": "WebApplication", name: "Upwork Connects Calculator", applicationCategory: "FinanceApplication", operatingSystem: "Any", dateModified: "2026-10-29", url: `${config.BASE_URL}${PATH}`, description: DESCRIPTION, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, provider: { "@type": "Organization", name: config.SITE_NAME, url: config.BASE_URL } },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.text } })) },
      ]} />
      <section className="fee-hero bg-[#f4f6f8]">
        <div className="fee-hero-grid mx-auto w-full max-w-[1200px] px-4 pb-10 pt-4 sm:px-5 min-[1024px]:px-8 min-[1024px]:pb-14 min-[1024px]:pt-10">
          <div className="min-[1024px]:pt-10">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Upwork Connects Calculator" }]} />
            <ToolHero
              title="Upwork Connects Calculator"
              intro={
                <>
                  <p className="fee-hero-intro">
                    Every Upwork proposal costs Connects, and Connects cost money. This calculator shows what a batch of proposals really cost you, and what you paid for each reply, interview and contract you won. Use it to see if your proposals pay for themselves and which jobs are worth the Connects.
                  </p>
                  <p className="fee-hero-intro">
                    Upwork sells extra Connects for $0.15 each (checked 29 Oct 2026). If you buy them some other way, for example through Freelancer Plus, enter your own price per Connect.
                  </p>
                </>
              }
              points={[
                <>
                  <b className="font-semibold text-ink">How it’s calculated:</b> Connects per proposal × proposals × your price, then divided by replies, interviews and contracts.{" "}
                  <a className="fee-link" href="#ex">See the 40-proposal example</a>
                </>,
                <>
                  <b className="font-semibold text-ink">Price source:</b> the example starts at $0.15, Upwork’s listed price for extra Connects (checked 29 Oct 2026). Replace it with what you pay.
                </>,
                <>
                  <b className="font-semibold text-ink">Independent:</b> not affiliated with or endorsed by Upwork.
                </>,
              ]}
            />
          </div>
          <ConnectsCalculator />
        </div>
      </section>
      <section id="ex" aria-labelledby="example-title" className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">
          <div className="fee-example-grid">
            <div>
              <p className="fee-kicker">How the cost is calculated</p>
              <h2 id="example-title" className="fee-section">Example: 40 proposals in 30 days</h2>
              <p className="mt-4 max-w-3xl text-copy text-[#475569]">A fictional freelancer sends 40 proposals at 12 Connects each, pays $0.15 per Connect, gets 8 replies, 5 interviews and 2 contracts, and adds $20 of other costs. That’s 480 Connects, $72 of Connects spending and $92 in total. Each contract costs $36 in Connects, or $46 including the other costs. The $0.15 figure is only an example.</p>
            </div>
            <table className="fee-example-table">
              <caption className="sr-only">Example: 40 proposals in 30 days</caption>
              <tbody>
                <tr>
                  <th scope="row">Connects used<span className="fee-example-note">40 proposals × 12 Connects</span></th>
                  <td>480</td>
                </tr>
                <tr>
                  <th scope="row">Connects spending<span className="fee-example-note">480 × $0.15 (example price)</span></th>
                  <td>$72.00</td>
                </tr>
                <tr>
                  <th scope="row">Total with other costs<span className="fee-example-note">$72 + $20</span></th>
                  <td>$92.00</td>
                </tr>
                <tr>
                  <th scope="row">Cost per contract<span className="fee-example-note">$36 in Connects only · 2 contracts</span></th>
                  <td>$46.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="border-y border-line bg-white">
        <ConnectsGuide />
      </section>
      <FaqSection
        title="Upwork Connects questions"
        intro={
          <>
            For official details, see{" "}
            <a className="fee-link" href={CONNECTS_HELP} target="_blank" rel="noopener noreferrer">
              Understanding and using Connects
              <span className="sr-only"> (opens Upwork Help in a new tab)</span>
            </a>
            .
          </>
        }
        items={FAQ.map((item) => ({ question: item.question, answer: <p>{item.text}</p> }))}
      />
      <RelatedResources
        items={[CALCULATOR_RESOURCES.fee, CALCULATOR_RESOURCES.rate, CALCULATOR_RESOURCES.guide]}
      />
      <section className="border-t border-line bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6">
          <p className="text-ui text-[#475569]">
            <strong className="font-semibold text-ink">Disclaimer:</strong> Digital Dialogue is an independent publication and is not affiliated with Upwork. Estimates only. Connects prices and refunds change, so enter the price you pay. PKR converts US dollar amounts into rupees. Other currencies only change the symbol.
          </p>
        </div>
      </section>
    </div>
  );
}
