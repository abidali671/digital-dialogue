import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import ConnectsCalculator from "@/components/tools/ConnectsCalculator";
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

const TITLE = "Upwork Connects Calculator: Track Proposal Costs | Digital Dialogue";
const DESCRIPTION = "Estimate what your Upwork proposals cost in Connects and see your cost per reply, interview and contract, plus your reply and win rates. Free.";
const PATH = "/tools/upwork-connects-calculator";
const CONNECTS_HELP = "https://support.upwork.com/hc/en-us/articles/211062898-Understanding-and-using-Connects";

const FAQ = [
  { question: "What are Upwork Connects?", text: "Connects are the tokens freelancers use on Upwork to submit proposals and for some promotion features, such as boosted proposals. Each job shows how many Connects it needs, and that number can vary." },
  { question: "Why doesn’t the calculator include a Connects price?", text: "Prices, bundles, free monthly Connects and promotions can change and may differ by account, so you enter the price you actually pay." },
  { question: "What is a good reply rate?", text: "There’s no single benchmark, because it depends on your niche, profile, the jobs you pick and how fast you apply. The most useful comparison is with yourself: track the same period each month." },
  { question: "What’s the difference between Connects spending and total acquisition cost?", text: "Connects spending is only what you paid for the Connects you used. Total acquisition cost adds any other costs you entered, such as a membership or tools." },
  { question: "Why does it say “Not available yet”?", text: "A cost per reply, interview or contract needs at least one of them to divide by. Instead of showing an infinite or misleading $0 figure, the calculator tells you what to add." },
  { question: "Do refunded Connects count?", text: "Upwork returns Connects in some cases, such as when a client cancels a job before hiring. If Connects came back to you, leave them out of your average so your spending isn’t overstated." },
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
        { "@context": "https://schema.org", "@type": "WebApplication", name: "Upwork Connects Calculator", applicationCategory: "FinanceApplication", operatingSystem: "Web", url: `${config.BASE_URL}${PATH}`, description: DESCRIPTION, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, provider: { "@type": "Organization", name: config.SITE_NAME, url: config.BASE_URL } },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.text } })) },
      ]} />
      <div className="border-b border-line bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 md:py-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Upwork Connects Calculator" }]} />
          <div className="max-w-3xl">
            <h1>Upwork Connects Calculator</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#475569] md:text-xl">See what a batch of proposals costs in Connects, and what each reply, interview and contract costs you. Choose PKR to convert US dollar amounts into rupees.</p>
          </div>
        </div>
      </div>
      <ConnectsCalculator />
      <section aria-labelledby="example-title" className="pb-14">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
          <div className="fee-card p-5 sm:p-8">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-[#475569]">Illustrative example</p>
            <h2 id="example-title" className="fee-section">Example: 40 proposals in 30 days</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-[#475569]">A fictional freelancer sends 40 proposals at 12 Connects each, pays $0.15 per Connect, gets 8 replies, 5 interviews and 2 contracts, and adds $20 of other costs. That’s 480 Connects, $72 of Connects spending and $92 in total. Each contract costs $36 in Connects, or $46 including the other costs. The $0.15 figure is only an example.</p>
          </div>
        </div>
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
    </div>
  );
}
